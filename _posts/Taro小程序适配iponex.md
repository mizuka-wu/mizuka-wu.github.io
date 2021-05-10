---
title: Taro小程序适配ipone-x
tags:
  - 笔记
  - 学习
  - 记录
  - vscode
  - taro
  - 小程序
date: 2020-01-23 15:32:01
categories: 一些经验
---

# Taro 小程序适配 ipone-x

自从 ipone-x 出来之后，所有的网站如果要保证美观，势必要兼容一下 ipone 的全面屏

小程序的第三方实现我这边一般是使用 Taro.js 当然，大部分的场景 小程序的顶栏和 tab 栏已经帮我们做好了适配，不必担心，但是总有几个页面是需要我们来担心的

近期在工作的时候也遇上了这方面的需求，所以在小程序上也要进行 safe area 的适配

## 什么是 safe-area？

ios11 之后 出现的一个概念
![](https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2080446112,239974008&fm=26&gp=0.jpg)

## 如何适配

当然，简单点的做法就是假设，用户的手机版本足够高，然后通过 css 的办法进行适配，核心代码和之前的一模一样

```
  padding-bottom: calc(constant(safe-area-inset-bottom));
  padding-bottom: calc(env(safe-area-inset-bottom));
```
