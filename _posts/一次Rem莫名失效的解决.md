---
title: 一次Rem莫名失效的解决过程
tags:
  - 可以公开的情报
  - 开发
  - 前端
  - font-size
  - rem
date: 2019-10-29 16:17:35
categories: 可以公开的情报
---

# 事件起因

以前同事突然之间让我过来帮忙解决一个他无法理解的问题，手机活动页使用了 rem 来自适应屏幕，但是文字却莫名奇妙的变大了？

## 定位原因

因为无法看到源码，只能考虑根据条件过滤出可能造成问题的原因和临界条件，根据对方所说，只有一块区域粘贴上需要的文本之后，字体莫名的放大了

原始的

```html
<div>
  xxxxxxxxxxxxxxxxxxxxxxx<br />
  xxxxxxxxxxxxxxxxxxxxxxx<br />
  xxxxxxxxxxx<br />
  xxxxxxxxxxxxxxxxxxxxxxx<br />
  xxxxxxxxxxxxxxxxx<br />
  xxxxxxxxxxxxxxxxxxxxxxx<br />
  xxxxxxx<br />
  xxxxxxxxxxxxxxxxxxxxxxx<br />
</div>
```

想要的

```html
xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx xxxxxxx
xxxxxxxxxxxxxxxxxxxxxxx
```

实际上

```html
XXXXXXXXXXXXXXXXXXXXX XXX XXXXXXXXXXXXXXXXXXXXX XXXXXXXXX XXXXXXXXXXXX
XXXXXXXXXXXX XXXXXXX XXXXXXXXXXXXXXXXXXXXX
```

只有这个 div 里文字都被放大了

所以考虑这段文本的临时解决方案和实际问题原因

### 临时方案

1. style 钉死 font-size 可行
2. 用 div 替代 br 重新排列 可行

### 查找原因

#### 可能性 1: 粘贴进的文本有奇怪字符串导致问题

查阅了浏览器特性，应该没有这个问题，同时重新手打了一遍，问题依旧

#### 可能性 2: 浏览器特性和字数有关

在手打的情况下，验证了字符串数少于一定的量之后整个显示是正常的

#### 可能性 3: 和浏览器最小字符大小有关

比最小的 12px 大，所以排除

综上，是字符串数量的问题，以上，有了原因就能找到解决方案了

## 问题原因

> 这个特性被称做「Text Autosizer」，又称「Font Boosting」、「Font Inflation」，是 Webkit 给移动端浏览器提供的一个特性：当我们在手机上浏览网页时，很可能因为原始页面宽度较大，在手机屏幕上缩小后就看不清其中的文字了。而 Font Boosting 特性在这时会自动将其中的文字字体变大，保证在即不需要左右滑动屏幕，也不需要双击放大屏幕内容的前提下，也可以让人们方便的阅读页面中的文本。

![](https://cloud.githubusercontent.com/assets/339891/9324116/d7c37ef0-45b9-11e5-8e7d-5d882063f2f4.png)

具体解析可以看[这篇文章](https://github.com/amfe/article/issues/10)

## 解决问题

1. 因为事先知道哪个 div，所以在这个 div 上添加`max-height: 9999px`;
2. 不知道为啥，`display: inline;` 也可以
3. 根据试验，`text-size-adjust: none;` 也行 s
