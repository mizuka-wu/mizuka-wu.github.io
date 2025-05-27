---
title: axios如何中断请求
tags:
  - axios
date: 2018-10-15 22:04:25
categories: 功能笔记
---


axios 是一个非常方便的请求库，但是缺没有原生提供一个 abort 接口，因为 axios 的返回是一个 promise，我们可以利用 promise 的特性来实现一个 abort 方法

  

## Promise.race

  

promise.race 方法从字面意思上就是赛跑，其中只要有任意一个完成了，就返回完成的那个，有一个失败了，就改为失败，利用这个特性就能完成我们的 abort 方法

  

```js

Promise.race([

// 等待取消组

new Promise((_resolve, reject) => {

notify.onClose = function() {

reject(new Error('手动停止导出！'))

}

}),

// 获取数据组

axios.get()

)

```

  

当然，例子中利用了 element-ui 的 notify 组件，绑定了 notify 组件的 onClose 方法，实际上也可以通过封装对象的方式实现