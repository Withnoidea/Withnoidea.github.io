---
title: LeetCode Hot 100
tags:
  - C++
  - 算法
  - 数据结构
createTime: 2026/03/07 14:49:49
permalink: /blog/0e14fh3t/
---

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

## 二叉树

### [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/description/?envType=study-plan-v2&envId=top-100-liked)

::: collapse

- 点击展开题目

  给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。

  有效 二叉搜索树定义如下：

  节点的左子树只包含 严格小于 当前节点的数。
  节点的右子树只包含 严格大于 当前节点的数。
  所有左子树和右子树自身必须也是二叉搜索树。

  示例 1：

  ![20260307151706](https://raw.githubusercontent.com/Withnoidea/images/main/20260307151706.png)

  输入：root = [2,1,3]

  输出：true

  示例 2：

  ![20260307151718](https://raw.githubusercontent.com/Withnoidea/images/main/20260307151718.png)

  输入：root = [5,1,4,null,null,3,6]

  输出：false

  解释：根节点的值是 5 ，但是右子节点的值是 4 。

  提示：

  树中节点数目范围在$[1, 10^4]$ 内
  $-2^{31} <= Node.val <= 2^{31} - 1$
  :::
  思路：

::: code-tabs
@tab C++

```C++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool isValidBST(TreeNode* root) {
        return dfs(root, LONG_MIN, LONG_MAX);
    }

    bool dfs(TreeNode* root, long long lower, long long upper)
    {
        if(root == nullptr) return true;

        if(root->val <= lower || root->val >= upper) return false;

        return dfs(root->left, lower, root->val) && dfs(root->right, root->val, upper);
    }
};
```

:::

## 437. 路径总和 III

::: collapse

- 路径总和 III

  **难度**: 中等

  **标签**: 树, 深度优先搜索, 二叉树

  **链接**: [https://leetcode.cn/problems/path-sum-iii/description/](https://leetcode.cn/problems/path-sum-iii/description/)

  ***

  给定一个二叉树的根节点 `root` ，和一个整数 `targetSum` ，求该二叉树里节点值之和等于 `targetSum` 的 **路径** 的数目。

  **路径** 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

   

  **示例 1：**

  ![](https://assets.leetcode.com/uploads/2021/04/09/pathsum3-1-tree.jpg)

  ```
  输入：root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
  输出：3
  解释：和等于 8 的路径有 3 条，如图所示。
  ```

  **示例 2：**

  ```
  输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
  输出：3
  ```

   

  **提示:**
  - 二叉树的节点个数的范围是 `[0,1000]`
  - $-10^{9} <= Node.val <= 10^{9}$
  - `-1000 <= targetSum <= 1000`

:::

::: code-tabs
@tab C++

```C++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    unordered_map<long long, long long> cnt;//记录前缀和出现的次数
    int res = 0; //记录targetsum出现数量

    int pathSum(TreeNode* root, int targetSum) {
        cnt[0] = 1;//初始化，当cur - traget = 0 表示当前路径就符合，因此答案+1
        dfs(root, targetSum, 0);
        return res;
    }

    void dfs(TreeNode* root, long long targetSum, long long cur)
    {
        if(!root) return;
        cur += root->val;//前缀和
        res += cnt[cur - targetSum];//更新target出现次数
        cnt[cur] ++;//更新前缀和出现次数
        dfs(root->left, targetSum, cur), dfs(root->right, targetSum, cur);//递归处理左子树和有子树
        cnt[cur] --;//回溯
    }
};
```

:::
