---
titie: Ollama
tags:
  - AI
title: Ollama配置大模型,内网穿透,chatbox配置
cover: https://raw.githubusercontent.com/Withnoidea/images/main/20260226113117.png
coverStyle:
  layout: left
  compact: true
createTime: 2026/02/26 11:29:13
permalink: /blog/e96a3xfz/
---

## 介绍

[Ollama官网](https://ollama.com/)

原文`Ollama is the easiest way to get up and running with large language models such as gpt-oss, Gemma 3, DeepSeek-R1, Qwen3 and more.`

**Ollama 是快速上手并运行大型语言模型最简单的方式**，支持的模型包括 GPT‑OSS、Gemma 3、DeepSeek‑R1、通义千问 3（Qwen3）等。

## 安装模型及使用

OIllama下载https://ollama.com/download/windows

安装后通过·ollama run 模型名·安装并使用模型

模型下载 ：[Models](https://ollama.com/search)

我下了以下模型

```shell
C:\Users\win11>ollama list
NAME                                ID              SIZE      MODIFIED
sushruth/solar-uncensored:latest    125db36e66cb    8.8 GB    9 hours ago
deepseek-llm:7b                     9aab369a853b    4.0 GB    4 weeks ago
qwen3:14b                           bdbd181c33f2    9.3 GB    5 weeks ago
qwen3:1.7b                          8f68893c685c    1.4 GB    5 weeks ago
```

## 本地使用

![image-20260226124116642](https://cdn.jsdelivr.net/gh/Withnoidea/images/image-20260226124116642.png)想要在浏览器上使用通ollama下载的本地模型，可下载page assistance插件，点击插件设置->Ollama设置—>添加url即可 url为本地ip地址 + :11434

![image-20260226130240077](https://cdn.jsdelivr.net/gh/Withnoidea/images/image-20260226130240077.png)还需要打开ollama设置中的expose ollama to the network

![image-20260226130036912](https://cdn.jsdelivr.net/gh/Withnoidea/images/image-20260226130036912.png)

![image-20260226124217742](https://cdn.jsdelivr.net/gh/Withnoidea/images/image-20260226124217742.png)

## ip配置

由于电脑路由器会自动分配IPv4地址，因此在电脑关机断网后一段时间很可能就需要重新修改page assistance中url,这样很麻烦。

解决方法：

- 方法一：自动获取（DHCP）改为手动静态 IP固定（不推荐可自行查阅），

- 方法二：路由器绑定 MAC+IP

在路由器里做 **静态地址分配**（DHCP 绑定）：

1. 浏览器打开 `192.168.86.1`（你的网关）登录路由器

2. 找到 **DHCP 服务器** → **静态地址分配 / 地址绑定**（不推荐）
   - 添加一条：
     1. **MAC 地址**：你电脑 WLAN 的 MAC（可在 `ipconfig /all` 里找）
     2. **IP 地址**：`192.168.86.100`
   - 保存并重启路由器。

   这样电脑依然自动获取，但永远拿到 192.168.86.100最稳定。

   由于可能导致ip冲突，这两个都不推荐

- 方法三 **使用 mDNS**

设置 → 系统 → 关于

找到 **设备名称**

例如：DESKTOP-ABC123

访问 Ollama 就用这个地址

把地址写成：`http://DESKTOP-ABC123.local:11434`

**永远不变，IP 变了也能用！同个 WiFi 下，手机、平板都可以用**

**mDNS = 给你电脑起一个 “局域网内永久不变的名字”**

- 不用管 IP 变不变

- 不用设静态 IP

- 不会 IP 冲突

- 只要在

  同一个家里 WiFi

  ```
  你的电脑名.local:端口
  ```

  永远能找到你电脑

## cpolar设置内网穿透

当手机使用chatbox和电脑不在同一个wifi下，ollama就用不了，用 cpolar 把 Ollama 暴露到公网，就可以完美解决这个问题

## 一、注册与安装 cpolar

1. 打开官网：https://www.cpolar.com/
2. 右上角 **免费注册** → 用邮箱注册并登录
3. 登录后点 **下载** → 下载 Windows 版安装包
4. 双击安装，**一路默认下一步** 即可

## 二、绑定你的账号

1. 回到 cpolar 后台 → 左侧 **验证** → 复制你的 **Authtoken**

2. 以**管理员身份**打开 cmd 或 PowerShell

3. 执行（把

   ```
   你的token
   cpolar authtoken 你的token
   ```

   提示~Authtoken saved~即成功

## 三、创建 Ollama 隧道

1. 浏览器打开：http://localhost:9200 → 用 cpolar 账号登录
2. 左侧：**隧道管理 → 创建隧道**
3. 按下面填：
   - 隧道名称：`ollama`（自定义，不重复即可）
   - 协议：**http**
   - 本地地址：`11434`（Ollama 默认端口）
   - 域名类型：**随机域名**（免费）
   - 地区：**China Top**
4. 点 **创建** → 再点 **启动**

## 四、获取公网地址

1. 左侧：**状态 → 在线隧道列表**

2. 找到 ollama隧道，复制 https 地址

   ```
   https://xxxxxx.cpolar.cn
   ```

## 五、手机 ChatBox 配置

1. 打开手机 ChatBox → Ollama 设置
2. 把 API 地址改成：https://xxxxxx.cpolar.cn
3. 保存 → 测试连接

<p align="center"> <img src="https://cdn.jsdelivr.net/gh/Withnoidea/images/image-20260226132212414.png" alt="image-20260226132212414" style="zoom:33%;" /> </p>

::: tip
现在**不管手机用流量还是别的 WiFi**，都能连家里的 Ollama 了。
:::
