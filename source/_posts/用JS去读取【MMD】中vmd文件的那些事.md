---
title: 用JS去读取【MMD】中vmd文件的那些事
tags:
  - 前端
  - mmd
  - vmd
  - 二进制
  - 读取
date: 2020-12-06 12:11:57
categories: 可以公开的情报
---

  

> 未来能用`js`编写的软件，都会用`js`编写

  

## 前言

  

MikuMikuDance，简称MMD，如果是b站用户的话，应该都看到过一个专门的mmd分区，里面是各类舞蹈视频，这个是早期（真的很久了）给v家角色制作舞蹈动画的一个软件，当然除了v家6人以外，崩坏3，元神各类角色相关的宅舞投稿都有

  

`mmd`其实本质上还是一款三维动画制作软件，包含 模型 动作 关键帧等一系列相关的概念，模型的话，TGA式，大妈式，很多都有相关的配布，模型和镜头也有相关的发布，其实相关产业已经很完善了，但是这一次，我打算对`mmd`中保存**动作**，**镜头**，**表情**和**关键帧**的`VMD（Vocaload Mation Data）`文件下手了，当然主要还是因为。。。

  

`mmd`不支持`mac`!我不想装`windows`啊，作为前端工程师的我，如果想实现类似的渲染，那么，一方面是需要搞定模型的渲染**(Tree.js永远的神)**,另一方面就是能够编辑解析其中的`vmd`文件了

  

当然，为了解决动作的问题, 一方面，`mmd`提供了`kinect`进行捕捉，另一方面，我也想试试用`posenet`来解析动作，不过在这之前，先得吧`vmd`搞定

  

顺便，练习一下用`js`读取二进制流嘛

  

## 几个概念

  

### 二进制流

  

文件其实就是一堆 **0，1** 组成的二进制码流，在`javascript`的世界中，这种文件叫做[`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), 虽然我们不能直接操作，但是做相应的读取还是没用问题的

  

> 你不能直接操作 ArrayBuffer 的内容，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

  

用`js`获取二进制流有几种办法，最常用的就是从`file`直接转过来，这里我们通过[FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsArrayBuffer)即可

  

> FileReader 接口提供的 readAsArrayBuffer() 方法用于启动读取指定的 Blob 或 File 内容。当读取操作完成时，readyState 变成 DONE（已完成），并触发 loadend 事件，同时 result 属性中将包含一个 ArrayBuffer 对象以表示所读取文件的数据。

  

当然啦，还有很多种办法，比如把请求头设置成`arrayBuffer`等等，这里请查阅相关的文档吧

  

### TypedArray

  

在真实的使用场景（比如其他语言体系，例如c）其实对`bytes`有很多种不同的编码方案，用来表示不同的类型，`int`型一般`2`个字节这种，在js中也有相对应的[TypedArrays](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Typed_arrays)

  

只要参考对照表，其实读取方面就比较简单了

  

<table>

<tr>

<td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int8Array"><code>Int8Array</code></a></td>

<td><code>-128</code> to <code>127</code></td>

<td>1</td>

<td>8-bit two's complement signed integer</td>

<td><code>byte</code></td>

<td><code>int8_t</code></td>

</tr>

<tr>

<td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array"><code>Uint8Array</code></a></td>

<td><code>0</code> to <code>255</code></td>

<td>1</td>

<td>8-bit unsigned integer</td>

<td><code>octet</code></td>

<td><code>uint8_t</code></td>

</tr>

<tr>

<td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray"><code>Uint8ClampedArray</code></a></td>

<td><code>0</code> to <code>255</code></td>

<td>1</td>

<td>8-bit unsigned integer (clamped)</td>

<td><code>octet</code></td>

<td><code>uint8_t</code></td>

</tr>

<tr>

<td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int16Array"><code>Int16Array</code></a></td>

<td><code>-32768</code> to <code>32767</code></td>

<td>2</td>

<td>16-bit two's complement signed integer</td>

<td><code>short</code></td>

<td><code>int16_t</code></td>

</tr>

<tr>

<td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array"><code>Uint16Array</code></a></td>

<td><code>0</code> to <code>65535</code></td>

<td>2</td>

<td>16-bit unsigned integer</td>

<td><code>unsigned short</code></td>

<td><code>uint16_t</code></td>

</tr>

<tr>

<td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array"><code>Int32Array</code></a></td>

<td><code>-2147483648</code> to <code>2147483647</code></td>

<td>4</td>

<td>32-bit two's complement signed integer</td>

<td><code>long</code></td>

<td><code>int32_t</code></td>

</tr>

<tr>

<td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array"><code>Uint32Array</code></a></td>

<td><code>0</code> to <code>4294967295</code></td>

<td>4</td>

<td>32-bit unsigned integer</td>

<td><code>unsigned long</code></td>

<td><code>uint32_t</code></td>

</tr>

<tr>

<td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array"><code>Float32Array</code></a></td>

<td><code>1.2</code><span>×</span><code>10<sup>-38</sup></code> to <code>3.4</code><span>×</span><code>10<sup>38</sup></code></td>

<td>4</td>

<td>32-bit IEEE&nbsp;floating point number (7 significant digits e.g.,&nbsp;<code>1.1234567</code>)</td>

<td><code>unrestricted float</code></td>

<td><code>float</code></td>

</tr>

<tr>

<td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array"><code>Float64Array</code></a></td>

<td><code>5.0</code><span>×</span><code>10<sup>-324</sup></code> to <code>1.8</code><span>×</span><code>10<sup>308</sup></code></td>

<td>8</td>

<td>64-bit IEEE floating point number (16 significant digits e.g.,&nbsp;<code>1.123...15</code>)</td>

<td><code>unrestricted double</code></td>

<td><code>double</code></td>

</tr>

<tr>

<td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array"><code>BigInt64Array</code></a></td>

<td><code>-2<sup>63</sup></code> to&nbsp;<code>2<sup>63</sup>-1</code></td>

<td>8</td>

<td>64-bit two's complement signed integer</td>

<td><code>bigint</code></td>

<td><code>int64_t (signed long long)</code></td>

</tr>

<tr>

<td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigUint64Array"><code>BigUint64Array</code></a></td>

<td><code>0</code> to&nbsp;<code>2<sup>64</sup>-1</code></td>

<td>8</td>

<td>64-bit unsigned integer</td>

<td><code>bigint</code></td>

<td><code>uint64_t (unsigned long long)</code></td>

</tr>

</table>

  

### VMD文件的格式

  

光有文件流，还需要一套相应的读取方案才行，感谢国内两位大佬的相关文章，解惑了

  

#### 文档

  

* [【MMD】用python解析VMD格式读取

](https://www.jianshu.com/p/ae312fb53fc3?from=groupmessage&isappinstalled=0)

  

* [MMD中的VMD文件格式详解

](https://blog.csdn.net/haseetxwd/article/details/82821533)

* [官方文档VMD file formatMMD Wiki](http://mikumikudance.wikia.com/wiki/VMD_file_format)

  

可以看到的，不同的字节区域，一般代表了不同的数据，只要读取指定长度的数据，根据之前对照表上的对照关系，就可以成功读取了

  

### 编码格式

  

这里科普一下，计算机世界是包含不同的编码格式的，网页现在基本上都是`utf-8`编码，在欧美因为是英语环境，主要的还是`unicode`，国内类似香港地区用的是`big5`，大陆用的是`gb2312`，编码主要是为了解决字符集的问题，不同的编码格式转换的时候，就会造成**乱码**这个现象，不知道这个编码对应显示哪个字符，作为一个日本软件，还是一个早年的日本软件，`vmd`文件采用了

  

**SHIFT_JIS**

  

进行编码，这个我尝试过了，通过浏览器自带的`TextDecoder`可以解码成文字，但是`TextEncoder`却不行

  

> Properties

> The TextEncoder interface doesn't inherit any property.

>

> TextEncoder.prototype.encodingRead only

Always returns "utf-8".

  

瞬间扎心了，不过后来在网上看到有人做好了转换库，万能的`js`

  

## 开工

  

### 读取文件

  

因为我是本地文件，所以起了一个`http`服务通过`fetch`方法直接返回了

  

```javascript

fetch('/models/mmd/vmds/test.vmd')

.then(res => res.blob())

.then(blob => blob.arrayBuffer())

.then((arrayBuffer) => {}

```

  

### 开始读取数据

  

一开始我想的是，通过`arrayBuffer`的切割功能，每次都返回一个子序列，之后的读取读子序列，这样其实每次都是从头读取一定长度了，然而理想很丰满，现实很残酷，因为每次**引用对象**对象都进行变更，导致一旦上了循环，速率立马从`ms`级别掉到`min`级别，为此，我只能特别开了一个`index`标记上一次的开头，然后游离这个指针获取数据，速度还不错，不过指针这个东西。。。很容易没操作好类型的话，就是一个 `out of bounds`，不过这个是后话了

  

### 读取字符串的问题

  

记得解码器要用`SHIFT_JIS`格式！我一开始用的是浏览器自带的`TextDecoder`, 后来就直接上了`shiftjis`这个`js`库来解析和编码了

  

#### 版本信息

  

最开头版本信息**（VersionInformation）**长度为30，有两种可能

  

- Vocaloid Motion Data file

- Vocaloid Motion Data 0002

  

当然话是那么说没错啦，直接读取前30个bytes就可以了，但是这两串字符其实不是百分百填满的，通过

  

`new TextDecode('shift_jis').decode`进行解码之后发现其实还带了乱码，更可恶的是，是空字符，只有复制下来自己粘贴之后才能看得到！为什么这个很重要呢？因为接下来的**模型名称**是要根据版本信息判断长度的！

  

如果同时把对应的`ArrayBuffer`输出出来之后，会发现，后面跟了一串`0`所以读取字符串之后把对应的`0`先抹掉，然后用抹掉之后的`ArrayBuffer`解码，完美的字符串

  

#### 模型名称

  

根据`version`判断长度之后一样读取，不过查看原始`ArrayBuffer`之后发现，填充的不是全是`0`了，而是`0,253,253,253...`，把过滤乱码策略改了一下，`0`开头之后的都不要了

  

### 读取关键帧

  

根据`vmd`格式提到的，`vmd`格式存储是分区块的，一般是一类的关键帧放在一起，所以读取之前，需要先读取这一类有多少帧，然后循环读取

  

#### 获取数字的方法

  

之前提到过，读取的都是`ArrayBuffer`但是要转换为我们具体的数字的话，就得靠解码器了，首先得知道要解码的是什么类型的数字，好在文件配置里都有，例如数量就是一个`uint32_t`，之后我们查询上表之后可以知道，对应的是`Uint32Array`, 那读取的长度一方面可以看配置表，另一方面，`Uint32Array`自带一个`BYTES_PER_ELEMENT`属性，告诉你需要至少读取几位的，所以我这边通过`DateView`获取数字

  

```javascript

const buffer = this.readBytes(Type.BYTES_PER_ELEMENT)

const view = new DataView(buffer, 0)

return view.getUint32(0, true)

```

  

解释一下，读取一定的`bytes`然后扔进`dataView`里，然后通过`dataView`的`getUint32`方法获取到真实数字

  

**特别注意** 参数里`0`和`true`是必须的，编码其实有大端序和小端序两种，`vmd`是小端序，但是默认是大端序

  

### 准备完成了，开始读取关键帧就好了

  

之后就比较枯燥了，根据配置去设置每个关键帧怎么读取，读取方案又是什么，然后开始跑循环，之后就能收获啦

  

唯一的问题，我不知道为什么有4个bytes没用上，不过看了一下都是0，就算了

  

## 写入

  

光读取不写入的话，是没办法生成`vmd`文件的，好在写入的方法和读取是一个反操作，基本就是

  

### 字符串

  

根据给定的长度，先生成`arrayBuffer`之后填入，主要`version`的填充用0，其他用253,不过还是要注意编码，因为`TextDecoder`不行所以我换了`shiftjis`的`encode`

  

```javascript

writeString (text = '', length = 0) {

const textBuffer = shiftjis.encode(text)

const buffer = new Uint8Array(length)

buffer.fill(253, textBuffer.length + 1)

buffer.set(textBuffer)

  

// 只有version是靠0填充的

if (text === VERSION.V1 || text === VERSION.V2) {

buffer.fill(0, textBuffer.length)

}

  

return buffer.buffer

}

  

```

  

因为`uint8`是单子节，而且可以用`fill`，`set`等方法(生成指定长度的时候会自动填充0)，`.buffer`可以获取到原始的`ArrayBuffer`

  

### 数字

  

用`DataView`的`setUint32`等方法即可

  

### 拼接ArrayBuffer

  

和之前字符串的方案类似，设定总长度之后不停的`set`就行了，我事先保存成了一个`ArrayBuffer`的数组，最后对它拼接

  

```javascript

const totalBytes = this.bufferList.reduce((_totalBytes, buffer) => {

return _totalBytes + new Uint8Array(buffer).length

}, 0)

  

const result = new Uint8Array(totalBytes)

let offset = 0

  

for (const buffer of this.bufferList) {

result.set(new Uint8Array(buffer), offset)

offset += buffer.byteLength

}

  

const buffer = result.buffer

  

return buffer

```

  

至此位置，读取和生成的操作就可以了，之后可以通过`new Blob([arrayBuffer])`来实现导出

  

## 总结

  

其实核心原理还是对二进制的操作，在看得到文档的情况下并不是很难，更加重要的是细心和耐心，不过浏览器js对多语言编码其实还是有很大的不足的

  

总而言之，这个`vmd`读取和编写，我做了一个`vmd.js`的`npm`包，相关代码也可以在对应的 [GITHUB](https://github.com/mizuka-wu/vmd-js) 上直接查看, 欢迎使用啦

  

之后会尝试将`posenet`给整好，用`posenet`生成动作文件x