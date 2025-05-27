---
title: opencv 编译
tags:
  - opencv
  - wasm
  - 前端
categories: 工作日志
date: 2024-05-05
---
# 为啥要编译opencv
因为 opencv 是频域水印需要的一个功能
但是本体这个包实在是太大了

所以打算编译一个最多 2m 的包出来


## 编译参考

```cardlink
url: https://docs.opencv.org/4.x/d4/da1/tutorial_js_setup.html
title: "OpenCV: Build OpenCV.js"
host: docs.opencv.org
```

### 环境搭建
首先还得是安装 emsdk
通过万能的 homebrew 进行安装

```bash
brew install emscripten
```



```cardlink
url: https://www.cnblogs.com/Wayou/p/webassembly_quick_start.html
title: "WebAssembly 上手 - 刘哇勇 - 博客园"
description: "安装 Mac 上最便捷的安装方式当然是通过 Homebrew: $ brew install emscripten 安装好之后讲道理就已经自动配置好一切，然后 emcc 命令便可用了。 下面看非 Homebrew 安装的方式。 通过官方 WebAssembly Developer’s Guide 提"
host: www.cnblogs.com
```



### 构建基础版的 opencv
跟着教程

首先得复制一份到本地

```bash
git clone git clone https://github.com/opencv/opencv.git
cd opencv
emcmake python ./opencv/platforms/js/build_js.py build_wasm --build_wasm
```

