---
title: 小米路由器 BE6500 Pro 部署 ShellClash 完整指南
date: 2026-09-13
tags:
  - 小米路由器
  - ShellClash
  - 刷机
  - 网络工具
categories:
  - 经验分享
summary: 在小米路由器 BE6500 Pro 上部署 ShellClash 的完整过程，包括固件降级和 ShellClash 安装。
---

# 小米路由器 BE6500 Pro 部署 ShellClash 完整指南

> 本文记录在小米路由器 BE6500 Pro 上部署 ShellClash 的完整流程，重点记录实际操作中遇到的问题和注意事项。

## 硬件信息

- **型号**: Xiaomi BE6500 Pro (MDQ09)
- **无线规格**: WiFi 6 BE
- **目标方案**: ShellClash (Clash 脚本)

## 部署流程概览

1. **固件降级** → 从当前版本降级到可用 SSH 的版本
2. **开启 SSH** → 通过 API 注入启动脚本
3. **安装 ShellClash** → 通过脚本一键安装

## 详细步骤

### 1. 固件降级（关键步骤）

#### 1.1 确认当前固件版本

在路由器管理后台查看当前版本，比如 `1.0.46`。

#### 1.2 下载官方固件

- 使用 **Windows 电脑**进行刷机操作
- 下载小米路由器固件（需要官方固件链接）
- 固件格式：`.bin`

#### 1.3 使用小米刷机工具

```bash
# Windows 上运行小米路由器修复工具
MIWIFIRepairTool.exe
```

**注意事项:**

1. **白灯闪烁**：刷机后会看到白灯闪烁，这和小米官方刷机工具的提示不一样
2. **耐心等待**：白灯闪烁是正常状态，等待进入系统
3. **不要中断**：整个过程不要断电或断开连接

#### 1.4 降级后的确认

刷机成功后，路由器会重启，此时应该能看到白灯闪烁，说明正在进入系统。

### 2. 开启 SSH

#### 2.1 获取 STK 令牌

登录路由器管理后台后，获取 `stok` 令牌（每次登录都会改变）。

#### 2.2 通过 API 注入 SSH 启动脚本

使用 curl 命令注入（需要替换 IP 地址）：

```bash
# 替换 192.168.31.1 为你的实际 IP
# 替换 <STOK> 为你的令牌

curl -X POST http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/api/xqsystem/start_binding \
  -d "uid=1234&key=1234'%0Anvram%20set%20ssh_en%3D1'"

curl -X POST http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/api/xqsystem/start_binding \
  -d "uid=1234&key=1234'%0Anvram%20commit'"

curl -X POST http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/api/xqsystem/start_binding \
  -d "uid=1234&key=1234'%0Ased%20-i%20's%2Fchannel%3D.*%2Fchannel%3D%22debug%22%2Fg'%20%2Fetc%2Finit.d%2Fdropbear'"

curl -X POST http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/api/xqsystem/start_binding \
  -d "uid=1234&key=1234'%0A%2Fetc%2Finit.d%2Fdropbear%20start'"
```

#### 2.3 登录 SSH

```bash
ssh root@192.168.31.1
# 输入 root 密码（可以通过密码计算网站获取）
```

**修改 root 密码：**
```bash
echo -e 'admin\nadmin' | passwd root
```

### 3. 安装 ShellClash

#### 3.1 下载安装脚本

```bash
export url='https://fastly.jsdelivr.net/gh/juewuy/ShellClash@master'
sh -c "$(curl -kfsSl $url/install.sh)" && source /etc/profile &> /dev/null
```

**备用安装源：**
```bash
export url='https://gh.jwsc.eu.org/master'
sh -c "$(curl -kfsSl $url/install.sh)" && source /etc/profile &> /dev/null
```

#### 3.2 访问管理面板

浏览器访问：`http://192.168.31.1:9999/ui/`

#### 3.3 配置 Clash 订阅

1. 添加订阅链接
2. 选择工作模式（规则模式/全局模式）
3. 保存并启动

## 问题点记录

### 问题 1: 刷机需要 Windows 电脑

**原因**: 小米官方刷机工具只支持 Windows。

**解决方案**: 
- 使用 Windows 电脑进行刷机操作
- 如果使用 Mac，可能需要通过 Windows 虚拟机或使用 PE 启动盘

### 问题 2: 白灯闪烁与官方提示不同

**现象**: 刷机后白灯闪烁，和小米刷机工具的预期不同。

**说明**: 白灯闪烁是正常的刷机状态，说明正在刷入固件。等待约 3-5 分钟，路由器会自动重启。

### 问题 3: [待补充]

[你可以在这里补充遇到的问题]

## 相关资源

- [ShellClash 官方仓库](https://github.com/juewuy/ShellClash)
- [小米路由器解锁教程](https://github.com/KuMaMon2019s/xiaomi-be6500)
- [Stok 令牌获取方法](https://www.zhihu.com/question/xxxx)

## 更新日志

- 2026-09-13: 初始版本，记录核心流程

---

*本文档持续更新中，如有问题欢迎在评论区讨论。*
