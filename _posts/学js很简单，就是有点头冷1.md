---
title: 学js很简单，就是有点头冷（1从工程化开始）
tags:
  - 前端
  - 教程
  - javascript
  - 笔记
date: 2018-11-07 10:58:25
categories: 学习笔记
---
# 工程化
> 反正也是公司要要求自己从头写一个类库，干脆。。。你懂的，全部记录一下吧
## 为什么要工程化？
工程化是为了规范开发行为，是为了多人开发以及未来改进，当然，也是为了甩锅hhhh，这是一个目前比较简单的工程的目录![目录](https://mizuka-blog.oss-cn-shanghai.aliyuncs.com/learn-js/85CDA5F2-2279-438B-B4A9-7C3F7CC74088.png)
可以看到大概现在分了几个部分
* **.babelrc** 配置转码的东西，主要为了兼容浏览器
* **.eslintrc.js** 代码格式化规范配置，
* **.gitignore** 哪些文件不必加入git
* **gulpfile.js** gulp构建工具
* **rollup.config.js** 构建工具+1
* **src** 源码！
* **package.json** 这个东西，现在工程化里不存在都不可能的，定义了需要引用的第三方包以及本身的一系列配置文件

## 知道为什么js如此重要么？
HTML是骨架，css像是化妆品，js。。。能生成和修改html和css

# 开始吧
## 版本管理工具
![gitlogo](https://www.linuxjournal.com/sites/default/files/styles/360_250/public/nodeimage/story/git-icon.png)


我们版本管理工具选择git，主要是为了托管在github上，git的一个好处就是分支开发，这样多个人在同一个可以进行同步开发，以及，**查找哪些有问题的代码是谁写的**
