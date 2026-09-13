---
title: 小米路由器 BE6500 Pro 部署 ShellClash 完整指南
date: 2026-09-13
tags:
  - 小米路由器
  - ShellClash
  - SSH
  - 网络工具
categories:
  - 经验分享
summary: 在小米路由器 BE6500 Pro 上部署 ShellClash 的完整过程，记录具体参考项目和遇到的技术细节。
---

# 小米路由器 BE6500 Pro 部署 ShellClash 完整指南

> 本文记录在小米路由器 BE6500 Pro 上部署 ShellClash 的完整流程，包含具体参考项目和遇到的技术细节。

## 硬件信息

- **型号**: Xiaomi BE6500 Pro (MDQ09)
- **无线规格**: WiFi 6 BE
- **目标方案**: ShellClash (Clash 脚本)

## 参考资源

- [主教程 - Xiaomi-BE6500Pro](https://github.com/Wetoria/xiaomi-be6500pro)
- [SSH 补丁项目 - Xiaomi-Router-patcher](https://github.com/longzheng268/Xiaomi-Router-patcher)
- [ShellClash 官方仓库](https://github.com/juewuy/ShellClash)

## 部署流程概览

1. **固件降级** → 从当前版本降级到可用 SSH 的版本
2. **SSH 开启与固化** → 使用 longzheng268/Xiaomi-Router-patcher 项目
3. **安装 ShellClash** → 通过脚本一键安装

## 详细步骤

### 1. 固件降级（关键步骤）

#### 1.1 确认当前固件版本

在路由器管理后台查看当前版本。

#### 1.2 下载官方固件

- 使用 **Windows 电脑**进行刷机操作
- 小米官方固件格式：`.bin`
- 固件链接需要从主教程获取

#### 1.3 使用小米刷机工具

```bash
# Windows 上运行小米路由器修复工具
MIWIFIRepairTool.exe
```

**注意事项:**

1. 白灯闪烁：刷机后会看到白灯闪烁，这是正常状态
2. 等待约 3-5 分钟，路由器会自动重启

### 2. 开启 SSH（参考 Wetoria 项目）

#### 2.1 通过 API 注入 SSH 脚本

参考 https://github.com/Wetoria/xiaomi-be6500pro 中的步骤：

```bash
# 获取 STK 令牌（从浏览器抓包）
# 替换 192.168.31.1 为你的实际 IP
# 替换 <STOK> 为你的令牌

curl -X POST http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/api/misystem/arn_switch \
  -d "open=1&model=1&level=%0Anvram%20set%20ssh_en%3D1%0A"

curl -X POST http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/api/misystem/arn_switch \
  -d "open=1&model=1&level=%0Anvram%20commit%0A"

curl -X POST http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/api/misystem/arn_switch \
  -d "open=1&model=1&level=%0Ased%20-i%20's%2Fchannel%3D.*%2Fchannel%3D%22debug%22%2Fg'%20%2Fetc%2Finit.d%2Fdropbear%0A"

curl -X POST http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/api/misystem/arn_switch \
  -d "open=1&model=1&level=%0A%2Fetc%2Finit.d%2Fdropbear%20start%0A"
```

#### 2.2 固化 SSH（使用 Xiaomi-Router-patcher）

参考 https://github.com/longzheng268/Xiaomi-Router-patcher

```bash
# SSH 登录（第一次）
ssh root@192.168.31.1
# 第一次登录时用户名密码都是 root/root

# 固化 SSH 脚本
cd /data
sh -c "$(curl -Ls https://raw.githubusercontent.com/longzheng268/Xiaomi-Router-patcher/main/auto_ssh.sh)"

# 根据提示操作，固化 SSH 功能
```

**注意事项:**

- 第一次 SSH 登录用户名和密码都是 `root`
- 之后可以 `passwd` 修改 root 密码

### 3. SSH 连接时的加密算法问题

#### 3.1 RSA 加密算法限制

小米路由器固件的 SSH 服务使用旧的 RSA 加密算法，需要特殊参数连接：

```bash
# 正确连接方式
ssh -oHostKeyAlgorithms=+ssh-rsa -oPubkeyAcceptedAlgorithms=+ssh-rsa root@192.168.31.1

# 解释参数：
# -oHostKeyAlgorithms=+ssh-rsa  允许使用 ssh-rsa 主机密钥算法
# -oPubkeyAcceptedAlgorithms=+ssh-rsa  允许使用 ssh-rsa 公钥算法
```

**为什么需要这些参数？**

现代 OpenSSH 默认禁用了 `ssh-rsa` 算法（CVE-2023-38703 等安全漏洞），但小米固件仍使用此算法。

**可选方案:**

1. **使用特殊参数**（推荐）
2. **修改 SSH 配置**（编辑 `~/.ssh/config`）:

```
Host xiaomi-be6500pro
  HostName 192.168.31.1
  User root
  HostKeyAlgorithms +ssh-rsa
  PubkeyAcceptedAlgorithms +ssh-rsa
```

然后直接 `ssh xiaomi-be6500pro` 连接。

### 4. 安装 ShellClash

#### 4.1 下载安装脚本

```bash
# 使用官方安装源
export url='https://fastly.jsdelivr.net/gh/juewuy/ShellClash@master'
sh -c "$(curl -kfsSl $url/install.sh)" && source /etc/profile &> /dev/null

# 备用安装源
export url='https://gh.jwsc.eu.org/master'
sh -c "$(curl -kfsSl $url/install.sh)" && source /etc/profile &> /dev/null
```

#### 4.2 访问管理面板

浏览器访问：`http://192.168.31.1:9999/ui/`

#### 4.3 配置 Clash 订阅

1. 添加订阅链接
2. 选择工作模式（规则模式/全局模式）
3. 保存并启动

## 遇到的问题

### 问题 1: 刷机需要 Windows 电脑

**原因**: 小米官方刷机工具只支持 Windows。

**解决方案**: 使用 Windows 电脑或 Windows 虚拟机。

### 问题 2: 白灯闪烁与官方提示不同

**现象**: 刷机后白灯闪烁，和小米刷机工具的预期不同。

**说明**: 白灯闪烁是正常的刷机状态，等待约 3-5 分钟，路由器会自动重启。

### 问题 3: SSH 连接时的加密算法限制

**现象**: 现代 SSH 客户端拒绝连接，提示 "no matching host key type found"

**解决**:

```bash
# 添加特殊参数
ssh -oHostKeyAlgorithms=+ssh-rsa -oPubkeyAcceptedAlgorithms=+ssh-rsa root@192.168.31.1
```

**或者**配置 `~/.ssh/config` 文件。

### 问题 4: [待补充]

[你可以在这里补充其他遇到的问题]

## 相关资源

### 主要参考

- [Xiaomi-BE6500Pro - Wetoria](https://github.com/Wetoria/xiaomi-be6500pro) - 主教程（SSH 解锁 + ShellClash 安装）
- [Xiaomi-Router-patcher - longzheng268](https://github.com/longzheng268/Xiaomi-Router-patcher) - SSH 补丁项目

### 工具与脚本

- [ShellClash 官方仓库](https://github.com/juewuy/ShellClash)
- [Stok 令牌获取方法](https://zhuanlan.zhihu.com/p/xxxx)

### 社区资源

- [小米路由器论坛](https://www.right.com.cn/forum/forum-638-1.html)
- [酷安小米路由器版区](https://www.coolapk.com/u/xxxx)

## 更新日志

- 2026-09-13: 初始版本，记录核心流程

---

*本文档持续更新中，如有问题欢迎在评论区讨论。*
