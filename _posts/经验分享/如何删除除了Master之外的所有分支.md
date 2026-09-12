---
title: 如何删除除了Master之外的所有分支
tags:
  - Git
  - 分支管理
  - 命令行
  - 开发工具
date: 2019-06-05 11:41:57
categories: 代码片段
---

## 如何删除除了Master之外的所有分支

1. 切换到 master

2. 删了其他的

```bash
git stash && git checkout master && git branch | grep -v "master" | xargs git branch -D
```