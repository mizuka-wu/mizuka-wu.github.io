---
title: Element-UI如何同步列宽度
tags:
  - 可以公开的情报
  - 开发
  - 前端
  - element-ui
date: 2021-06-15 18:17:35
categories: 可以公开的情报
---
	
	需求原因，目前有个表格因为做了类似树状结构的设计，同时也增加了拖动`resize`
	
	树状结构是通过`expand`做的，所以在结构上还是两个不同的`table`, 所以现在的目标是外层`table`列宽改变后，通知内层的`table`同时改变列宽
	
	主要需要借助`element-ui`里`table`的`@header-dragend`事件，该事件提供了`newWidth`, `oldWidth`, `column`和`event`这几个参数，利用`newWidth`和`column`可以使两个表格联动
	
	基本思路分为以下步骤
	
	1. 获取原始表格的`columns`
	2. 获取改变的`column`的序号，或者其他信息，用来匹配到子表格的对应列上
	3. 改变对应`column`的`width`
	4. 原始表格`doLayout`重绘，让宽度变化生效
	
	具体代码
	
	```vue
	
			<el-table
				ref="table"
				@header-dragend="(newWidth, oldWidth, column) => handleHeaderDragend('table', newWidth, column)">
				<el-table-column type="expand" ref="table-expand"></el-table-column>
			</el-table>
	
	      handleHeaderDragend(tableRef, newWidth, column) {
	        const [table] = this.$refs[tableRef] || [];
	        if (!table) {
	          return 0;
	        }
	        const columnIndex = table.columns.findIndex(_column => _column === column) - 1; // 排除expand这一列
	        const opListTables = this.$refs[`${tableRef}-expand`];
	        opListTables.forEach((opListTable) => {
	          opListTable.columns[columnIndex].width = newWidth;
	          opListTable.doLayout();
	        });
	        return 1;
	      },
	```
