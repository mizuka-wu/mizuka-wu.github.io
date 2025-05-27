---
title: 给你的vuepress站点加个live2d吧
tags:
  - 前端
  - vuepress
  - live2d
date: 2020-03-09 12:11:57
categories: 可以公开的情报
---

  

很早以前，个人博客站点用的是`hexo`构建的，当时因为好玩给自己的站点加了一个`live2d`挂件，现在倒是将博客迁移到了`vuepress`上，可是找了半天没有一个`vuepress`的插件可以让我使用自定义的`live2d`模型，没办法只能自己封装了一个

  

## 如何使用

  

基于[pixi-live2d-display]({{< relref "https://github.com/guansss/pixi-live2d-display/blob/master/README.zh.md" >*/}})我封装了一个`vuepress`插件，叫[vuepress-plugin-pixi-live2d-display](https://www.npmjs.com/package/vuepress-plugin-pixi-live2d-display),可以自定义传入`model`的地址

  

不过只支持`model3`之后的模型版本

  

### 安装

  

```bash

npm i vuepress-plugin-pixi-live2d-display

  

or

  

yarn add vuepress-plugin-pixi-live2d-display

```

  

### 上传模型

  

可以上传到第三方平台比如`oss`, 或者在`vuepress`的`.vuepress/public`文件夹下

  

拿到对应的`model3.json`文件地址

  

### 添加配置

  

在`.vuepress.config.js`中添加

  

```js

module.exports = {

plugins: [

['vuepress-plugin-pixi-live2d-display', { model: "你的模型地址" }]

]

}

```

  

就可以使用啦

  

当然，因为底层依赖包是通过`script`引入的，本身存在时间差，所以`live2d`加载一开始会比较慢，也有可能会因为依赖库未加载完成报错

  

其他还有一些配置参数可以参考组件配置[https://www.npmjs.com/package/vuepress-plugin-pixi-live2d-display](https://www.npmjs.com/package/vuepress-plugin-pixi-live2d-display)