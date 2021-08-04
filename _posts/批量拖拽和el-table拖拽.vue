---
title: 批量拖拽和el-table拖拽
tags:
  - 可以公开的情报
  - 开发
  - 前端
  - el-table
date: 2021-08-02 10:17:35
categories:
---
**背景**：目前拖拽的核心组件库为`sortable.js`以及基于`sortable.js`封装的`vuedraggable`组件

## 目前现状

### 当前使用的
目前组里使用的基本就是 `vuedraggable` 和 `element-ui-el-table-draggable` 这两个组件库了，分别提供了整个`sortable.js`的能力和`element-ui`内`el-table`的行进行拖拽排序的能力

### 不足之处

#### vuedraggable

不支持多选模式，一些需要`sortable`插件的部分没办法设置（主要就是多选模式）

#### element-ui-el-table-draggable

只能配置两个参数，不支持列拖拽，不支持类似`group`等参数

## 改进和开发记录

目前日常使用上，这两个库已经够使用了，但是也会有一些特殊的场景做不了，所以需要对齐进行改进和重新封装

### 多选以及其改进

接到一个需求，需要排序的对象进行多选，同时批量排序

本身计划使用`vuedraggable`但是其不能使用多选插件，所以只能根据`sortable.js`重新封装一个支持多选的组件出来，基础的`sortable.js`部分不再阐述

[MultiDrag文档](https://sortablejs.github.io/Sortable/#multi-drag)

首先需要挂载该插件

```javascript
import { Sortable, MultiDrag } from 'sortablejs';
Sortable.mount(multiDrag);
export default Sortable;
```

接着改写因为增加了多选，之前的`onDrag`事件也需要改写, 将**单选拖拽**和**多选拖拽**统一起来

```
	this.sort = function({
        oldIndex, oldIndicies, newIndex, newIndicies
      }) {
      	  const oldIndexs = oldIndicies.length > 0 ? oldIndicies.map(item => item.index) : [oldIndex];
          const newIndexs = newIndicies.length > 0 ? newIndicies.map(item => item.index) : [newIndex];	
        /**
         * 因为在当前环境下，newIndexs是肯定连续的，所以核心算法调整为
         * 1. 根据oldIndexs将原始数据从列表中取出
         * 2. 计算新的插入位置
         * 3. 移动位置
         */
        const movedList = oldIndexs.reduceRight((result, index) =>
          result.concat(this.list.splice(index, 1)), []).reverse();
        const targetIndex = newIndexs[0];
        this.list.splice(targetIndex, 0, ...movedList);

        // 取消选中
        newIndicies.forEach(({ multiDragElement }) => {
          Sortable.utils.deselect(multiDragElement);
        });
      }
      
      this.sortable = new Sortable(containerEl, {
        multiDrag: true,
        fallbackTolerance: 3, // So that we can select items on mobile
        selectedClass: 'sortable-selected',
        animation: 150,
        onEnd: this.sort,
      });
```

核心算法调整为，从数据中移除那些被选中的数据，然后在对应位置直接插入

当然这个多选方案也不是很友好，因为选择只能通过点选，最多可以按下`shift`来实现批量选择，所以我选择增加一个区域拖拽来增加多选的体验

整体实验下来，使用了`selecto`进行开发

[selecto文档](https://github.com/daybrush/selecto)

[selecto演示](https://daybrush.com/selecto/storybook/?path=/story/selecto--welcome)

当然，核心问题就变成了如何同步`selecto`和`sortable.js`了，好在两者都是直接对`dom`进行操作和判断的问题

引入`selecto`

```javascript
	  import Selecto from 'selecto';
      this.selecto = new Selecto({
        container: this.$el, // 限定拖拽生效范围，默认是整个body
        dragContainer: containerEl, // 可拖拽对象的容器
        selectByClick: false, // 和sortable.js防止冲突
        toggleContinueSelect: null,
        selectableTargets: ['.area-sorter__item .select-handle'],
        /**
         * 拖拽框出现的条件为在选择非可选元素之上（空白区域）
         */
        dragCondition: ({ inputEvent }) => !Array
          .from(containerEl.querySelectorAll('.area-sorter__item'))
          .find(node => node.contains(inputEvent.target))
      });

	// 同步sortable.js和seleco
      this.selecto.on('select', (e) => {
        e.added.forEach((el) => {
          Sortable.utils.select(el.parentNode);
        });
        e.removed.forEach((el) => {
          Sortable.utils.deselect(el.parentNode);
        });
        this.$nextTick(() => {
          // 将内部存储的清空，不支持继续选择
          this.selecto.selectedTargets.splice(0);
        });
```

修改`sortable.js`, 修改之前的`multiDrag`plugin对象，让点击外部取消选择变为仅仅在`container`而不是全局生效

```javascript
multiDrag.prototype._deselectMultiDrag = function (evt) {
  if (evt) {
    const container = this.sortable.el;
    if (container.contains(evt.target)) {
      originDeselectMultiDrag.call(this, evt);
    }
  }
};
```

`selecto`以上几个修改点在于

1. 改变`sortabl.js`的多选逻辑，让点击就取消选择的范围缩减到仅容器内，这样拖拽就不会造成每次都会取消之前所选了
2. `selecto.selectedTargets.splice(0)` 让已选永远为空，可以让`sortable.js`已选的被框选到的不被取消，当然，也可以写成和`sortable.js`同步的
3. `dragCondition` 拖拽框本身是可以在任何位置都出现的，增加这个让只有在空白处才能进行框选
4. `selectableTargets ` seleco本身是需要整个`dom`都在框选范围内才视作已选择，所以取巧，在每个可选对象下隐藏了一个小`dom`对象，选中即视作整体选中，规避需要框选的区域过大的问题
5. `dragContainer`和`container `这个是因为有个空白区域，可以自行调整

这样设置后，拖拽效果为最好

### element-ui-table-draggable改进

基本属于重写了, 根据核心原理做了一个出来, 也就是，`dom`结构使用`.el-table__body-wrapper tbody`，然后直接交换`el-table`这个`data`对应`index`的数据

**重点提示，需要给el-table增加row-key，保证交换之后重新渲染的数据正确！！！**

```
const elTableContext = this.$children[0] // 因为是通过slot引入
const container = elTableContext.$el.querySelector('.el-table__body-wrapper tbody')
Sortable.create(container, {
	onEnd(evt) {
		let { newIndex, oldIndex, } = evt
		// 交换elTableContext.data里的位置，不展开了
		exchange(oldIndex, newIndex)
		this.$emit('sort')
	}
})
```

之后我们解决几个核心问题

* 不能使用sortable.js的配置（例如group属性来多列表之间拖拽）
* 跨表格数据更新
* 支持列拖拽
* expanded的row特殊处理
* 空处理

### sortable.js配置

这个好解决，一方面是可以配置`props`, 另一方面，我们可以使用`$attrs`这个属性，将未在`props`内定义的属性直接获取

```javascript
Sortable.create(container, {
	...this.$attrs,
	// sortable的onXXX事件转为vue的事件格式emit掉
	...Object.keys(this.$listeners).reduce((events, key) => {
          const handler = this.$listeners[key]
          // 首字母大写
          const eventName = `on${key.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
            return $1.toUpperCase() + $2.toLowerCase()
          })}`
          events[eventName] = (...args) => handler(...args)
          return events
        }, {}),
	onEnd(evt) {
		// 之前的处理代码
		this.$emit('end', evt)
	},
})
```

同时增加一个监听，自动更新对应的参数

```javascript
  watch: {
    $attrs: {
      deep: true,
      handler(options) {
        // 已经创建完实例后
        if (this._sortable) {
          // 排除事件，目前sortable没有on开头的属性
          const keys = Object.keys(options).filter(key => key.indexOf("on") !== 0)
          keys.forEach(key => {
            this._sortable.option(key, options[key])
          })
        }
      }
    }
  },
```


### 拖拽跨表格

因为`onEnd`事件是可以在`event`中拿到`to`和`from`的对应的`dom`的，所以问题就转变为了如何在将`exchange`函数中，操作的对象从`to/from`转为`el-table`的`vue`对象中的`data`

因为，`to/from`是我们传递给`sortable`的`container`这个`dom`对象，所以我们要做的就是在一个地方做一个`dom` => `el-table`的映射关系表

我的选择是在`window`上挂一个`weakMap`这样对应的`dom`如果销毁的话，也能够自动清除内存

```javascript
  mounted() {
    if (!window.__ElTableDraggableContext) {
      window.__ElTableDraggableContext = new WeakMap()
    }
    this.init();
  },
```

```javascript
methods: {
	init() {
		 const context = window.__ElTableDraggableContext
		 this.table = this.$children[0].$el.querySelector(''.el-table__body-wrapper tbody'');
		 context.set(this.table, elTableContext)
	}
}
```

在`exchange`中，直接```const toData = context.get(to).data; const fromData = context.get(from).data```
就能直接获取需要更新的数据了，之后按照之前的操作数据即可

### 支持列拖拽
这个比较简单，将交换的对象和对应的`dom`获取参数换成`.el-table__header-wrapper thead tr`即可，这样就能拖动列头交换了，唯一的问题和`expanded`的行一样，因为拖拽本身的限制，只能拖动自身这个`dom`结构，其关联的`dom`结构是不会动的，这个需要写判断和脚本修改，或者个通过`html2canvas`截图，修改`dataTransfer.setDragImage`来修改拖动显示的快照

### expanded行处理

这个的问题在于，使用了`<el-table-column type="expanded"/>`的列，如果展开了行，其实在`dom`结构上是在那一行`tr`后增加一个`tr`并在里面渲染对应的`dom`的, 形如

```javascript
<tr class="expanded"></tr>
<tr>展开行内的相关dom</tr>
```

，所以会影响`onEnd`事件中`newIndex`和`oldIndex`的真实性（主要是因为`index`是通过`tr`的对应位置确定的）但是我们不需要计算展开的`tr`

所以我们通过index需要修正一下，我们可以通过`el-table`组件查询到哪些行被展开了

```javascript
function fixIndex(sourceIndex, context) {
  const { expandRows } = context.store.states
  const { data } = context
  const indexOfExpandedRows = expandRows
    .map(row => data.indexOf(row))
    .map((rowIndex, index) => index + rowIndex + 1) // index 之前有几个展开了， rowIndex + 1， 不算之前已经展开的话，实际应该在的位置
  const offset = indexOfExpandedRows.filter(index => index < sourceIndex).length // 偏移量，也就是有几个expand的row小于当前row
  return sourceIndex - offset
}
```

偏移量只需要计算那些在`index`之前的`expandedTr`
即可

同时因为dom上，`expanded`的行不应该被拖拽和拖入这个问题，需要
1. 在拖动的时候，将当前行的展开给收起
2. 禁止其他已经展开的行的展开部分拖入

好在`el-table`的行都带有`css`, 所以将`sortable.js`的`draggable`设置为`.el-table__row`就行了

然后在`onStart`的时候，将正在拖拽的这行的`expand`取消，结束的时候放回来就行

```javascript
// onStart
 if (item.className.includes("expanded")) {
              const expandedTr = item.nextSibling
              expandedTr.parentNode.removeChild(expandedTr)
              const sourceContext = context.get(from)
              const index = fixIndex(oldIndex, sourceContext)
              this.movingExpandedRows = sourceContext.data[index]
            }

```

先关闭再打开，因为之前是直接删除的dom

```javascript
// onEnd
              if (this.movingExpandedRows) {
                // 缓存需要展开的row
                const row = this.movingExpandedRows
                this.$nextTick(() => {
                  tableContext.toggleRowExpansion(row, false)
                  this.$nextTick(() => {
                    tableContext.toggleRowExpansion(row, true)
                  })
                })
              }
```

这样，就完成了一个满足我们条件的`el-table`拖拽组件了
