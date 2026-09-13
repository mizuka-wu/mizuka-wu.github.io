---
title: DrawioFile
date: 2026-09-13T10:00:00
tags:
  - 技术
categories:
  - 经验分享
summary: 暂无摘要
---

# DrawioFile 模块解析与实时协作要点

来源代码路径：`submodules/drawio/src/main/webapp/js/diagramly/DrawioFile.js`

## 概览
* __职责__：文档数据/状态管理，影子页维护，保存与自动保存，补丁生成与应用，冲突与校验处理，UI 状态更新，与同步模块的集成。
* __协作关系__：与 `DrawioFileSync` 协同；保存前后通知同步模块；远端变更时由同步模块驱动合并回放。

## 关键方法与职责
* __`open()`__：载入 XML 到 UI，安装监听；未修改时设置影子页 `setShadowPages(ui.clonePages(ui.pages))`。
* __`startSync()`__：允许协作时创建并启动 `DrawioFileSync`。
* __`fileChanged(sync = true)`__：标记已修改、触发 autosave/UI 提示；若存在 `this.sync` 则 `this.sync.localFileChanged()`。
* __`autosave()`__：基于 `autosaveDelay/maxAutosaveDelay` 与 `isAutosaveNow()` 节流；结束后 `autosaveCompleted()`。
* __`fileSaving()`__：保存开始时通知同步模块（乐观模式可仅广播通知）。
* __`fileSaved(savedData, lastDesc, success, error, token)`__：
  - 解析当前页面 `ui.getPagesForXml(savedData)`。
  - 若乐观或无 `sync`：更新影子页并完成。
  - 否则委托 `this.sync.fileSaved(pages, lastDesc, ...)` 将补丁与校验写入缓存并广播。
* __`updateFile()/mergeFile()/patch()`__：拉新/合并/应用补丁的核心链路；`patchRealtime()` 可优先处理“仅影响本端页”的补丁段。
* __`descriptorChanged()`__、__`contentChanged()`__：触发相应事件，供外部订阅。
* __`removeListeners()`__、__`destroy()`__：清理监听与同步对象、停止自动保存。

## 实时协作交互点
* __影子页（Shadow Pages）__：`setShadowPages()` 维护与服务端期望一致的快照；保存后更新影子。
* __校验（Checksum）__：通过 `ui.getHashValueForPages(pages)` 计算，合并前校验一致性；失败回退全量刷新。
* __乐观同步__：`isOptimisticSync()` 时仅发通知，不写缓存数据，由其它端拉取并合并。

## 冲突与回退
* __标志位__：`invalidChecksum`、`inConflictState` 控制 UI 提示与对话（刷新/合并/覆盖/复制）。
* __回退策略__：校验失败或异常 → `synchronizeFile()` / `reloadFile()` 拉取最新；必要时 LWW（`backupPatch`）。

## 重要数据结构
* __Descriptor__：版本/etag、`secret`、`lastModified` 等元信息。
* __Pages/Own/Remote Pages__：页面集合，用于 diff 与实时分流。

## 时序（简化）
* __本地保存__：`fileSaving()` → 编辑器保存 → `fileSaved()` →（乐观：更新影子｜非乐观：`sync.fileSaved()` 写缓存+广播）。
* __远端更新__：`sync.fileChanged()` → `catchup/merge` → `patchRealtime` 或 `patch()` 应用 → `patchDescriptor()`。

## 注意事项
* 自动保存节流：`autosaveDelay/maxAutosaveDelay/isAutosaveNow()`。
* 实时开关：`isRealtime()`、`isOptimisticSync()`。
* 评论 API：当前默认占位实现（`commentsSupported()` 返回 false）。


## 函数清单与说明

- getSize(): 返回当前数据长度。
- getShadowPages(): 获取/初始化影子页快照。
- setShadowPages(pages): 赋值影子页。
- getAnonymizedXmlForPages(pages): 生成脱敏后的页面 XML（报错/上报用）。
- compressReportData(data, limit, max): 压缩上报数据，控制体积。
- checksumError(error, patches, details, etag, functionName, checksum, current, rev): 处理校验和不一致，进入冲突态并统计。
- sendErrorReport(title, details, error, max): 发送错误与诊断报告。
- reloadFile(success, error): 全量拉取并重载文件。
- mergeLatestVersion(patches, success, error): 载入最新版本并尝试应用给定补丁。
- copyFile(success, error): 以当前数据另存为新文件并打开。
- ignorePatches(patches): 判断补丁数组是否可忽略（空或无效）。
- patch(patches, resolver, undoable, sendChanges): 应用补丁；必要时不更新同步快照以便计算 diff 并广播。
- save(revision, success, error, unloading, overwrite, manual): 触发保存流程（本地→存储），处理修订参数。
- createData(): 从 UI 生成可保存的数据（页面列表等）。
- updateFileData(): 在存在同步时先发送本地待发变更并更新自身页面。
- isCompressedStorage(): 返回是否使用压缩存储（true）。
- isCompressed(): 检查当前文件节点的压缩标记。
- saveAs(filename, success, error): 占位，子类实现具体保存为。
- saveFile(title, revision, success, error): 占位，子类实现实际持久化。
- getFileUrl(): 占位，返回文件直链（默认 null）。
- getFolderUrl(fn): 占位，返回所在目录链接（默认 null）。
- getPublicUrl(fn): 异步回调公开链接（默认 null）。
- isRestricted(): 是否限制复制/导出/打印（默认 false）。
- isModified(): 是否已修改。
- getShadowModified(): 影子页是否已修改。
- setShadowModified(value): 设置影子修改标记。
- setModified(value): 设置修改标记并同步影子标记。
- isAutosaveOptional(): 是否显示可选的自动保存开关（默认 false）。
- isAutosave(): 是否允许自动保存（冲突中或关闭时为 false）。
- isRenamable(): 是否可重命名（默认 false）。
- rename(title, success, error): 占位，重命名文件。
- isMovable(): 是否可移动（默认 false）。
- isTrashed(): 是否在回收站（默认 false）。
- move(folderId, success, error): 占位，移动到文件夹。
- getHash(): 返回存储前缀+ID 组成的哈希（默认空串）。
- getId(): 返回文件 ID（默认空串）。
- isEditable(): 是否可编辑（非 chromeless 或可编辑）。
- getUi(): 返回 UI 实例。
- getTitle(): 返回标题（默认空串）。
- getData(): 返回当前数据 XML。
- setData(data): 设置当前数据。
- isSyncSupported(): 是否支持同步（默认 false，子类重写）。
- isRealtime(): 是否已初始化实时模型（ownPages 非空）。
- isRealtimeSupported(): 是否支持实时协作（默认 false）。
- isRealtimeEnabled(): 是否启用实时（受 Editor.enableRealtime 与 urlParams 控制）。
- isRealtimeOptional(): 实时是否可开关（默认 false）。
- getRealtimeState(): 返回实时通道状态码（若无通道则 CLOSED）。
- getRealtimeError(): 返回最近一次实时错误（若有）。
- isOptimisticSync(): 是否采用乐观同步（默认 false）。
- setRealtimeEnabled(): 预留，设置实时开关（默认空实现）。
- patchDescriptor(desc, patch): 用补丁里的 etag 更新描述符并触发变更。
- startSync(): 根据配置/权限创建并启动 DrawioFileSync。
- setCurrentRevisionId(id): 设置当前修订号到描述符。
- setCurrentEtag(etag): 设置当前 etag 到描述符。
- setDescriptor(): 占位，设置文件描述符。
- setDescriptorRevisionId(desc, id): 在给定描述符上更新修订号（内部借用 etag 字段存放）。
- setDescriptorEtag(desc, etag): 占位，更新描述符 etag。
- saveDraft(): 保存草稿到本地存储。
- removeDraft(): 移除本地草稿。
- setConflictStatus(message, fn): 设置冲突状态并在状态栏提示（可绑定动作）。
- showRefreshDialog(success, error, message): 显示需刷新对话框。
- showCopyDialog(success, error, overwrite): 显示复制为新文件的对话框。
- showConflictDialog(overwrite, synchronize): 冲突对话框（覆盖/同步选项）。
- redirectToNewApp(error, details): 引导用户切换到新应用处理。
- removeListeners(): 移除内部变更监听与事件。
- newComment(content, user): 生成新评论对象（占位实现）。
- fileChanged(sync = true): 标记本地修改、更新时间戳、触发 autosave，必要时通知同步模块。
- fileSaving(): 保存前置钩子，通知同步模块并更新影子。
- fileSaved(savedData, lastDesc, success, error, token): 保存完成回调；解析页面，乐观模式直更影子，否则委托给同步模块写入缓存并广播。
- createSecret(success): 生成写缓存所需的 secret/token 对（供同步模块使用）。
- autosave(delay, maxDelay, success, error): 自动保存调度（含强制时间上限与空闲判断）。
- autosaveCompleted(): 自动保存完成后的钩子（占位）。
- synchronizeFile(success, error): 协调本地与远端（保存/拉新）动作的统一入口。
- updateFile(success, error, abort, shadow): 拉取并更新本地文件/影子。
- mergeFile(file, success, error, diffShadow): 将远端文件合并进当前文件，可选基于影子 diff。
- open(): 打开文件到编辑器，初始化影子、监听与统计。
- destroy(): 清理自动保存与监听，释放同步对象。

## 关键函数详解

### patch(patches, resolver, undoable, sendChanges)
- 作用：将补丁序列应用到 `this.ui.pages`，并根据需要更新 UI、撤销栈与同步快照。
- 参数：
  - patches:Array — 页面级补丁列表。
  - resolver:Function|Object — 冲突解析器（传入给 `applyPatches`）。
  - undoable:Boolean — 是否保留撤销历史；false 时临时保存并在结束后恢复。
  - sendChanges:Boolean — 为 true 时不同步快照，用于随后计算本地差异并传播。
- 关键流程：
  - 隐藏 Graph、暂存撤销栈与 `changeListenerEnabled`；拦截 `cellRenderer.redraw` 保障编辑器光标与滚动。
  - `this.ui.applyPatches(...)` 应用补丁；确保至少一页；若当前页被删则切到第一页。
  - 结束后恢复 UI/撤销栈；必要时触发 `graph.refresh/validate`、`graph.view.revalidate`、`sizeDidChange`。
  - 若开启实时协作且未要求 sendChanges，则刷新 `this.sync.snapshot`。
  - 触发事件：`editor.fireEvent('pagesPatched', {patches})`。
- 返回：原 `patches`。
- 副作用：可能重排页面、切换当前页、影响撤销栈与同步快照。

### mergeFile(file, success, error, diffShadow)
- 作用：将远端最新文件页作为新 shadow，计算并应用补丁，同步到实时通道与当前文档。
- 关键流程：
  - 读取 `file.getShadowPages()` 为新 shadow；与旧 shadow 或 `diffShadow` 生成补丁。
  - `ignorePatches` 过滤无需处理的补丁；更新本地 shadow。
  - 若存在实时通道，先 `sync.sendLocalChanges()`；创建 `backupPatch` 以备校验失败回退（LWW 时启用）。
  - 进行校验：对“旧 shadow + patches[0]”求 hash，与“新 pages” hash 比较，不一致则 `checksumError(...)` 并中止。
  - 若一致：
    - 实时模式下 `sync.patchRealtime(patches, backup)`；如返回 `pending`，并入 `patches`。
    - 调用 `this.patch(patches, (LWW? backupPatch : null))` 应用到当前文档。
  - 成功时清理 `invalidChecksum/inConflictState/backupPatch`，更新描述符与 UI，并回调 `success()`。
- 错误：进入冲突态，`descriptorChanged()`，回调 `error(e)`，并视设置发送错误日志/报告。

### fileSaved(savedData, lastDesc, success, error, token)
- 作用：保存落盘或远端成功后的收尾动作，更新 shadow 与同步状态。
- 流程：
  - 解析 `savedData` 得到 `pages`，清除冲突与校验标记，统计计数。
  - 若未启用严格同步或处于乐观模式：
    - `setShadowPages(pages)`；若存在同步，刷新 `sync.lastModified` 与状态并在实时模式中 `scheduleCleanup()`；回调 `success()`。
  - 否则代理给 `sync.fileSaved(pages, lastDesc, success, error, token)`。
- 异常：置冲突与校验标记、`descriptorChanged()`。

### fileSaving()
- 作用：保存前的同步钩子；若存在同步，转调 `sync.fileSaving()`。

### autosave(delay, maxDelay, success, error)
- 作用：基于节流的自动保存调度器。
- 关键点：
  - 基于 `lastAutosave` 与 `maxDelay` 决定立即保存或延后；
  - 若 `isModified() && isAutosaveNow()`，决定是否生成修订 `revision` 并调用 `save(rev, ...)`；
  - 否则清理状态并回调 `success(null)`；异常时回调 `error(e)`。
- 相关：`clearAutosave()`、`isAutosaveRevision()`、`autosaveCompleted()`、`isAutosaveNow()`。

### fileChanged(sync=true)
- 作用：标记文件修改并根据自动保存策略调度 `autosave`。
- 关键点：更新 `lastChanged` 与 `modified`；若自动保存开启：
  - 设置“保存中”状态、`scheduleSanityCheck()`；
  - 管理 `ageStart`；
  - 调用 `autosave(...)`，成功时 `handleFileSuccess(true)` 并清空/刷新 `ageStart`，必要时继续 `scheduleSanityCheck()`。

### 其他工具函数
- getAnonymizedXmlForPages(pages): 生成匿名化的 mxfile XML（可包含 viewState）。
- compressReportData(data, limit=10000, max): 超长截断或压缩后返回，便于日志/上报。
- isOverdue(): 基于 `ageStart` 与 `ui.warnInterval` 判断是否超时未保存。
- clearAutosave(): 清除自动保存的定时器。
- isAutosaveRevision(): 基于 `lastAutosaveRevision` 与上限间隔判定是否记录修订。
- autosaveCompleted(): 钩子，无默认实现。
- isAutosaveNow(): 默认 true，可被子类改写。
- descriptorChanged(): 触发 `descriptorChanged` 事件。