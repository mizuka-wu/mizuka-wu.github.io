---
title: 使用typescript写vue遇到的问题以及处理方法
tags:
  - 前端
  - vue
  - typescript
date: 2020-02-01 12:11:57
categories: 可以公开的情报
---

# 引入 typescript 遇到的问题

![](http://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=vue&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=539148893,69867751&os=2158212037,1585938205&simid=0,0&pn=17&rn=1&di=172590&ln=1739&fr=&fmq=1580487295219_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=http%3A%2F%2Fpic4.zhimg.com%2Fv2-8d028581101666f177b781f606dcb2fd_1200x500.jpg&rpstart=0&rpnum=0&adpicid=0&force=undefined)

## classtype 的装饰器

因为要写 props 里面需要传入函数，所以直接放弃类类型的写法

## 如何让 ts 能够推导？

1. `script`上增加`lang="ts"`
2. `export default{}`改成`export default Vue.extend({})`

### 引入 Webpack.ProvidePlugin 遇到的一些问题

首先，我用的是 vue-cli3，所以得使用`chainwebpack`的语法,之所以要定义这个插件，因为 Vue 这个打算搞成全局配置，毕竟这次写的东西要做成 lib 发布来着

上代码

```javascript
// vue.config.js
const webpack = require("webpack");
module.exports = {
  chainWebpack: config => {
    config.plugin("provide").use(webpack.ProvidePlugin, [
      {
        moment: "moment"
      }
    ]);
  }
};
```

同时要在`.eslintrc.js`里将这个定义为 global 的

```javascript
{
  globals: {
    moment: true;
  }
}
```

### 找不到定义文件

在`tsconfig.json`的`compilerOptions`里加上类型定义

```javascript
{
    "typeRoots": ["./node_modules/@types", "./types"],
}
```

### debounce 的方法丢失了 this

把这个赋值从 methods 中移动到 created/data 中，同时使用`const vm = this`来绑定 this，避免 ts 上的`this`绑定问题
