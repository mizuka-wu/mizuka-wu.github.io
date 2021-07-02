---
title: vuepress-plugin中vue组件如何接受plugin的option
tags:
  - 可以公开的情报
  - 开发
  - 前端
  - vuepress
date: 2021-07-02 14:17:35
categories:
---

# vuepress-plugin中vue组件如何接受plugin的option

基本原理就是，在enhanceAppfile的地方，将之前需要引入的`js`改为动态代码，在注册`component`的地方增加app

```js
// index.js
const enhanceAppFile = require('./enhanceAppFile')
const {resolve} = require('path')

const resolveLib = function(...paths) {
    return resolve(__dirname, 'lib', ...paths)
}

module.exports = (option) => {
    return {
        // 注入component
        enhanceAppFiles() {
            return [
                {
                    name: 'Live2dComponent',
                    content: enhanceAppFile(option)
                }
            ]
        },
        globalUIComponents: "Live2d"
      }
};
```


```js
// enhanceAppFile
const { resolve } = require('path')
module.exports = function(option = {}) {
    return `import Live2d from "${resolve(__dirname, './Live2d.vue')}";
    export default ({ Vue }) => {
      ${Object.keys(option).map(key => {
        let value = option[key]
        switch (typeof value) {
          case 'object': {
            value = `() => (${JSON.stringify(value)})`
            break
          }
          case 'string': {
            value = JSON.stringify(value)
            break
          }
          default: {
            break
          }
        }
        return `(Live2d.props.${key} || {}).default = ${value};`
      }).join('\n')}  
      Vue.component("Live2d", Live2d);
    };`
}
```
