---
title: github-actions分享
date: 2020-02-15 11:12:53
tags:
  - js
  - ecmascript
  - github
  - github actions
categories: 开发的捷径
---

![](https://www.wangbase.com/blogimg/asset/201909/bg2019091201.jpg)

# NPM 发布

需要提前申请`NPM`的`token`,在`secrets`中新建`NPM_TOKEN`

会在推送到`master`分支的时候自动触发

```yml
name: publish to npm
on:
  push:
    branches:
      - master
  pull_request:
    branches:
      - master

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2 # If you're using actions/checkout@v2 you must set persist-credentials to false in most cases for the deployment to work correctly.
        with:
          persist-credentials: false
      - name: Install
        run: npm ci && npm run build-lib && npm run changelog
      - name: publish
        uses: JS-DevTools/npm-publish@v1
        with:
          token: ${{ secrets.NPM_TOKEN }}
```

# release 发布

需要提前申请`GITHUB`的`token`,需要有`release`,权限,在`secrets`中新建`GH_TOKEN`

有`v1.0`这类 tag 时候触发

```yml
name: upload release asset
on:
  push:
    # Sequence of patterns matched against refs/tags
    tags:
      - "v*" # Push events to matching v*, i.e. v1.0, v20.15.10
jobs:
  build:
    name: Upload Release Asset
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2 # If you're using actions/checkout@v2 you must set persist-credentials to false in most cases for the deployment to work correctly.
        with:
          persist-credentials: false
      - name: Install
        run: npm ci && npm run build-lib
      - name: Build project # This would actually build your project, using zip for an example artifact
        run: zip -r lib.zip lib
      - name: Create Release
        id: create_release
        uses: actions/create-release@v1.0.0
        env:
          GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body: ${{ steps.read_changelog.outputs.data }}
          draft: false
          prerelease: false
      - name: Upload Release Asset
        uses: actions/upload-release-asset@v1.0.1
        env:
          GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }} # This pulls from the CREATE RELEASE step above, referencing it's ID to get its outputs object, which include a `upload_url`. See this blog post for more info: https://jasonet.co/posts/new-features-of-github-actions/#passing-data-to-future-steps
          asset_path: ./lib.zip
          asset_name: lib.zip
          asset_content_type: application/zip
```

# doc 发布

这里使用`vuepress`构建文档

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
          CLEAN: true
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

# Gitee 同步

```yml
name: Sync To Gitee
on: page_build
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: wearerequired/git-mirror-action@master
        env:
          SSH_PRIVATE_KEY: ${{ secrets.GITEE_PRIVATE_KEY }}
        with:
          source-repo: "git@gitee.com:mizuka/Mizuka.gitee.io.git"
          destination-repo: "git@gitee.com:mizuka/Mizuka.gitee.io.git"
```
