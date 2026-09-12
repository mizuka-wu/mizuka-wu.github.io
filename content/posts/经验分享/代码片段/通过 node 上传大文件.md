---
title: 反思
date: 2024-05-07
tags:
  - nodejs
  - node
  - 大文件
  - form-data
  - 经验分享
categories:
  - 经验分享
summary: title: 反思
---
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