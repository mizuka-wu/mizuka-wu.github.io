(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{452:function(t,s,a){"use strict";a.r(s);var e=a(9),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("blockquote",[a("p",[t._v("如果不理解 "),a("strong",[t._v("slot")]),t._v(" 概念请先阅读**"),a("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/components-slots.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vue slot教程"),a("OutboundLink")],1),t._v("**")])]),t._v(" "),a("p",[a("strong",[t._v("Vue")]),t._v(" 基于 "),a("a",{attrs:{href:"https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("Web Components 规范草案"),a("OutboundLink")],1),t._v("，将 "),a("code",[t._v("<slot>")]),t._v(" 元素作为承载分发内容的出口。 又根据是否需要需要获取上下文，分类为了"),a("code",[t._v("slot")]),t._v("和"),a("code",[t._v("scopedSlots")])]),t._v(" "),a("h2",{attrs:{id:"两者的异同点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#两者的异同点"}},[t._v("#")]),t._v(" 两者的异同点")]),t._v(" "),a("h3",{attrs:{id:"相同的部分"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#相同的部分"}},[t._v("#")]),t._v(" 相同的部分")]),t._v(" "),a("p",[t._v("这两者其实都挂载在对应的 "),a("code",[t._v("vue")]),t._v(" 实例上，比如")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("component-a")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("标签名")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("component-b")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("内部如果有"),a("code",[t._v("<标签名/>")]),t._v("的情况下，那么"),a("code",[t._v("<component-a>")]),t._v("这个组件的"),a("code",[t._v("vue")]),t._v("实例自身的"),a("code",[t._v("$slots")]),t._v("和"),a("code",[t._v("$scopedSlots")]),t._v("内会拥有描述这个标签的对象："),a("code",[t._v("{ [key: string]: Function | Vnode[] }")])]),t._v(" "),a("p",[t._v("如果没有具名"),a("code",[t._v("slot")]),t._v("的情况下，"),a("code",[t._v("key")]),t._v("会变成"),a("code",[t._v("default")]),t._v(" 而且无论下层渲染的"),a("code",[t._v("<slot />")]),t._v("是否存在，都会挂在这两个对象上")]),t._v(" "),a("p",[t._v("那么如何"),a("code",[t._v("vue")]),t._v("是如何进行渲染的？当然是在")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("slot")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[a("code",[t._v("<componet-a/>")]),t._v("对应模版的"),a("code",[t._v("<slot>")]),t._v("处自动注入进去的")]),t._v(" "),a("h3",{attrs:{id:"不一样的点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#不一样的点"}},[t._v("#")]),t._v(" 不一样的点")]),t._v(" "),a("p",[t._v("虽说都是对象，但是也能看到有"),a("code",[t._v("Function")]),t._v("和"),a("code",[t._v("VNode[]")]),t._v("两种模式，因为"),a("code",[t._v("scopedSlots")]),t._v("是需要上下文的，所以也可以理解为"),a("code",[t._v("scopedSlots")]),t._v("的每一个属性是一个特殊的"),a("code",[t._v("render函数")]),t._v("，他会生成一个"),a("code",[t._v("VNode")]),t._v("出来给当前这个组件，而一般的"),a("code",[t._v("slot")]),t._v("就是直接接收"),a("code",[t._v("VNode[]")]),t._v("直接渲染")]),t._v(" "),a("p",[t._v("不过据说之后"),a("code",[t._v("vue")]),t._v("的设计上要将两者统一，这是后话了")]),t._v(" "),a("h3",{attrs:{id:"获取上的问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#获取上的问题"}},[t._v("#")]),t._v(" 获取上的问题")]),t._v(" "),a("p",[t._v("获取"),a("code",[t._v("scopedSlots")]),t._v("和"),a("code",[t._v("slots")]),t._v("其实有一个问题，就在于，刚刚初始化的时候，其实这两个对象内容还是空的，只有"),a("code",[t._v("mouted")]),t._v("生命周期之后才能获取到具体的值，所以传递的时候需要额外考虑 "),a("strong",[t._v("监听")]),t._v(" 的问题")]),t._v(" "),a("h2",{attrs:{id:"如何传递"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何传递"}},[t._v("#")]),t._v(" 如何传递")]),t._v(" "),a("p",[t._v("传递"),a("code",[t._v("slots")]),t._v("的核心点就在于如何将"),a("code",[t._v("$scopedSlots")]),t._v("和"),a("code",[t._v("$slots")]),t._v("对象对下层的"),a("code",[t._v("component")]),t._v("组件进行传递，或者让下级的"),a("code",[t._v("component")]),t._v("能够取到这一级"),a("code",[t._v("vue")]),t._v("实例的"),a("code",[t._v("$scopedSlots")]),t._v("和"),a("code",[t._v("$slots")]),t._v("对象")]),t._v(" "),a("h3",{attrs:{id:"利用template"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#利用template"}},[t._v("#")]),t._v(" 利用template")]),t._v(" "),a("p",[t._v("通过每一级都定义相同的"),a("code",[t._v("<slot>")]),t._v("来进行传递，方法太烦，直接放弃")]),t._v(" "),a("h3",{attrs:{id:"利用render函数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#利用render函数"}},[t._v("#")]),t._v(" 利用render函数")]),t._v(" "),a("p",[a("code",[t._v("vue")]),t._v("的"),a("code",[t._v("template")]),t._v("最终其实也是要转换成"),a("code",[t._v("render")]),t._v("函数的，在中间过程，在"),a("code",[t._v("VNode")]),t._v("的配置阶段直接给"),a("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1",target:"_blank",rel:"noopener noreferrer"}},[t._v("render函数"),a("OutboundLink")],1),t._v("的"),a("code",[t._v("scopedSlots")]),t._v("进行传递就行了，不过似乎"),a("code",[t._v("slots")]),t._v("不受支持")]),t._v(" "),a("p",[t._v("在使用"),a("code",[t._v("JSX")]),t._v("的情况下，也是对"),a("code",[t._v("scopedSlots")]),t._v("属性挂载一个对象就可以了")]),t._v(" "),a("p",[t._v("不过这样也还是需要多级都进行传递，然后在需要使用的那一级通过"),a("code",[t._v("<slot />")]),t._v("插槽渲染，或者在"),a("code",[t._v("render")]),t._v("内直接运行对应的函数生成"),a("code",[t._v("vnode")])]),t._v(" "),a("h3",{attrs:{id:"利用provide-inject"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#利用provide-inject"}},[t._v("#")]),t._v(" 利用Provide/Inject")]),t._v(" "),a("p",[t._v("这个是"),a("code",[t._v("Vue")]),t._v("的一个不推荐使用的特性，父组件提供"),a("code",[t._v("Provide")]),t._v("，然后子组件"),a("code",[t._v("Inject")]),t._v(" 来进行无视层级的注入")]),t._v(" "),a("p",[t._v("不过这个方案从设计上来说是不支持监听的，而我们的"),a("code",[t._v("scopedSlots")]),t._v("和"),a("code",[t._v("slots")]),t._v("要在挂载之后才能进行获取，这里就需要想办法在透传的同时实现监听了")]),t._v(" "),a("p",[t._v("利用一下"),a("code",[t._v("Vue")]),t._v("的一个漏洞，就是如果传递下去的是一个可监听的对象的话，那么对这个对象进行的一系列修改，子组件"),a("code",[t._v("inject")]),t._v("之后也是可以接收得到的")]),t._v(" "),a("p",[t._v("例如")]),t._v(" "),a("p",[t._v("在父组件")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("srcipt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n export default {\n  provide() {\n   const { scopedSlots } = this\n   return {\n    scopedSlots\n   }\n  },\n  data() {\n   return {\n    scopedSlots: {}\n   }\n  },\n  mounted() {\n   this.$next(() => {\n    Object.entries(this.$scopedSlots).forEach(([key, scopedSlots]) => {\n                this.$set(scopedSlots, key, scopedSlots)\n             })\n   })\n  }\n }\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("在子组件就能注入了")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  inject"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   scopedSlots"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("不过这样我们只能透传拿到"),a("code",[t._v("scopedSlots")]),t._v(",渲染还是个问题，如果是使用的"),a("code",[t._v("render")]),t._v("函数或者"),a("code",[t._v("JSX")]),t._v("的大可以直接在目标位置直接生成"),a("code",[t._v("VNode")]),t._v("，但是在使用 "),a("strong",[t._v("模版")]),t._v(" 的情况下，就需要有个工具"),a("code",[t._v("component")]),t._v("帮助我们将"),a("code",[t._v("render")]),t._v("函数转为对应的组件了,")]),t._v(" "),a("p",[t._v("一种思路，通过"),a("code",[t._v("attrs")]),t._v("和"),a("code",[t._v("listeners")]),t._v("完成透传")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n props"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  renderFunction"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   type"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Function"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n   required"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("render")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("h")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" $listeners"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" $attrs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" renderFunction "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" VNode "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("renderFunction")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("$attrs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("h")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("VNode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n   on"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" $listeners\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);