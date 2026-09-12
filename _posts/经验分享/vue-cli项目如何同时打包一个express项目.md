---
title: vue-cli项目如何同时打包一个express项目
tags:
  - vue-cli
  - express
  - 前端
  - 打包
date: 2022-06-18 18:17:35
categories: 代码片段
---


  

> `vue-cli`项目一般只会生成一个纯前端的`vue`项目，不过有时候，如果我们想开发一个`express`项目同时又想用`vue`作为前端该怎么搞呢？

  

## 几个解决方案

  

* 两个项目分别开发

* mono-repo

* 其他方案

  

### vue/express一个项目一次打包

  

其实因为怕打包麻烦，所以我是希望一个项目内，可以同时开发`express`/`vue`打包的时候又能只打包输出到一个文件夹下

  

所以我选择在`vue-cli`生产的项目内，增加一个`server`文件夹，用来开发`express`相关的代码，只有在最后打包的时候，变为一个`express`项目

  

#### 改造的要点

1. 前后端独立的hmr

2. 前后端最终成果打包在一起

  

### 改造过程

  

#### 独立热更同时前端可调用express服务

  

首先，我们在文件目录下建立`server`文件夹，将`express`服务器的开发，`src`下为原先前端相关的代码

  

其次，安装`nodemon`用来做`express`项目的开发启动

  

`package.json`添加命令`"start:be": "nodemon ./server/index.js"`

  

添加`vue.config.js`, 加入

  

```javascript

module.exports = {

devServer: {

proxy: {

'/{express服务的路径，例如api}': {

target: 'http://127.0.0.1:{express端口},

ws: true,

},

}

}

}

```

  

这样，启动`npm run serve`的时候同时启动`start: be`即可同时开启前后端

  

#### 打包让express应用调用vue结果

  

`express`有`static`功能，假定用的是`public` 文件夹

  

`package.json`添加命令`"build:be": "cp package.json ./dist/ && cp server/* ./dist/"`

  

这样来打包`express`应用

  

同时express内添加一行，`app.use(express.static('./public'))`

  

接着，来改造`vue.config.js`

  

```

module.exports = {

outputDir: "./dist/public"

}

```

  

之后build命令运行完，运行build:fe即可

  

## typesciprt支持

  

安装`node-ts`即可，同时build命令，将`cp server`相关改为`tsc ./server/**/* -o ./dist`即可