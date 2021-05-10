---
title: 有关前端和pdf相关的几件事
date: 2019-04-10 13:46:10
tags: 
    - javascript
    - pdf
    - 教程
categories: 可以公开的情报
---
# 有关前端和pdf相关的几件事

> pdf（Portable Document Format的简称，意为“便携式文档格式”）

前端工作中，也避免不了要和pdf打交道，以下列一些相关的信息

## 预览pdf的方法

### 通过浏览器自己的能力
1. 直接```<a href="pdf地址" >```打开新的页面
2. iframe/object ```<iframe src="pdf地址">```
3. embed ```<embed :src="previewUrl" type="application/pdf"```

以上几种方法都存在[跨域](https://segmentfault.com/a/1190000015597029)问题  
当然其中pdf浏览器的样式都是浏览器自带的，如果想要自定义，可能会比较无力

### 通过相关的库
1. [pdfobject](https://pdfobject.com/) 其实也是基于embed方案的
2. [pdf.js](https://mozilla.github.io/pdf.js/) pdfjs适用于自定义显示方案的，但是依赖webworker，兼容性可能不行

#### pdf.js
pdf.js 如果是通过npm安装的话，可能会遇到import相关的问题，这个时候改用```pdfjs-dist/webpack```就可以正常引入啦，不过包比较大，还是建议使用cdn

## 生成pdf的方法
有通过前端/后端等多种方法，生成的pdf也分为纯图片/文字+图片的类型
### 通过后端
1. [puppeteer](https://github.com/GoogleChrome/puppeteer/blob/v1.14.0/docs/api.md) 无头浏览器，网页生成pdf
2. jsPdf + html2canvas, 页面生成图片之后扔进jsPdf中
3. jsPdf, 纯js方案生成，缺点是需要自己计算每个元素的位置
4. [pdfmake](http://pdfmake.org/#/) 通过定义js对象来进行pdf,缺点是引入字体包导致整个依赖比较大，体验上比较好
