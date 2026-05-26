---
title: PTA-Advance
tags:
  - C++
  - 算法
  - 数据结构
createTime: 2026/05/25 13:26:24
permalink: /blog/du7x5pjz/
---
## [1003 Emergency - PAT (Advanced Level) Practice](https://pintia.cn/problem-sets/994805342720868352/exam/problems/type/7?problemSetProblemId=994805523835109376)

::: collapse
- 点击展开题目
  # 1003 Emergency  1003 紧急情况

  As an emergency rescue team leader of a city, you are given a special map of your country. The map shows several scattered cities connected by some roads. Amount of rescue teams in each city and the length of each road between any pair of cities are marked on the map. When there is an emergency call to you from some other city, your job is to lead your men to the place as quickly as possible, and at the mean time, call up as many hands on the way as possible.
  作为一个城市的紧急救援队队长，你得到了一张特殊的国家地图。地图上有几座分散的城市，由几条道路连接。地图上标明了每个城市的救援队数量以及任何一对城市之间每条道路的长度。当其他城市向您发出紧急呼叫时，您的任务是带领您的人尽快赶往该地，同时在途中召集尽可能多的救援人员。

  ### Input Specification:  输入规格：

  Each input file contains one test case. For each test case, the first line contains 4 positive integers: $N$ ($\le 500$) - the number of cities (and the cities are numbered from 0 to $N−1$), $M$ - the number of roads, $C_1$ and $C_2$ - the cities that you are currently in and that you must save, respectively. The next line contains $N$ integers, where the $i$-th integer is the number of rescue teams in the $i$-th city. Then $M$ lines follow, each describes a road with three integers $c_1$, $c_2$ and $L$, which are the pair of cities connected by a road and the length of that road, respectively. It is guaranteed that there exists at least one path from $C_1$ to $C_2$.
  每个输入文件包含一个测试用例。每个测试用例的第一行包含 4 个正整数： $N$ ( $\le 500$ ) --城市数量(城市编号从 0 到 $N−1$ )， $M$ --道路数量， $C_1$ 和 $C_2$ --分别是您当前所在的城市和必须保存的城市。下一行包含 $N$ 个整数，其中第 $i$ - 个整数是第 $i$ - 个城市中救援队的数量。然后是 $M$ 行，每行描述一条道路，包含三个整数 $c_1$ 、 $c_2$ 和 $L$ ，分别是道路连接的城市对和道路的长度。可以保证至少存在一条从 $C_1$ 到 $C_2$ 的路径。

  ### Output Specification:  输出规格：

  For each test case, print in one line two numbers: the number of different shortest paths between $C_1$ and $C_2$, and the maximum amount of rescue teams you can possibly gather. All the numbers in a line must be separated by exactly one space, and there is no extra space allowed at the end of a line.
  对于每个测试用例，请在一行中打印两个数字： $C_1$ 和 $C_2$ 之间不同最短路径的数量，以及您可能召集的最大救援队数量。 一行中的所有数字必须用一个空格隔开，行尾不允许有多余的空格。

  ### Sample Input:

  ```
  5 6 0 2
  1 2 1 5 3
  0 1 1
  0 2 2
  0 3 1
  1 2 1
  2 4 1
  3 4 1
  ```

  ### Sample Output:

  ```
  2 4
  ```

  > 代码长度限制16 KB | 时间限制400 ms | 内存限制64 MB | 栈限制8192 KB
:::
### 思路
DIjkstra算法

::: code-tabs
@tab C++
```C++
#include <bits/stdc++.h>
#define x first
#define y second
using namespace std;
typedef long long LL;
typedef pair<int, int> PII;
const int N = 550;
int g[N][N];
int dist[N];
int w[N], cnt[N], sum[N];
bool st[N];
int n, m, S, T;

void dijkstra()
{
	memset(dist, 0x3f, sizeof dist);
	dist[S] = 0, cnt[S] = 1, sum[S] = w[S];
	
	for(int i = 0; i < n; i ++)
	{
		int t = -1;
		for(int j = 0; j < n; j ++)
		{
			if(!st[j] && (t == -1 || dist[t] > dist[j]))
			{
				t = j;
			}	
		}	
		st[t] = true;
		for(int j = 0; j < n; j ++)
		{
			if(dist[j] > dist[t] + g[t][j])
			{
				dist[j] = dist[t] + g[t][j];
				sum[j] = sum[t] + w[j];
				cnt[j] = cnt[t];
			}
			else if(dist[j] == dist[t] + g[t][j])
			{
				cnt[j] += cnt[t];
				sum[j] = max(sum[j], sum[t] + w[j]);
			}
		}
	}
	
}

int main()
{
 	ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);
	cin >> n >> m >> S >> T;
	memset(g, 0x3f, sizeof g);
	for(int i = 0; i < n; i ++)
		cin >> w[i];
	while(m --)
	{
		int a, b, c;
		cin >> a >> b >> c;
		g[a][b] = g[b][a] = min(g[a][b], c);
	}
	dijkstra();
	cout << cnt[T] << " " << sum[T] << "\n";
	
	return 0;
}

```
:::
## [1004 Counting Leaves](https://pintia.cn/problem-sets/994805342720868352/exam/problems/type/7?problemSetProblemId=994805521431773184)

::: collapse
- 点击展开题目
  # 1004 Counting Leaves  1004 数树叶

  A family hierarchy is usually presented by a pedigree tree. Your job is to count those family members who have no child.
  家族等级通常由一棵血统树来呈现。 您的任务是统计那些没有子女的家庭成员。

  ### Input Specification:  输入规格：

  Each input file contains one test case. Each case starts with a line containing $0<N<100$, the number of nodes in a tree, and $M$ ($<N$), the number of non-leaf nodes. Then $M$ lines follow, each in the format:
  每个输入文件包含一个测试用例。每个案例以一行开始，其中包含 $0<N<100$ (树中节点的数量)和 $M$ ( $<N$ ) (非叶节点的数量)。 然后是 $M$ 行，每行的格式为

  ```
  ID K ID[1] ID[2] ... ID[K]
  ```

  where `ID` is a two-digit number representing a given non-leaf node, `K` is the number of its children, followed by a sequence of two-digit `ID`'s of its children. For the sake of simplicity, let us fix the root ID to be `01`.
  其中， `ID` 是一个两位数，代表一个给定的非叶节点， `K` 是它的子节点数，后面是它的子节点的一系列两位数 `ID` 's。 为简单起见，我们把根节点的 ID 定为 `01` 。

  The input ends with $N$ being 0. That case must NOT be processed.
  输入结束时 $N$ 为 0，这种情况必须不予处理。

  ### Output Specification:  输出规格：

  For each test case, you are supposed to count those family members who have no child **for every seniority level** starting from the root. The numbers must be printed in a line, separated by a space, and there must be no extra space at the end of each line.
  对于每个测试用例，您应该从根本上开始计算每一级资历中没有子女的家庭成员。 这些数字必须打印成一行，中间用空格隔开，每行末尾不得有多余的空格。

  The sample case represents a tree with only 2 nodes, where `01` is the root and `02` is its only child. Hence on the root `01` level, there is `0` leaf node; and on the next level, there is `1` leaf node. Then we should output `0 1` in a line.
  示例表示一棵只有 2 个节点的树，其中 `01` 是根节点， `02` 是其唯一的子节点。 因此，在根节点 `01` 层，有 `0` 个叶节点;在下一层，有 `1` 个叶节点。 那么我们应该在一行中输出 `0 1` 。

  ### Sample Input:  输入样本：

  ```
  2 1
  01 1 02
  ```

  ### Sample Output:  样本输出：

  ```
  0 1
  ```

  > 代码长度限制16 KB | 时间限制400 ms  400 毫秒 | 内存限制64 MB | 栈限制8192 KB

:::
### 思路
统计每一层叶节点数量 dfs/bfs
::: code-tabs
@tab dfs
```c++
#include <bits/stdc++.h>
using namespace std;
const int N = 110;
int h[N], e[N], ne[N], idx;
int cnt[N];
int n, m;
int max_depth;

void add(int a, int b)
{
    e[idx] = b, ne[idx] = h[a], h[a] = idx ++;
}

void dfs(int u, int depth)
{
    if(h[u] == -1)
    {
        cnt[depth] ++;
        max_depth = max(max_depth, depth);
        return;
    }
    for(int i = h[u]; i != -1; i = ne[i])
        dfs(e[i], depth + 1);
}

int main()
{
    memset(h, -1, sizeof h);
    cin >> n >> m;
    while(m --)
    {
        int id, k;
        cin >> id >> k;
        int son;
        for(int i = 0; i < k; i ++)
        {
            cin >> son;
            add(id, son);
        }
    }
    dfs(1, 0);
    for(int i = 0; i <= max_depth; i ++)
        cout << cnt[i] << " \n"[i == max_depth];
    return 0;
}
```
@tab bfs
```C++
#include <iostream>
#include <cstring>
#include <queue>
using namespace std;

const int N = 110;

int h[N], e[N], ne[N], idx;   // 邻接表
int cnt[N];                   // 每层的叶子数
int max_depth;                // 最大层数（根为第0层）
int n, m;

void add(int a, int b) {
    e[idx] = b, ne[idx] = h[a], h[a] = idx++;
}

void bfs() {
    queue<pair<int, int>> q;          // <节点编号, 深度>
    q.push({1, 0});                   // 根节点是01，深度0

    while (!q.empty()) {
        auto [u, depth] = q.front();
        q.pop();

        max_depth = max(max_depth, depth);

        // 判断是否为叶子：邻接表头为-1 表示没有孩子
        if (h[u] == -1) {
            cnt[depth]++;
        } else {
            // 遍历所有孩子
            for (int i = h[u]; i != -1; i = ne[i]) {
                int child = e[i];
                q.push({child, depth + 1});
            }
        }
    }
}

int main() {
    cin >> n >> m;

    memset(h, -1, sizeof h);   // 初始化邻接表头

    // 读入非叶子节点信息，建树
    while (m--) {
        int id, k;
        cin >> id >> k;
        while (k--) {
            int son;
            cin >> son;
            add(id, son);
        }
    }

    bfs();

    // 输出每一层的叶子数，从第0层到max_depth
    for (int i = 0; i <= max_depth; i++) {
        if (i) cout << ' ';
        cout << cnt[i];
    }
    cout << endl;

    return 0;
}
```
:::

## [1005 Spell It Right](https://pintia.cn/problem-sets/994805342720868352/exam/problems/type/7?problemSetProblemId=994805519074574336)
::: collapse
- 点击展开题目
    # 1005 Spell It Right  1005 拼写正确

    Given a non-negative integer $N$, your task is to compute the sum of all the digits of $N$, and output every digit of the sum in English.
    给定一个非负整数 $N$ ，你的任务是计算 $N$ 的所有数字之和，并用英语输出和的每一位数字。

    ### Input Specification:  输入规格：

    Each input file contains one test case. Each case occupies one line which contains an $N$ ($\le 10^{100}$).
    每个输入文件包含一个测试用例。每个案例占一行，其中包含一个 $N$ ( $\le 10^{100}$ )。

    ### Output Specification:  输出规格：

    For each test case, output in one line the digits of the sum in English words. There must be one space between two consecutive words, but no extra space at the end of a line.
    对于每个测试用例，用英文单词在一行中输出和的位数。两个连续的单词之间必须有一个空格，但行尾不能有多余的空格。

    ### Sample Input:  输入样本：

    ```
    12345
    ```

    ### Sample Output:  样本输出：

    ```
    one five
    ```

    > 代码长度限制16 KB | 时间限制400 ms | 内存限制64 MB | 栈限制8192 KB
:::
### 思路
字符串模拟


::: code-tabs
@tab C++
```C++
#include <bits/stdc++.h>
#define x first
#define y second
using namespace std;
typedef long long LL;
typedef pair<int, int> PII;
const int N = 1e5 + 10;
int n;
string s;
map<int, string> mp = {
	{0, "zero"},
	{1, "one"},
	{2, "two"},
	{3, "three"},
	{4, "four"},
	{5, "five"},
	{6, "six"},
	{7, "seven"},
	{8, "eight"},
	{9, "nine"}
};

int main()
{
 	ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);
	cin >> s;
	for(int i = 0; i < s.size(); i ++)
		n += s[i] - '0';
	string res = to_string(n);
	for(int i = 0; i < res.size(); i ++)
        cout << mp[res[i] - '0'] << " \n"[i == res.size() - 1]; 
	return 0;
}

```
:::