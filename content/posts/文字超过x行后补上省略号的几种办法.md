---
title: 文字超过x行后补上省略号的几种办法
tags:
  - 前端
  - CSS
  - 文本截断
  - 省略号
  - overflow
date: 2019-10-18 12:11:57
categories: 代码片段
---

## 文字超过 x 行后补上省略号的几种办法

[原文](https://css-tricks.com/line-clampin/)

简单来说，在 pc 端，文字过长溢出的话，溢出的部分会被替换成`...`,然而在显示情况中，更多的是在超过 x 行之后才启用这个特性，例如

```html
<div class="module">
<p>
Pellentesque habitant morbi tristique senectus et netus et malesuada fames
ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
ultricies mi vitae est. Mauris placerat eleifend leo.
</p>
</div>
```

最终希望三行之后到这种效果:

![省略号效果图](https://css-tricks.com/wp-content/uploads/2013/05/clamped.png)

为了演示，我们先定义基础的 css，剩下的方法都在这个 css 的基础之上

```css
.module {
  width: 250px;
  overflow: hidden;
}
```

## Weird WebKit Flexbox Way

使用 webkit 内置的方案

```css
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
```

这种方案只有 webkit 内核的浏览器支持，在使用上遇到一个问题，就是 autoprefixer 会移除`-webkit-box-orient: vertical;`

所以我们需要增加个注释

```css
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
}

```

## The Opera Overflow Way

Opera 浏览器的方案，和 webkit 差不多

```css
.line-clamp {
  height: 3.6em; /* 1em为1个line-height的高度，这里表示3行 */
  text-overflow: -o-ellipsis-lastline;
}
```

## The Clamp.js Way

使用 Clamp.js

```javascript
var module = document.getElementById("clamp-this-module");
$clamp(module, { clamp: 3 });
```

建议包裹在`<p id="clamp-this-module"></p>`中保证 firefox 正常使用

## 以下是原文的几种显示方案

<iframe height="265" style="width: 100%;" scrolling="no" title="Line Clampin'" src="https://codepen.io/chriscoyier/embed/iBtep?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
See the Pen <a href='https://codepen.io/chriscoyier/pen/iBtep'>Line Clampin'</a> by Chris Coyier
(<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>