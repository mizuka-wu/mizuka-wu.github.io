---
title: electron开机自动启动
tags:
  - 前端
  - 上手指南
  - MAC
  - 经验
date: 2019-02-11 11:41:57
categories: 代码片段
---

  
  
  

直接

直接上

直接上代码

``` javascript

const exeName = path.basename(process.execPath)

app.setLoginItemSettings({

openAtLogin: !openAtLogin,

path: process.execPath,

args: [

'--processStart', `"${exeName}"`

]

})

}

```