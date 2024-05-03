---
title: axios兜底错误处理
tags:
  - axios
  - 兜底
categories: 代码片段
date: 2024-04-29
---

项目的网络请求层使用了axios，axios是一个及其好用的库，但是在业务使用上出现了一些问题

  

## 出现原因

众所周知，前端一般通过ajax向后端请求数据然后处理后显示在网页/app上，当然人都是懒得，总是希望有一些自动完成的事，比如这一次，如果不是需要特殊处理的特定错误，直接弹toast结束。

  

错误处理还是很容易，axios增加拦截器，如果是指定的错误，直接```throw new Error('错误')``` 剩下的交给```promise.catch```干就好了，问题集中在如何兜底这个catch，如果不处理，会变成```unhandledrejection```错误

  

### 解决方案

#### 最原始的方案

高阶函数 throwMessage，自动在promise之后增加catch函数，问题是这个要记得手动引入，和自动这个理念还是有点区别的.

  

```javascript

  

export function throwMessage<T = any>(responsePromise: Promise<T>) {

return responsePromise.catch((e: Error) => {

console.error(`error`, e)

message.error(e.message)

})

}

```

  

每次使用都要```throwMessage(promise)```容易忘，如果有必要，还要写**lint**规则防止忘记

  

#### webpack方案

既然打包的是webpack，那么使用webpack在转译原始代码的时候注入就好了嘛. 推荐一个[promise-catch-loader](https://github.com/xuqiang521/promise-catch-loader)自动处理好这一系列问题 具体因为没有太研究，不做展开

  
  

#### 事件监听方案

上文提到了，如果promise没有捕获错误，会自动变成unhandlered rejection错误，这个是可以全局监听的，具体[在MDN上可以看](https://developer.mozilla.org/zh-CN/docs/Web/Events/unhandledrejection)

  

那么 我们在window上直接监听就好了

  

```javascript

window.addEventListener('unhandledrejection', event => {

event.preventDefault()

});

```

问题是，太全局了

  
  

#### 处理Promise链方案

这种是最终处理的方案，当然也是最魔改的方案，考虑到**只运行在前端，内存溢出情况不多**，方能实现

  

axios返回的是promise，promise是遵循PromiseA+方案，内部其实是有一条promise链的，我们的目的就在于，在promise链条的**最后一个promise**上挂上catch,反正预先被处理了最后一个也不会触发

  

##### 问题来了

如果你直接看promise的话，是只能看到，then，catch，finally这些方法的，并没办法看到promise链，也没办法顺着链访问到最后

  

##### 如何解决

我们的目标是将其变为链式结构，简单来说，只要每个then和catch都能记下他的后继即可。

所以最终我选择注入promise的两个方法

  

##### 实现代码

  

```typescript

  

/**

* 继承然后注入两个方法

*/

export class ChainedPromise<T> extends Promise<T> {

nextPromise?: Promise<any>

  

then<TResult1 = T, TResult2 = never>(

onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,

onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,

): Promise<TResult1 | TResult2> {

const promise = super.then(onfulfilled, onrejected)

this.nextPromise = promise

return promise

}

catch<TResult = never>(

onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,

): Promise<T | TResult> {

const promise = super.catch(onrejected)

this.nextPromise = promise

return promise

}

}

  

/**

* 暴露给外面的方法，axios通过拦截器，通过封装service都能调用它来在入口处自动注入

*/

function autoTravel<T>(promise: Promise<T>): Promise<T> {

const getLastPromise = function(promise: ChainedPromise<any>): Promise<any> {

if (promise.nextPromise) {

return getLastPromise(promise.nextPromise)

}

return promise

}

  

/**

* Promise内部的自动形成链条，就能顺着链条找到最后一个了

*/

const autoTravelPromise = new ChainedPromise<T>((resolve, reject) => {

promise.then(resolve).catch(responseError => {

// throwMessage为之前定义的，promise上自动加catch的方法

throwMessage(getLastPromise(autoTravelPromise))

reject(responseError)

})

})

return autoTravelPromise

}

  
  

```