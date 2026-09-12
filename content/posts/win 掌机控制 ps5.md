---
title: win 掌机远程控制 ps5
date: 2024-05-05
tags:
  - chiaki
  - rewasd
  - psremoteplay
categories:
  - 经验分享
summary: 使用 chiaki 或 psremoteplay 实现 PS5 远程控制方案
---

其实一共有两套方案

稍微麻烦一点的时使用 chiaki 或者和我一样使用 psremoteplay

## chiaki

chiaki 也叫千秋其实已经是一个非常成熟的工具了
https://sr.ht/~thestr4ng3r/chiaki/

主要麻烦的一点是，你需要自己获取对应的 psn accound id

## Obtaining your PSN AccountID

Starting with PS4 7.0, it is necessary to use a so-called "AccountID" as opposed to the "Online-ID" for registration (streaming itself did not change). This ID seems to be a unique identifier for a PSN Account and it can be obtained from the PSN after logging in using OAuth. A Python 3 script which does this is provided in [scripts/psn-account-id.py](https://git.sr.ht/~thestr4ng3r/chiaki/tree/HEAD/scripts/psn-account-id.py). Simply run it in a terminal and follow the instructions. Once you know your ID, write it down. You will likely never have to do this process again.
