---
title: wsl
tags:
  - linux
createTime: 2026/08/10 13:14:24
permalink: /blog/u57lirms/
---
# WSL 全套常用命令（查看列表、启动、进入、退出、关闭）
## 1、查看所有 WSL 发行版列表
### 基础命令（最常用）
```powershell
wsl --list --verbose
```
简写版本
```powershell
wsl -l -v
```
输出字段解释
- `NAME`：系统名称（Ubuntu、kali‑linux 等，启动要用这个名字）
- `STATE`：运行状态 Running / Stopped
- `VERSION`：WSL内核版本 1 或 2

## 2、启动 / 进入指定WSL
### 方式1：直接启动并进入终端
```powershell
# wsl -d 发行版名称
wsl -d Ubuntu
```

### 方式2：设置默认系统，直接输入 wsl 即可进入
```powershell
wsl --set-default Ubuntu
# 之后直接执行
wsl
```

### 方式3：启动后台运行，不打开终端
```powershell
wsl --distribution Ubuntu
```

## 3、退出WSL（分两种场景）
### ① 在WSL‑Linux终端里面退出，回到Windows终端
```bash
exit
```
快捷键：`Ctrl+D` 同样可以退出当前shell

> ⚠️ 执行exit只是退出终端窗口，**WSL虚拟机后台依旧在运行**

### ② 彻底关闭、停止指定WSL虚拟机（后台关机）
PowerShell执行：
```powershell
wsl --terminate Ubuntu
#简写
wsl -t Ubuntu
```

### ③ 一次性关闭全部正在运行的 WSL
```powershell
wsl --shutdown
```

---
# 高频附加实用命令
```powershell
# 设置WSL2
wsl --set-version Ubuntu 2

# 设置WSL1
wsl --set-version Ubuntu 1

# 查看默认发行版
wsl --status

# 卸载删除WSL系统
wsl --unregister Ubuntu
```

## 简短操作流程示例
1. 查看列表：`wsl -l -v`
2. 启动ubuntu：`wsl -d Ubuntu`
3. linux内退出shell：`exit`
4. 彻底关机：`wsl -t Ubuntu`