---
title: 计算机网络
tags:
  - 计算机网络
createTime: 2026/04/03 14:43:41
permalink: /blog/eo4mliq9/
---

# 计算机网络

## 概述

当前的应用系统主要分两大类，一类是C/S(Client/Server)客户端/服务器架构的，一类是B/S (Browser/Server)浏览器/服务器架构的。无论是C/S架构，还是B/S架构，客户端都需要和远端的服务器进行网络通信，进行数据交互。

## OSI七层模型和TCP/IP四层模型

![20260403145640](https://raw.githubusercontent.com/Withnoidea/images/main/20260403145640.png)
![osi&tcpip.drawio](https://raw.githubusercontent.com/Withnoidea/images/main/osi%26tcpip.drawio.png)

- OSI七层模型

  共七层：物理层、数据链路层、网络层、传输层、会话层、表示层、应用层。

  物理层：高低电平，数据传输速度，传输距离，物理连接器等。

  数据链路层：提供数据在物理链路的传输、物理寻址、网络拓扑、错误检测。

  网络层：主机之间的连接、路径选择以及基于IP 的寻址。

  传输层：在两台主机之间建立端到端的连接，以及如何实现可靠的传输。

  会话层：会话的建立、管理和终止通信主机的对话，为表示层提供服务。

  表示层：将不同的数据格式转换成一种通用的数据格式，能够被不同的系统识别。

  应用层：为用户的应用程序提供各种网络服务。

- CP/IP四层模型
