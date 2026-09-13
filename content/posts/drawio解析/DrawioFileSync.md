---
title: DrawioFileSync
date: 2026-09-13T10:00:00
tags:
  - 技术
categories:
  - 经验分享
summary: 暂无摘要
---

# DrawioFileSync 模块解析与同步流程

来源代码路径：`submodules/drawio/src/main/webapp/js/diagramly/DrawioFileSync.js`

## 概览
* __职责__：通道连接（Pusher/轮询）、消息编解码、补丁写入与广播、远端补丁拉取与合并、冲突重试、全量回退、状态与协作者 UI 更新。
* __协作关系__：与 `DrawioFile` 配合；保存时接受页面与影子，生成 diff 与 checksum 写入缓存；远端更新时驱动合并与描述符更新。

## 关键方法
* __`start()`__：按 `file.getChannelId()/getChannelKey()` 建立通道，注册连接/错误/消息监听。
* __`stop()/destroy()`__：解绑所有监听，断开连接与清理资源。
* __`createMessage(data)`__：封装版本与客户端 id。
* __`objectToString()/stringToObject()`__：压缩、可选 AES 加解密、序列化/反序列化。
* __`fileSaving()`__：乐观模式下仅广播通知（无补丁数据）。
* __`fileSaved(pages, lastDesc, success, error, token)`__：计算 `diff = ui.diffPages(shadow, pages)` 和 `checksum`，POST 到缓存（含 `from/to/msg/data/secret/token`），成功后更新影子。
* __`fileChanged(success, error, abort, lazy)`__：拉取最新 descriptor 并调用 `catchup()`。
* __`catchup(desc, ...)`__：若 `source==target` 仅 patch descriptor；否则尝试 `doCatchup()` 增量拉取补丁。
* __`doCatchup()`__：GET 缓存补丁列表，校验/聚合，命中则 `merge()`，否则重试或 `reload()`。
* __`merge(patches, checksum, desc, ...)`__：校验 shadow 与 `checksum`；优先 `patchRealtime()`，否则 `file.patch()`；更新 descriptor，清理冲突标志；异常则回退。
* __`reload()`__：全量刷新，委托 `file.updateFile()` 拉最新并重启同步。
* __`reloadDescriptor()/updateDescriptor()`__：仅刷新描述符并 `start()`。
* __`fileConflict()`__：节流与重试，超过阈值上报超时。

## 协议与安全
* __`PROTOCOL`__：消息协议版本；不匹配则回退。
* __`secret/token`__：写缓存鉴权，防止只读端伪造补丁。
* __加密__：`CryptoJS.AES` 可选启用；消息默认压缩。
* __校验__：`checksum` 基于 `ui.getHashValueForPages(pages)`；不一致直接全量刷新。
* __限制__：`maxCacheEntrySize` 控制补丁数据体大小。

## 同步流程（简化）
1) 本地保存：`fileSaving()` → 编辑器保存 → `fileSaved()` 生成并写入补丁 → 广播。
2) 远端更新：`fileChanged()` → `catchup()` → `doCatchup()` 拉补丁 → `merge()` 应用 → `patchDescriptor()`。
3) 异常：缓存未就绪/协议不匹配/校验失败 → 重试或 `reload()`。

## 与 DrawioFile 的边界
* 输入：`pages`、`shadow`、`descriptor`、`token/secret`。
* 输出：补丁广播、`patch/patchRealtime` 应用、`descriptor` 更新、冲突/错误回调。

## 与 Yjs 的衔接提示
* 渐进迁移可由 Yjs 负责复制与合并，`DrawioFileSync` 退化为兼容层（仅广播通知/回退）。
* 必要时提供 Patch ↔ Yjs 事务转换，逐步替换缓存通道为 Yjs provider。


## 函数清单与说明

- start(): 建立通道（Pusher/轮询），注册连接/错误/消息监听并进入同步。
- stop(): 断开通道，注销监听，停止后台线程。
- destroy(): 销毁同步实例并释放资源（含关闭通道）。
- isConnected(): 返回通道连接状态。
- installListeners(): 安装通道事件监听器。
- updateOnlineState(): 更新联机/离线图标及提示。
- createCollaboratorsElement(): 创建协作者按钮元素。
- updateCollaboratorsElement(): 根据活跃度/在线人数刷新协作者 UI。
- updateStatus(): 更新状态栏最近活动时间。
- resetUpdateStatusThread(): 重置状态更新定时器。
- updateRealtime(): 在有效状态下刷新实时 UI 状态。
- getIdParameters(): 生成缓存/服务端接口所需的 ID 参数串。
- createMessage(data): 打包协议版本与客户端 ID 的消息体。
- createToken(secret, success, error): 向后端换取写缓存 token（与 secret 配对）。
- objectToString(obj): JSON→压缩→（可选 AES）加密为字符串。
- stringToObject(data): 逆向解码解密→解压→JSON。
- isValidState(): 校验当前文件/同步实例有效，且未处于校验失败状态。
- fileChangedNotify(data): 处理来自他人的变更通知，必要时触发拉新。
- localFileChanged(): 本地文件变更时的标记与调度。
- isRealtimeActive(): 实时是否活跃（通常绑定自动保存开关）。
- sendLocalChanges(): 若文件已变更则计算并发送本地 diff。
- doSendLocalChanges(changes): 过滤空补丁并通过通道广播。
- receiveRemoteChanges(data): 入口，接收远端变更并解析。
- doReceiveRemoteChanges(changes): 在实时活跃时应用远端变更（可能合并/落盘）。
- extractLocal(patch): 从远端补丁推导本地变更部分。
- extractRemove(patch): 从补丁中提取删除操作（页面/单元）。
- patchRealtime(patches, backup, own): 优先采用实时路径应用变更并合并。
- merge(patches, checksum, desc, success, error, abort): 校验影子与 checksum 一致后应用补丁，更新描述符与状态。
- fileChanged(success, error, abort, lazy): 远端有变更时的拉新入口（可延迟）。
- catchup(desc, success, error, abort): 基于描述符进行增量追赶（必要时仅补丁描述符）。
- reloadDescriptor(): 仅刷新文件描述符并重启同步。
- updateDescriptor(desc): 覆盖当前描述符并触发文件层的 descriptorChanged。
- reload(success, error, abort, shadow): 无法追赶或冲突时全量重载并重启同步。
- cleanup(success, error, checkFile): 清理未保存的远端变更与状态，必要时检查文件一致性。
- scheduleCleanup(lazy): 调度一次清理任务（可延时）。
- optimisticSync(count): 乐观同步下的延迟重载/重试逻辑。
- descriptorChanged(source): 记录最后修改时间等元信息更新。
- resetRealtime(): 重置实时模型（恢复影子页）。
- initRealtime(): 初始化实时模型（复制当前 UI 页为对端页）。
- fileSaving(): 保存开始时的通告（乐观模式仅广播）。
- fileDataUpdated(): 文件数据更新时的清理调度与日志。
- fileSaved(pages, lastDesc, success, error, token): 计算 diff 与 checksum，写入缓存并广播，成功后更新影子。
- handleMessageData(data): 解析推送消息（desc/changes/notify/token 等），根据协议版本与来源调度 catchup/merge/状态更新。

## 关键函数详解

### handleMessageData(data)
- 作用：处理协作通道推送的消息。
- 分支行为：
  - a=='desc'：若未处于保存中，调用 `reloadDescriptor()` 拉新描述符。
  - a=='join'/'leave'：更新统计 `stats.joined`（join），设置 `lastMessage`，`resetUpdateStatusThread()` 并 `updateStatus()`。
  - a=='change'：转调 `receiveRemoteChanges(data)`。
  - m 存在（时间戳）：若 `lastMessageModified` 为空或更早，则更新并调用 `fileChangedNotify(data)`。

### isValidState()
- 作用：判断当前同步是否仍与前台文件/状态一致。
- 条件：`ui.getCurrentFile() == file && file.sync == this && !file.invalidChecksum && !file.redirectDialogShowing`。

### fileChangedNotify(data)
- 作用：响应“文件已变更”的通知（来自缓存或 Pusher）。
- 逻辑：
  - 若正在保存 `savingFile`，置 `remoteFileChanged=true` 延后处理。
  - 否则：
    - data.type=='optimistic'：调用 `optimisticSync()` 进行基于轮询的快速对齐。
    - 其他：调用 `fileChanged(success,error,abort,true)`（lazy 模式，使用 `cacheReadyDelay`），并通过 `notifyThread` 管理并发与取消。

### fileChanged(success, error, abort, lazy)
- 作用：在远端通知到来时检查/拉取补丁。
- 流程：
  - 延迟执行（lazy 为 true 则延迟 `cacheReadyDelay`）。
  - 校验 `isValidState()`，再调用 `file.loadPatchDescriptor(...)` 拉取最新描述符，随后进入 `catchup(desc, ...)`。

### catchup(desc, success, error, abort)
- 作用：基于描述符与本地 `revisionId` 的差异进行对齐。
- 流程：
  - from==to：仅 `patchDescriptor` 并 `success(true)`。
  - 非法状态则 error。
  - 否则获取 `secret`：
    - 无 secret 或 lockdown：`reload(success, error, abort)` 全量拉新。
    - 有 secret：尝试从缓存获取差异并应用（过程中处理 abort 与源修订变更早退）。

### merge(patches, checksum, desc, success, error, abort)
- 作用：将远端补丁合入本地，保证校验一致并更新 shadow 与当前文档。
- 流程要点：
  - `ignorePatches` 过滤；先 `sendLocalChanges()`。
  - 生成 `backupPatch`（非实时下为当前与 shadow 的 diff；实时下 `pending` 为 ownPages 相对 shadow 的 diff）。
  - 将 `patches` 应用于 shadow，计算 `current` 校验，与 `checksum` 对比。
  - 校验失败：带日志的 `reload(...)` 回退（含 `logError`）。
  - 成功：`setShadowPages(shadow)`；若 `patchRealtime(...)` 返回 null，则 `file.patch(patches, LWW?backup:null)`。
  - 清理并 `patchDescriptor(desc)`，回调 `success(true)`；异常时置冲突/校验标记并可能上报。

### patchRealtime(patches, backup, own)
- 作用：在实时模式下，先计算“本地待删除”的补丁并保证合并顺序正确，维护 `file.ownPages`。
- 关键点：
  - `all = extractRemove(diff(shadow, ui.pages))`；`local = extractRemove(extractLocal(all))`。
  - `applied = patches (+ own) (+ local)`；`file.ownPages = applyPatches(file.ownPages, applied, true, backup)`。
  - 若 `local` 非空，`file.fileChanged(false)` 触发后续保存；否则 `scheduleCleanup()`。
  - 返回 `all`（用于调用方判断是否需要额外 patch 当前文档）。

### sendLocalChanges()
- 作用：检测本地改动并发送。
- 逻辑：
  - 实时且 `localFileWasChanged` 为真时：
    - 以 `snapshot`/`ui.pages` 计算 patch；同步到 `file.ownPages`；刷新 `snapshot`。
    - 若 `isRealtimeActive()` 为真，调用 `doSendLocalChanges([patch])`。
  - 置 `localFileWasChanged=false`。

### doSendLocalChanges(changes)
- 作用：编码并发送本地差异。
- 逻辑：
  - 通过 `ignorePatches` 过滤；构建 `changeId` 与消息体。
  - 优先 P2P：`p2pCollab.sendDiff(msg)`。
  - dev 环境：发送到 `cacheUrl`（受 `maxSyncMessageSize` 限制，超大跳过）。
  - 其他环境：跳过发送（由服务器或其他渠道负责）。

### fileSaved(pages, lastDesc, success, error, token)
- 作用：保存成功后，向协作者广播变更或最小通知。
- 广播模式选择：
  - 无 secret 或无 token 或 lockdown：仅发送“修改时间”通知（m），`success()`。
  - 否则：
    - 计算 `diff = diffPages(shadow, pages)` 与 `checksum`；
    - 序列化消息 `data` 并 POST 到 `cacheUrl`，附 `from/to/msg/secret/last-secret/data/token`；
    - 设置超时保护（`ui.timeout`），超时触发 `error(timeout)`；成功则 `success()` 并更新日志与状态。

### optimisticSync(count)
- 作用：未即时收到“变更数据”时的轮询对齐手段。
- 流程：周期性 `getLatestVersion`，若修订未变则递增重试；变化则 `file.mergeFile(latestFile, ...)`。

### receiveRemoteChanges(data)
- 作用：处理 a=='change' 的远端补丁数据；按顺序缓存与合并，必要时合并后再触发 UI/保存流程（详见源码）。