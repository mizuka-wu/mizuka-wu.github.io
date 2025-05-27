---
title: 我们是怎么从ng迁移到vue的
tags:
  - vue
  - ng
  - 迁移
  - angularJs
  - 经验
date: 2019-01-03 21:41:57
categories: 可以公开的情报
---

# 我们是如何从ng1迁移ing到vue的

> 原本的技术栈 ng1 + gulp + slim +

> vue *2 + iframe 的一个后端管理项目

  
  

[![](https://badge.juejin.im/entry/5c2e10c7f265da613d7c31ee/likes.svg?style=flat-square)](https://juejin.im/post/5c2e109fe51d453fdd604763)

  

![](https://camo.githubusercontent.com/5082953bc69645086be2b2ac5e1a8fa20eff0314/68747470733a2f2f73696e676c652d7370612e6a732e6f72672f696d672f6c6f676f2d77686974652d6267626c75652e737667)

  

这是一个本身因为人手不足，一开始由后端同学创建的后端管理项目，基本采用了gulp + ng1来进行开发，同时前端接手之后为了方便开发以及跟上潮流，采用了新开子目录使用vue开发，nginx和iframe进行整合的方式，最后一个项目变成了三个项目，其实最开始进行开发的时候，连怎么启动都不知道😂

  

# 要解决的问题

## 项目的层级结构

### 原本的结构

顶级目录只包含多个子文件夹以及build.sh，每个子项目需要独立进行编译以及开发

  

### 新的结构

采用signle-spa作为入口文件解决方案，统一管理所有项目的入口文件，实现一次启动，所有项目都能一起开发以及编译，省去了来回切换以及端口冲突

  

## 构建语言的混乱

### 原本的架构

原本的app是使用ng1来进行编写js部分，slim来编写页面模版，同时使用gulp来完成遍历所有的js文件，并打包到一个js中，后来一些新的页面部分采用iframe引入另一个vue-cli项目，两者之间通过cookie来进行登录数据的共享。

  

### 更新之后的架构

因为模版文件的问题，仍然以gulp为主，webpack负责vue和原本app的js打包和资源文件的编译工作，大家约定好，原本的ng部分尽量不更新，新的采用vue进行编写

  

## 逐步过渡

### 原本的方案

老的不管它，需要更新就回去更新，新的需求去vue的项目中编写

  

### 现在的方案

single-spa进行页面的拆分，将需要更新的老的ng部分作为一个新的子app，拆分出来之后再进行更新，保证局部更新，不影响整体

  

# 解决过程

## 编译工具

确定了整体的迁移方案之后，就是首先对编译工具的改造了，最开始是想把gulp先替换成webpack的（因为习惯配置webpack了，以及webpack4 + babel7真的编译速度快了很多）

  

但是因为slim始终找不到适合使用的webpack插件的关系，最终决定还是保留gulp进行编译ng的相关的html文件

  

### 小问题

#### gulp支持webpack的问题

gulp-webpack插件支持的webpack版本是2，但是目标是使用4(为了快),好在webpack支持使用node来进行调用，只要在编译结束之后给gulp一个回调就可以了

  

```javascript

  

const webpack = require('webpack')

const fs = require('fs')

  

module.exports = function (webpackConfig) {

return new Promise((resolve, reject) => {

const compiler = webpack(webpackConfig);

  

compiler.run((err, stats) => {

if (err) {

console.error(err)

reject(err)

}

  

// 输出

process.stdout.write(stats.toString({

// stats对象中保存着编译过程中的各种消息

colors: true, // 增加控制台颜色开关

modules: false, // 不增加内置模块信息

children: false, // 不增加子级信息

chunks: false, // 允许较少的输出

chunkModules: false // 不将内置模块的信息加到包信息

}) + '\n\n')

})

  

compiler.hooks.afterEmit.tap('gulp', function() {

resolve()

})

})

}

  

```

  

同理，devServer也使用自定义的脚本, 当然因为公司原因，其中的api切换也直接放在devServer的before中

  

```

/**

* webpack的devserver

*/

const webpack = require("webpack");

const WebpackDevServer = require("webpack-dev-server");

const proxy = require("http-proxy-middleware");

  

let env = "dev"; // 环境

  

module.exports = function(config) {

return new Promise((resolve, reject) => {

// node模式下需要进行配置

let devServerConfig = config.devServer;

let devPath = `http://${devServerConfig.host}:${devServerConfig.port}/`;

config.entry.app.unshift("webpack/hot/dev-server");

config.entry.app.unshift(`webpack-dev-server/client?${devPath}`);

  

const server = new WebpackDevServer(webpack(config), {

open: devServerConfig.open,

contentBase: config.output.path,

publicPath: config.output.publicPath,

hot: true,

disableHostCheck: devServerConfig.disableHostCheck,

historyApiFallback: true,

inline: devServerConfig.inline,

watchContentBase: devServerConfig.watchContentBase,

before: function(app) {

},

stats: {

colors: true

}

});

  

server.listen(devServerConfig.port, devServerConfig.host, function(err) {

if (err) {

console.log(err);

reject(err);

}

  

console.log(`Listening at ${devPath}`);

resolve();

});

});

};

  
  

```

  

## 统一构建和开发

因为使用的语言不一样，负责的页面不一样，Store和Route也不一样，想要统一的话，就必须解决这些问题

  

### single-spa

> SINGLE-SPA是一个 JavaScript 元框架，它允许我们使用不同的框架构建微前端，而这些框架可以共存于单个应用中。

  

![](https://upload-images.jianshu.io/upload_images/2267652-a636f8d7cce8768f.png)

后端微服务架构（microservice style）已经流行了一段时间了，那么前端能不能同样使用微服务呢？页面拆分成不同的部分，互相之间互不干扰又紧密相连，single-spa正是为此而出现的，而且更好的事，single-spa支持几乎所有的前端开发框架，是一个框架的元框架，而我们的迁移目标正好就是将原本的ng部分拆分成一个个小的app然后逐步迁移到vue上么

  

### 统一Store

最终决定使用vuex作为整个项目的Store，但是如何与ng本身的rootScope进行整合就又是一个问题了，好在通过import引入的js文件的作用域是共同的，只需要将ng的rootScope挂载上vuex，然后vuex使用插件的形式反过来触发更新ng就行了.

  

```javascript

import store from '../store'

  

Object.assign(store.state, {

_ng: {

$rootScope: $rootScope,

$state: $state

}

})

```

  

```javascript

/**

* 同步这些数据到ng的Scope里

* @param store

*/

export const ngPlugin = store => {

// 当 store 初始化后调用

store.subscribe(({ type, payload }, state) => {

if (state._ng) {

state._ng.$rootScope[type] = payload

state._ng.$rootScope.$apply()

}

})

}

  

```

  
  

### 统一路由

目前仍然各自为政，只不过路由跳转方式通过指令的方式，将vue和ng的跳转修改为使用single-spa的路由跳转方式. 当然，因为之前ng的路由是继续hash而不是history，所以还有一部分兼容操作

  

```javascript

import { navigateToUrl } from 'single-spa'

  

directives: {

// spa链接

spaLink (element, {value}) {

element.style.display = 'inline-block'

element.style.width = '100%'

// 自动判断hash类型

let hash = (value || '').includes('#') ? value.replace('/#', '#') : `#/${value}`

element.setAttribute('href', value ? hash : 'javascript:void(0)')

element.addEventListener('click', (e) => {

e.preventDefault()

if (value) {

navigateToUrl(hash)

}

})

}

},

```

  

### 目录结构统一

使用webpack的一个好处就是可以使用alias的方式 引入vue的相关组件，将原先平级的目录都移入src之后，只要修改alias，就能做到无缝迁移了

  

### 拆分app

没什么好说的，按照业务相关性和优先级拆分，使用single-spa进行管理

  

# 目前进度

当然啦，迁移也不是一朝一夕的事，其实主要把整个项目的侧边栏导航栏给换了，支持了一直吵着要做的搜索框，更换的过程中还出过不少问题，不过因为拆分了app，倒是没有影响整个项目的正常运行，看来迁移有望，起码现在启动项目不用各种切分支了😂，同时因为偷懒，还专门写了seed系统，通过定义数据结构快速生成项目页面，这也是后话了