## mysql概述

### DB & DBMS &SQL

| 名称                   | 介绍                                                         |
| ---------------------- | ------------------------------------------------------------ |
| 数据库（DB）           | 存储数据的仓库                                               |
| 数据库管理系统（DBMS） | 操纵和管理数据库的大型软件                                   |
| SQL                    | 操作关系型数据库的编程语言，定义了一套操作关系型数据库统一标准 |



### 客户端连接mysql

+ MySQL  Command Line Client 
+ CMD（使用这种方式需要在MySQL安装完后配置PATH）
  + mysql [-h 127.0.0.1] [-P 3306] -u root -p



### 数据模型

+ 关系型数据库
  + 概念：建立在关系模型基础上，由多张相互连接的二维表组成的数据库
+ 数据模型
  + ![image-20241222143817325](MySQL基础操作/image-20241222143817325.png)
  + 通过MySQL客户端连接DBMS，客户端编写SQL语句并由DBMS解析来操作DB中的表及表中数据。



## SQL

全称 Structured Query Language，结构化查询语言

### SQL通用语法

+ 可以 单行/多行 书写，以分号结尾
+ SQL不区分大小写，关键字一般大写

+ SQL注释：
  + 单行注释：`-- 注释内容 `  或者 `# 注释内容` 
  + 多行注释： `/* 注释内容 */`



### SQL分类

#### DDL

数据定义语言，用来定义数据库对象（数据库、表、字段）

+ 数据库操作
  + 查询所有数据库：`show databases ;`
  + 查询当前数据库：`select database() ;`
  + 创建数据库：`create database [ if not exists ] 数据库名 [ default charset 字符集 ] [ collate 排序规则 ] ;`
  + 删除数据库：`drop database [ if exists ] 数据库名 ; `
  + 切换数据库（要操作某一个数据库下的表，需要通过该指令，切换到对应的数据库下） ：`use 数据库名`
  + 例子：
    + 创建demo1数据库，使用默认数据集：`create database demo1 ;`
    + 创建demo2数据库并指定字符集：`create database demo2 default charset utf8mb4 ;`
    + 使用demo2数据库：`use demo2;`
+ 表操作
  + 查询创建



#### 图形化界面工具





#### DML





#### DQL





#### DCL





## 函数

