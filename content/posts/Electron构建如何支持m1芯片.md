---
title: Electron构建如何支持m1芯片
tags:
  - electron
  - apple
  - electron-builder
  - arm64
date: 2021-01-09 12:11:57
categories: 代码片段
---

# 起因

  

换了台`m1`的macbook, 我之前的`看板electron`程序构建的还是老的x64版本，使用上还需要使用`rosetta2`进行转译，性能损失不说，说不定还有潜在的问题，所幸看到 `electron11`开始支持使用`arm64`芯片的`mac`了，正好升级一波

  

## 写在前面

  

目前工具库还在`preview`，taobao镜像不可用

  

顺带提一下我之前的项目结构

  

- 基于 `@vue/cli4`

- 使用 [vue-cli-plugin-electron-builder](https://github.com/nklayman/vue-cli-plugin-electron-builder)注入的`electron`相关

- 构建流 本地正常构建，自动构建流基于`samuelmeuli/action-electron-builder@v1`自动构建

- 项目地址[点击这里](https://github.com/mizuka-wu/kanban)

  

## 开工

  

### 升级依赖

  

首先需要升级使用的`electron`到支持新芯片的版本，目前能够使用的是[electron11](https://www.infoq.cn/article/towhhg7ik65o57horszr)

  

```bash

npm install --save electron@11

```

  

同时我们需要升级`electron-builder`到支持打包新芯片的版本, 根据[最新的方案](https://github.com/electron-userland/electron-builder/blob/master/packages/app-builder-lib/scheme.json#L4955-L4980)，`arch`需要支持`arm64`并且可以打包`dmg`的话，需要升级到`22.10.4`

  

```bash

npm install --save-dev electron-builder@22.10.4

```

  

不过因为还在`preview` 只有`npm`官方仓库可以安装

  

接下来我们改造构建选项，因为我使用`vue`的插件, 所以我写在`vue.config.js`

  

```javascript

module.exports = {

pluginOptions: {

electronBuilder: {

builderOptions: {

artifactName: '${productName}-${version}-${os}-${arch}.${ext}',

mac: {

target: {

arch: 'universal',

target: 'dmg'

}

}

},

}

}

}

```

  

这样可以打包一个自适应芯片的版本，当然你想打两个包可以把`arch`换成`arch: ['x64', 'arm64']`

  

没有使用`vue`插件的，直接在`package.json`里增加

  

```json

{

"build": {

"mac": {

"target": {

"arch": "universal",

"target": "dmg"

}

}

}

}

```

  

## 最终

  

成功打出`dmg`，正常使用中

  

当然`universal`模式的大了`100`多m尽量还是按需打包把