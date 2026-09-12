  - --
title: Unknown
date: 2019-06-05 11
tags:
  - Git
  - 分支管理
  - 命令行
  - 开发工具
categories:
  - --
summary: title: 如何删除除了Master之外的所有分支
  - --
## 如何删除除了Master之外的所有分支

1. 切换到 master

2. 删了其他的

```bash
git stash && git checkout master && git branch | grep -v "master" | xargs git branch -D
```