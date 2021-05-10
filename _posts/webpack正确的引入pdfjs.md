---
title: webpack正确的引入pdf.js
tags:
  - 笔记
  - 学习
  - 记录
  - vscode
date: 2019-08-15 15:32:01
categories: 开发的捷径
---

# pdf.js

废话不多说,直接上代码

```javascript
import pdfjs from 'pdfjs-dist/webpack'
```

简单明了，不用考虑 pdf.worker.js,不用考虑 cdn

## 附上最近做的 pdf 生成和导出的两个库的基础配置

```javascript
import pdfMake from 'pdfmake-support-chinese-fonts/pdfmake.min'
import pdfFonts from 'pdfmake-support-chinese-fonts/vfs_fonts'
import pdfjs from 'pdfjs-dist/webpack'
pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Regular.ttf',
    italics: 'Roboto-Regular.ttf',
    bolditalics: 'Roboto-Regular.ttf'
  },
  fangzhen: {
    normal: 'fzhei-jt.TTF',
    bold: 'fzhei-jt.TTF',
    italics: 'fzhei-jt.TTF',
    bolditalics: 'fzhei-jt.TTF'
  }
}

export const pdfMaker = pdfMake
export const pdfViewer = pdfjs
```
