---
title: win 掌机远程控制 ps5
tags:
  - chiaki
  - rewasd
  - psremoteplay
categories: 可以公开的情报
date: 2024-05-05
---
其实一共有两套方案
稍微麻烦一点的时使用 chiaki 或者和我一样使用 psremoteplay

# chiaki
chiaki 也叫千秋其实已经是一个非常成熟的工具了
https://sr.ht/~thestr4ng3r/chiaki/

主要麻烦的一点是，你需要自己获取对应的 psn accound id
#### Obtaining your PSN AccountID

Starting with PS4 7.0, it is necessary to use a so-called "AccountID" as opposed to the "Online-ID" for registration (streaming itself did not change). This ID seems to be a unique identifier for a PSN Account and it can be obtained from the PSN after logging in using OAuth. A Python 3 script which does this is provided in [scripts/psn-account-id.py](https://git.sr.ht/~thestr4ng3r/chiaki/tree/HEAD/scripts/psn-account-id.py). Simply run it in a terminal and follow the instructions. Once you know your ID, write it down. You will likely never have to do this process again.

这块网上相关的教程其实不少，主要还是获取这个 id 和配置稍显麻烦

这里我主要还是采用了 psremote 来进行游戏

# psremoteplay
psremoteplay 的好处在于，这个是个非常官方的库，所以登录和使用起来很方便

唯一的缺陷是，我们 win 掌机实际上都是 xbox 手柄，在使用的时候需要去外接一个 ps 手柄

当然也不是没有办法，这里我们可以采用第三方库进行 xbox 手柄模拟 ps 手柄的操作

这里我采用的是

https://www.rewasd.com/releases/release-5.1.0

rewasd

不过这个是个付费软件，一共支付了 36 元

在 psremote 打开后，同样打开rewasd，然后切换回 psremoteplay 即可实现游玩
