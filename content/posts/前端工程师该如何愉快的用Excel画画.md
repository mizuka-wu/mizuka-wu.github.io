---
title: 前端工程师该如何愉快的用Excel画画
tags:
  - 前端
  - excel
  - canvas
  - 画画
  - input
date: 2020-05-14 21:11:57
categories: 教程
---

  

虽然微软推出的Excel是一个强大的表格工具，但是世界上总有那么些人可以把一些常见的东西玩出花来[就像日本老人用Excel画画一样](https://baijiahao.baidu.com/s?id=1601995793246815437&wfr=spider&for=pc)

  

当然，作为一个程序员，当然还是靠程序自动来画啦

  

# 需要了解的知识

  

## canvas

  

html5新增加的一种html元素，平时都是把它当作画布使用，但是正因为有了操纵像素的能力 其也能用在播放视频，截图，压缩图片等操作上，当然啦，这一次，我们主要用到它的像素分析能力

  

### getContext

  

canvas最常用的api，获取一个用来画画的上下文，图片一般都是2d格式，所以我们通常用`getContext(2d)`

  

### drawImage

  

将图片绘制到canvas上，这样才能获取到每个点的信息

  

### getImageData

  

获取到canvas的图像信息，不过返回值中的data是个被打平的一位数组 每四个值代表了一组rgba

  

## input

  

这里我们靠input来获取输入值

  

### accept属性

  

`image/*`来限定只能选择图片，不过某些浏览器上因为要从国外获取mime的原因，推荐还是写成`image/png,image/jpg`

  

### 获取选中的图片

  

#### onchange

  

如果选择了图片，会触发change这个事件，我们对此监听即可，e.target为触发事件的input，我们取他的files[0]拿到图片对象

**注意**如果再点击选择同一图片的话，是不会触发事件的，所以每次获取之后推荐`e.target.value = “”`来清空掉已选择的文件

  

#### fileReader

  

我们获取到的图片仅仅只是个`file`是没办法直接转换成一个图片元素来获取宽高和放置在`canvas`内的，所以我们需要借助`fileReader`的力量

  

新建一个`const fileReader = new FileReader()`

然后在fileReader的onload回调中获取`e.result`作为url

  

那么如何开始读取？用`fileReader.readAsDataURL(file)`就行，之后再将这个url生成一个image就可以使用上文提到的drawImage方法了

  

#### image

  

和fileReader有点类似，需要`const image = new Image()`, `image.src = url`之后在onload回调中继续

  

## exceljs

  

本次的导出框架，控制了每个excel格子的背景之后生成`Array Buffer`

  

# 开始工作

  

既然有了知识储备，就开始规划一下步骤吧

  

* 做一个`<input type=“file” accept=“image/*”>`的按钮

* 在其change事件中获取file

* file转image

* 新建一个canvas元素，将image绘制上去，同时控制canvas宽高和image一致

* 用getImageData获取每个像素信息

* 像素信息我们再根据图片宽高转一个二维数组

* 用二维数组在excel中改变对应格子的背景色

* 导出excel

  

具体实现代码在`https://github.com/mizuka-wu/image2excel`上

  

## 可改进的点

  

* 图片太大会崩溃

* 规定最大大小，因为excel只能缩放到10%

* 自动压缩

* 图片大小检测

* 进度条

* 转移到webworker上做一部分工作

  

想直接使用？访问[我做好的demo吧](https://www.mizuka.top/image2excel)