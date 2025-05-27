---
title: 通过 node 上传大文件
tags:
  - nodejs
  - node
  - 大文件
  - form-data
categories: 代码片段
date: 2024-05-07
---

## 通过 node 上传大文件

## 背景
因为工作上的原因，开发了一个客户端文件，用来做数据迁移

实际上的流程很简单，下载，清洗，再调用接口导入到另一个网站上

## 出现问题

本地的上传其实是通过 
```javascript
const formData = new FormData();
formData.append('file', blob);
axios.post(xxx, formdata)
```
通过在 nodejs 里边写 formdata 并且通过 axios 进行上传的
遇到的第一个问题是

Buffer问题，因为 formdata 需要使用 blob 作为 file 字段进行上传的

最开始的时候我们的 blob 是通过 fs.readFileSync()生成的

但是在 node 环境下，我们的 node 实际上对 buffer 是有大小限制的

所以我一开始采用的方案是通过流式获取所有的 buffer 之后一起生成一个 blob
```javascript
const blob = await new Promise((resolve, reject) => {
	const stream = fs.createReadStream();
	const blobData = [];
	stream.on('data', chunk => blobData.push(chunk))
	stream.on('end', () => resolve(new Blob(blobData)))
})

```

这样一开始解决了读取 buffer 过大的问题

## 实际问题解决
实际问题还是上传下载的时候，如果读取为 blob的话，也是需要占用一段内存的

这也就造成了在传输 2g 以上大文件的时候出现了闪退

这个时候其实应该会有好几种解决方案

1. 通过分片进行上传，实际上因为后端采用 minio 这个也是天然支持的，但是经过询问之后，发现上传 minio 其实也是后端额外封装了一层接口实现的，但是后端没有实现分片合并的逻辑，所以通过分片的方案就不行了
2. 流式上传，这样可以减少内存的占用

所以上传的时候其实是需要将整个上传流程的 form 也转换成一个 stream

实际上一开始走了一个弯路，因为一开始我的上传逻辑选择了使用 axios，所以搜索关键词自然也选择了使用 axios + stramform

所以最开始的解决思路是


```cardlink
url: https://github.com/axios/axios/issues/4423#issuecomment-1061939611
title: "Node.js axios upload large file using FormData, read all data to the memory, cause out of memory issue.  · Issue #4423 · axios/axios"
description: "Describe the bug Node.js axios upload large file using FormData, read all data to the memory, cause out of memory issue. To Reproduce const formData = new FormData(); formData.append('file', fs.cre..."
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/634dccd73c6854d9396159aabc22fe62095782d07c3cd73cd2ad5eb01b9f55dc/axios/axios/issues/4423
```

和别人一直通过 formdata-polyfill（实际上是我看了原代码之后自己封了一个）实现了一个 formDataToBlob方法，将自身的 formdata 转为了一个大的 stream 之后喂给了 axios，但是实际上效果非常的不好，闪退问题其实并没有解决，虽然概率变低了但是比较大的文件仍然还是会闪退

但是返回来思考，就发现，错误在我进行上传封装的时候，事先将文件转换成了 blob，所以占了很大一部分内存，然后在转换成 form 和 form 转换成 blob 的时候，实际上又占了很大两段内存

所以需要解决的是
1. 将文件以流的形式读取
2. 上传的 stream 不能把整个 form 转为 blob

经过自己尝试之后，还是打算采用第三方库


```cardlink
url: https://github.com/form-data/form-data
title: "GitHub - form-data/form-data: A module to create readable `\"multipart/form-data\"` streams.  Can be used to submit forms and file uploads to other web applications."
description: "A module to create readable `&quot;multipart/form-data&quot;` streams.  Can be used to submit forms and file uploads to other web applications.  - GitHub - form-data/form-data: A module to create r..."
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/f39abe7f42e42fd2c271f901932663d17c8872ebfd81469f16de1e19564a8b75/form-data/form-data
```

只要直接给 file 字段传递一个 stream 即可

```js
var FormData = require('form-data');
var fs = require('fs');

var form = new FormData();
form.append('my_field', 'my value');
form.append('my_buffer', new Buffer(10));
form.append('my_file', fs.createReadStream('/foo/bar.jpg'));
```

至此，2g 文件上传解决

# 另一个问题
虽然本地和测试都通过了 2g 文件的上传

但是投入实际生产之后，又遇到了 4g 文件会导致内存崩溃的问题

一开始感觉是，就算采用了流式上传，但是因为用户的电脑问题，可能内存占用还是偏高

偏偏好几例通过了重启电脑解决了，不过有一个用户上传始终解决不了

于是跑了一趟现场，结果发现

64g 内存的电脑会内存不足？

于是在自己的电脑上模拟了 5g 的文件

好家伙，结果真的是必崩溃，将系统的内存进程调出来查看之后

发现在上传的过程中，其实内存还是会突然上涨，而且涨了。。。10g？

怀疑就是 axios 的问题，因为通过 axios 的 onuploadprogress 看到基本上接口数据上传速度 1s 内就到了 100% （虽然其实结果一直还没完全响应），那应该就是就算 formdata 是流式的，但是 axios 的传输数据还是一次性发送了整个数据包，这也大概符合了整个上传的内存上涨趋势

### 采用流式上传

首先考虑到的，还是 formdata 问题，就算数据是流，但是一次性都读取完是不是也还是会内存暴涨？阅读文档的时候看到有 datasize 的相关参数，于是跟着调整了一波，结果不幸的是，没啥反应

那么会不是是 axios 的问题？
正好 form-data 的相关 readme 里有一段是采用原始的 request 上传的 demo

```javascript
form.submit('http://example.com/', function(err, res) {
    if (err) throw err;
    console.log('Done');
  });
```

结果换上之后，整个请求流程体感慢了不少，但是看内存情况没有啥明显变化了

等待了一会之后，竟然没有闪退并且成功了！

于是问题确定了，还是 axios 上传实际上没有走流式上传，不过目前也不考虑在传递 form 的情况下把 form 转为 stream 了

直接修改一下 submit 让其支持上传进度即可

```javascript
const request = form.submit('http://example.com/', function(err, res) {
    if (err) throw err;
    console.log('Done');
});
const total = fs.statSync().size; // 读取的本地文件大小
request.on('pipe', (pipe) => {
	let loaded = 0;
	pipe.on('data', (chunk) => {
		loaded += chunk.size
	})
})

```

于是上传进度也 ok 了，如果想要调整上传速率，创建 form 的时候，调整 dataSize 即可


# 反思

虽然实际上最终改动没有很大，但是排查和修复闪退问题实际上已经花了 3 天多了，之所以那么晚才解决，真的是因为路径依赖，axios 用的习惯了不太愿意放手，同时，依赖 fs的相关同步 api，虽然内存问题平时看起来不严重，但是一旦到了大文件上，就很容易触发闪退问题了