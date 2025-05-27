---
title: 借助Blazor在浏览器运行dotnet代码
tags:
  - 前端
  - dotnet
date: 2021-05-10 12:11:57
categories: 功能笔记
---

  

# 借助Blazor在浏览器运行dotnet代码

  

**本文重点**，想看步骤的请直接移步[正文](%E5%80%9F%E5%8A%A9Blazor%E5%9C%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E8%BF%90%E8%A1%8Cdotnet%E4%BB%A3%E7%A0%81.md##%E6%AD%A3%E6%96%87%E5%BC%80%E5%A7%8B)

  

- 如何精简`Blazor`的代码，移除界面部分

- 如何和`c#`部分交互

- 如何访问`FS`部分

- 打包构建

  

因为工作上的需要，需要在网页上进行`usm`格式的视频，但是`usm`的视频格式并没有相关的说明，导致也没办法和之前一样直接通过读取二进制流的方式解码然后转mp4流喂给`<video>`

  

不过业内也都是使用`CriDemuxer`来对`usm`视频格式进行解交织的，而且`CriDemuxer`有开源，只不过代码是基于`C#`的，所以最后问题变成了，怎么在网页中运行`C#`代码

  

碎碎念结束

  

## BLAZOR

  

目前将`c#`运行在浏览器端主要靠编译成`wasm`运行，在`net5`之前，想让`dotnet`多端运行就得借助`mono`进行编译，然后`mono`有推出过一个`mono-wasm0.1`的包，可以将编译为`wasm`可以因为维护的原因，已经下不到了

  

不过好在微软官方有一个借助`mono-wasm`的项目 `Blazor` 来实现用 `C#` 来构建网页，虽然用不上他的页面功能，但是四舍五入一下，却可以用它来实现在浏览器端运行 `C#` 代码

  

## 实现步骤

  

### 安装环境

  

根据官方教程即可

[https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor)

  

### 创建项目

  

我们创建一个基于`wasm`的`app`

  

```bash

dotnet new blazorwasm -o BlazorApp --no-https

```

  

然后项目就创建完了，记住和官方教程不一样，是`blazorwasm`

  

### dev

```bash

cd BlazorApp

dotnet watch run

```

  

一个基础项目就起来了，之后开始进行改造

  

### 移除页面相关文件

  

#### 目录

- pages

- Shared

  

#### 文件

- App.razor

- _Imports.razor

  

#### 修改

`Program.cs`移除` builder.RootComponents.Add<App>("#app");

`这行

  

这个时候运行，页面上应该就只有一个`Loading...`了，如果觉得难受，可以修改`wwwroot`下的`index.html`文件

  

### 编写代码

之后整个项目其实就是一个标准的`dotnet`项目了，可以直接将编写的代码移动进来，比如我这里就直接把`CriDemuxerCore`的代码直接移动进来

  

### 编写调用代码

  

在`Program.cs`内注入相关的js入口即可

这样的话，在浏览器内就能调用`c#`的代码了

  

```c#

using Microsoft.JSInterop;

  

[JSInvokable]

public static async Task<string> Demux(string filePath)

{

if (File.Exists(filePath))

{

MpegStream.DemuxOptionsStruct demuxOptions = new MpegStream.DemuxOptionsStruct();

demuxOptions.ExtractVideo = true;

return await Task.Run(() =>

{

Console.WriteLine("Start");

CriUsmStream criUsmStream = new CriUsmStream(filePath);

return criUsmStream.DemultiplexStreams(demuxOptions)[0];

});

}

else

{

throw new Exception(filePath + " Not exists");

}

}

  

```

  

在浏览器中的调用方法

  

```javascript

DotNet.invokeMethodAsync('BlazorApp', 'Demux', '具体文件地址'))

```

  

参数解释一下

- `DotNet`, 全局对象， 会自动注入

- `BlazorApp ` 创建应用的时候取得名字，主要应该和`NameSpace`相关

- `Demux` 刚刚定义的方法名

  

##### 文件系统

  

当然，`FS`系统也是`Blazor`内置的

  

```javascript

FS.writeFile(file.name, new Uint8Array(fileReader.result)) // 写入

FS.readFile(filePath) // 读取

```

  

### 打包

```dotnet publish --configuration Release```

  

之后可以在`bin/Release/net5.0/publish/wwwroot/_framework`内拿到打包的文件，之后只要将该文件夹`copy`进项目，加载其中的`./_framework/blazor.webassembly.js`文件就可以了

  

### 几个问题

1. 打出来的包很大

2. `_framework`必须在网站根目录下

  

第二点可以尝试通过修改`blazor.webassembly.js`内容来尝试解决