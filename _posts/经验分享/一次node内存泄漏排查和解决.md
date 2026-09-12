---
title: 一次node内存泄漏排查和解决
tags:
  - 前端
  - 经验
date: 2019-06-01 10:41:57
categories: 可以公开的情报
---

  

# 背景

  

公司需要对接各种渠道，进行渠道管理进行了统一规范，生成了 ChannelManager 这个类，上线后发现一直报警，内存居高不下，而且走势呈阶梯上升，判断发生了内存泄漏

  

## 技术栈

  

### Nuxt

  

基于 nuxt 和 vue 开发的一套前端代码

  

### nodejs 性能平台

  

alinode，一个 ali 官方出的用来监控整个 node 内存和机器运行情况的程序，非常好用，问题是数据有一定延时

  

## 解决的步骤

  

### 首先尝试临时解决问题

  

因为线上一共有四台机器跑 ssr，所以通过设置不同的 crontab 进行分批重启 pm2，使得服务不间断

  

### 下线问题的 feture

  

最近上线的 feture 只有 channelManager，于是回滚代码之后重新发布，发现问题解决，找到问题代码区域

  

### CodeReview

  

开会大家回顾整个问题代码，分析之后发现可能的问题在于使用了 global 的 mixin，改成 Vue plugin 的形式使用，具体可以参考[这个 issue](https://github.com/vuejs/vue/issues/5089#issuecomment-284260111)

测试环境下发现问题依旧没有解决

  

### 验尸

  

对比了最近几次 alinode 抓下的堆快照，发现所有的闭包都是 vue 实例，而且都会有一个同样的 key`$channelManager`

  

### 找出问题所在

  

最终发现是上 channelManager 的时候在 nuxt 的 plugin 中使用了 inject，因为 inject 的时候是同一个实例，本身的目的是可以获取 channel 列表

  

```javascript

module.exports = (ctx, inject) => {

const ChannelManager = require('ChannelManager')

inject('channelManager', ChannelManager)

}

```

  

## 原因

  

在于 v8 的整个 gc 机制在于是否能够被访问到，因为 inject 之后不知道为何从 channelManager 能够访问到所有 inject 之后的 vue 实例，所以这一系列的 vue 对象都不可被回收