---
title: vscode在debugger的时候如何加载插件
tags:
  - vscode
  - chrome
date: 2019-08-15 15:32:01
categories: 可以公开的情报
---

# 最终的 launch.js 配置

```
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:8081",
      "webRoot": "${workspaceFolder}",
      "runtimeArgs": [
        "--load-extension=~/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0"
      ]
    }
  ]
}
```
