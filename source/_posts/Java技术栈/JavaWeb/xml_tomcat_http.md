---
title: XML_Tomcat_HTTP
tags:
  - XML
  - HTTP
  - Tomcat
  - JavaWeb
categories:
  - Java技术栈
date: 2024-12-27 13:39:37
---

## XML

标记语言，相对于html，xml允许自定义格式，但是第三方框架会通过xml约束来规定配置文件书写方式。



### 常见的配置文件类型

+ properties

  + 

    ```properties
    atguigu.jdbc.url=jdbc:mysql://localhost:3306/demo
    atguigu.jdbc.driver=com.mysql.cj.jdbc.Driver
    atguigu.jdbc.username=root
    atguigu.jdbc.password=root
    ```

+ XML

  + 

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <students>
        <student>
            <name>张三</name>
            <age>18</age>
        </student>
        <student>
            <name>李四</name>
            <age>20</age>
        </student>
    </students>
    ```

  + XML基本语法+HTML约束=HTML语法

  + 根标签只能有一个

  + XML**约束**主要包括**DTD**和**Schema**两种

+ YAML

+ JSON

+ ...



### DOM4J解析XML

1.创建SAXReader对象

```java
SAXReader saxReader = new SAXReader();
```

&#x20;2. 解析XML获取Document对象: 需要传入要解析的XML文件的字节输入流

```java
Document document = reader.read(inputStream);
```

&#x20;3\. 获取文档的根标签

```java
Element rootElement = documen.getRootElement()
```

&#x20;4\. 获取标签的子标签

```java
//获取所有子标签
List<Element> sonElementList = rootElement.elements();
//获取指定标签名的子标签
List<Element> sonElementList = rootElement.elements("标签名");
```

&#x20;5\. 获取标签体内的文本

```java
String text = element.getText();
```

&#x20;6\. 获取标签的某个属性的值

```java
String value = element.attributeValue("属性名");
```



## Tomcat10

### 安装配置

开启tomcat10服务器：`startup.bat`

关闭tomcat10服务器：`shutdown.bat`

> 需要配置JAVA_HOME

处理dos窗口日志中文乱码问题: 修改`conf/logging.properties`,将所有的UTF-8修改为GBK



### tomcat 目录

+ bin
  + 存放二进制可执行文件

+ conf
  + server.xml：配置整个服务器信息，如端口号默认8080
  + tomcat-users.xml：存储tomcat用户文件，如用户名密码角色信息等
  + web.xml：部署描述符文件，这个文件中注册了很多MIME类型。MIME类型是客户端与服务器之间说明文档类型的，如请求一个html网页，那么服务器会告诉客户端浏览器响应的文档是text/html类型的，。MIME就是用来说明文档的内容是什么类型。
  + context.xml：对所有应用的统一配置
+ lib：Tomcat的类库，里面是一堆jar文件。如果需要添加Tomcat依赖的jar文件，把它放到这个目录中。也可以把应用依赖的jar文件放到这个目录中，这个目录中的jar所有项目都可以共享。
+ logs：日志文件，记录了Tomcat启动和关闭的信息，如果启动Tomcat时有错误，那么异常也会记录在日志文件中。
+ temp：临时文件，这个目录下的东西在Tomcat停止后删除
+ **webapps：存放web项目的目录，其中每个文件夹都是一个项目**
+ work：运行时生成的文件，最终运行的文件都在这里。通过webapps中的项目生成的！可以把这个目录下的内容删除，再次运行时会生再次生成work目录。
  + 当用户访问一个JSP文件时，Tomcat会通过JSP生成Java文件，然后再编译Java文件生成class文件，生成的java和class文件都会存放到这个目录下。



### WEB项目的标准结构

```text
-app
	-static
		-css
		-img
		-js
	-WEB-INF
		-classes
		-lib
		-web.xml
	-index.html
```

+ static  一般在此处放静态资源 ( css  js  img)
+ WEB-INF  必须叫WEB-INF,受保护的资源目录,浏览器通过url不可以直接访问的目录
  + classes     src下源代码,配置文件,编译后会在该目录下
  + lib             项目依赖的jar编译后会出现在该目录下
  + web.xml   web项目的基本配置文件. 较新的版本中可以没有该文件
+ index.html  默认的欢迎页

![image-20241227215046379](xml_tomcat_http/image-20241227215046379.png)



### WEB项目部署

+  直接将编译好的项目放在webapps目录下
+ 将编译好的项目打成war包放在webapps目录下
+ 可以将项目放在非webapps的其他目录下,在tomcat中通过配置文件指向app的实际磁盘路径



工程结构和可以发布的项目结构之间的目录对应关系:

![image-20241228000433907](xml_tomcat_http/image-20241228000433907.png)





## http协议

http协议会话方式

![image-20241228000827583](xml_tomcat_http/image-20241228000827583.png)

**HTTP 1,0 & HTTP 1.1**

在HTTP1.0版本中，浏览器请求一个带有图片的网页，会由于下载图片而与服务器之间开启一个新的连接；

但在HTTP1.1版本中，允许浏览器在拿到当前请求对应的全部资源后再断开连接，提高了效率。

![image-20241228001049751](xml_tomcat_http/image-20241228001049751.png)



### 请求和响应报文

#### 报文的格式

![image-20241228001426323](xml_tomcat_http/image-20241228001426323.png)



#### 常见响应码

+ **200：** 请求成功
+ **302：** 重定向，当响应码为302时，表示服务器要求浏览器重新再发一个请求，服务器会发送一个响应头Location指定新请求的URL地址；
+ **304：** 使用了本地缓存
+ **404：** 请求的资源没有找到，说明客户端错误的请求了不存在的资源；
+ **405：** 请求的方式不允许
+ **500：** 请求资源找到了，但服务器内部出现了错误；
