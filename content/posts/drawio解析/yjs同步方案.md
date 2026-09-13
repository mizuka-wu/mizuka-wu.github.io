---
title: yjs同步方案
date: 2026-09-13T10:00:00
tags:
  - 技术
categories:
  - 经验分享
summary: 暂无摘要
---

## 与 mxGraphModel 变更的映射

- __变更事件__：`START_EDIT` → 多次 `EXECUTED` → `END_EDIT`/`CHANGE`。
- __典型变更类__：
  - `mxChildChange` → 在父元素 `children` 中增删/重排 `mxCell` 或层次结构。
  - `mxGeometryChange` → 更新对应 `mxGeometry` 子元素的 `attrs`（如 x/y/width/height、points）。
  - `mxTerminalChange` → 更新 `mxCell@source`/`@target`（或相关引用属性）。
  - `mxStyleChange` → 更新 `mxCell@style`。
  - `mxValueChange` → 更新 `mxCell@value`（或 `text`）。
  - 其他：`mxVisibleChange`、`mxCollapseChange`、`mxRootChange` 等按属性/结构映射。

- __事务对齐__：将 `model.beginUpdate()/endUpdate()` 封装为 `ydoc.transact()`，把同一事务内的多次变更合并为单个 Yjs 更新广播，减少抖动。

---

## 方案 A vs 方案 B（优化对比）

- __方案 A：最小改造，保留 Drawio 补丁管线__
  - 思路：
    - 继续用 `DrawioFile`/`DrawioFileSync` 现有 `diffPages/patchPages` 补丁格式与逻辑。
    - 用 Yjs 仅承载“补丁消息”的分发与持久化，例如 `Y.Array<{ts, clientId, patch}>`。
  - 优点：
    - 对现有代码入侵极小；快速上线；复用既有冲突兜底（LWW+checksum）。
    - 享受 Yjs 网络层（y-websocket / y-webrtc）和离线重放能力。
  - 局限：
    - 补丁仍为文本/结构差异，合并粒度粗；并发编辑仍主要依赖补丁序列化顺序与 LWW。
    - 与 Yjs 的 CRDT 优势未完全发挥，存在双重“补丁/CRDT”叠加复杂性。
  - 适用：
    - 需要快速验证与上线；对并发冲突质量要求一般；现有补丁生态必须保留。

- __方案 B：完全 CRDT 化，使用 yXMLElement__
  - 思路：
    - 用 `yXMLElement` 直接表示页面 XML（`mxGraphModel` → `yXMLElement` 树）。
    - 将 `mx*Change` 事件映射为对 `yXMLElement` 的属性与 `children` 的原子更新；
      远端变更通过 Yjs 观察器反向驱动 `mxGraphModel`（构造并 `execute` 对应 change）。
  - 优点：
    - 字段级/节点级冲突自动合并；数组顺序冲突由 CRDT 解决。
    - 离线/重连/晚加入自然一致；无需额外 LWW 兜底。
  - 代价：
    - 需要双向桥接（mxGraphModel ↔ yXMLElement）与不变式维护（如 `maintainEdgeParent`）。
    - 初期集成复杂度高、测试面大（几何、终端、样式、分层等全覆盖）。
  - 适用：
    - 并发编辑强一致与细粒度合并是核心诉求；可投入更多集成成本。

- __推荐迁移路径__：
  1) A 方案落地（快速见效，验证网络与离线能力）。
  2) 分模块/字段渐进替换为 B（优先几何/样式/终端等高频字段）。
  3) 全量切换至 B，并淘汰旧补丁协议。

---

## 导入与回放（B 方案关键流程）

- __导入 XML → yXMLElement__：
  - 解析根节点为 `yXMLElement{ tag:'mxGraphModel', attrs, children }`。
  - `mxCell` 作为 `children` 中的元素；其 `mxGeometry` 作为其 `children` 的一员；
    属性如 `id/vertex/edge/style/source/target/value/visible` 放入 `attrs`。

- __本地变更 → Yjs__：
  - 监听 `model.addListener(mxEvent.CHANGE, ...)`，遍历 `edit.changes`：
    - `mxChildChange`：在父节点的 `children: Y.Array` 执行 `insert`/`delete`/`move`。
    - `mxGeometryChange`：定位 `mxGeometry` 子元素，更新 `attrs`（x/y/width/height/points）。
    - `mxTerminalChange`：更新 `mxCell@source/target`。
    - `mxStyleChange`/`mxValueChange`：更新 `attrs.style / attrs.value` 或 `text`。
  - 外围用 `ydoc.transact(() => { ... })` 批量提交。

- __远端变更 → mxGraphModel__：
  - 观察 `yXMLElement`（对 `attrs`/`children`/`text` 的更改），将其翻译为相应 `mx*Change` 并 `execute`：
    - 例如某 `children` 插入了一个 `mxCell` → 构造 `mxChildChange` 插入。
    - 某几何属性变化 → 构造 `mxGeometryChange`。

- __不变式与引用__：
  - 通过 `id` 管理引用关系（终端、父子、跨层）；保持与 `mxGraphModel.cells` 一致。
  - 对 `maintainEdgeParent/ignoreRelativeEdgeParent` 等语义，优先通过 `execute(change)` 路径触发框架内置维护。

---

## 持久化与网络

- Provider：`y-websocket` 或 `y-webrtc`；离线 `y-indexeddb`。
- 房间命名建议：`diagram:<fileId>:<pageId>`（分页隔离）。
- 元数据：`Y.Map` 承载当前页、光标/选区（`awareness`）。

---

## 测试清单（B 方案）

- 顶点/边的新增、删除、复制、粘贴、分层移动。
- 边连接/断开、终端切换、多端同时编辑端点。
- 几何移动/缩放、旋转（若有）、多端冲突编辑。
- 样式编辑并发（颜色、连线样式、文本样式）。
- 大图性能：批量移动 1000+ 节点、撤销/重做与事务边界。
- 离线编辑 → 重连后正确合并；晚加入完整回放。

---

## 总结

- 采用统一 `yXMLElement` + `children: Y.Array` 的抽象，可自然映射 Drawio XML，解耦补丁协议并获得字段级 CRDT 合并。
- 推荐以 A 方案快速上线，再分步迁移到 B 方案以获得最佳并发一致性与维护性。