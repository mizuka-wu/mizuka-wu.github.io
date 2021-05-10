---
title: vuepress文档部署到github-pages
tags:
  - 前端
  - github actions
  - vuepress
date: 2020-02-03 12:11:57
categories: 可以公开的情报
---

# vuepress 文档部署到 github-pages

![](https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=292259422,410673799&fm=26&gp=0.jpg)

## 必须做的

在 docs/.vuepress/config.js 中设置正确的 base。

如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 base 默认即是 "/"。

如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>）`，则将 base 设置为 `/<REPO>/`。

## 发布方案

### sh 脚本

```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

### Travis CI

```yaml
language: node_js
node_js:
  - lts/*
install:
  - yarn install # npm ci
script:
  - yarn docs:build # npm run docs:build
deploy:
  provider: pages
  skip_cleanup: true
  local_dir: docs/.vuepress/dist
  github_token: $GITHUB_TOKEN # 在 GitHub 中生成，用于允许 Travis 向你的仓库推送代码。在 Travis 的项目设置页面进行配置，设置为 secure variable
  keep_history: true
  on:
    branch: master
```

### Github Actions

在`.github/workflow/`下新建 deploy.yml

```yml
name: Publish docs to github actions
on:
  push:
    branches:
      - master
  pull_request:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2 # If you're using actions/checkout@v2 you must set persist-credentials to false in most cases for the deployment to work correctly.
        with:
          persist-credentials: false
      - name: Install
        run: npm ci && npm run-script docs:build
      - name: Install SSH Client
        uses: webfactory/ssh-agent@v0.2.0 # This step installs the ssh client into the workflow run. There's many options available for this on the action marketplace.
        with:
          ssh-private-key: ${{ secrets.DEPLOY_KEY }}

      - name: Build and Deploy Repo
        uses: JamesIves/github-pages-deploy-action@releases/v3-test
        with:
          BASE_BRANCH: master
          BRANCH: gh-pages
          FOLDER: docs/.vuepress/dist
          SSH: true # SSH must be set to true so the deploy action knows which protocol to deploy with.
```

接下来生成 key ，首先

```sh
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f gh-pages -N ""
# You will get 2 files:
#   gh-pages.pub (public key)
#   gh-pages     (private key)
```

然后打开仓库的`settings`，再点击`Secrets`，然后添加咱们刚刚生成的私钥(`gh-pages`的内容)，name 为 DEPLOY_KEY

然后点击`Deploy keys`，添加公钥(`gh-pages.pub`的内容)，`Allow write access`一定要勾上

然后提交即可，接着就会自动发布了
