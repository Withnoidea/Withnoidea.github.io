---
titie: Spring
tags:
  - Java
title: Spring
createTime: 2026/02/23 22:31:02
permalink: /blog/l6mlskxp/
cover: https://raw.githubusercontent.com/Withnoidea/images/main/20260226020148.png
coverStyle:
  layout: left
  compact: true
---

## 1.Spring

### 1.1简介

Spring : 春天 --->给软件行业带来了春天

2002年，Rod Jahnson首次推出了Spring框架雏形interface21框架。

2004年3月24日，Spring框架以interface21框架为基础，经过重新设计，发布了1.0正式版。

很难想象Rod Johnson的学历 , 他是悉尼大学的博士，然而他的专业不是计算机，而是音乐学。

Spring理念 : 使现有技术更加实用 . 本身就是一个大杂烩 , 整合现有的框架技术

官网 : http://spring.io/

官方下载地址 : https://repo.spring.io/libs-release-local/org/springframework/spring/

GitHub : https://github.com/spring-projects

spring文档：[spring文档](https://docs.springframework.org.cn/spring-framework/reference/overview.html)

### 1.2优点

- Spring是一个开源的免费的框架（容器）！
- Spring是一个轻量级的、非入侵式的框架！
- **控制反转（IOC），面向切面编程（AOP）！**
- 支持事务的处理，对框架整合的支持！

总结：Spring是一个轻量级的控制反转（IOC）面向切面（AOP）编程的框架（容器）！

### 1.3组成

- ![20260223225014](https://raw.githubusercontent.com/Withnoidea/images/main/20260223225014.png)
  在Spring的官网有这个介绍：现代化的Java开发！说白了就是基于Spring的开发！

  组成 Spring 框架的每个模块（或组件)都可以单独存在，或者与其他一个或多个模块联合实现。每个模块的功能如下：

- **核心容器**：核心容器提供 Spring 框架的基本功能。核心容器的主要组件是 BeanFactory，它是工厂模式的实现。BeanFactory 使用控制反转（IOC） 模式将应用程序的配置和依赖性规范与实际的应用程序代码分开。

- **Spring 上下文**：Spring 上下文是一个配置文件，向 Spring 框架提供上下文信息。Spring 上下文包括企业服务，例如 JNDI、EJB、电子邮件、国际化、校验和调度功能。

- **Spring AOP**：通过配置管理特性，Spring AOP 模块直接将面向切面的编程功能 , 集成到了 Spring 框架中。所以，可以很容易地使 Spring 框架管理任何支持 AOP的对象。Spring AOP 模块为基于 Spring 的应用程序中的对象提供了事务管理服务。通过使用 Spring AOP，不用依赖组件，就可以将声明性事务管理集成到应用程序中。

- **Spring DAO**：JDBC DAO 抽象层提供了有意义的异常层次结构，可用该结构来管理异常处理和不同数据库供应商抛出的错误消息。异常层次结构简化了错误处理，并且极大地降低了需要编写的异常代码数量（例如打开和关闭连接）。Spring DAO 的面向 JDBC 的异常遵从通用的 DAO 异常层次结构。

- **Spring ORM**：Spring 框架插入了若干个 ORM 框架，从而提供了 ORM 的对象关系工具，其中包括 JDO、Hibernate 和 iBatis SQL Map。所有这些都遵从 Spring 的通用事务和 DAO 异常层次结构。

- **Spring Web** 模块：Web 上下文模块建立在应用程序上下文模块之上，为基于 Web 的应用程序提供了上下文。所以，Spring 框架支持与 Jakarta Struts 的集成。Web 模块还简化了处理多部分请求以及将请求参数绑定到域对象的工作。

- **Spring MVC** 框架：MVC 框架是一个全功能的构建 Web 应用程序的 MVC 实现。通过策略接口，MVC 框架变成为高度可配置的，MVC 容纳了大量视图技术，其中包括 JSP、Velocity、Tiles、iText 和 POI。

### 拓展

- Spring Boot 是 Spring 的一套快速配置脚手架，可以基于Spring Boot 快速开发单个微服务;

- Spring Cloud是基于Spring Boot实现的；

- Spring Boot专注于快速、方便集成的单个微服务个体，Spring Cloud关注全局的服务治理框架；

- Spring Boot使用了约束优于配置的理念，很多集成方案已经帮你选择好了，能不配置就不配置 , Spring Cloud很大的一部分是基于Spring Boot来实现，Spring Boot可以离开Spring Cloud独立使用开发项目，但是Spring Cloud离不开Spring Boot，属于依赖的关系。

- SpringBoot在SpringClound中起到了承上启下的作用，如果你要学习SpringCloud必须要学习SpringBoot。
  ![20260223225148](https://raw.githubusercontent.com/Withnoidea/images/main/20260223225148.png)

- Spring Boot
  - 一个快速开发的脚手架
  - 基于Spring Boot可以快速开发单个微服务
  - 约定大于配置
- Spring Cloud
  - 基于Spring Boot实现

因为大多数公司都在使用SpringBoot开发，学习SpringBoot前提
，需要完全掌握Spring和Spring MVC!

弊端：发展太久之后，违背了原来的理念！配置十分繁琐，人称“配置低于！”

## 2.IOC推导

1. sa
2. sasa

### IOC本质

**控制反转IoC(Inversion of Control)，是一种设计思想，DI(依赖注入)是实现IoC的一种方法**，也有人认为DI只是IoC的另一种说法。没有IoC的程序中 , 我们使用面向对象编程 , 对象的创建与对象间的依赖关系完全硬编码在程序中，对象的创建由程序自己控制，控制反转后将对象的创建转移给第三方，个人认为所谓控制反转就是：获得依赖对象的方式反转了。

![图片]

**IoC是Spring框架的核心内容**，使用多种方式完美的实现了IoC，可以使用XML配置，也可以使用注解，新版本的Spring也可以零配置实现IoC。

Spring容器在初始化时先读取配置文件，根据配置文件或元数据创建与组织对象存入容器中，程序使用时再从Ioc容器中取出需要的对象。

![图片]

采用XML方式配置Bean的时候，Bean的定义信息是和实现分离的，而采用注解的方式可以把两者合为一体，Bean的定义信息直接以注解的形式定义在实现类中，从而达到了零配置的目的。

**控制反转是一种通过描述（XML或注解）并通过第三方去生产或获取特定对象的方式。在Spring中实现控制反转的是IoC容器，其实现方法是依赖注入（Dependency Injection,DI）。**

## 3.Hello Spring

![20260224150459](https://raw.githubusercontent.com/Withnoidea/images/main/20260224150459.png)
对象由Spring 来创建 , 管理 , 装配 !

## 4.IOC创建对象的方式

[依赖注入 :: Spring 框架 - Spring 框架](https://docs.springframework.org.cn/spring-framework/reference/core/beans/dependencies/factory-collaborators.html)

1. 使用无参构造，默认！
2.

## 5.Spring配置

![20260226012414](https://raw.githubusercontent.com/Withnoidea/images/main/20260226012414.png)

- **bean**
  ::: code-tabs
  @tab beans.xml

  ```xml
    <!--
        id: bean的唯一标识符 也就是我们学的对象名
        class: bean对象所对应的全类名 包名+类名
        name: 给这个bean对象起一个别名
        property: 给这个bean对象设置属性
    -->
    <bean id="userHansome" class="com.kuang.pojo.User" name="hahaha">
            <property name="name" value="张三"/>
    </bean>
  ```

  :::

- alias
  ::: code-tabs
  @tab beans.xml

  ```xml
    <!--如果添加了别名，我们也可以使用别名获取这个对象    -->
    <alias name="user" alias="宇宙无敌大帅哥"/>
  ```

  :::

  ::: code-tabs
  @tab myTest.java

  ```java
  import com.kuang.pojo.User;
  import org.springframework.context.ApplicationContext;
  import org.springframework.context.support.ClassPathXmlApplicationContext;
  public class myTest {
  public static void main(String[] args) {
    ApplicationContext context = new  ClassPathXmlApplicationContext("beans.xml");
    User user = (User) context.getBean("宇宙无敌大帅哥");
    user.show();
    }
  }
  ```

- description

```xml
<description>这是一个配置文件</description>
```

- import

  import一般用于多团队开发使用，可将多个配置合并成一个导入到配置中

:::code-tabs
@tab application.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <import resource="beans.xml"  />
    <import resource="beans2.xml" />
</beans>
```

@tab beans.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="user" class="com.kuang.pojo.User">
        <property name="name" value="张三"/>
    </bean>
    <bean id="userT" class="com.kuang.pojo.UserT">
    </bean>
    <!--
        id: bean的唯一标识符 也就是我们学的对象名
        class: bean对象所对应的全类名 包名+类名
        name: 给这个bean对象起一个别名
        property: 给这个bean对象设置属性
    -->
    <bean id="userHansome" class="com.kuang.pojo.User" name="hahaha">
            <property name="name" value="张三"/>
    </bean>
    <!--如果添加了别名，我们也可以使用别名获取这个对象    -->
    <alias name="user" alias="宇宙无敌大帅哥"/>
</beans>

```

@tab beans2.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="user" class="com.kuang.pojo.User">
        <property name="name" value="张三"/>
    </bean>
    <bean id="userT" class="com.kuang.pojo.UserT">
    </bean>
<!--如果添加    -->
    <alias name="user" alias="宇宙无敌大帅哥"/>
</beans>
```

:::

## 6.依赖注入

## 7.Bean自动装配

## 8.使用注解开发

## 9.使用Java的方式配置Spring

## 10.代理模式

## 11.AOP

## 12.整合Mybatis

[mybatis-spring](https://mybatis.org/spring/zh_CN/transactions.html#container)

## 13.声明式事务

### 回顾事务

- 把一组业务当成一个业务来做：要么都成功，要么都失败
- 事务在项目的开发中，十分重要，涉及到数据一致性问题，不能马虎！
- 确保完整性和一致性：



事务的ACID原则：atomicity,consistency,isolation,durability

- 原子性 要么都成功要么都失败
- 一致性 要么都提交 要么都失败 资源和状态保持一致
- 隔离性
  - 多个业务可能操作同一个资源，防止数据损坏
- 持久性
  - 事务一旦提交，无论系统发生什么问题，结果都不会再被影响，被持久化写到存储器中。

### 2.spring中的事务管理

- 声明式事务: AOP
- 编程式事务: 需要在代码中进行事务的管理



思考：

为什么需要事务？

- 如果不配置事务，可能存在数据提交不一致情况下；
- 如果不在spring中配置声明式事务，我们就需要在代码中手动配置事务
- 事务在项目开发中十分重要，涉及到数据的一致性和完整性，不容马虎！

**spring-0506070810**
