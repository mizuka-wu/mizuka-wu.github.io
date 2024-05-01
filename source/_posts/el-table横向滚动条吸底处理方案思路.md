---
title: el-table横向滚动条吸底处理方案思路
tags:
  - 表格
  - el-table
categories: 功能笔记
cssclasses: 
date: 2019-07-09 18:17:35
---

## 起因

工作中用到的 `el-table`显示大批量数据的时候，一页放不下，一般性的处理方案是限定了高，让表格固定表头之后内部可以滚动，不过因为实际操作中样式的问题，需要我把整个表格高度全部显示出来，这样就造成了一个问题，就是横向滚动不方便

  

不过作为`mac`用户已开始没啥感觉，但是被用`windows`的同事吐槽了好久，于是终于决定花半天时间解决

  

## 仓库

  

已开源，不想看的，可以直接看代码[https://github.com/mizuka-wu/el-table-horizontal-scroll](https://github.com/mizuka-wu/el-table-horizontal-scroll)

或者安装```npm i el-table-horizontal-scroll```用指令的形式使用该项目

## 实现原理

  

其实是模拟了一个`el-scroll`进行同步，为了方便，制作成了一个指令

  

### 核心代码

通过`Scroller`类，创建一个`scroller`的`dom`，并插入到指令提供的`el`内部

  

```

el.appendChild(scroller.dom)

```

  

目标对象

  

```

const targetTableWrapperEl = el.querySelector('.el-table__body-wrapper')

```

  

#### Scroller类 [具体地址](https://github.com/mizuka-wu/el-table-horizontal-scroll/blob/master/src/lib/directive.js)

  

主要负责了`scroller`的创建和管理，具体可以直接看代码

  

其模拟了一个`el-scroll`的`dom`结构(为了省的写样式)

  

大概会出现一个这样的`dom`结构

  

```

<!-- scroll/dom整个dom结构 -->

<div class="el-scrollbar">

<!-- bar横条容器 -->

<div class="'el-scrollbar__bar is-horizontal">

<!-- thumb滑块 -->

<div class="el-scrollbar__thumb"></div>

</div>

</div>

```

  

然后整体就是对这个结构进行操作

  

例如，`scroll`的整体样式需要手动添加，让其可以自由浮动，然后显示在`fixed`列前，所以需要

  

```

scroller.style.height = '12px'

scroller.style.position = 'fixed'

scroller.style.bottom = 0

scroller.style.zIndex = 3

```

  

以及一些其他的调整，具体不再阐述

  

#### 自动吸底原理

  

这个就是目前监听`document`的`scroll`事件，判断是否需要显示

  

核心判断代码就是判断`el`的底部是否出现在页面内

  

```

const viewHeight = window.innerHeight || document.documentElement.clientHeight

const { bottom } = targetTableWrapperEl.getBoundingClientRect() // 当前的el-table的wrapper，可以在el内获取到

if (bottom <= viewHeight) {

hideScroller()

} else {

showScroller()

}

```

  

平时就`position: fixed`在页面底部，如果表格底部显示在页面里了，就自动隐藏即可

  

* 顺带一提，这个部分因为`positon`是`fixed`, 所以宽度需要手动设置成`el`的`offsetWidth`

* 如果表格出现宽度变化，也需要重设位置和重新计算滑块宽度

  

#### 滑块相关

  

**滑槽因为默认的样式是`opacity: 0`所以我顺手做了`el`根据鼠标事件自动显示和隐藏**

  

滑块主要是需要计算宽度和向左滑动的距离

  

##### 宽度计算

代码如下，我直接放类里面了，具体`targetTableWrapperEl`是哪个`dom`可以自己看一下具体的`dom`结构，表格的容器，因为宽度不变，所以滑块的宽度我们通过可滚动距离和容器宽度换算成一个百分比

  

因为`el-table`初始化的问题，初始化计算的时候最好做个延迟，或者监听宽度变化重设宽度，这里我实际代码两个都做了

  

```

/**

* 自动设置Bar

*/

resetBar () {

const { targetTableWrapperEl } = this

const widthPercentage = (targetTableWrapperEl.clientWidth * 100 / targetTableWrapperEl.scrollWidth)

const thumbWidth = Math.min(widthPercentage, 100)

this.thumb.style.width = `${thumbWidth}%`

  

if (thumbWidth >= 100) {

this.fullwidth = true

this.hideScroller()

} else {

this.fullwidth = false

this.checkIsScrollBottom()

}

}

```

  

##### 滑块距离

具体代码, 原理同样是换算成百分比

  

```

resetThumbPosition () {

this.thumb.style.transform = `translateX(${this.moveX}%)`

}

  

get moveX () {

const { targetTableWrapperEl } = this

eturn ((targetTableWrapperEl.scrollLeft * 100) / targetTableWrapperEl.clientWidth)

}

```

  

### 同步滚动距离

#### table => scroller

直接在`targetTableWrapperEl`的`scroll`事件里进行设置`resetThumbPosition`即可

  

#### scroller =》table

分了两个情况，拖滑块 和 点击滑槽

  

滑槽请自行查看代码

  

讲一下滑块的原理

  

**记录鼠标滚动距离然后设置给table** 然后让table自动更新回`scroller`

  

需要三个事件

  

* onmousemove

* onmouseup

* onmousedown

  

注意点

  

* `mousemove`建议挂在`document`上

* 右键 + ctrl这类特殊情况需要处理

  

##### 计算距离

通过`e.clientX`可以得出每次滚动的`offset`, 但是这个`offset`需要换算成具体需要滚动的`scrollLeft`

  

```

targetTableWrapperEl.scrollLeft += offset * rate

```

  

然后每个像素的对应的比例，其实可以通过滑块和滑槽的比例直接算出来（两者同样出自容器）

```

const rate = bar.offsetWidth / thumb.offsetWidth

```

  

## 总结

  

还有一些例如

  

* 悬停显示

* 自动宽度适配

  

的小功能都在代码中了

  

欢迎提`issue`和告诉我那些部分想要自定义的，我可以写在`binding`里