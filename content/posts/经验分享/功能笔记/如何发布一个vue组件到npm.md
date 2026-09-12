---
title: Sequence of patterns matched against refs/tags
date: 2020-08-08 22
tags:
  - "v*" # Push events to matching v*, i.e. v1.0, v20.15.10
  - "v*" # Push events to matching v*, i.e. v1.0, v20.15.10
  - "v*" # Push events to matching v*, i.e. v1.0, v20.15.10
  - `github`账号和仓库地址
  - `npmjs`的账号
  - `vue-cli` 创建项目
  - `github code` 用于在`github action`的时候访问授权
  - `npmjs code` 发布的时候用的`code`
  - `vuepress` 可以在`md`中使用`vue`组件的文档构建工具
  - 一些合理的命名，在组件发布到`npm`后，调用者也能正确的使用
  - master
  - name: Checkout
  - name: Install
  - name: Install SSH Client
  - name: Build and Deploy Repo
  - "v*" # Push events to matching v*, i.e. v1.0, v20.15.10
  - name: Checkout
  - name: Install
  - name: Read Changelog
  - name: Build project # This would actually build your project, using zip for an example artifact
  - name: Create Release
  - name: Upload Release Asset
  - "v*" # Push events to matching v*, i.e. v1.0, v20.15.10
  - "v*" # Push events to matching v*, i.e. v1.0, v20.15.10
  - name: Checkout
  - name: Install
  - name: publish
categories:
  - 经验分享
summary: title: Sequence of patterns matched against refs/tags
