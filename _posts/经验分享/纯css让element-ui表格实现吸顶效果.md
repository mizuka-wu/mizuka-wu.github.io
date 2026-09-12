---
title: 纯css让element-ui表格实现吸顶效果
tags:
  - 表格
  - CSS
  - Element UI
  - position sticky
date: 2024-05-02
---

## Position Sticky 与表格头

> 原文章[https://css-tricks.com/position-sticky-and-table-headers/](https://css-tricks.com/position-sticky-and-table-headers/). 本身产品有个需求需要表格自动吸顶，本身用了 antd design 的 scroll 实现的，现在使用 css 实现，效果更好

  

`thead`和`tr`上无法设置 style`position: sticky;`,

到那时在`th`上却可以，这也意味着，其实你可以在一个传统的`table`上实现吸顶 header 效果，如果你不清楚吸顶实现的原理，大概实现起来会很棘手吧，使用 css 总比原先用 js 去监听事件然后改变`position`好得多

## 兼容性

[查看兼容性](https://caniuse.com/#search=sticky)

只要不是 ie 这种活化石，基本都已经支持了

## 使用

1. 保证 table 的 position 为 relative
2. 给每个 th 加上 sticky
3. 保证其父容器没有`overflow: hidden`

## 例子

```stylus
.sticky-head
  >>>.el-table
    overflow visible
    .el-table__header-wrapper
      overflow visible
      position sticky
      top 0
      z-index 10
    table
      position sticky
      top 0
    thead
      position relative
    th
      position sticky
      top 0
      z-index 10
```