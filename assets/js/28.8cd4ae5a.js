(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{422:function(t,s,a){"use strict";a.r(s);var e=a(9),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"为何要做同步"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为何要做同步"}},[t._v("#")]),t._v(" 为何要做同步")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img1.imgtn.bdimg.com/it/u=3328166195,3116952432&fm=26&gp=0.jpg",alt:""}}),t._v(" "),a("code",[t._v("github")]),t._v("是国际通用的代码托管平台，奈何身处国内，往往受限于网速，如果"),a("strong",[t._v("个人博客")]),t._v("，"),a("strong",[t._v("项目主页")]),t._v("托管在"),a("code",[t._v("github")]),t._v("上的话，访问速度也是十分堪忧")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3526790943,918011832&fm=26&gp=0.jpg",alt:""}}),t._v("\n让我们把目光瞄准国内，国内的知名替代品主要是"),a("code",[t._v("gitee")]),t._v("和"),a("code",[t._v("coding")]),t._v(", 因为在国内，同时有"),a("code",[t._v("pages")]),t._v("的这两家成了我们的首选，这里以"),a("code",[t._v("gitee")]),t._v("为例子,让两个 "),a("code",[t._v("github")]),t._v("和"),a("code",[t._v("gitee")]),t._v("的仓库和"),a("code",[t._v("pages")]),t._v("自动进行同步")]),t._v(" "),a("h2",{attrs:{id:"为何可以同步"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为何可以同步"}},[t._v("#")]),t._v(" 为何可以同步")]),t._v(" "),a("p",[a("code",[t._v("git")]),t._v("设计之初其实就是分布式管理的，同步很正常")]),t._v(" "),a("h2",{attrs:{id:"同步方案"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#同步方案"}},[t._v("#")]),t._v(" 同步方案")]),t._v(" "),a("p",[t._v("同步方案主要三种")]),t._v(" "),a("h3",{attrs:{id:"同步上传"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#同步上传"}},[t._v("#")]),t._v(" 同步上传")]),t._v(" "),a("p",[t._v("通过"),a("code",[t._v("remote")]),t._v(" 设定不同的别名，上传两遍")]),t._v(" "),a("h3",{attrs:{id:"gitee-》-github"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gitee-》-github"}},[t._v("#")]),t._v(" gitee =》 github")]),t._v(" "),a("p",[t._v("这应该是最常用的一种，"),a("code",[t._v("git")]),t._v("远程仓库选用国内的"),a("code",[t._v("gitee")]),t._v(",然后通过"),a("code",[t._v("gitee")]),t._v("的 webhook 触发"),a("code",[t._v("devops")]),t._v("进行同步，缺点是要自己准备"),a("code",[t._v("devops")]),t._v("，出一份钱")]),t._v(" "),a("h3",{attrs:{id:"github-》-gitee"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#github-》-gitee"}},[t._v("#")]),t._v(" github =》 gitee")]),t._v(" "),a("p",[t._v("借助万能的"),a("code",[t._v("github actions")]),t._v("在代码"),a("strong",[t._v("提交")]),t._v(","),a("strong",[t._v("合并")]),t._v("之后自动调用写好的"),a("code",[t._v("action")]),t._v("进行同步")]),t._v(" "),a("p",[t._v("当然，人工点也可以，"),a("code",[t._v("gitee")]),t._v("提供了对应服务")]),t._v(" "),a("h1",{attrs:{id:"github-gitee-同步方案"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#github-gitee-同步方案"}},[t._v("#")]),t._v(" github => gitee 同步方案")]),t._v(" "),a("h2",{attrs:{id:"代码库同步"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#代码库同步"}},[t._v("#")]),t._v(" 代码库同步")]),t._v(" "),a("p",[t._v("借助"),a("code",[t._v("wearerequired/git-mirror-action@master")]),t._v("这个"),a("code",[t._v("git")]),t._v("自动同步的"),a("code",[t._v("actions")]),t._v(", 我们可以实现任意仓库自动同步"),a("br"),t._v("\n闲着没事上去点一下也没问题")]),t._v(" "),a("h3",{attrs:{id:"actions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#actions"}},[t._v("#")]),t._v(" actions")]),t._v(" "),a("p",[t._v("以下是我使用的"),a("code",[t._v(".github/workflows/sync.yml")]),t._v("\n记得修改 "),a("strong",[t._v("source-repo")]),t._v(" 和 "),a("strong",[t._v("destination-repo")]),t._v("为对应的两个仓库")]),t._v(" "),a("div",{staticClass:"language-yml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Sync To Gitee\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("on")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" page_build\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("jobs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("sync")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("runs-on")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ubuntu"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("latest\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("steps")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("uses")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" wearerequired/git"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("mirror"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("action@master\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("env")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("SSH_PRIVATE_KEY")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" $"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" secrets.GITEE_PRIVATE_KEY "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("with")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("source-repo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"git@gitee.com:mizuka/Mizuka.gitee.io.git"')]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("destination-repo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"git@gitee.com:mizuka/Mizuka.gitee.io.git"')]),t._v("\n")])])]),a("p",[t._v("因为有"),a("code",[t._v("page")]),t._v("的关系，所以触发条件改为了"),a("code",[t._v("page_build")]),t._v("，如果只是普通的同步的话，可以把"),a("code",[t._v("on")]),t._v("换成对应的触发条件")]),t._v(" "),a("h3",{attrs:{id:"添加钥匙"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#添加钥匙"}},[t._v("#")]),t._v(" 添加钥匙")]),t._v(" "),a("p",[t._v("接下来是增加"),a("strong",[t._v("私钥")]),t._v(", 因为同步过程通过"),a("code",[t._v("ssh")]),t._v("触发，我们需要使用 "),a("code",[t._v("ssh-keygen")]),t._v(" 命令生成一对"),a("strong",[t._v("公钥")]),t._v("和"),a("strong",[t._v("私钥")]),t._v("，注意命名，然后将"),a("strong",[t._v("公钥")]),t._v("（***.pub）的内容添加到"),a("code",[t._v("github")]),t._v("和"),a("code",[t._v("gitee")]),t._v("的可信名单里")]),t._v(" "),a("p",[t._v("接下来，在对应的仓库"),a("code",[t._v("setting")]),t._v("的"),a("code",[t._v("secrets")]),t._v("中添加"),a("strong",[t._v("GITEE_PRIVATE_KEY")]),t._v(",内容为之前的"),a("strong",[t._v("私匙")])]),t._v(" "),a("p",[t._v("这样子，每次部署之后，"),a("code",[t._v("github")]),t._v(" 会自动推送到 "),a("code",[t._v("gitee")]),t._v("上")]),t._v(" "),a("h2",{attrs:{id:"pages-同步"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pages-同步"}},[t._v("#")]),t._v(" pages 同步")]),t._v(" "),a("h3",{attrs:{id:"如何开启-pages"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何开启-pages"}},[t._v("#")]),t._v(" 如何开启 pages")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("github")]),t._v(" 普通项目"),a("code",[t._v("gh-pages")]),t._v("分支和 "),a("code",[t._v("用户名.github.io")]),t._v("的"),a("code",[t._v("master")]),t._v("分支会自动开启"),a("code",[t._v("github pages")])]),t._v(" "),a("li",[a("strong",[t._v("gitee")]),t._v(" 服务里有"),a("code",[t._v("gtiee pages")]),t._v("服务,点击打开")])]),t._v(" "),a("h3",{attrs:{id:"gitee-的问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gitee-的问题"}},[t._v("#")]),t._v(" gitee 的问题")]),t._v(" "),a("p",[a("code",[t._v("gitee")]),t._v("的"),a("code",[t._v("pages")]),t._v("服务如果没有花费"),a("strong",[t._v("99/年")]),t._v("开启"),a("code",[t._v("gitee pages pro")]),t._v("服务的话，每次仓库有更新的话，是不会自动更新重新部署的，也就是说你还得进去"),a("strong",[t._v("更新部署一次")])]),t._v(" "),a("h3",{attrs:{id:"gitee-自动部署方案"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gitee-自动部署方案"}},[t._v("#")]),t._v(" gitee 自动部署方案")]),t._v(" "),a("h4",{attrs:{id:"花钱"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#花钱"}},[t._v("#")]),t._v(" 花钱")]),t._v(" "),a("p",[a("strong",[t._v("99/年")]),t._v(",有钱可以为所欲为"),a("img",{attrs:{src:"http://img0.imgtn.bdimg.com/it/u=1450897154,2271716008&fm=26&gp=0.jpg",alt:""}})]),t._v(" "),a("h4",{attrs:{id:"人工"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#人工"}},[t._v("#")]),t._v(" 人工")]),t._v(" "),a("p",[t._v("上去自己点一下重新部署就行啦")]),t._v(" "),a("h4",{attrs:{id:"模拟登录调用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#模拟登录调用"}},[t._v("#")]),t._v(" 模拟登录调用")]),t._v(" "),a("p",[t._v("其实抓取以下接口就能发现 直接通过"),a("code",[t._v("POST: https://gitee.com/${repository}/pages/rebuild")]),t._v(" 这个接口进行的，那么我们只要模拟登录就可以了")]),t._v(" "),a("p",[t._v("以下是爬取的接口，用"),a("code",[t._v("axios")]),t._v("调用的例子")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("axios"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("post")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  url "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/rebuild"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  qs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    branch"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" core"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getInput")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"branch"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    build_directory"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" core"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getInput")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"directory"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    force_https"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" core"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getInput")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    headers"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Content-Type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/x-www-form-urlencoded; charset=UTF-8"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      Cookie"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" cookie"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      Referer"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"X-Requested-With"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"XMLHttpRequest"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"X-CSRF-Token"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" csrfToken\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("主要是"),a("code",[t._v("headers")]),t._v("里的 "),a("code",[t._v("Content-Type")]),t._v(", "),a("code",[t._v("X-CSRF-Token")]),t._v(", "),a("code",[t._v("Cookie")]),t._v("特别重要，页面的参数对应这页面的几个按钮，应该很好理解")]),t._v(" "),a("p",[t._v("其中，"),a("code",[t._v("Cookie")]),t._v(" 可以"),a("code",[t._v("devtools")]),t._v("中直接拿到，"),a("code",[t._v("X-CSRF-TOKEN")]),t._v("经过调查，被写在了"),a("code",[t._v('<meta content="" name="csrf-token"></meta>')]),t._v("上，通过获取任意一个页面然后拿到即可，否则会"),a("strong",[t._v("403")])]),t._v(" "),a("p",[t._v("具体参考"),a("a",{attrs:{href:"https://github.com/mizuka-wu/gitee-pages-action/blob/master/src/index.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("我封装的插件"),a("OutboundLink")],1)]),t._v(" "),a("h4",{attrs:{id:"github-actions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#github-actions"}},[t._v("#")]),t._v(" github actions")]),t._v(" "),a("p",[t._v("我个人封装了一个 "),a("code",[t._v("actions")]),t._v(" 只要在"),a("code",[t._v("steps")]),t._v("上追加一个"),a("code",[t._v("step")]),t._v("即可")]),t._v(" "),a("div",{staticClass:"language-yml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" reload\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("uses")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" mizuka"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("wu/gitee"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("pages"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("action@v1.0.0\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("with")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("repository")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" mizuka/Mizuka\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("cookie")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" $"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" secrets.GITEE_COOKIE "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("当然，需要增加一个"),a("code",[t._v("GITEE_COOKIE")]),t._v("和设定"),a("code",[t._v("repository")])]),t._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/mizuka-wu/gitee-pages-action",target:"_blank",rel:"noopener noreferrer"}},[t._v("查看文档"),a("OutboundLink")],1)]),t._v(" "),a("h1",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("p",[t._v("见山开山，遇水架桥"),a("br"),t._v(" "),a("code",[t._v("github actions")]),t._v("的推出真的是提供了很多新的玩法")]),t._v(" "),a("p",[t._v("欢迎来看"),a("a",{attrs:{href:"https://www.mizuka.top",target:"_blank",rel:"noopener noreferrer"}},[t._v("我的博客"),a("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=n.exports}}]);