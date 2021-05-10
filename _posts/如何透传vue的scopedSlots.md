---
title: 如何透传vue的scopedSltos
tags:
  - vue
  - slots
  - scopedSlots
  - 透传
date: 2020-08-21 22:58:16
categories: 可以公开的情报
---

> 如果不理解 **slot** 概念请先阅读**[Vue slot教程](https://cn.vuejs.org/v2/guide/components-slots.html)**

**Vue** 基于 [Web Components 规范草案](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md)，将 `<slot>` 元素作为承载分发内容的出口。 又根据是否需要需要获取上下文，分类为了`slot`和`scopedSlots`

## 两者的异同点

### 相同的部分

这两者其实都挂载在对应的 `vue` 实例上，比如

``` html
<component-a>
 <标签名/>
</component-b>
```

内部如果有`<标签名/>`的情况下，那么`<component-a>`这个组件的`vue`实例自身的`$slots`和`$scopedSlots`内会拥有描述这个标签的对象：`{ [key: string]: Function | Vnode[] }`

如果没有具名`slot`的情况下，`key`会变成`default` 而且无论下层渲染的`<slot />`是否存在，都会挂在这两个对象上

那么如何`vue`是如何进行渲染的？当然是在

``` html
<template>
 <div>
  <slot />
 </div>
</template>
```

`<componet-a/>`对应模版的`<slot>`处自动注入进去的

### 不一样的点

虽说都是对象，但是也能看到有`Function`和`VNode[]`两种模式，因为`scopedSlots`是需要上下文的，所以也可以理解为`scopedSlots`的每一个属性是一个特殊的`render函数`，他会生成一个`VNode`出来给当前这个组件，而一般的`slot`就是直接接收`VNode[]`直接渲染

不过据说之后`vue`的设计上要将两者统一，这是后话了

### 获取上的问题

获取`scopedSlots`和`slots`其实有一个问题，就在于，刚刚初始化的时候，其实这两个对象内容还是空的，只有`mouted`生命周期之后才能获取到具体的值，所以传递的时候需要额外考虑 **监听** 的问题

## 如何传递

传递`slots`的核心点就在于如何将`$scopedSlots`和`$slots`对象对下层的`component`组件进行传递，或者让下级的`component`能够取到这一级`vue`实例的`$scopedSlots`和`$slots`对象

### 利用template

通过每一级都定义相同的`<slot>`来进行传递，方法太烦，直接放弃

### 利用render函数

`vue`的`template`最终其实也是要转换成`render`函数的，在中间过程，在`VNode`的配置阶段直接给[render函数](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)的`scopedSlots`进行传递就行了，不过似乎`slots`不受支持

在使用`JSX`的情况下，也是对`scopedSlots`属性挂载一个对象就可以了

不过这样也还是需要多级都进行传递，然后在需要使用的那一级通过`<slot />`插槽渲染，或者在`render`内直接运行对应的函数生成`vnode`

### 利用Provide/Inject

这个是`Vue`的一个不推荐使用的特性，父组件提供`Provide`，然后子组件`Inject` 来进行无视层级的注入

不过这个方案从设计上来说是不支持监听的，而我们的`scopedSlots`和`slots`要在挂载之后才能进行获取，这里就需要想办法在透传的同时实现监听了

利用一下`Vue`的一个漏洞，就是如果传递下去的是一个可监听的对象的话，那么对这个对象进行的一系列修改，子组件`inject`之后也是可以接收得到的

例如

在父组件

```html
<srcipt>
 export default {
  provide() {
   const { scopedSlots } = this
   return {
    scopedSlots
   }
  },
  data() {
   return {
    scopedSlots: {}
   }
  },
  mounted() {
   this.$next(() => {
    Object.entries(this.$scopedSlots).forEach(([key, scopedSlots]) => {
                this.$set(scopedSlots, key, scopedSlots)
             })
   })
  }
 }
</script>
```

在子组件就能注入了

``` html
<script>
 export default {
  inject: {
   scopedSlots: {
    default() => ({})
   }
  }
 }
</script>
```

不过这样我们只能透传拿到`scopedSlots`,渲染还是个问题，如果是使用的`render`函数或者`JSX`的大可以直接在目标位置直接生成`VNode`，但是在使用 **模版** 的情况下，就需要有个工具`component`帮助我们将`render`函数转为对应的组件了,

一种思路，通过`attrs`和`listeners`完成透传

``` html
<script>
export default {
 props: {
  renderFunction: {
   type: Function,
   required: true
  }
 },
 render(h) {
  const { $listeners, $attrs, renderFunction } = this
  const VNode = renderFunction($attrs)
  return h({
   ...VNode,
   on: $listeners
  })
 }
}
</script>
```
