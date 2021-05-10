---
title: electron包含二进制文件的一些实践
tags: 
    - m1
    - electron
    - binary
    - 打包
date: 2021-03-27 12:58:16
categories: 可以公开的情报
---

起因是我最近做的项目需要打包 `ffmpeg` 到 `electron` 中，奈何因为想要支持 `m1`芯片，引入`ffmpeg`的方案需要调整

## 问题点

1. `ffmpeg`引入的集中方案不支持基于`arm`的`mac`导致连安装抖麻烦
2. 引入的路径调用问题
3. 优化包大小

### ffmpeg引入方案

因为`ffmpeg-static`作者也说了，不打算支持`m1`的，所以也没有可能通过直接`ffmpeg-static`或者类似几个库直接安装了，不过也有一定好处，就是，如果通过事先安装到本地`node_modules`的话，如果在一个平台打包其他平台的构建包，会造成打包缺失文件，所以有以下几个方案

1. 让用户自己装`ffmpeg` - 不现实，得考虑用户水平
2. 自己提供二进制文件

我采用的就是将二进制文件打进`electron`的方法，虽然无法升级`ffmpeg`的版本不过能保证多平台构建了，所以首先，得找到可以打进去的二进制文件

通过`google`, `arm-mac`以外的文件我们可以在[https://ffbinaries.com/downloads](https://ffbinaries.com/downloads) 直接下载得到 `arm`的可以本地自行编译或者从[https://www.osxexperts.net/](https://www.osxexperts.net/)下载得到

那`electron`怎么获取**正确的**`ffmpeg`二进制呢？

我们参考一下其他`ffmpeg`库，在项目根目录，新建`ffmpeg`文件夹，然后按照`platform-arch`的命名规则，建立每个系统对应的文件夹将`ffmpeg`存在其中，引用的时候，可以通过

```javascript
import os from 'os'
import path from 'path'
import fs from 'fs'

const platofrm = os.platform()
const arch = os.arch()
const basePath = path.join(__static, '..', 'ffmpeg')

const ffmpegPath = path.join(basePath, `${platofrm}-${arch}`, `ffmpeg${platofrm === 'win32' ? '.exe' : ''}`)

export default ffmpegPath

```

这样，来获取正确地址，这里因为我用了`vue-cli-plugin-electron-builder`有提供`__static`, 其他可用`app.getPath('exe')`来替代

打包的时候也需要将二进制文件打包进去，在`electron-builder`中添加

```json
{
        "extraResources": ["./ffmpeg/${platform}-${arch}"]
}
```

即可，这样打包的时候会把二进制文件也打进去

记得之前建立文件夹的规则嘛？`/${platform}-${arch}`就是为了打包的时候只打对应平台的文件，减小包的体积

`platform` 和 `arch` 请自行查阅[http://nodejs.cn/api/os.html#os_os_platform](http://nodejs.cn/api/os.html#os_os_platform)

## 总结

方法总是人想出来的，只不过可以用`"./ffmpeg/${platform}-${arch}"`的办法来减小体积确实找了很久，文档上也没有提可以使用模版字符串，有点坑

这个方法问题就在于二进制文件要手动维护，仓库大小吃紧了
