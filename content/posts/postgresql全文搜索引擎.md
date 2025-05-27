---
title: postgresql全文搜索引擎
tags:
  - 数据库
  - 搜索引擎
  - postgresql
date: 2019-10-18 17:41:57
categories: 可以公开的情报
---

  

# 带权重的搜索引擎

  

> [双十一背后的技术](https://github.com/digoal/blog/blob/462c0cf738380b0bfc080e99fd168c19bb2d4fce/201611/20161115_01.md) 参考此文 对其进行改进和自定义

> 毫秒级的为[该文章](https://yq.aliyun.com/articles/68424?spm=a2c4e.11153959.blogcont61833.34.uwRpsS)

  

## 具体实施流程

  

### 分词(英文基本无需分词)

  

#### [zhparser](https://github.com/amutu/zhparser)

  

安装 SCWS.

  

```

wget -q -O - http://www.xunsearch.com/scws/down/scws-1.2.3.tar.bz2 | tar xf -

  

cd scws-1.2.3 ; ./configure ; make install

  

注意:在FreeBSD release 10及以上版本上运行configure时，需要增加--with-pic选项。

  

如果是从github上下载的scws源码需要先运行以下命令生成configure文件：

  

touch README;aclocal;autoconf;autoheader;libtoolize;automake --add-missing

  

git clone https://github.com/amutu/zhparser.git

cd zhparser

make && make install

CREATE EXTENSION zhparser;

CREATE TEXT SEARCH CONFIGURATION zhcfg (PARSER = zhparser);

ALTER TEXT SEARCH CONFIGURATION zhcfg ADD MAPPING FOR n,v,a,i,e,l,j,m WITH simple;

  
  

```

  

```

  

增加类型

select ts_debug('zhcfg','三一') ;

ts_debug

可以查看到分词的token类型 如果不在之前的mapping内的话是不会被分词的

解决方案是

ALTER TEXT SEARCH CONFIGURATION zhcfg ADD MAPPING FOR [没有的类型] WITH simple;

  

```

  

**设置分词参数**

  

```

-- 忽略所有的标点等特殊符号

set zhparser.punctuation_ignore = on;

-- 全部单字复合

set zhparser.multi_zall = on;

-- 散字二元复合

set zhparser.multi_duality = on;

-- 闲散文字自动以二字分词法聚合

set zhparser.seg_with_duality = on;

-- 短词复合

set zhparser.multi_short = on;

-- 重要单字复合

set zhparser.multi_zmain = on;

  

```

  

**测试**

  

`select to_tsvector('zhcfg','南京市长江大桥');测试用例`

  

**中文单字等特殊需求**[PostgreSQL 中英文混合分词特殊规则(中文单字、英文单词) - 中英分明](https://github.com/digoal/blog/blob/master/201711/20171104_03.md)

  

```

create or replace function udf_to_tsvector(regconfig,text) returns tsvector as $$

SELECT array_to_tsvector(array_agg(token)) from ts_debug($1, $2)

where (char_length(token)=1 and octet_length(token)<>1 ) or (char_length(token)=octet_length(token));

$$ language sql strict immutable;

  

```

  

### 按照字段进行搜索

  

**用例**

`select * from search_company where to_tsvector(company_name_cn) @@ to_tsquery('zhcfg', '上海');`

  

**转化为行级(全字段)的方式，to_tsvector 传入的对象为转为 text 的该行**

`select * from search_company where to_tsvector(search_company::text) @@ to_tsquery('zhcfg', '上海');`

  

### 搜索用的固态视图

  

> 通过固态视图事先对可以可以搜索的部分进行预处理 加速

  

#### 特性

  

1. 增加 ts 列 减少在搜索的时候动态创建的成本

2. 利用 ts 列 可以进行**行级搜索**

3. COALESCE 函数防止 null

4. 顺带一提行的 ts 列可以参考[该文章](https://github.com/digoal/blog/blob/8946988f885a3f16f159082610d6ec9027ae21dd/201604/20160419_01.md) 但是自定义权重就不行，使用手动构建

5. 附带一个 weight 的作为行的权重，上市为:2 非上市为 1 投资机构为 0

6. weight 的 COALESCE 函数可以附带作为未来公司自带权重的时候的扩展

7. setweight 函数的例子是设定字段的权重，字段内所有的关键字的权重将被统一设置 有 ABCD 之分 可以用来过滤分词 ts_filter 或者权重计算匹配度

8. text 字段 这样模糊搜索可以加快一定速度了

9. [zpharse 配置](https://yq.aliyun.com/articles/7730)

10. 配置可以拼音搜索[参考](http://www.codeweblog.com/postgresql%E7%9A%84%E6%B1%89%E5%AD%97%E8%BD%AC%E6%8B%BC%E9%9F%B3/)

11. 建立索引`create index idx_test_ts on search_company using gin (ts);`

12. 另一个转 pinyin 的方案[汉字转拼音](https://yq.aliyun.com/articles/228252) 已注入 有修改

  

```

SELECT

result.company_id,

result.company_logo,

result.ticker,

result.company_status_id,

result.company_name_cn,

result.company_name_en,

result.company_shortname_cn,

result.company_shortname_en,

result.brand_name,

result.year_founded,

result.company_status_name_cn,

result.company_status_name_en,

result.weight,

-- 添加支持拼音 不需要的话 直接用ts

((get_pinyin((result.ts)::text))::tsvector || (get_pinyin((result.ts)::text, 'zm'::text))::tsvector || result.ts) AS ts

FROM (

SELECT computed_list.company_id,

computed_list.company_logo,

computed_list.ticker,

computed_list.company_status_id,

computed_list.company_name_cn,

computed_list.company_name_en,

computed_list.company_shortname_cn,

computed_list.company_shortname_en,

computed_list.brand_name,

computed_list.year_founded,

computed_list.company_status_name_cn,

computed_list.company_status_name_en,

-- 添加权重 将company_status_id转为权重 第一个null可以改为联查作为第三方权重

COALESCE(NULL::integer,

CASE

WHEN ((computed_list.company_status_id)::text ~~ '1%'::text) THEN 2

WHEN ((computed_list.company_status_id)::text ~~ '2%'::text) THEN 1

ELSE 0

END) AS weight,

-- 字段权重 有一部分比如company_shortname_cn用全部作为关键词

COALESCE(setweight(((computed_list.company_id) || ':1 ')::tsvector, 'A'::"char"),'') ||

COALESCE(setweight(to_tsvector('zhcfg',computed_list.company_name_cn), 'A'), '') ||

COALESCE(setweight(to_tsvector(computed_list.company_name_en), 'A'), '') ||

COALESCE(setweight(to_tsvector('zhcfg',computed_list.company_shortname_cn), 'A'), '') ||

COALESCE(setweight(to_tsvector('zhcfg',computed_list.company_shortname_en), 'A'), '') ||

COALESCE(setweight(((computed_list.company_shortname_cn) || ':1 ')::tsvector, 'A'::"char"),'') ||

COALESCE(setweight(((computed_list.company_status_name_en) || ':1 ')::tsvector, 'A'::"char"),'') ||

COALESCE(setweight(((computed_list.brand_name) || ':1 ')::tsvector, 'A'::"char"),'')

as ts

-- 合并掉该合并的部分比如brand name

FROM ( SELECT list.company_id,

list.company_logo,

list.ticker,

list.company_status_id,

list.company_name_cn,

list.company_name_en,

list.company_shortname_cn,

list.company_shortname_en,

-- 合并brand_name

array_to_string(array_agg(list.brand_name), ','::text) AS brand_name,

list.year_founded,

list.company_status_name_cn,

list.company_status_name_en

-- 先整理原始的数据

FROM ( SELECT DISTINCT a.company_id,

a.company_logo,

a.ticker,

a.company_status_id,

a.company_name_cn,

a.company_name_en,

a.company_shortname_cn,

a.company_shortname_en,

b.brand_name,

a.year_founded,

c.name_cn AS company_status_name_cn,

c.name_en AS company_status_name_en

FROM ((company_profile a

LEFT JOIN brand_info b ON (((a.company_id)::text = (b.company_id)::text)))

LEFT JOIN config.dictionary c ON (((a.company_status_id)::text = (c.id)::text)))

WHERE ((a.company_status_id)::text <> '3.3'::text)) list

GROUP BY list.company_id, list.ticker, list.company_status_id, list.company_name_cn, list.company_name_en, list.company_shortname_cn, list.company_shortname_en, list.year_founded, list.company_status_name_cn, list.company_status_name_en) computed_list

) AS RESULT

  

```

  

##### 查询方式

  

说明 ts 为查询用的列

order by 通过权重和 ts_rank(和搜索词的匹配度) \* 10 作为排序规则

  

```

SELECT DISTINCT

company_id AS "companyId",

company_logo AS "companyLogo",

ticker,

brand_name as "brandName",

company_status_id AS "companyStatusId",

company_name_cn AS "companyNameCn",

company_name_en AS "companyNameEn",

company_shortname_cn AS "companyShortnameCn",

company_shortname_en AS "companyShortnameEn",

ts_rank(

ts,

to_tsquery('zhcfg',lower('海思'))

) * 10 + weight AS RANK

FROM

search_company

WHERE

-- 原本的全文搜索方式

-- ts @@ (phraseto_tsquery('zhcfg',lower('海思')) || phraseto_tsquery('zhcfg',upper('海思')))

-- 通过模糊查询保证顺序 9.6可以更换为原本的全文搜索添加距离部分来完成

ts::text ~ upper('海思')

or

ts:: text ~ lower('海思')

ORDER BY

RANK DESC

LIMIT 25

  
  

```

  

#### 拼音查询配置

  

- 构建函数

  

```

  

create or replace function get_pinyin(vhz text, return_type text = 'py') returns text as $$

declare

res_py text;

res_zm text;

tmp_py text;

tmp_zm text;

begin

res_py:='';

res_zm:='';

-- 循环每个字进行替换

for i in 1..length(vhz)

loop

select py,zm into tmp_py,tmp_zm from config.pinyin where hz=substring(vhz, i, 1);

if not found then

res_py := res_py || substring(vhz, i, 1);

res_zm := res_zm || substring(vhz, i, 1);

else

res_py := res_py || tmp_py;

res_zm := res_zm || tmp_zm;

end if;

end loop;

-- return lower(res_py || ' ' || res_zm);

-- return return_type;

-- 根据return type来看返回首字母还是全拼音

if return_type = 'py' then

return lower(res_py);

else

return lower(res_zm);

end if;

end;

  

$$ language plpgsql strict immutable;

  

```

  

- 引入表 py.sql(有道云)

- 把分词结果转为拼音`get_pinyin('上海')`

  

#### 重建索引 需要使用 pg_trgm

  

```

-- 引入 trgm

create extension pg_trgm;

create or replace function record_to_text(anyelement) returns text as $$

select $1::text;

$$ language sql strict immutable;

  
  

create or replace function textsend_i (text) returns bytea as $$

select textsend($1);

$$ language sql strict immutable;

  

-- 重建部分

drop index idx_search_company_ts ;

create index idx_search_company_ts on search_company using gin(record_to_text(search_company) gin_trgm_ops);

  

```

  

#### 词典

  

```

-- 往自定义分词词典里面插入新的分词

insert into pg_ts_custom_word values ('保障房资');

-- 使新的分词生效

select zhprs_sync_dict_xdb();

-- 退出此连接

```

  

#### 跨数据库

  

```

create database product_v2_back with template template0 lc_collate 'zh_CN.utf8' lc_ctype 'zh_CN.utf8';

create extension postgres_fdw;

create server aliyun foreign data wrapper postgres_fdw options(dbname 'product_v2');

create user mapping for jydreader server aliyun options(user 'jydreader',password 'Jyd6789!');

  

CREATE FOREIGN TABLE search_engine(

ticker varchar,

company_logo varchar,

company_status_id varchar,

company_name_cn varchar,

company_name_en varchar,

company_shortname_cn varchar,

company_shortname_en varchar,

brand_name varchar,

year_founded varchar,

company_status_name_cn varchar,

company_status_name_en varchar,

weight varchar,

ts tsvector

) server aliyun options (schema_name 'public',table_name 'search_engine');

  

```

  

#### 两个字的搜索加速(gin 索引)

  

```

create or replace function split_gin_accelerate(text) returns text[] as $$

declare

res text[];

begin

select regexp_split_to_array($1,'') into res;

for i in 1..length($1)-1 loop

res := array_append(res, substring($1,i,2));

end loop;

return res;

end;

$$ language plpgsql strict immutable;

  

-- create index ids_foreign_search_engine_gin on foreign_search_engine using gin (record_to_text(foreign_search_engine) gin_trgm_ops) ;

-- create index ids_foreign_search_engine_gist on foreign_search_engine using gin (record_to_text(foreign_search_engine) gin_trgm_ops) ;

create index idx_foreign_search_engine_split_gin_accelerate on foreign_search_engine using gin (split_gin_accelerate(record_to_text(foreign_search_engine)));

  

```

  

## 后续开发计划

  

1. 搜索引擎支持权重查询(完成) [教程](https://github.com/digoal/blog/blob/master/201604/20160419_01.md)

2. 支持相似搜索 [教程](https://github.com/digoal/blog/blob/936be5892997fa312f8882977054066d852c77a4/201608/20160817_01.md)

3. 支持拼音搜索(完成) [教程](https://github.com/digoal/blog/blob/master/201611/20161109_01.md?spm=5176.100239.blogcont64240.26.FVsDwc&file=20161109_01.md) [2](https://github.com/digoal/blog/blob/master/201605/20160511_01.md) [排序](https://github.com/digoal/blog/blob/master/201612/20161205_01.md)

  

4. 自定义词典 [文章](https://github.com/digoal/blog/blob/76b23d76ae9ce9ec80bc836e6a2850f7a965e808/201603/20160310_01.md)

5. 高效筛选 [文章](https://github.com/digoal/blog/blob/master/201706/20170607_02.md)