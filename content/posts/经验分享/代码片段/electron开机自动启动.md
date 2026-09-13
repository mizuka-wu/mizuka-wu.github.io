---
title: electron开机自动启动
date: 2026-09-13T10:00:00
tags:
  - 技术
categories:
  - 经验分享
summary: 暂无摘要
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