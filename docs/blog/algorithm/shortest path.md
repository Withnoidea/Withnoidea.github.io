---
title: 最短路
tags:
  - C++
  - 算法
  - 数据结构
createTime: 2026/05/21 15:24:20
permalink: /blog/v5a1lx35/
---
::: note
求从某个源点到其余各点的最短路径 — Dijkstra算法
每一对顶点之间的最短路径 — Floyd算法
:::

<!-- ![20260521161231](https://raw.githubusercontent.com/Withnoidea/images/main/20260521161231.png) -->

## 单源最短路
### 正权边
#### Dijkstra Ⅰ
稠密图 邻接矩阵
S集合表示当前已确定最短距离的点

1. 初始化距离 $dist[1] = 0, dist[others] = inf$
2. 循环$n$次，找到不在$S$中距离集合$S$最近的点$t$，将$t$加到集合$S$中，用$t$更新其他点的距离($t$到其他点$q$距离能否更新其他点到$q$的距离)

时间复杂度 $O(n^2)$

空间复杂度 $O(n^2)$

![alg-graph-min-distance-2](https://raw.githubusercontent.com/Withnoidea/images/main/alg-graph-min-distance-2.gif)

| 循环次数 | 1               | 2             | 3           | 4             | 5               | 6               |
| -------- | --------------- | ------------- | ----------- | ------------- | --------------- | --------------- |
| s        | $\{1\}$         | $\{1,2\}$     | $\{1,2,3\}$ | $\{1,2,3,6\}$ | $\{1,2,3,6,5\}$ | $\{1,2,6,5,4\}$ |
| v        | $\{2,3,4,5,6\}$ | $\{3,4,5,6\}$ | $\{4,5,6\}$ | $\{4,5\}$     | $\{4\}$         | $\{\}$          |

::: code-tabs
@tab C++
```C++
#include <bits/stdc++.h>
using namespace std;
const int N = 550;
int g[N][N];
int dist[N];
bool st[N];
int n, m;

int dijkstra()
{
    memset(dist, 0x3f, sizeof dist);
    dist[1] = 0;
    
    for(int i = 0; i < n; i ++)
    {
        int t = -1;
        for(int j = 1; j <= n; j ++)
        {
            if(!st[j] && (t == -1 || dist[t] > dist[j]))
            {
                t = j;
            }
        }
        st[t] = true;
        for(int j = 1; j <= n; j ++)
        {
            dist[j] = min(dist[j], dist[t] + g[t][j]);
        }
    }
    
    if(dist[n] == 0x3f3f3f3f) return -1;
    return dist[n];
}

int main()
{
    scanf("%d %d", &n, &m);
    memset(g, 0x3f, sizeof g);
    while(m --)
    {
        int a, b, c;
        scanf("%d %d %d", &a, &b, &c);
        g[a][b] = min(g[a][b], c);
    }
    printf("%d\n", dijkstra());
    
    return 0;
}

```
:::

#### Dijkstra Ⅱ （堆优化）
稀疏图 邻接表
::: code-tabs
@tab C++
```C++
#include <bits/stdc++.h>
using namespace std;
const int N = 1e6 + 10;
typedef pair<int, int> PII;

int n, m;
int h[N], w[N], e[N], ne[N], idx;
int dist[N];
bool st[N];

void add(int a, int b, int c)
{
    e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++;
}

int dijkstra()
{
    memset(dist, 0x3f, sizeof dist);
    dist[1] = 0;
    priority_queue<PII, vector<PII>, greater<PII>> heap;
    heap.push({0, 1});
    
    while(heap.size())
    {
        auto t = heap.top();
        heap.pop();
        
        int ver = t.second, distance = t.first;
        if (st[ver]) continue;
        st[ver] = true;
        for(int i = h[ver]; i != -1; i = ne[i])
        {
            int  j = e[i];
            if(dist[j] > dist[ver] + w[i])
            {
                dist[j] = dist[ver] + w[i];
                heap.push({dist[j], j});
            }
        }
    }
    if (dist[n] == 0x3f3f3f3f) return -1;
    return dist[n];
}

int main()
{
    scanf("%d %d", &n, &m);
    memset(h, -1, sizeof h);
    while(m --)
    {
        int a, b, c;
        scanf("%d %d %d", &a, &b, &c);
        add(a, b, c);
    }
    printf("%d\n", dijkstra());
    return 0;
}
```
:::
### 存在负权边
#### Bellman-Ford
#### SPFA

## 多源最短路
### Floyd
 