---
title: 带权重的搜索引擎
date: 2019-10-18 17
tags:
  - 数据库
  - 搜索引擎
  - postgresql
  - - 忽略所有的标点等特殊符号
  - - 全部单字复合
  - - 散字二元复合
  - - 闲散文字自动以二字分词法聚合
  - - 短词复合
  - - 重要单字复合
  - - 添加支持拼音 不需要的话 直接用ts
  - - 添加权重 将company_status_id转为权重 第一个null可以改为联查作为第三方权重
  - - 字段权重 有一部分比如company_shortname_cn用全部作为关键词
  - - 合并掉该合并的部分比如brand name
  - - 合并brand_name
  - - 先整理原始的数据
  - - 原本的全文搜索方式
  - - ts @@ (phraseto_tsquery('zhcfg',lower('海思')) || phraseto_tsquery('zhcfg',upper('海思')))
  - - 通过模糊查询保证顺序 9.6可以更换为原本的全文搜索添加距离部分来完成
  - 构建函数
  - - 循环每个字进行替换
  - - return lower(res_py || ' ' || res_zm);
  - - return return_type;
  - - 根据return type来看返回首字母还是全拼音
  - 引入表 py.sql(有道云)
  - 把分词结果转为拼音`get_pinyin('上海')`
  - - 引入 trgm
  - - 重建部分
  - - 往自定义分词词典里面插入新的分词
  - - 使新的分词生效
  - - 退出此连接
  - - create index ids_foreign_search_engine_gin on foreign_search_engine using gin (record_to_text(foreign_search_engine) gin_trgm_ops) ;
  - - create index ids_foreign_search_engine_gist on foreign_search_engine using gin (record_to_text(foreign_search_engine) gin_trgm_ops) ;
categories:
  - 经验分享
summary: title: 带权重的搜索引擎
