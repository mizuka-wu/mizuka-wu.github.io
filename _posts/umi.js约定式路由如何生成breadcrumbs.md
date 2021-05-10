---
title: umi.js约定式路由如何生成breadcrumbs
tags:
  - umi.js
  - 面包屑
  - 路由
  - 约定式路由
date: 2019-08-15 10:32:01
categories: 可以公开的情报
---

# umi.js 约定式路由如何生成 breadcrumbs

umi，中文可发音为乌米，是一个可插拔的企业级 react 应用框架。umi 以路由为基础的，支持类 next.js 的约定式路由

## 遇到的问题

因为比较喜欢约定式路由，看目录结构很清晰，所以整个项目都是使用了约定式的路由结构，相对的，umi 会在 pages 下自动建立自己的 router 问题，将路由配置管理在里面  
但是到了建立自动的面包屑的时候却遇到了问题，没办法初始化

### 官方的方法

[https://umijs.org/zh/guide/router.html#%E9%9D%A2%E5%8C%85%E5%B1%91](https://umijs.org/zh/guide/router.html#%E9%9D%A2%E5%8C%85%E5%B1%91)

```javascript
import NavLink from "umi/navlink";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";

// 更多配置请移步 https://github.com/icd2k3/react-router-breadcrumbs-hoc
const routes = [
  { path: "/", breadcrumb: "首页" },
  { path: "/list", breadcrumb: "List Page" }
];

export default withBreadcrumbs(routes)(({ breadcrumbs }) => (
  <div>
    {breadcrumbs.map((breadcrumb, index) => (
      <span key={breadcrumb.key}>
        <NavLink to={breadcrumb.props.match.url}>{breadcrumb}</NavLink>
        {index < breadcrumbs.length - 1 && <i> / </i>}
      </span>
    ))}
  </div>
));
```

### 实际的问题

routes 并不是自己配置的所以没办法传入，google 全网也没提到如何解决，于是实际问题变成了如何获取 routes

#### 解决方案 1

既然`src/pages/.umi/router`这个文件已经存在了，直接引入，让 webpack 最终自动打包进去

实际上，因为用的 typescript，没办法直接引入 js 文件，最终失败

#### 解决方案 2

手写

和用约定式路由的理念冲突了

#### 最终解决方案

它既然缺 routes,umi 又会自动生成，那就直接直接挪出来用呗 umi 使用的路由插件提供了[更新时回调功能](https://www.npmjs.com/package/umi-plugin-routes#optionupdate) 借用这个，在订好的路径下将路由信息导出来就好了

##### 具体代码

修改.umirc.js 中的 routes 为

```

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /utils\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /utils\.(t|j)sx?$/,
            /components\//,
          ],
          update(routes) {
            fs.writeFileSync(
              './src/utils/routes.ts',
              `/**
 * 自动根据配置生成的路由文件，方便获取目录结构
 */
export default ${JSON.stringify(routes[0].routes.filter(route => route.path), null, 2).replace(
                /"(\w+)":/g,
                '$1:',
              )}`,
              { flag: 'w' },
            )
            return routes
          },
        },
```

最终，breadcrumbs 就能实时获取路由信息了
