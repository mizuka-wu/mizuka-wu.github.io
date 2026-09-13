---
title: 小米路由器 BE6500 Pro 部署 ShellClash 完整指南
date: 2026-09-13
tags:
  - 小米路由器
  - ShellClash
  - SSH
  - 固件
  - BE6500 Pro
categories:
  - 经验分享
summary: 基于 Wetoria 和 longzheng268 项目的完整教程，详细记录小米路由器 BE6500 Pro 从固件降级到 ShellClash 部署的全过程。
---

# 小米路由器 BE6500 Pro 部署 ShellClash 完整指南

> 本文基于 [Wetoria/xiaomi-be6500pro](https://github.com/Wetoria/xiaomi-be6500pro) 和 [longzheng268/Xiaomi-Router-patcher](https://github.com/longzheng268/Xiaomi-Router-patcher) 两个项目的完整教程，详细记录小米路由器 BE6500 Pro 从固件降级到 ShellClash 部署的全过程。

## 视频教程

- [解锁 SSH 视频教程](https://youtu.be/OqTVuJC-TIo)
- [安装 ShellCrash 视频教程](https://youtu.be/ES12KA1FN9A)

## 参考项目

1. [**Wetoria/xiaomi-be6500pro**](https://github.com/Wetoria/xiaomi-be6500pro) - 主教程
2. [**longzheng268/Xiaomi-Router-patcher**](https://github.com/longzheng268/Xiaomi-Router-patcher) - SSH 固化工具
3. [**juewuy/ShellClash**](https://github.com/juewuy/ShellClash) - Clash 脚本

## 硬件信息

- **型号**: Xiaomi BE6500 Pro (MDQ09)
- **无线规格**: WiFi 6 BE
- **目标固件版本**: 1.0.46

## 部署流程概览

1. **固件降级** → 从当前版本降级到 1.0.46
2. **解锁 SSH** → 通过 API 注入启动脚本
3. **固化 SSH** → 使用 Xiaomi-Router-patcher 项目
4. **安装 ShellClash** → 通过脚本一键安装

## 详细步骤

### 第一步：下载固件和 SSH 工具

#### 1.1 固件信息

- **目标固件版本**: 1.0.46
- **固件下载**: [BE6500 Pro 固件 1.0.46](https://github.com/eujc/lyq/releases/download/ROM/miwifi_rd08_firmware_076b5_1.0.46.bin)
- **固件格式**: `.bin`

#### 1.2 SSH 工具下载

- **Windows 用户**: [PuTTY 下载](https://github.com/eujc/lyq/releases/download/ROM/putty.zip)
- **macOS 用户**: [Termius 下载](https://termius.com/download)

#### 1.3 固件降级

如果当前固件版本不是 1.0.46，需要使用 **小米路由器修复工具** 进行降级：

- **修复工具**: [小米路由器修复工具](https://bigota.miwifi.com/xiaoqiang/tools/MIWIFIRepairTool.x86.zip)
- **降级教程**: [视频教程](https://youtu.be/noBqKNq2MTk)

**刷机步骤**:

1. 使用 Windows 电脑运行 MIWIFIRepairTool.exe
2. 选择固件文件 (1.0.46 版本)
3. 连接路由器电源，按住 Reset 键不放
4. 等待刷机完成，路由器会重启

**注意事项**:

1. **白灯闪烁**: 刷机后会看到白灯闪烁，这是正常状态
2. **耐心等待**: 等待约 3-5 分钟，路由器会自动重启进入系统
3. **不要中断**: 整个刷机过程中不要断电或断开连接

### 第二步：解锁 SSH

#### 2.1 获取 STK 令牌

1. 在浏览器中打开路由器管理页面：`https://192.168.31.1`
2. 打开开发者工具 (F12) → Network 标签
3. 找到 `/api/misystem/arn_switch` 请求
4. 在请求头中复制 `stok` 的值

#### 2.2 通过 API 注入 SSH 脚本

**命令** (将 `<STOK>` 替换为你的令牌):

```bash
# 替换 192.168.31.1 为你的实际路由器 IP

# 1. 设置 SSH 启用标志
curl -X POST http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/api/misystem/arn_switch \
  -d "open=1&model=1&level=%0Anvram%20set%20ssh_en%3D1%0A"

# 2. 提交设置
curl -X POST http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/api/misystem/arn_switch \
  -d "open=1&model=1&level=%0Anvram%20commit%0A"

# 3. 修改 dropbear 配置为 debug 模式
curl -X POST http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/api/misystem/arn_switch \
  -d "open=1&model=1&level=%0Ased%20-i%20's%2Fchannel%3D.*%2Fchannel%3D%22debug%22%2Fg'%20%2Fetc%2Finit.d%2Fdropbear%0A"

# 4. 启动 SSH 服务
curl -X POST http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/api/misystem/arn_switch \
  -d "open=1&model=1&level=%0A%2Fetc%2Finit.d%2Fdropbear%20start%0A"
```

#### 2.3 登录路由器

```bash
# SSH 登录（第一次登录用户名密码都是 root/root）
ssh -oHostKeyAlgorithms=+ssh-rsa -oPubkeyAcceptedAlgorithms=+ssh-rsa root@192.168.31.1

# 修改 root 密码为 admin
echo -e 'admin\nadmin' | passwd root
```

**注意事项**:

- **第一次 SSH 登录用户名和密码都是 `root`**
- 之后可以 `passwd` 修改 root 密码
- SSH 连接需要特殊参数解决 RSA 加密算法限制

### 第三步：固化 SSH

#### 3.1 安装 auto_ssh 脚本

```bash
# 创建目录并下载脚本
mkdir /data/auto_ssh && cd /data/auto_ssh
curl -O https://fastly.jsdelivr.net/gh/lemoeo/AX6S@main/auto_ssh.sh
chmod +x auto_ssh.sh

# 安装自动启动脚本
./auto_ssh.sh install

# 配置 firewall 自动启动
uci set firewall.auto_ssh=include
uci set firewall.auto_ssh.type='script'
uci set firewall.auto_ssh.path='/data/auto_ssh/auto_ssh.sh'
uci set firewall.auto_ssh.enabled='1'
uci commit firewall
```

#### 3.2 手动固化 SSH (使用 Xiaomi-Router-patcher 方法)

**执行顺序**: 每次执行命令后需要重启路由器

```bash
# 第 1 次重启 - 执行以下命令
zz=$(dd if=/dev/zero bs=1 count=2 2>/dev/null) ; printf '\xA5\x5A%c%c' $zz $zz | mtd write - crash
reboot

# 第 2 次重启 - 执行以下命令
nvram set ssh_en=1
nvram set telnet_en=1
nvram set uart_en=1
nvram set boot_wait=on
nvram commit

bdata set ssh_en=1
bdata set telnet_en=1
bdata set uart_en=1
bdata set boot_wait=on
bdata commit

reboot

# 第 3 次重启 - 执行以下命令
mtd erase crash
reboot
```

**固化完成验证**:

重启 3 次后，SSH 功能已完全固化，即使固件升级也能保持 SSH 可用。

### 第四步：升级固件

完成固化 SSH 后就可以升级固件了。固件升级完之后，如果 SSH 无法登录，请使用 SSH 工具进行 Telnet 登录：

```bash
# 通过 Telnet 登录
telnet 192.168.31.1
# 用户名：root，密码：admin

# 如果路由器进行了恢复出厂设置，密码为通过密码计算网站计算的密码

# 开启 SSH
sed -i '/flg_ssh=`nvram get ssh_en`/{:loop; N; /\n.*channel=`\/sbin\/uci get \/usr\/share\/xiaoqiang\/xiaoqiang_version.version.CHANNEL`\n.*return 0\n.*fi/!b loop; d}' /etc/init.d/dropbear
/etc/init.d/dropbear restart

# 修改 root 密码为 admin
echo -e 'admin\nadmin' | passwd root

# 重启后自动开启 SSH
mkdir /data/auto_ssh && cd /data/auto_ssh
curl -O https://fastly.jsdelivr.net/gh/lemoeo/AX6S@main/auto_ssh.sh
chmod +x auto_ssh.sh

uci set firewall.auto_ssh=include
uci set firewall.auto_ssh.type='script'
uci set firewall.auto_ssh.path='/data/auto_ssh/auto_ssh.sh'
uci set firewall.auto_ssh.enabled='1'
uci commit firewall
```

### 第五步：安装 ShellClash

#### 5.1 使用官方安装源

```bash
export url='https://fastly.jsdelivr.net/gh/juewuy/ShellCrash@master' && sh -c "$(curl -kfsSl $url/install.sh)" && source /etc/profile &> /dev/null
```

#### 5.2 使用备用安装源

```bash
export url='https://gh.jwsc.eu.org/master' && sh -c "$(curl -kfsSl $url/install.sh)" && source /etc/profile &> /dev/null
```

#### 5.3 访问管理面板

浏览器访问：`http://192.168.31.1:9999/ui/`

(如果打不开请按 Ctrl+F5 刷新)

#### 5.4 配置 Clash 订阅

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

**或者**配置 `~/.ssh/config` 文件:

```
Host xiaomi-be6500pro
  HostName 192.168.31.1
  User root
  HostKeyAlgorithms +ssh-rsa
  PubkeyAcceptedAlgorithms +ssh-rsa
```

### 问题 4: [待补充]

[你可以在这里补充其他遇到的问题]

## 相关资源

### 主要参考

- [Xiaomi-BE6500Pro - Wetoria](https://github.com/Wetoria/xiaomi-be6500pro) - 主教程（SSH 解锁 + ShellClash 安装）
- [Xiaomi-Router-patcher - longzheng268](https://github.com/longzheng268/Xiaomi-Router-patcher) - SSH 固化工具

### 工具与脚本

- [ShellClash 官方仓库](https://github.com/juewuy/ShellClash)
- [密码计算网站](https://miwifi.dev/ssh)
- [固件降级教程](https://youtu.be/noBqKNq2MTk)

### 社区资源

- [小米路由器论坛](https://www.right.com.cn/forum/forum-638-1.html)

## 更新日志

- 2026-09-13: 基于 Wetoria 和 longzheng268 项目更新完整步骤

---

*本文档持续更新中，如有问题欢迎在评论区讨论。*
