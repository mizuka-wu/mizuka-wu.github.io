---
title: 文章标题
date: 2019-02-11 11
tags:
  - 前端
  - 上手指南
categories:
  - 经验分享
summary: 暂无摘要
---
  - --
title: Unknown
date: 2019-02-11 11
tags:
  - 前端
  - 上手指南
  - MAC
  - 经验
categories:
  - --
summary: title: electron开机自动启动
  - --
  
  
  

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