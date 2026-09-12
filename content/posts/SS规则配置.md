---
title: RESTful web API listening address
date: 2024-05-26
tags:
  - 网络
  - 代理
  - 配置
  - 经验分享
  - {name: 手动选择, type: select , include-all-providers: true}
  - {name: PROXY, type: url-test, include-all-providers: true, interval: 300, lazy: true}
  - DOMAIN,clash.razord.top,DIRECT
  - DOMAIN,yacd.haishan.me,DIRECT
  - RULE-SET,google-cn-proxy-ip,PROXY
  - RULE-SET,local-area-network,DIRECT
  - RULE-SET,unban,DIRECT
  - RULE-SET,china-domain,DIRECT
  - RULE-SET,china-media,DIRECT
  - RULE-SET,china-company-ip,DIRECT
  - RULE-SET,china-ip,DIRECT
  - GEOIP,CN,DIRECT,no-resolve
  - MATCH,PROXY
categories:
  - 经验分享
summary: title: RESTful web API listening address
