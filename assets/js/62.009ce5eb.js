(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{456:function(e,t,a){"use strict";a.r(t);var s=a(9),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"小微企业查询系统git地址"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#小微企业查询系统git地址"}},[e._v("#")]),e._v(" 小微企业查询系统"),a("a",{attrs:{href:"https://github.com/trionfo1993/xwqy-geetest",target:"_blank",rel:"noopener noreferrer"}},[e._v("git地址"),a("OutboundLink")],1)]),e._v(" "),a("blockquote",[a("p",[e._v("破解geetest offline的尝试")])]),e._v(" "),a("h2",{attrs:{id:"简介"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#简介"}},[e._v("#")]),e._v(" 简介")]),e._v(" "),a("p",[e._v("最近因为有需要对爬取的非上市公司进行一个验证，而绝大多数的非上市公司又都是小微企业，比起爬企业征信系统来说，还是小微企业名录更方便一点")]),e._v(" "),a("h2",{attrs:{id:"特点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#特点"}},[e._v("#")]),e._v(" 特点")]),e._v(" "),a("p",[e._v("基于node.js axios全程破解 无需下载图片 无需模拟轨迹，offline模式就是任性")]),e._v(" "),a("h3",{attrs:{id:"觉得不错帮忙star一下啦"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#觉得不错帮忙star一下啦"}},[e._v("#")]),e._v(" 觉得不错帮忙Star一下啦～")]),e._v(" "),a("h4",{attrs:{id:"破解流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#破解流程"}},[e._v("#")]),e._v(" 破解流程")]),e._v(" "),a("p",[e._v("首先我们跟着正常获取数据的流程走一遍")]),e._v(" "),a("ol",[a("li",[e._v("打开"),a("a",{attrs:{href:"http://xwqy.gsxt.gov.cn/",target:"_blank",rel:"noopener noreferrer"}},[e._v("小微企业名录"),a("OutboundLink")],1),e._v("并且打开控制台")])]),e._v(" "),a("p",[e._v("可以看到大概有这几个请求")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("http://xwqy.gsxt.gov.cn/security/verify_ip\nhttp://xwqy.gsxt.gov.cn/security/verify_keyword\nhttp://xwqy.gsxt.gov.cn/pc-geetest/register?t=1516872325770\n\n")])])]),a("p",[e._v("查看一下response(当然你熟悉geetest也行)就会发现register就是geetest的初始化请求啦")]),e._v(" "),a("p",[a("strong",[e._v("返回值如下")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('challenge:"a1d0c6e83f027327d8461063f4ac58a61c"\ngt:"6146190e4171da316dbb5bcc076e2607"\nsuccess:0\n')])])]),a("p",[e._v("其中你可以发现success基本都是0 也就是说离线模式")]),e._v(" "),a("h4",{attrs:{id:"什么是离线模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是离线模式"}},[e._v("#")]),e._v(" 什么是离线模式？")]),e._v(" "),a("p",[e._v("基本就是geetest不参与判断的一个状态，验证部分都在前台和中间服务器完成")]),e._v(" "),a("p",[e._v("回去看之前系统下载的js 会发现两个geetest提供的js")]),e._v(" "),a("ul",[a("li",[e._v("geetest.0.0.0.js")]),e._v(" "),a("li",[e._v("offline.6.0.0.js")])]),e._v(" "),a("p",[e._v("这几个源文件也提供在项目中了")]),e._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[e._v("滑块拼合")])]),e._v(" "),a("p",[e._v("发送了一个新的验证请求")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("http://xwqy.gsxt.gov.cn/pc-geetest/validate\n\nrequest如下：  \n\ngeetest_challenge:a1d0c6e83f027327d8461063f4ac58a61c\ngeetest_validate:010886ec_0084e_10100077776e\ngeetest_seccode:010886ec_0084e_10100077776e|jordan\n\n")])])]),a("h5",{attrs:{id:"challenge在第一步我们已经获取了-问题是validate怎么获取-同时seccode就是validate加了一个-jordan而已"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#challenge在第一步我们已经获取了-问题是validate怎么获取-同时seccode就是validate加了一个-jordan而已"}},[e._v("#")]),e._v(" challenge在第一步我们已经获取了，问题是validate怎么获取? 同时seccode就是validate加了一个|jordan而已")]),e._v(" "),a("p",[e._v("既然是offline 那就分析offline.js呗")]),e._v(" "),a("p",[e._v("查看代码就能看到这句")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('return c >= f - 3 && c <= f + 3 ? {\n            success: !0,\n            message: "success",\n            validate: b.A(c, e.d.challenge) + "_" + b.A(a.b("rand0", e.c), e.d.challenge) + "_" + b.A(a.b("rand1", e.c), e.d.challenge),\n            score: Math.round(d / 200)\n        } : {success: 0, message: "fail"}\n\n')])])]),a("p",[e._v("这不就是我们要的么！")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('validate: b.A(c, e.d.challenge) + "_" + b.A(a.b("rand0", e.c), e.d.challenge) + "_" + b.A(a.b("rand1", e.c), e.d.challenge),\n')])])]),a("p",[e._v("offline.6.0.0.js和offline.5.0.0.js可以看出一样是通过密钥 rand rand1进行加密获取一个值，一半来说这种方案就是得依靠收集案例倒推，但是我们是不会重复造轮子的")]),e._v(" "),a("p",[e._v("github关键词一搜就能发现已经有人整理好了"),a("a",{attrs:{href:"'https://github.com/9468305/python-script/blob/master/geetest_offline/util.py'"}},[e._v("'https://github.com/9468305/python-script/blob/master/geetest_offline/util.py'")])]),e._v(" "),a("p",[e._v("所以那就用呗")]),e._v(" "),a("p",[e._v("后续就只是涉及到爬虫以及页面跳转的问题了，具体可以看util内的代码")]),e._v(" "),a("p",[e._v("而且在micro_lib内也可以直接搜索 发送验证的地址改为http://xwqy.gsxt.gov.cn/mirco/micro_lib")]),e._v(" "),a("p",[e._v("并相应修改传入的值即可")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("organId:100000\ntextfield:encode后的关键词\nfwId:1400\nsearchOrganId:\nchannelId:99\ncaptcha:\ngeetest_challenge:3ef815416f775098fe977004015c619332\ngeetest_validate:010886ec_0084e_10100077776e\ngeetest_seccode:010886ec_0084e_10100077776e|jordan\n")])])]),a("h3",{attrs:{id:"restful-api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#restful-api"}},[e._v("#")]),e._v(" restful-api")]),e._v(" "),a("h4",{attrs:{id:"已经做了一个api形式的-直接在url内打入关键词即可爬取"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#已经做了一个api形式的-直接在url内打入关键词即可爬取"}},[e._v("#")]),e._v(" 已经做了一个api形式的 直接在url内打入关键词即可爬取")]),e._v(" "),a("h4",{attrs:{id:"运行步骤"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#运行步骤"}},[e._v("#")]),e._v(" 运行步骤")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("npm install\nnpm run start\ncurl http://127.0.0.1:4001/公司关键词\n")])])])])}),[],!1,null,null,null);t.default=r.exports}}]);