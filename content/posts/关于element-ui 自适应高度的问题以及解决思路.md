---
title: 关于element-ui 自适应高度的问题以及解决思路
tags:
  - 前端
  - 自适应高度
  - 表格
  - element-ui
date: 2020-04-09 12:11:57
categories: 工作日志
---

# 起因

还是接手了之前同事的代码，之前他的代码遗留了一个历史问题，一个element-ui的表格高度只有`500` 当然，在开发用的mac电脑上看还是很正常的，但是在实际的业务场景中，会有一些使用人使用的是一些大号的屏幕，实际效果上表格只占了页面的一小部分，又因为表格的内容很多，所以空了一大块页面，但是浏览数据却需要不停的滚轮

  

# 改进过程

## 分析要做什么

首先分析了一波造成这样现象的原因，发现是`element-ui table`的高度被钉死了，但是又由于是历史项目，页面被包裹在一个iframe里，同时`element-ui`不支持使用`auto`属性

  

综上所述，为了一个顺溜的滚动条体验，只能让`table`自动填满剩余高度了，盘算了一下需要做

  

* 监听页面大小变化

* 防抖，省的卡顿

* 获取剩余高度

* 设定一个最小高度

* 做好各类检测，防止报错

  

## 开写

### 监听问题

  

`window.addEventListener(‘resize’, handler)`

  

记得也要在对应时间销毁

  

### 防抖

这里直接上debounce

  

### 高度

1. 首先获取页面高度`window.innerHeight`

  

2. 然后获取table距离顶部的高度`el.getBoundingClientRect().top`

  

3. 这里有个小问题，就是定义的高度是`body`的高度，但是剩余区域是包括`head`的所以我们获取对应的高度`el.querySelector(‘.el-table__header-wrapper’).offsetHeight`

  

4. 空余高度计算`Math.max(innerHeight - offsetTop - tableHeaderHeight - OFFSET_BUTTON, MIN_TABLE_MAX_HEIGHT)`

  

这个是考虑了一个最小高度和空余页面底部距离的算式

  
  

### 整合

  

```javascript

  

const TABLE_OFFSET_BOTTOM = 10

const MIN_TABLE_MAX_HEIGHT = 500

  

window.addEventListener(‘resize’, _.debounce(function() {

const innerHeight = window.innerHeight

const table = document.getElementById(‘table’)

if (!table) {

return

}

const offsetTop = table.getBoundingClientRect().top

const tableHeaderHeight = table.querySelector(‘.el-table__header-wrapper’).offsetHeight

const maxTableHeight = Math.max(innerHeight - offsetTop - tableHeaderHeight - TABLE_OFFSET_BOTTOM, MIN_TABLE_MAX_HEIGHT)

// 改变element的参数即可

  

},300))

  

```

  

# 结果

很完美，哎嘿