---
title: 我的 nas 配置之路
tags:
  - nas
  - 群晖
  - 配置
categories: nas 相关
date: 2024-05-03
---
# 我的 nas
我的 nas 其实因为懒得进行继续折腾，所以最后还是购买了白群晖
我的 nas 型号是 DS220+

```cardlink
url: https://www.synology.cn/zh-cn/support/download/DS220+?version=7.2#system
title: "下载中心 - download | 群晖科技 Synology Inc."
description: "群晖致力作为用户的数据银行，提供企业云盘、备份一体机、虚拟化存储方案，帮助企业和个人安全保护数据、简化文件协作、优化多媒体文件管理，让用户随时随地都能存取文件。"
host: www.synology.cn
image: https://www.synology.cn/img/home/img_og_image.jpg
```

现在的 nas 对我来说相当于一个简单的服务器，包括对内的进行番剧下载，自动从阿里云上拉取同步文件夹

对外的，一部分类似于配置的功能可以自己存储到 minio 上，同时我也可以部署自己的私人 express 服务器，用来对外提供各类服务

当然核心原因是
我的群晖提供了 <font color="#c00000">虚拟机</font> + <font color="#c00000">docker</font> 服务，这也使得运行很多服务成为了可能

### 推荐的套件中文地址
因为有一些服务其实依赖于套件
所以将我自己用的套件路径先提供出来
1. 社群 https://packages.synocommunity.com/
2. skp https://spk7.imnks.com/
3. 云梦 https://spk.520810.xyz:666

## 功能以及搭建之路

### 最基础的就是 clxxs 服务
主要就是旁路由的代理服务啦
-> [[旁路由代理|旁路由代理]]

之后就是

设置了一个 minio 服务

-> [[minio|minio]]

因为我需要将 minio 推送到外部，所以我还特别搭建了一个代理转发工具

## 代理转发

-> [[对外服务|对外服务]]


# 追番
-> [[追番|追番]]

# 设置外网穿透

-> [[内网穿透|内网穿透]]