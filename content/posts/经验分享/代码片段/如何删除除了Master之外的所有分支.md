---
title: 如何删除除了Master之外的所有分支
date: 2026-09-13T10:00:00
tags:
  - 技术
categories:
  - 经验分享
summary: 暂无摘要
---

## 如何删除除了Master之外的所有分支

1. 切换到 master

2. 删了其他的

```bash
git stash && git checkout master && git branch | grep -v "master" | xargs git branch -D
```