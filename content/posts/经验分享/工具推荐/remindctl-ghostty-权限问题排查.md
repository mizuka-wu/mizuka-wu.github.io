---
title: remindctl-ghostty-权限问题排查
date: 2026-09-13T10:00:00
tags:
  - 技术
categories:
  - 经验分享
summary: 暂无摘要
---

# 在 WorkBuddy / Claw 等环境中使用 remindctl

## 问题

在 WorkBuddy（Claw）中调用 `remindctl` 时，会提示权限不足：

```
Reminders access denied.
```

即使已经在终端里执行过 `remindctl authorize` 也没用——因为 macOS 的隐私权限是**以进程主体**为单位的，Ghostty/Terminal 里授权的是那个 App，WorkBuddy fork 出来的子进程不在授权范围内。

## 解决方法

在终端执行一次下面的脚本，用 `osascript` 强制触发一次 Reminders 访问授权：

```bash
osascript -e 'tell application "Reminders" to get name of every list'
```

系统会弹出权限请求，点击**好**之后，当前整个进程组（包括 WorkBuddy）都会获得 Reminders 访问权限。

之后再用 `remindctl` 就完全正常了：

```bash
remindctl status
# Reminders access: Full access
```

## 注意

- 重启 WorkBuddy 或重启电脑后可能需要重新执行一次
- 如果弹窗没有出现，去**系统设置 → 隐私与安全性 → 提醒事项**，手动添加对应 App 的权限