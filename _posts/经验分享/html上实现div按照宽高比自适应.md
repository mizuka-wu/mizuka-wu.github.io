---
title: html上实现div按照宽高比自适应
tags:
  - 宽高比
  - html5
  - vue
date: 2018-11-25 09:40:02
categories: 代码片段
---

  

# html 上实现 div 按照宽高比自适应

  

原理很简单，padding 的百分比是根据宽度作为百分比自动设置的，所以容器上使用

  

```less

.container {

height: 0;

padding-top: 114%;

.data {

width: 100%;

height: 100%;

}

}

```

  

就可以了