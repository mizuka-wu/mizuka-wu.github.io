---
title: axios上传arrayBuffer的方案
tags:
  - 可以公开的情报
  - 开发
  - 前端
date: 2020-10-26 18:17:35
categories:
---

# 问题原因
上传的时候采用`form-data`, 添加`file`的时候一般采用`fs.createReadStream`, 如果要采用`arrayBuffer`或者`Buffer`的时候，记得改为`Buffer`, 同时`append`的时候增加第三个参数，`fileName`
