---
title: Mac前端上手指南
tags:
  - 前端
  - 上手指南
  - MAC
  - 经验
date: 2019-02-11 11:41:57
categories: 可以公开的情报
---

# Mac 前端上手指南

> MAC 是一个强大的生产力工具，但是因为 g\*w 的原因以及网速的原因，还是需要一些优化和调整的

[![](https://badge.juejin.im/entry/5c60eb815188256283253592/likes.svg?style=flat-square)](https://juejin.im/post/5c60eb5f51882524c84efba3)

# [Homebrew](https://brew.sh/)

> 一个强大的安装包管理工具.
>
> macOS 缺失的软件包的管理器

## 安装

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

将以上命令粘贴至终端。

脚本会在执行前暂停，并说明将它将做什么。高级安装选项在 这里 (required for Linux and Windows 10 Subsystem for Linux)。

## 替换源

> 参考[清华](https://mirror.tuna.tsinghua.edu.cn/help/homebrew/)的加速器

### 替换现有上游

```bash
cd "$(brew --repo)"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git

brew update

```

### 使用 homebrew-science 或者 homebrew-python

```bash
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-science"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-science.git

cd "$(brew --repo)/Library/Taps/homebrew/homebrew-python"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-python.git

brew update
```

# 优化命令行-改用 zsh

> 使用 mac 的一个原因就是因为强大的命令行，原生终端已经很好了，但是还是可以进一步进行优化的

## 安装 iterm2

> 比终端好用的多的终端

[官网下载](https://www.iterm2.com/)然后进行安装即可

## zsh

> zsh 兼容 bash 但是显示的细节更丰富

![](https://upload-images.jianshu.io/upload_images/1864602-ba00e01e48afab32.png)

### Zsh 具有以下主要功能：

- 开箱即用、可编程的命令行补全功能可以帮助用户输入各种参数以及选项。
- 在用户启动的所有 shell 中共享命令历史。
- 通过扩展的文件通配符，可以不利用外部命令达到 find 命令一般展开文件名。
- 改进的变量与数组处理。
- 在缓冲区中编辑多行命令。
- 多种兼容模式，例如使用/bin/sh 运行时可以伪装成 Bourne shell。
  可以定制呈现形式的提示符；包括在屏幕右端显示信息，并在键入长命令时自动隐藏。
- 可加载的模块，提供其他各种支持：完整的 TCP 与 Unix 域套接字控制，
- FTP 客户端与扩充过的数学函数。
- 完全可定制化。

### 安装

自带的，iterm2 安装完之后文件夹都帮你建立好了

### 启动

```bash
chsh -s /bin/zsh
```

### 美化

#### 安装 oh my zsh

```
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
```

#### [更换主题和插件](https://www.jianshu.com/p/d194d29e488c?open_source=weibo_search)

```
修改主题：

$ vim ~/.zshrc
将ZSH_THEME改成ys

ZSH_THEME="ys"
更新配置：

$ source ~/.zshrc
```

# node

> 改用淘宝镜像 这样还能防止一些包要从国外下载源码再编译造成的问题

## 安装原生的 node

```
brew install node
```

## 升级为国内的[taobao 版](https://npm.taobao.org/)

```
npm install -g cnpm --registry=https://registry.npm.taobao.org

```

## node 版本管理

> 讲道理，n 超级好用

```
cnpm i -g n
```

# VSCODE

> 最强编辑器-之一

安装插件可以参考以前的文章[vscode 插件分享](https://www.mizuka.top/2018/11/09/vscode%E6%8F%92%E4%BB%B6%E5%88%86%E4%BA%AB/)
