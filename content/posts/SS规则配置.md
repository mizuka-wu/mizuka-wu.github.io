---
title: SS规则配置
tags:
  - 网络
  - 代理
  - 配置
date: 2024-05-26
---

```
# 官方配置模板：https://github.com/Dreamacro/clash/wiki/Configuration
# Meta配置模板：https://github.com/MetaCubeX/Clash.Meta/blob/Alpha/docs/config.yaml
# 接管：部分参数不支持在此页面直接修改，请到全局设置页面进行修改

# Port of HTTP(S) proxy server on the local end
port: 7890

# Port of SOCKS5 proxy server on the local end
socks-port: 7891

# Transparent proxy server port for Linux and macOS (Redirect TCP and TProxy UDP)
redir-port: 7892

# Transparent proxy server port for Linux (TProxy TCP and TProxy UDP)
tproxy-port: 7893

# HTTP(S) and SOCKS4(A)/SOCKS5 server on the same port
mixed-port: 7893


allow-lan: true

bind-address: '*'

mode: rule


# RESTful web API listening address
external-controller: 127.0.0.1:9090




proxy-providers:
  provider1:
    type: http
    url: "http://192.168.3.99:6080/download/batvpn?target=ClashMeta&d_token="
    interval: 3600
    path: ./nas.yaml
    health-check:
      enable: true
      interval: 600
      # lazy: true
      url: http://www.gstatic.com/generate_204

proxy-groups:
  - {name: 手动选择, type: select , include-all-providers: true}
  - {name: PROXY, type: url-test, include-all-providers: true, interval: 300, lazy: true}
  
rule-providers:
  reject:
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/reject.txt"
    path: ./ruleset/reject.yaml
    interval: 86400

  google-cn-proxy-ip:
    type: http
    behavior: classical
    format: text
    path: ./rules/GoogleCNProxyIP.list
    url: "https://cdn.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/GoogleCNProxyIP.list"
    interval: 86400

  local-area-network:
    type: http
    behavior: classical
    format: text
    path: ./rules/LocalAreaNetwork.list
    url: "https://cdn.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/LocalAreaNetwork.list"
    interval: 86400

  unban:
    type: http
    behavior: classical
    format: text
    path: ./rules/UnBan.list
    url: "https://cdn.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/UnBan.list"
    interval: 86400

  china-domain:
    type: http
    behavior: classical
    format: text
    path: ./rules/ChinaDomain.list
    url: "https://cdn.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/ChinaDomain.list"
    interval: 86400

  china-media:
    type: http
    behavior: classical
    format: text
    path: ./rules/ChinaMedia.list
    url: "https://cdn.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/ChinaMedia.list"
    interval: 86400

  china-company-ip:
    type: http
    behavior: classical
    format: text
    path: ./rules/ChinaCompanyIp.list
    url: "https://cdn.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/ChinaCompanyIp.list"
    interval: 86400

  china-ip:
    type: http
    behavior: classical
    format: text
    path: ./rules/ChinaIp.list
    url: "https://cdn.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/ChinaIp.list"
    interval: 86400
    
rules:
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
```