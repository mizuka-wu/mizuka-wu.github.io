---
title: 如何删除除了Master之外的所有分支
tags:
  - 前端
  - 上手指南
  - MAC
  - 经验
date: 2019-06-05 11:41:57
categories: 可以公开的情报
---

# 如何删除除了 Master 之外的所有分支

1. 切换到 master
2. 删了其他的

```bash
git stash && git checkout master && git branch | grep -v "master" | xargs git branch -D

```
