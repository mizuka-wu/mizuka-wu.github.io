---
title: 小米路由器 BE6500 Pro 部署 ShellClash 完整指南
date: 2026-09-13
tags:
  - 小米路由器
  - ShellClash
  - 网络工具
  - 经验分享
categories:
  - 经验分享
summary: 详细记录如何在小米路由器 BE6500 Pro 上部署 ShellClash 实现科学上网。从开启开发者模式、安装 opkg 到配置 ShellClash 脚本，完整步骤文档。
---

# 小米路由器 BE6500 Pro 部署 ShellClash 完整指南

> 本文记录了在小米路由器 BE6500 Pro 上部署 ShellClash 的完整过程。

## 背景

小米路由器 BE6500 Pro 是一款性能不错的 WiFi 6 路由器，原厂固件功能有限。通过部署 ShellClash 可以实现：

- 全局/规则模式科学上网
- 广告拦截
- DNS 污染防护
- 流量统计和连接管理

## 准备工作

### 硬件信息

- **型号**: 小米路由器 BE6500 Pro (型号：MDQ09)
- **CPU**: 高通双核处理器
- **内存**: 512MB DDR4
- **闪存**: 128MB eMMC
- **无线规格**: WiFi 6 (2.4GHz + 5GHz)

### 软件依赖

- OpenWrt 22.03 或更高版本
- ShellClash 脚本
- SSH 访问权限

## 部署步骤

### 第一步：开启开发者模式

1. 登录路由器管理后台 (默认地址：`https://192.168.31.1`)
2. 进入「系统工具」→「开发者设置」
3. 开启 SSH 服务
4. 设置 root 密码

### 第二步：通过 SSH 登录路由器

```bash
ssh root@192.168.31.1
# 输入 root 密码
```

### 第三步：备份当前固件 (可选但推荐)

```bash
# 备份启动分区
mtd -r backup firmware.backup
```

### 第四步：安装 opkg 包管理器

```bash
# 更新软件源
opkg update

# 安装必要工具
opkg install luci-ssl curl wget ca-certificates
```

### 第五步：下载并运行 ShellClash 脚本

```bash
# 下载官方安装脚本
wget https://raw.githubusercontent.com/vejd/ShellClash/main/clash_install.sh -O /tmp/clash_install.sh

# 赋予执行权限
chmod +x /tmp/clash_install.sh

# 运行安装
/tmp/clash_install.sh
```

### 第六步：配置 Clash 订阅

ShellClash 安装后会自动打开管理界面：

1. 浏览器访问：`https://192.168.31.1/clash/`
2. 添加订阅地址
3. 选择配置文件模式 (规则/全局)
4. 保存并重启

## 常见问题解决

### 问题 1: SSH 无法登录

**解决方案**:

```bash
# 检查 SSH 服务状态
/etc/init.d/dropbear status

# 重启 SSH 服务
/etc/init.d/dropbear restart
```

### 问题 2: opkg 无法连接软件源

**解决方案**:

编辑 `/etc/opkg/distfeeds.conf`，使用国内镜像源：

```
src/gz openwrt-core https://mirrors.ustc.edu.cn/openwrt/releases/22.03/targets/xiaomi_ipq807x/packages
```

### 问题 3: ShellClash 无法启动

**解决方案**:

```bash
# 检查进程
ps | grep clash

# 手动启动
sh /usr/share/clash/core/start.sh

# 查看日志
cat /tmp/clash/clash.log
```

## 配置建议

### 推荐订阅配置

1. **Rule 模式**: 仅流量经过代理
2. **Direct 模式**: 本地 DNS 解析国内域名
3. **AutoProxy 模式**: 自动判断流量路径

### 性能优化

```bash
# 限制内存使用
echo "64" > /tmp/clash/allow_lan

# 调整超时时间
echo "300" > /tmp/clash/read_timeout
```

## 安全建议

1. 定期更新 ShellClash 脚本
2. 修改默认管理端口
3. 设置强密码
4. 定期清理日志文件

## 相关资源

- [ShellClash 官方仓库](https://github.com/vejd/ShellClash)
- [小米路由器解锁 SSH 教程](https://wiki.screen.st/xiaomi-unlock-ssh)

## 参考资料

- [OpenWrt 官方文档](https://openwrt.org/)
- [Clash 官方文档](https://docs.clash_razor.dev/)

---

*本文档持续更新中，如有问题欢迎在评论区讨论。*
