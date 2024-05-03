---
title: github publisher
tags:
  - obsidian
  - obsidian插件
categories: 文字编辑
date: 2024-04-30
---

插件地址 https://obsidian-publisher.netlify.app/

```
hello world
```

## 插件使用指南
1. 配置reponame
2. 生成并且配置 github token
3. 在 menu 上配置 右键菜单打开
4. 之后即可右键点击上传


结果：

使用脚本部署完成后，可以下载到上传的内容的地址下来。

如果需要更多信息，请查询用户端。


## 上传原理
实际上这个上传纯粹就是会根据用户的配置自动上传到指定的文件夹内
所以依据这个，我们可以配置一个简单的 vitepress 网站+workflow 进行自动构建，来生成一个对应的博客系统

比如说，我自己的 github 博客的设计就是，vitepress
对应的文档都是保存在 posts 下的 所以可以通过配置上传地址到这个地址下来实现自动构建
![[./资源/Pasted image 20240501131519.png|Pasted image 20240501131519.png]]
通过 github 的对应 workflow 即可实现自动构建
给一个例子为
`.github/workflows/deploy.yml`
```
name: release docs CI

  

on:

push:

branches:

- master

  

jobs:

build:

runs-on: ubuntu-latest

  

strategy:

matrix:

node-version: [12.x]

  

steps:

- uses: actions/checkout@v1

- name: 步骤：第一步 -> Use Node.js ${{ matrix.node-version }}

uses: actions/setup-node@v1

with:

node-version: ${{ matrix.node-version }}

  

- name: 步骤：第二步 -> 安装依赖

run: |

npm ci

npm run build

env:

CI: true

  

- name: 步骤：第三步 -> 使用脚本部署

env:

ACCESS_TOKEN_DEPLOY: ${{secrets.DEPLOY_KEY }}

PUBLISH_BRANCH: gh-pages

PUBLISH_DIR: ./.vuepress/dist

CNAME: www.mizuka.top

uses: veaba/vuepress-actions@v0.83
```