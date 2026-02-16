---
title: 课程概览与 shell
permalink: /note/missing-semester/course/
createTime: 2026/02/16 15:40:45
---

## Shell是什么?

相比图形界面（GUI）,用户通过图形和视觉元素与计算机进行交互，如窗口，按钮，图标，菜单等，计算机需要将用户的交互操作转换为对应的指令然后执行相应的操作，Shell是一种简化图形交互，直接采用文本进行计算机操作的一种命令文本接口（界面）。

## 使用shell

```shell
[itheima@bogon ~]$ date
2026年 02月 16日 星期一 00:20:03 PST
[itheima@bogon ~]$ echo Hello
Hello
[itheima@bogon ~]$ echo Hello\nShell
HellonShell
[itheima@bogon ~]$ echo "Hello Shell"
Hello Shell
[itheima@bogon ~]$
```

![20260216162140](https://raw.githubusercontent.com/Withnoidea/images/main/20260216162140.png)

## 在 shell 中导航

```shell
[itheima@bogon ~]$ pwd
/home/itheima
[itheima@bogon ~]$ cd /home/
[itheima@bogon home]$ cd ..
[itheima@bogon /]$ pwd
/
[itheima@bogon /]$ cd ./home/
[itheima@bogon home]$ cd itheima/
[itheima@bogon ~]$ pwd
/home/itheima
[itheima@bogon ~]$ ../../bin/echo Hello
Hello
[itheima@bogon ~]$

```

- pwd表示显示当前操作目录
- cd 目录名 表示切换路径
- cd - 回到**「上一次所在的目录」**
- cd ~ 回到**「当前用户的家目录」**，直接输入cd等价于cd ~

  **直接输 echo hello和 ../../bin/echo hello 的区别**

- echo hello：Shell 会去系统预设的「命令搜索路径」（环境变量 PATH）里找 echo，找到 /bin/echo 后执行
- ../../bin/echo hello：跳过「搜索路径」，直接通过相对路径指定 echo 的位置，本质执行的是同一个程序

```shell

```

- ls查看指定目录下包含哪些文件
- -h 或 --help 标记可以打印帮助信息，以便了解有哪些可用的标记或选项。

```shell
[itheima@bogon ~]$ ls
Desktop  hello.txt  公共  模板  视频  图片  文档  下载  音乐  桌面
[itheima@bogon ~]$ cat hello.txt
Hello
[itheima@bogon ~]$ echo Hello Shell > hello.txt
[itheima@bogon ~]$ cat hello.txt
Hello Shell
[itheima@bogon ~]$ echo I'm coming. >> hello.txt
[itheima@bogon ~]$ cat hello.txt
Hello Shell
[itheima@bogon ~]$ echo "I'm coming." >> hello.txt
```
