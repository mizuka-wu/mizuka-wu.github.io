---
title: 教你如何构建Mojave动态壁纸
date: 2018-10-16 13:46:10
tags: 
    - OSX
    - mojave
    - 动态壁纸
    - 教程
categories: 可以公开的情报
header_image: https://www.apple.com/macos/mojave/overview/hero/image_medium_2x.jpg
---
# Mojave动态壁纸
> OSX Mojave发布带来了黑暗模式，众多改进，其中一个功能就在能够根据你当地所处的时间，动态切换系统背景

## 动态壁纸
大家都知道，apple得益于自身的封闭特性，拥有众多自身所特有的特殊格式，这次的动态背景其实就是依托于背后的**Heic**格式

### Heic格式
如果你使用过apple的live photo 就会发现其导出的格式就是heic, 这其实就是一个类似一个短视频的格式，利用它， 我们将多张照片以及他们的时区等信息直接整合，输出成一张heic图片，就能提供给Mojave使用了

## 开始构建吧
### 工具篇
关于工具，已经有人在github上开源了相关的构建脚本，不过请注意，只有Mac可以使用哦   [工具地址](https://github.com/mczachurski/wallpapper)
![](https://github.com/mczachurski/wallpapper/raw/master/Images/wallpaper.png)

### 开始
#### 安装工具
工具有两种安装模式 **Homebrew** 以及 github安装，当然 如果你新装了系统，有些Xcode功能需要重新安装, 请先安装xcode-select并且输入```sudo xcode-select -s /Applications/Xcode.app/Contents/Developer ```
##### Homebrew
打开你的命令行输入
```bash
brew tap mczachurski/wallpapper
brew install wallpapper
```

##### github安装
打开你的命令行，输入
```bash
git clone https://github.com/mczachurski/wallpapper.git
cd wallpapper
swift build --configuration release
sudo cp .build/x86_64-apple-macosx10.10/release/wallpapper /usr/local/bin
```
注意 如果你用的swift4.1请编辑Package.swift

#### 测试工具是否可用
和大多数软件一样```wallpapper -h```
然后你会看到
```
wallpapper: [command_option] -i inputFile
Command options are:
 -h			show this message and exit
 -o			output file name (default is 'output.heic')
 -i			input file name, json file with wallpaper description
```

#### 构建
前面所题，我们需要配置一些照片，并且配置每张照片的信息，所以新建一个json文件，内容类似
```json
[
  {
    "fileName": "1.png",
    "isPrimary": true,
    "isForLight": true,
    "isForDark": false,
    "altitude": 27.95,
    "azimuth": 279.66
  },
  {
    "fileName": "2.png",
    "isPrimary": false,
    "isForLight": false,
    "isForDark": false,
    "altitude": -31.05,
    "azimuth": 4.16
  },
  {
    "fileName": "16.png",
    "isPrimary": false,
    "isForLight": false,
    "isForDark": true,
    "altitude": -28.63,
    "azimuth": 340.41
  }
]
```
##### 属性解释
* fileName - 文件名，对应的图片名字
* isPrimary - 是否是主图，heic的预览图就是他了，只能有一个
* isForLight - 如果设置为trure，将显示在该壁纸的静态模式（白天）中
* isForDark - 同上，不过是黑暗模式
* altitude - 太阳和时间相关
* azimuth - 太阳和时间相关
altitude和azimuth可以在[https://keisan.casio.com/exec/system/1224682277](https://keisan.casio.com/exec/system/1224682277)之中获取，填入对应时间对应的值即可

#### 生成
```wallpapper -i <your_json_name>.json``` 之后你就能获得一个output.heic啦，将背景壁纸设置成他就行～
