---
title: 前端和excel的那些事
date: 2020-02-14 23:17:35
tags:
  - excel
  - 前端
  - 经验
categories: 可以公开的情报
---

  

在开发需求中，经常会遇到需要和`excel`相关的需求，毕竟不是所有人都是程序员，很多的业务都是通过`excel`去进行数据的整理归类计算的，`excel`中提供的一系列快捷功能，统计功能也非常的实用，但是这也就造成了除了和接口打交道，前端也需要和`excel`打一下交道

  

## excel 是什么

  

`excel`是微软出的一款电子表格软件，`wps`是国内知名的免费办公软件，以及苹果的`Numbers`同样都支持编辑和生成`excel`文件

  

## excel 的格式

  

这里说的不是单纯的`excel`而是平时前端开发的时候所使用到的**`excel`类型**的文件格式，主要有

  

### csv

  

csv 是一种纯文本的格式，非常的简单，每一行代表一行，没一列通过`,`进行分割，我们只需要通过`split`函数就能直接分割成对应的二维数组结构

  

### xsls/xls

  

区别在于 `xls`类型的文件我们可以通过存储网页的形式存储下来，`xsls`就是一个纯的二进制文件了，这一类更倾向于使用类库进行操作

  

# 读取

  

如果是`csv`，最简单的情况下，就直接使用`<input type="file">`,只有用`fileReader`读取为纯文本就行了

  

`nodejs`和`browser`唯一的区别就在于，`node`还支持直接通过`steam`等概念进行输入，而`browser`只有`arrayBuffer`这一种手段

  

在一般情况下，直接`fileReader`读取`excel`都会是二进制流，不过根据其编码规范是可以进行还原的，其中的对应关系比较负责

  

## 常用的库

  

库的左右就在于，他们能将`excel`的文件专为对应的`js`对象供我们操作

  

### [sheet.js](https://github.com/SheetJS/sheetjs)

  

社区开源版本的`xlsx.js`就可以完成读取和写入的工作了，

  

以下是 sheet.js 的对应数据结构.

  

![](https://segmentfault.com/img/bVbn0TI?w=387&h=634)

  

读取也狠方便

  

```javascript

XLSX.read(buffer, { type: "buffer" });

```

  

不过官方的文档相对还是比较难以理解的，一般日常我用另外一个库

  

### [exceljs](https://github.com/exceljs/exceljs/blob/master/README_zh.md#importing)

  

js-xlsx 的 思想构成也是通过将二进制流转为`js`对象的方式方便我们操作，不过 api 方面设计的更加友好一点

  

最主要的两点。

  

- 中文文档

- demo 易懂

  

读取也很容易，通过`fileReader.readAsArrayBuffer` 就能直接读取，如果是在`node`环境下，更能直接通过`steam`和`file`接口直接获取数据

  

```

// load from buffer

var workbook = new Excel.Workbook();

workbook.xlsx.load(data)

.then(function() {

// use workbook

});

```

  

# 写入

  

## 原生 js

  

这个只适用于 js

  

### xls

  

2013 之前的`xls`模式是可以将一个`html`文件导出成一个`.xls`文件的所以我们首先定义一个`html`

  

```html

<table id="tblData">

<tr>

<th>Name</th>

<th>Email</th>

<th>Country</th>

</tr>

<tr>

<td>John Doe</td>

<td>john@gmail.com</td>

<td>USA</td>

</tr>

<tr>

<td>Michael Addison</td>

<td>michael@gmail.com</td>

<td>UK</td>

</tr>

<tr>

<td>Sam Farmer</td>

<td>sam@gmail.com</td>

<td>France</td>

</tr>

</table>

```

  

接着获取`html`之后导出

  

```javascript

const tableHTML = table.outerHTML.replace(/ /g, "%20");

const url = `data:application/vnd.ms-excel,${tableHTML}`;

window.open(url);

```

  

### csv

  

还能说什么呢，拼接字符串呗

  

## 库

  

### [sheet.js](https://github.com/SheetJS/sheetjs)

  

抱歉不是很熟悉他的输出,可以这样使用来生成一个`base64`从而用 fileSaver 进行下载

  

```javascript

XLSX.write(wb, { bookType: "xlsx", type: "base64" });

```

  

### [exceljs](https://github.com/exceljs/exceljs/blob/master/README_zh.md#importing)

  

exceljs 是我最喜欢使用的一个库了，文档清晰而且支持图片，富文本等各种操作

  

#### 导出

  

导出操作在浏览器端依然是生成一个`ArrayBuffer`废话少说，直接上代码

  

```javascript

function download(workbook, name = "template") {

if (!workbook) {

throw new Error("workbook不能为空");

}

return workbook.xlsx

.writeBuffer()

.then(buffer => new Blob([buffer], { type: "application/octet-stream" }))

.then(blob =>

FileSaver(blob, `${name}-${new Date().toLocaleString()}.xlsx`)

);

}

```

  

#### 填充数据

  

```javascript

var worksheet = workbook.addWorksheet("sheet");

worksheet.columns = [

{ header: "Id", key: "id", width: 10 },

{ header: "Name", key: "name", width: 32 },

{ header: "D.O.B.", key: "DOB", width: 10, outlineLevel: 1 }

];

  

worksheet.addRows([]);

```

  

#### 其他操作

  

文档中已经很详细了，`exceljs`几乎支持了所有可能会用到的`excel`操作，建议熟悉文档即可，像**合并单元格**，**背景图片**，**富文本**，**评论**均可以支持

  

暂不展开了

  

### [ejs-excel](https://github.com/sail-sail/ejsExcel)

  

如果熟悉`ejs`，同时对样式操作，可视化操作的人，可以试试这个，可惜只支持`node`环境，通过`ejs`的语法定义，将数据填充到 excel 中并且生成

  

![](https://camo.githubusercontent.com/f904e5be8a374b38f83af2dddd4ec2820d4bf047/687474703a2f2f646e2d636e6f64652e71626f782e6d652f4672735f52754c584a78595167596f495568474a4a317a7370434a45)

  

=>

  

![](https://camo.githubusercontent.com/7f50d261a58875f8dc2be143b9747878e4feaeb7/687474703a2f2f646e2d636e6f64652e71626f782e6d652f466e524461355a796a672d644937796b434e52305438536f72577943)

  

# 插件

  

[微软官方文档](https://docs.microsoft.com/en-us/office/dev/add-ins/reference/overview/excel-add-ins-reference-overview)

  

excel2016 之后其实 excel 支持使用 js 进行插件的开发，之前工作中遇到过，但是当时不是很完善，等待重新读一遍文档再补充

  

# 参考

  

[[SheetJS] js-xlsx 模块学习指南](https://segmentfault.com/a/1190000018077543)