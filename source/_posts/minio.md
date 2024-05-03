---
title: minio 部署
tags:
  - minio
  - docker
  - nas
  - 部署
categories: nas 相关
date: 2024-05-03
---


minio 是一个️常用的服务，主要用来对外提供文件代理

我们可以通过使用 docker 进行部署
当然主要还是因为，套件里的 minio 根本没法使用

最主要的就是，我们首先得准备好 minio 的相关文件夹

我们主要还是根据官方给的 compose 来进行部署


```cardlink
url: https://github.com/minio/minio/blob/master/docs/orchestration/docker-compose/docker-compose.yaml
title: "minio/docs/orchestration/docker-compose/docker-compose.yaml at master · minio/minio"
description: "The Object Store for AI Data Infrastructure. Contribute to minio/minio development by creating an account on GitHub."
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://repository-images.githubusercontent.com/29261473/ff41a900-6bfa-11e9-95fe-aa27fe8b337b
```


```cardlink
url: https://github.com/minio/minio/tree/master/docs/docker
title: "minio/docs/docker at master · minio/minio"
description: "The Object Store for AI Data Infrastructure. Contribute to minio/minio development by creating an account on GitHub."
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://repository-images.githubusercontent.com/29261473/ff41a900-6bfa-11e9-95fe-aa27fe8b337b
```


建立完 minio 的文件夹后 直接 进本地运行, 一般新建的文件夹都在/volume1 下，可以对应替换
先拉取 quay.io/minio/minio
然后创建容器
同时配置网络为 host




```cardlink
url: https://www.nathaniel-walser.com/docker-compose-templates/minio
title: "How to deploy MinIO with Docker Compose - Nathaniel Walser"
description: "This Docker Compose tutorial gets you started with MinIO quickly."
host: www.nathaniel-walser.com
favicon: ../favicon.png
```

```
version: "3.4"

  

services:

minio:

image: quay.io/minio/minio

command: server /data --console-address ":9001"

environment:

- MINIO_ROOT_USER=minioadmin

- MINIO_ROOT_PASSWORD=minioadmin

volumes:

- minio_data:/data

ports:

- 9000:9000

- 9001:9001

  

volumes:

minio_data:
```

之后直接运行即可