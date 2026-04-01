---
title: C#
permalink: /languages/index/
---

# C#教程

# **官方文档：**[概述 - A tour of C# | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/csharp/tour-of-csharp/overview)

# c#简介以及.net

C# 语言是适用于 [.NET](https://learn.microsoft.com/zh-cn/dotnet/csharp/) 平台（免费的跨平台开源开发环境）的最流行语言。 C# 程序可以在许多不同的设备上运行，从物联网 (IoT) 设备到云以及介于两者之间的任何设备。 可为手机、台式机、笔记本电脑和服务器编写应用

C# 应用受益于运行时的 [自动内存管理](https://learn.microsoft.com/zh-cn/dotnet/standard/automatic-memory-management)。

C# 是 _一种已编译_ 的语言。

C# 是一种强类型语言。

C# 提供[模式匹配](https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/functional/pattern-matching)。

## c#领域

- 桌面应用
- web开发
- 后端服务
- 游戏开发
- 移动端
- 其他

## .net运行时的开发框架

- c#运行时需要.net
- c#不等于.net .net还支持f#和VB.net

# 开发环境

## 下载地址：[Visual Studio IDE - 用于编码调试和测试的 AI](https://visualstudio.microsoft.com/zh-hans/vs/)

## 安装流程：

# Hello World

```c#
using System;

namespace ConsoleApp2
{
    class Program //定义一个类
    {
        static void Main()
        {
            Console.WriteLine("Hello, World!");
            System.Console.WriteLine("Hello, World!");
            Console.Write("QQ:");
            Console.Write("2482454653");
        }
    }
}

```

```C#
Console.WriteLine("Hello World");
```

## 总结：

- namespace 是命名空间，用于组织代码，避免命名冲突
- Main方法是程序入口，需要注意大小写
- Console.WriteLine输出后换行Console.Write输出后不换行
- 用双引号包裹字符串
- 每行代码结束后用**;**结尾
- 注意使用英文半角符号

# 变量和类型

- 元组

  *元组*是具有可选名称和单个类型的有序固定长度值序列。 将序列括在 `(` 和 `)` 标签中。

![image-20260401084829257](https://cdn.jsdelivr.net/gh/Withnoidea/images/image-20260401084829257.png)

![image-20260401084908640](https://cdn.jsdelivr.net/gh/Withnoidea/images/image-20260401084908640.png)

# 语言集成查询

```C#
using System;

namespace ConsoleApp2
{
    class Program //定义一个类
    {
        static void Main()
        {
            List<Student> Students = new List<Student>()
            {
                new Student("小明", 3.8),
                new Student("小红", 2.9),
                new Student("小李", 3.6),
                new Student("小张", 3.2)
            };

            var honorRoll = from student in Students
                            where student.GPA > 3.5
                            select student;

            Console.WriteLine("输出GPA大于3.5的学生");
            foreach(var s  in honorRoll)
            {
                Console.WriteLine("姓名:"+ s.Name+"GPA"+s.GPA);
            }
        }
    }

    public class Student
    {
        public string Name { get; set; }
        public double GPA { get; set; }

        // 构造函数：方便创建对象
        public Student(string name, double gpa)
        {
            Name = name;
            GPA = gpa;
        }
    }
}

```

这里的`var`相当于c++中的`auto`

# Q&A

1. 括号没有高亮显示：

   **工具->选项->文本编辑器->常规->显示->启用大括号对着色**

   ![image-20260401084417096](https://cdn.jsdelivr.net/gh/Withnoidea/images/image-20260401084417096.png)

2. c# 模式匹配中 为什么下面代码不会将 true true判定为false
   1. ```c#
      public static bool ReducedAnd(bool left, bool right) =>
          (left, right) switch
          {
              (true, true) => true,
              (_, _) => false,
          };
      ```

      **switch 表达式是 从上到下 按顺序匹配的！**

      **一旦匹配成功，就直接返回，不会再往下走！true true先检查**

3. **IEnumerable**干嘛的

   只能用 `foreach` 读

   **不能 Add / Remove / Clear**

   只是一个「只读序列」

4. int[] smallNumbers = numbers[0..5]; 表示的是哪几个？

   **0 to 4左闭右开**

5.

6.
