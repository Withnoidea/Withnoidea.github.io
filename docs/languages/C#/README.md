---
title: C#
permalink: /languages/cs/
---

# C#教程

## 官方文档：

[概述 - A tour of C# | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/csharp/tour-of-csharp/overview)

## c#简介以及.net

C# 语言是适用于 [.NET](https://learn.microsoft.com/zh-cn/dotnet/csharp/) 平台（免费的跨平台开源开发环境）的最流行语言。 C# 程序可以在许多不同的设备上运行，从物联网 (IoT) 设备到云以及介于两者之间的任何设备。 可为手机、台式机、笔记本电脑和服务器编写应用

C# 应用受益于运行时的 [自动内存管理](https://learn.microsoft.com/zh-cn/dotnet/standard/automatic-memory-management)。

C# 是 _一种已编译_ 的语言。

C# 是一种强类型语言。

C# 提供[模式匹配](https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/functional/pattern-matching)。

### c#领域

- 桌面应用
- web开发
- 后端服务
- 游戏开发
- 移动端
- 其他

### .net运行时的开发框架

- c#运行时需要.net
- c#不等于.net .net还支持f#和VB.net

## 开发环境

下载地址：[Visual Studio IDE - 用于编码调试和测试的 AI](https://visualstudio.microsoft.com/zh-hans/vs/)

安装流程：

## Hello World

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

### 总结：

- namespace 是命名空间，用于组织代码，避免命名冲突
- Main方法是程序入口，需要注意大小写
- Console.WriteLine输出后换行Console.Write输出后不换行
- 用双引号包裹字符串
- 每行代码结束后用**;**结尾
- 注意使用英文半角符号

## 变量和类型

- 元组

  *元组*是具有可选名称和单个类型的有序固定长度值序列。 将序列括在 `(` 和 `)` 标签中。

## 语言集成查询

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

## MusicDemo

```c#
namespace MusicDemo
{
    internal class Program
    {

        static List<Song> playLists = new List<Song>();
        static void Main(string[] args)
        {
            playLists.Add(new Song("Blinding Lights", "The Weeknd", 200));
            playLists.Add(new Song("Shape of You", "Ed Sheeran", 234));
            playLists.Add(new Song("Someone Like You", "Adele", 285));

            while (true)
            {
                Console.WriteLine();
                Console.WriteLine("======= MyPlaylist =======");
                Console.WriteLine("1. 查看歌单");
                Console.WriteLine("2. 添加歌曲");
                Console.WriteLine("3. 删除歌曲");
                Console.WriteLine("0. 退出");
                Console.Write("请选择：\n");

                string input = Console.ReadLine();

                switch (input)
                {
                    case "1":
                        ShowPlaylist();
                        break;
                    case "2":
                        AddSong();
                        break;
                    case "3":
                        DeleteSong();
                        break;
                    case "0":
                        Console.WriteLine("退出程序");
                        return;
                    default:
                        Console.WriteLine("无效输入，请重新选择");
                        break;
                }
            }

            static void AddSong()
            {
                Console.WriteLine("===添加歌曲===");
                //提示用户输入歌曲信息
                Console.WriteLine("请输入歌名");
                string title = Console.ReadLine();
                Console.WriteLine("请输入作者");
                string artist = Console.ReadLine();
                Console.WriteLine("请输入时长");
                int duration;
                while (!int.TryParse(Console.ReadLine(), out duration) || duration < 0)
                {
                    Console.WriteLine("输入的时长无效，请输入一个非负整数（单位：秒）：");
                }
                playLists.Add(new Song(title, artist, duration));
                Console.WriteLine("已添加！");
            }


            static void ShowPlaylist()
            {
                Console.WriteLine("===展示歌单===");
                //如果歌单为空，提示用户
                if (playLists.Count == 0)
                {
                    Console.WriteLine("歌单为空，请添加歌曲");
                    return;
                }
                else
                {
                    for (int i = 0; i < playLists.Count; i++)
                    {
                        playLists[i].Print(i + 1);
                    }
                }

            }



            static void DeleteSong()
            {
                Console.WriteLine("===删除歌曲===");
                Console.WriteLine("请输入要删除的歌曲的名称");
                string title = Console.ReadLine();
                bool found = false;
                for (int i = 0; i < playLists.Count; i++)
                {
                    if (title == playLists[i].Title)
                    {
                        playLists.RemoveAt(i);
                        Console.WriteLine("删除成功");
                        found = true;
                        break;
                    }
                }
                if(!found)
                {
                    Console.WriteLine("未查询到该歌曲");
                }
            }
        }
    }

}


class Song
{
    public string Title { get; set; }
    public string Artist { get; set; }

    public int Duration { get; set; }

    public Song(string title, string artist, int duration) {
        Title = title;
        Artist = artist;
        Duration = duration;
    }

    //将Duration转换为3：25格式
    public string GetDurationText()
    {
        return $"{Duration / 60}:{Duration % 60:D2}";
    }

    public void Print(int index)
    {
        Console.WriteLine($"{index}.{Title} - {Artist}  [{GetDurationText()}]");
    }


}
```

### 后续可优化的点

- 真实场景的音乐的操作
- 设计前端界面

## Q&A

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

   表示的是**0 to 4**

   `numbers[0..5]`是左闭右开`[0,5)`

5. 如何理解public static (string drugId, string batchId) Parse(string code)

   这是元组，意思是这个方法同时返回两个值

   ```c#
           // 解析追溯码，拆出drugId和batchId
           public static (string drugId, string batchId) Parse(string code)
           {
               if (!IsValid(code))
                   throw new TraceCodeException(code, $"追溯码格式不正确: {code}");

               string[] parts = code.Split('-');
               return (parts[1], parts[2]);
           }
   ```

6.
