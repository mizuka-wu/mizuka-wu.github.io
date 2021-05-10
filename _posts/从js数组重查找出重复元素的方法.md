---
title: 从js数组重查找出重复元素的方法
date: 2018-10-18 11:12:53
tags:
    - js
    - ecmascript
    - 数组
    - 技巧
categories: 开发的捷径    
---
# 一段从数组中获取重复数据的代码
```
Array.prototype.duplicate=function() {
  let tmp = [];
  this.concat().sort().sort(function(a,b){
    if(a==b && tmp.indexOf(a) === -1) tmp.push(a);
  });
  return tmp;
}
```
