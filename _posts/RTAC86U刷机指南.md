---
title: RTAC86U刷机指南
tags:
  - RTAC86U
  - 乳酸菌
  - gfw
  - 插件
date: 2018-12-15 17:32:01
categories: 可以公开的情报
header_image: https://mizuka-blog.oss-cn-shanghai.aliyuncs.com/rtac86u/IMG_4420.jpeg
---
# 搬家之后当然要换一个更好的路由器啦
> koolshare看到的推荐，新的架构 还是华硕出品趁着双十二就入手啦

![](https://mizuka-blog.oss-cn-shanghai.aliyuncs.com/rtac86u/IMG_4420.jpeg)

当然只是选择了一个最简单的刷机方式，原版刷官改
具体直接参考[原版帖子](http://koolshare.cn/thread-139965-1-1.html)

## 特色
1. 同步华硕官方代码 
2. koolshare软件中心支持
3. ROG信仰皮肤加成

# 刷机方法
在固件升级页面下直接上传.w 后缀的固件文件
## 固件下载
384_32799
MD5: 3E477C01D18CD455362B61DCCBF33652
SHA1: A2C496EE545A94EADAC4CEC3C9B3A381B1B4ABB2
http://firmware.koolshare.cn/Koolshare_ASUS_Official_Mod/RT-AC86U_3.0.0.4.384.32799/RT-AC86U_384_32799_koolshare_cferom_ubi.w

## 刷虚拟内存
> 这个路由器最大的问题在于架构变更之后，内存占的很厉害，所以需要刷官改的另一个原因就是需要安装虚拟内存

虚拟内存需要挂载一个格式为ext4（ext3）的u盘
### 格式化的方法
#### osx
如果没有 Homebrew 的话，需要先安装 Homebrew：

/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

安装 e2fsprogs

brew install e2fsprogs

把 U 盘插到 Mac 上，执行：

diskutil list

找到自己 U 盘的盘符，比如我这里是：/dev/disk3s1，

```/dev/disk3 (external, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:     FDisk_partition_scheme                        *30.8 GB    disk3
   1:             Windows_FAT_32 SANDISK                 30.8 GB    disk3s1
```
然后执行格式化：

```
diskutil unmountdisk /dev/disk3s1
sudo $(brew --prefix e2fsprogs)/sbin/mkfs.ext4 /dev/disk3s1
```

执行命令后会要求输入用户密码，然后输入 y 确认。

#### win
下一个[minitools](https://www.minitool.com/)

### 加虚拟内存

![软件中心](https://image.koolshare.cn/attachment/forum/201805/18/180949ce1sxrpcmqcxxyep.jpg)
进软件中心下载就好啦

# 重点，不可描述，红色小飞机插件
[gayhub](https://github.com/hq450/fancyss) 注意架构，下载完了之后离线安装

have a nice day
