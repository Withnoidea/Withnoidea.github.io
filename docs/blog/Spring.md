---
titie: Spring
tags:
  - Java
title: Spring
createTime: 2026/02/23 22:31:02
permalink: /blog/l6mlskxp/
---

## Spring

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

![20260223225014](https://raw.githubusercontent.com/Withnoidea/images/main/20260223225014.png)
在Spring的官网有这个介绍：现代化的Java开发！说白就是基于Spring的开发！
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

## IOC推导
