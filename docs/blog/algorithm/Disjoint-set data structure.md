---
title: 并查集
tags:
  - C++
  - 算法
  - 数据结构
---

并查集是一种用于管理元素所属集合的数据结构，实现为一个森林，其中每棵树表示一个集合，树中的节点表示对应集合中的元素．

顾名思义，并查集支持两种操作：

合并（Unite）：合并两个元素所属集合（合并对应的树）．
查询（Find）：查询某个元素所属集合（查询对应的树的根节点），这可以用于判断两个元素是否属于同一集合．
并查集在经过修改后可以支持单个元素的删除、移动或维护树上的边权．使用动态开点线段树还可以实现 可持久化并查集．

<br>

## [836. 合并集合](https://www.acwing.com/problem/content/838/)

::: collapse
- 点击展开题目

  一共有 $n$ 个数，编号是 $1 \sim n$，最开始每个数各自在一个集合中。

  现在要进行 $m$ 个操作，操作共有两种：

  1.  `M a b`，将编号为 $a$ 和 $b$ 的两个数所在的集合合并，如果两个数已经在同一个集合中，则忽略这个操作；
  2.  `Q a b`，询问编号为 $a$ 和 $b$ 的两个数是否在同一个集合中；

  #### 输入格式

  第一行输入整数 $n$ 和 $m$。

  接下来 $m$ 行，每行包含一个操作指令，指令为 `M a b` 或 `Q a b` 中的一种。

  #### 输出格式

  对于每个询问指令 `Q a b`，都要输出一个结果，如果 $a$ 和 $b$ 在同一集合内，则输出 `Yes`，否则输出 `No`。

  每个结果占一行。

  #### 数据范围

  $1 \le n,m \le 10^5$

  #### 输入样例：

  ```
  4 5
  M 1 2
  M 3 4
  Q 1 2
  Q 1 3
  Q 3 4
  ```

  #### 输出样例：

  ```nginx
  Yes
  No
  Yes
  ```
:::

:::code-tabs

@tab C++
```C++
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;
typedef pair<int, int> PII;
const int N = 1e5 + 10;
int p[N];
int n, m;
// find(x) 表示：寻找节点 x 所在集合的根节点。
int find(int x)
{
	if(p[x] != x) p[x] = find(p[x]);//如果 x 不是根节点，就先找到 x 的父节点 p[x] 的根节点，然后把 x 直接连到这个根节点上。
	return p[x];
}

int main()
{
 	ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);
	cin >> n >> m;
	for(int i = 1; i <= n; i ++) p[i] = i;
	while(m --)
	{
		char c;
		int a, b;
		cin >> c >> a >> b;
		int pa, pb;
		pa = find(a), pb = find(b);
		if(c == 'M')
		{
			if(pa != pb) p[pa] = pb;
		}
		else
		{
			cout << (pa == pb ? "Yes" : "No") << endl;
		}
	}
	return 0;
}

```
:::