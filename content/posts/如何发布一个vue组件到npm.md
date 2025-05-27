---
title: 如何发布一个vue组件到npm
tags: 
date: 2020-08-08 22:58:16
categories: 可以公开的情报
---
  

![head](https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.png)

  

如今做`vue`的相关开发，基本都离不开[vue-cli](https://cli.vuejs.org/)，有时候，我们也会将自己工作中抽象出来的优秀方法或者组件发布给外网进行使用，本文基于自身写的[seed组件系统](https://www.mizuka.top/seed/)整理一下如何自动化发布到`npm`的一个流程

  

## 一些前期准备

  

- `github`账号和仓库地址

- `npmjs`的账号

  

## 整体构建流程

  

既然要做，就考虑一下完全自动化构建发布吧，基于`github actions`来完成整个`CI/CD`工作，主要包含，代码的自动构建，自动发布文档到`github.io`以及自动发布到`npm`上

  

所以我们需要

  

- `vue-cli` 创建项目

- `github code` 用于在`github action`的时候访问授权

- `npmjs code` 发布的时候用的`code`

- `vuepress` 可以在`md`中使用`vue`组件的文档构建工具

- 一些合理的命名，在组件发布到`npm`后，调用者也能正确的使用

  

### 开始安装vue-cli

  

请老手直接跳过

  

```sh

npm install -g @vue/cli

# OR

yarn global add @vue/cli

  

vue create 你的项目名称

```

  

### 更改你的目录结构

  

初始化的`vue`项目目录基本是为了开发一个网页`app`使用的，然而我们的目标是构建一个`lib`所以需要将目录结构进行一定的更改

  

原本的`src`文件夹存放的是页面的源代码，在组件库构建中，相当于是一个演示目录，所以我们将其更名为`examples`, 同时在根目录下新建一个`packages`存放我们开发的`lib`需要的代码，当然，如果有一些通用的`lib`文件的话，也新建一个`lib`文件夹好了

  

既然目录结构改了，一些默认的入口地址也进行更换

  

#### 增加jsconfig.json

  

这个主要为了方便`vscode`提示，大概例子为

  

```json

{

"compilerOptions": {

"target": "esnext",

"experimentalDecorators": true,

"baseUrl": ".",

"checkJs": false,

"paths": {

"@/*": [

"./examples/*"

],

"{你的项目名称}/packages/*": [

"./packages/*"

],

"{你的项目名称}/lib/*": [

"./lib/*"

],

"types/*": [

"types/*"

]

}

},

"exclude": [

"node_modules",

"lib",

"docs",

".github",

"public"

]

}

```

  

#### 增加vue.config.js

  

这里为了做别名引用，以及修改开发时的页面的入口文件地址为新的目标文件夹

  

同时解决打包组件库会多`css`文件的问题，当然，如果需要单独打包`css`可以不配置`css`相关

  

```js

const path = require("path");

function resolve(dir) {

return path.join(__dirname, dir);

}

  

module.exports = {

chainWebpack: config => {

config.resolve.alias

.set("@", resolve("examples"))

.set("{项目名称}/packages", resolve("packages"))

.set("{项目名称}/lib", resolve("lib"));

},

pages: {

index: {

entry: "examples/main.js",

template: "public/index.html",

filename: "index.html"

}

},

css: { extract: false }

};

  

```

  

#### package.json

  

主要修改`scripts`下的`build`为`"build": "vue-cli-service build --target lib --dest dist --name 项目名 packages/库的入口文件或者库的vue文件"`

  

同时增加

  

```json

"files": [

"packages/",

"dist",

"lib/",

"README.md",

"types/",

"LICENSE"

],

"main": "dist/{打包的文件名}.umd.min.js",

```

  

### 编写代码

  

之后你可以尽情编写代码了，`examples`下文件的别名还是`@/*`，自身开发的库的文件以及库的调用通过`你的项目名/具体路径`来进行调用即可，之后就愉快的开发吧

  

### 文档

  

文档我们选用`vuepress`方便将例子渲染在`docs`的页面内，当然，本教程也只会提供一些基础的配置

  

#### 安装

  

```sh

npm i --save-dev vuepress

```

  

在`package.json`的`scripts`中增加

  

```sh

"docs:dev": "npx vuepress dev docs",

"docs:build": "npx vuepress build docs",

```

  

#### 创建文件夹和配置文件

  

在根目录创建`docs`以后文档都会在这个目录底下，同时我们在`docs`下创建`.vuepress`文件夹

  

`vuepress`的具体配置请查看[官网](https://www.vuepress.cn/)，这里列出一些需要增加的配置

  

在`.vuepress`文件夹下增加`config.js` 同时增加内容

  

```js

const path = require("path");

function resolve(dir) {

return path.resolve(__dirname, '..', '..', dir);

}

  

module.exports = {

chainWebpack: (config) => {

config.resolve.alias

.set("@", resolve("examples"))

.set("{项目名称}/packages", resolve("packages"))

.set("{项目名称}/lib", resolve('lib'))

}

};

  

```

  

在`.vuepress`文件夹下增加`components`文件夹，并新建`Example.vue`

  

输入内容

  

```vue

<template>

<ClientOnly>

<App />

</ClientOnly>

</template>

  

<script>

import App from "@/App";

  

export default {

components: {

App

},

};

</script>

  

```

  

这样就能将`examples`下的例子在文档内直接引用了

  

```md

<Example />

```

  

当然，多个例子可以通过`prop`或者新建多个`vue`文件等不同办法实现

  

顺带一提，如果想要实现预览源码，可以使用`prism.js`配合`jsdelivr`来实现，我这里直接放出具体`demo`

  

```vue

<template>

<div v-if="sourceCode" class="source-code">

<div class="language-vue extra-class">

<pre

class="language-vue"

><code ref="code" v-html="sourceCode" /></pre>

</div>

</div>

</template>

<script>

import prism from 'prism'

export default {

data() {

return {

sourceCode: ''

}

},

methods: {

handleShowSourceCode() {

fetch(

`https://cdn.jsdelivr.net/gh/{github用户名}/{项目名}@master/examples/{App}.vue`

)

.then(function(response) {

return response.text();

})

.then(function(raw) {

vm.sourceCode = prism.highlight(raw, prism.languages.markup, "vue");

})

}

}

}

</script>

  

```

  

## 自动化

  

接下来就是`github actions`的时间了，这里我们将设置如果`master`分支有变化，则构建`docs`同时如果`tag`有增加，则构建对应的`tag`版本的`release`和推送到`npmjs`

  

主要靠三个`action`配置文件 以及 先把你的

  

### 构建文档

  

这里我们需要配置一个`DEPLOY_KEY`到`github.secreat`里 其实就是公钥和私钥啦，本地`ssh-keygen`之后，将私钥贴在`github.setting`的`deploy_key`中，将公钥放在`github.setting.secreat`中，并命名为`DEPLOY_KEY`

  

`.github/workflows/doc.yml`

  

```yml

name: Publish docs to github actions

on:

push:

branches:

- master

jobs:

build-and-deploy:

runs-on: ubuntu-latest

steps:

- name: Checkout

uses: actions/checkout@v2 # If you're using actions/checkout@v2 you must set persist-credentials to false in most cases for the deployment to work correctly.

with:

persist-credentials: false

- name: Install

run: npm ci && npm run-script docs:build

- name: Install SSH Client

uses: webfactory/ssh-agent@v0.2.0 # This step installs the ssh client into the workflow run. There's many options available for this on the action marketplace.

with:

ssh-private-key: ${{ secrets.DEPLOY_KEY }}

  

- name: Build and Deploy Repo

uses: JamesIves/github-pages-deploy-action@releases/v3

with:

BASE_BRANCH: master

BRANCH: gh-pages

FOLDER: docs/.vuepress/dist

SSH: true # SSH must be set to true so the deploy action knows which protocol to deploy with.

  

```

  

### 发布release

  

需要申请当前仓库的`release`权限，并配置为`GH_TOKEN`,请参考[github的官方配置](https://docs.github.com/cn/github/authenticating-to-github/creating-a-personal-access-token)

  

增加一个`changelog`命令到`package.json`的`scripts`中`"changelog": "npx conventional-changelog -p angular -i ./dist/CHANGELOG.md -s -r 0"`

  

`.github/workflows/release.yml`

  

```yml

name: upload release asset

on:

push:

# Sequence of patterns matched against refs/tags

tags:

- "v*" # Push events to matching v*, i.e. v1.0, v20.15.10

jobs:

build:

name: Upload Release Asset

runs-on: ubuntu-latest

steps:

- name: Checkout

uses: actions/checkout@v2 # If you're using actions/checkout@v2 you must set persist-credentials to false in most cases for the deployment to work correctly.

with:

persist-credentials: false

- name: Install

run: npm ci && npm run build && npm run changelog

- name: Read Changelog

id: read_changelog

uses: GenesisSam/get-simple-file-action@v1.0.4

with:

file-name: ${{ './dist/CHANGELOG.md' }}

- name: Build project # This would actually build your project, using zip for an example artifact

run: zip -r lib.zip dist

- name: Create Release

id: create_release

uses: actions/create-release@v1.0.0

env:

GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}

with:

tag_name: ${{ github.ref }}

release_name: Release ${{ github.ref }}

body: ${{ steps.read_changelog.outputs.data }}

draft: false

prerelease: false

- name: Upload Release Asset

uses: actions/upload-release-asset@v1.0.1

env:

GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}

with:

upload_url: ${{ steps.create_release.outputs.upload_url }} # This pulls from the CREATE RELEASE step above, referencing it's ID to get its outputs object, which include a `upload_url`. See this blog post for more info: https://jasonet.co/posts/new-features-of-github-actions/#passing-data-to-future-steps

asset_path: ./lib.zip

asset_name: lib.zip

asset_content_type: application/zip

  

```

  

### 发布到npm

  

需要事先在[npm](https://www.npmjs.com/)申请auth token，并在github的仓库配置中，配到`NPM_TOKEN`上

  

点击头像在`auth tokens`上申请即可

  

`.github/workflows/npm.yml`

  

```yml

name: publish to npm

on:

push:

tags:

- "v*" # Push events to matching v*, i.e. v1.0, v20.15.10

pull_request:

tags:

- "v*" # Push events to matching v*, i.e. v1.0, v20.15.10

  

jobs:

publish:

runs-on: ubuntu-latest

steps:

- name: Checkout

uses: actions/checkout@v2 # If you're using actions/checkout@v2 you must set persist-credentials to false in most cases for the deployment to work correctly.

with:

persist-credentials: false

- name: Install

run: npm ci && npm run build

- name: publish

uses: JS-DevTools/npm-publish@v1

with:

token: ${{ secrets.NPM_TOKEN }}

  

```

  

这样，一个自动工作的`vue`库文件开发工作流就完成啦，愉快的开发吧

  

## 还有一件事

  

如何快速打`tag`?利用`npm version {版本类型}`即可

  

如果在`package.json`的`scripts`中增加`"postversion": "git push --follow-tags"`甚至连发布工作都会自动帮你做掉，还等什么呢！