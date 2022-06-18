(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{461:function(t,a,s){"use strict";s.r(a);var e=s(9),r=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"mojave动态壁纸"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mojave动态壁纸"}},[t._v("#")]),t._v(" Mojave动态壁纸")]),t._v(" "),s("blockquote",[s("p",[t._v("OSX Mojave发布带来了黑暗模式，众多改进，其中一个功能就在能够根据你当地所处的时间，动态切换系统背景")])]),t._v(" "),s("h2",{attrs:{id:"动态壁纸"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#动态壁纸"}},[t._v("#")]),t._v(" 动态壁纸")]),t._v(" "),s("p",[t._v("大家都知道，apple得益于自身的封闭特性，拥有众多自身所特有的特殊格式，这次的动态背景其实就是依托于背后的"),s("strong",[t._v("Heic")]),t._v("格式")]),t._v(" "),s("h3",{attrs:{id:"heic格式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#heic格式"}},[t._v("#")]),t._v(" Heic格式")]),t._v(" "),s("p",[t._v("如果你使用过apple的live photo 就会发现其导出的格式就是heic, 这其实就是一个类似一个短视频的格式，利用它， 我们将多张照片以及他们的时区等信息直接整合，输出成一张heic图片，就能提供给Mojave使用了")]),t._v(" "),s("h2",{attrs:{id:"开始构建吧"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#开始构建吧"}},[t._v("#")]),t._v(" 开始构建吧")]),t._v(" "),s("h3",{attrs:{id:"工具篇"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#工具篇"}},[t._v("#")]),t._v(" 工具篇")]),t._v(" "),s("p",[t._v("关于工具，已经有人在github上开源了相关的构建脚本，不过请注意，只有Mac可以使用哦   "),s("a",{attrs:{href:"https://github.com/mczachurski/wallpapper",target:"_blank",rel:"noopener noreferrer"}},[t._v("工具地址"),s("OutboundLink")],1),t._v(" "),s("img",{attrs:{src:"https://github.com/mczachurski/wallpapper/raw/master/Images/wallpaper.png",alt:""}})]),t._v(" "),s("h3",{attrs:{id:"开始"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#开始"}},[t._v("#")]),t._v(" 开始")]),t._v(" "),s("h4",{attrs:{id:"安装工具"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装工具"}},[t._v("#")]),t._v(" 安装工具")]),t._v(" "),s("p",[t._v("工具有两种安装模式 "),s("strong",[t._v("Homebrew")]),t._v(" 以及 github安装，当然 如果你新装了系统，有些Xcode功能需要重新安装, 请先安装xcode-select并且输入"),s("code",[t._v("sudo xcode-select -s /Applications/Xcode.app/Contents/Developer")])]),t._v(" "),s("h5",{attrs:{id:"homebrew"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#homebrew"}},[t._v("#")]),t._v(" Homebrew")]),t._v(" "),s("p",[t._v("打开你的命令行输入")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("brew tap mczachurski/wallpapper\nbrew "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" wallpapper\n")])])]),s("h5",{attrs:{id:"github安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#github安装"}},[t._v("#")]),t._v(" github安装")]),t._v(" "),s("p",[t._v("打开你的命令行，输入")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone https://github.com/mczachurski/wallpapper.git\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" wallpapper\nswift build --configuration release\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("cp")]),t._v(" .build/x86_64-apple-macosx10.10/release/wallpapper /usr/local/bin\n")])])]),s("p",[t._v("注意 如果你用的swift4.1请编辑Package.swift")]),t._v(" "),s("h4",{attrs:{id:"测试工具是否可用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#测试工具是否可用"}},[t._v("#")]),t._v(" 测试工具是否可用")]),t._v(" "),s("p",[t._v("和大多数软件一样"),s("code",[t._v("wallpapper -h")]),t._v("\n然后你会看到")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("wallpapper: [command_option] -i inputFile\nCommand options are:\n -h\t\t\tshow this message and exit\n -o\t\t\toutput file name (default is 'output.heic')\n -i\t\t\tinput file name, json file with wallpaper description\n")])])]),s("h4",{attrs:{id:"构建"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#构建"}},[t._v("#")]),t._v(" 构建")]),t._v(" "),s("p",[t._v("前面所题，我们需要配置一些照片，并且配置每张照片的信息，所以新建一个json文件，内容类似")]),t._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"fileName"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1.png"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"isPrimary"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"isForLight"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"isForDark"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"altitude"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("27.95")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"azimuth"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("279.66")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"fileName"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2.png"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"isPrimary"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"isForLight"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"isForDark"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"altitude"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("-31.05")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"azimuth"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4.16")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"fileName"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"16.png"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"isPrimary"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"isForLight"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"isForDark"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"altitude"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("-28.63")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"azimuth"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("340.41")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),s("h5",{attrs:{id:"属性解释"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#属性解释"}},[t._v("#")]),t._v(" 属性解释")]),t._v(" "),s("ul",[s("li",[t._v("fileName - 文件名，对应的图片名字")]),t._v(" "),s("li",[t._v("isPrimary - 是否是主图，heic的预览图就是他了，只能有一个")]),t._v(" "),s("li",[t._v("isForLight - 如果设置为trure，将显示在该壁纸的静态模式（白天）中")]),t._v(" "),s("li",[t._v("isForDark - 同上，不过是黑暗模式")]),t._v(" "),s("li",[t._v("altitude - 太阳和时间相关")]),t._v(" "),s("li",[t._v("azimuth - 太阳和时间相关\naltitude和azimuth可以在"),s("a",{attrs:{href:"https://keisan.casio.com/exec/system/1224682277",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://keisan.casio.com/exec/system/1224682277"),s("OutboundLink")],1),t._v("之中获取，填入对应时间对应的值即可")])]),t._v(" "),s("h4",{attrs:{id:"生成"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生成"}},[t._v("#")]),t._v(" 生成")]),t._v(" "),s("p",[s("code",[t._v("wallpapper -i <your_json_name>.json")]),t._v(" 之后你就能获得一个output.heic啦，将背景壁纸设置成他就行～")])])}),[],!1,null,null,null);a.default=r.exports}}]);