---
title: LeetCode
tags:
  - C++
  - 算法
  - 数据结构
createTime: 2026/02/13 13:41:02
permalink: /blog/pnmc9sjt/
---

## 每日一题

### [799. 香槟塔 - 力扣（LeetCode）](https://leetcode.cn/problems/champagne-tower/description/?envType=daily-question&envId=2026-02-14)

::: collapse

- 香槟塔 点击展开题目

  我们把玻璃杯摆成金字塔的形状，其中 **第一层** 有 `1` 个玻璃杯， **第二层** 有 `2` 个，依次类推到第 100 层，每个玻璃杯将盛有香槟。

  从顶层的第一个玻璃杯开始倾倒一些香槟，当顶层的杯子满了，任何溢出的香槟都会立刻等流量的流向左右两侧的玻璃杯。当左右两边的杯子也满了，就会等流量的流向它们左右两边的杯子，依次类推。（当最底层的玻璃杯满了，香槟会流到地板上）

  例如，在倾倒一杯香槟后，最顶层的玻璃杯满了。倾倒了两杯香槟后，第二层的两个玻璃杯各自盛放一半的香槟。在倒三杯香槟后，第二层的香槟满了 - 此时总共有三个满的玻璃杯。在倒第四杯后，第三层中间的玻璃杯盛放了一半的香槟，他两边的玻璃杯各自盛放了四分之一的香槟，如下图所示。

  ![img](https://cdn.jsdelivr.net/gh/Withnoidea/images/tower.png)

  现在当倾倒了非负整数杯香槟后，返回第 `i` 行 `j` 个玻璃杯所盛放的香槟占玻璃杯容积的比例（ `i` 和 `j` 都从0开始）。

  ```
  示例 1:
  输入: poured(倾倒香槟总杯数) = 1, query_glass(杯子的位置数) = 1, query_row(行数) = 1
  输出: 0.00000
  解释: 我们在顶层（下标是（0，0））倒了一杯香槟后，没有溢出，因此所有在顶层以下的玻璃杯都是空的。

  示例 2:
  输入: poured(倾倒香槟总杯数) = 2, query_glass(杯子的位置数) = 1, query_row(行数) = 1
  输出: 0.50000
  解释: 我们在顶层（下标是（0，0）倒了两杯香槟后，有一杯量的香槟将从顶层溢出，位于（1，0）的玻璃杯和（1，1）的玻璃杯平分了这一杯香槟，所以每个玻璃杯有一半的香槟。
  ```

  **示例 3:**

  ```
  输入: poured = 100000009, query_row = 33, query_glass = 17
  输出: 1.00000
  ```

  **提示:**

  `0 <= poured <= 10^9`
  `0 <= query_glass <= query_row < 100`

:::

思路：递推

假设f[iü]有pour的酒，不考虑溢出1 f[]U]表示有溢出
溢出的量× = (f[j][j] - 1) / 2;2 否则没有溢出
递推计算所有的f[i]],
答案为f\[query_row][query_glass]和1取min

<img src="https://cdn.jsdelivr.net/gh/Withnoidea/images/无标题.png" alt="无标题" style="zoom:67%;" />

::: code-tabs
@tab C++

```C++
class Solution {
public:
    double champagneTower(int poured, int query_row, int query_glass) {
        vector<vector<double>> f(query_row + 1, vector<double>(query_row + 1));
        f[0][0] = poured;
        for(int i = 0; i < query_row; i ++)
        {
            for(int j = 0; j <= i; j ++)
            {
                if(f[i][j] > 1)
                {
                    double x = (f[i][j] - 1) / 2;
                    f[i + 1][j] += x, f[i + 1][j + 1] += x;
                }
            }
        }
        return min(1.0, f[query_row][query_glass]);
    }
};
```

:::

## LeetCode Hot 100

### [240. 搜索二维矩阵 II - 力扣（LeetCode）](https://leetcode.cn/problems/search-a-2d-matrix-ii/description/?envType=study-plan-v2&envId=top-100-liked)

::: collapse

- 搜索二维矩阵 II 点击展开题目

  编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：

  每行的元素从左到右升序排列。
  每列的元素从上到下升序排列。

  示例 1：

  ![img](https://cdn.jsdelivr.net/gh/Withnoidea/images/searchgrid2.jpg)

  输入：matrix = \[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
  输出：true
  示例 2：

  ![img](https://cdn.jsdelivr.net/gh/Withnoidea/images/searchgrid.jpg)

  输入：matrix = \[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
  输出：false

  提示：

  m == matrix.length
  n == matrix[i].length
  1 <= n, m <= 300
  -109 <= matrix[i][j] <= 109
  每行的所有元素从左到右升序排列
  每列的所有元素从上到下升序排列
  -10^9 <= target <= 10^9
  :::

思路1：观察到m、n均小于等于300，可以直接双重循环进行枚举。
时间复杂度 $O(mn)$
空间复杂度 $O(1)$

```C++
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        for(int i = 0; i < matrix.size(); i ++)
        {
            for(int j = 0; j < matrix[0].size(); j ++)
            {
                if(matrix[i][j] == target)
                {
                    return true;
                }
            }
        }
        return false;
    }
};

```

思路2：对每一行进行二分查找
时间复杂度 $O(mlogn)$
空间复杂度 $O(1)$

```C++
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int n = matrix.size();
        int m = matrix[0].size();
        //枚举每行
        for(int i = 0; i < n; i ++)
        {
            //对每一行进行二分查找
            int l = 0, r = m - 1;
            while(l <= r)
            {
                int mid = (r - l) / 2 + l;//直接(l+r)/2可能会溢出
                if(matrix[i][mid] > target) r = mid - 1;
                else if(matrix[i][mid] < target) l = l + 1;
                else return true;
            }
        }
        return false;
    }
};
```

思路3：从右上角进行查找，设当前的数为t，共有三种可能

1. t==target返回true即可
2. t>target代表t所在列元素都比target大，答案一定不在当前列，可以删除当前列
3. t<taeget代表t所在行元素都比target小，答案一定不在当前行，可以删除当前行

时间复杂度 $O(m+n)$

空间复杂度 $O(1)$

<img src="https://cdn.jsdelivr.net/gh/Withnoidea/images/image-20260214010413298.png" alt="image-20260214010413298" style="zoom: 67%;" />

```C++
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if(matrix.empty() || matrix[0].empty()) return false;
        int n = matrix.size();
        int m = matrix[0].size();
        int i = 0, j = m - 1;
        while(i < n && j >= 0)
        {
            int t = matrix[i][j];
            if(t == target) return true;
            else if(t > target) j --;
            else i ++;
        }
        return  false;
    }
};
```
