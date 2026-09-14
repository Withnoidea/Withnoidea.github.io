---
title: 日供一卒 · 每日算法刷题记录
tags:
  - C++
  - 算法
  - 数据结构
createTime: 2026/09/09 12:49:59
permalink: /blog/je6kd8om/
---

### No.16 · 二叉查找树的最值路径节点数

::: collapse
- 点击展开题目

    给定一棵二叉查找树（BST），其中所有节点的值都是唯一的。请计算从树中值最小的节点出发，到值最大的节点的路径上，至少需要经过多少个中间节点（不包括最小和最大节点本身）。

    **输入描述**
    - 一棵二叉查找树的根节点 `root`（节点值唯一，通过 `TreeNode` 结构体给出）。

    **输出描述**
    返回从最小节点到最大节点的路径上中间节点的数量（不包括最小和最大节点本身）。

    **样例 1**

    输入
    ```
    root = [3,1,4,null,2]
    ```
    输出
    ```
    1
    ```
    解释：给定的 BST 结构如下：
    ```
        3
       / \
      1   4
       \
        2
    ```
    - 最小节点是 $1$
    - 最大节点是 $4$
    - 从 $1$ 到 $4$ 的路径是 $1\to 3\to 4$，中间经过的节点是 $3$，共 $1$ 个节点

:::

**思路**

本题的核心在于理解 BST 中**最值节点的位置**与**最值之间的路径形态**：

- 在 BST 中，最小值一定是最左节点——从根节点开始一直向左走，直到左子树为空；最大值一定是最右节点——从根节点开始一直向右走，直到右子树为空；
- 由于最小值位于根的左子树、最大值位于根的右子树，二者的最低公共祖先（LCA）必为根节点，因此从最小节点到最大节点的唯一简单路径必然经过根；
- 设根到最小节点的边数为 $d_1$（一路向左的步数），根到最大节点的边数为 $d_2$（一路向右的步数），路径上节点总数为 $d_1+d_2+1$（含根），去掉首尾的最小、最大节点，中间节点数即为 $d_1+d_2-1$；
- 边界：当树只有一个节点时，最小与最大节点重合（$d_1=d_2=0$），直接返回 $0$。

时间复杂度 $O(h)$（$h$ 为树高，最多各下降一次），空间复杂度 $O(1)$。

::: code-tabs
@tab C++
```cpp
/**
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 * };
 */


/**
 * @param root: 二叉树的根节点
 * @return: 从最小节点到最大节点的路径上中间节点的数量（不包括最小和最大节点本身）
 */
int minMaxPathCount(TreeNode* root) {
    int d1 = 0;
    TreeNode* node = root;
    while(node->left != NULL)
    {
        node = node->left;
        d1 ++;
    }
    int d2 = 0;
    node = root;
    while(node->right != NULL)
    {
        node = node->right;
        d2 ++;
    }
    if(d1 + d2 == 0)
    {
        return 0;
    }
    return d1 + d2 - 1;
}
```
:::

**相似题目**
- [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/) — 理解 BST 的左右有序性质，是本题的基础。
- [235. 二叉搜索树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/) — 同样利用 BST 有序性定位两节点路径与 LCA。
- [230. 二叉搜索树中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/) — 最小值节点即「第 1 小」，对应最左节点。
- [700. 二叉搜索树中的搜索](https://leetcode.cn/problems/search-in-a-binary-search-tree/) — 沿左/右方向下降导航，与本题找最值思路一致。
- [783. 二叉搜索树节点最小距离](https://leetcode.cn/problems/minimum-distance-between-bst-nodes/) — 同样围绕 BST 中序相邻（最小/最大）节点关系。

---

### No.15 · 二叉查找树中序判定

::: collapse
- 点击展开题目

    给定一个长度为 $n$ 的整数序列，判断该序列是否可能是某棵二叉查找树（BST）的中序遍历序列。

    二叉查找树（BST）的定义如下：
    - 对于任意结点，其左子树中所有结点的值都小于或等于该结点的值；
    - 对于任意结点，其右子树中所有结点的值都大于该结点的值；
    - 左右子树也必须是二叉搜索树。

    **输入描述**
    - 第一行一个整数 $n$（$1\le n\le 1000$），表示序列长度；
    - 第二行包含 $n$ 个用空格分隔的整数 $a_i$（$1\le a_i\le 10^4$），表示给定的序列。

    **输出描述**
    如果该序列可能是某棵二叉查找树的中序遍历序列，输出 `YES`；否则输出 `NO`。

    **样例 1**

    输入
    ```
    2
    1 2
    ```
    输出
    ```
    YES
    ```
    解释：可以构造如下二叉查找树，其中序遍历为 `[1, 2]`：
    ```
      2
     /
    1
    ```

    **样例 2**

    输入
    ```
    3
    2 1 3
    ```
    输出
    ```
    NO
    ```
    解释：无法构造出满足条件的二叉查找树。

:::

**思路**

本题的核心在于利用**二叉查找树的性质**：BST 的中序遍历序列一定是（非严格）升序的。

- 由于左子树 $\le$ 根 $\le$ 右子树，且左右子树也满足 BST，整棵树的中序遍历必然单调不减；
- 反过来，任意一个单调不减的序列，都可以「取中段为根、左段为左子树、右段为右子树」递归构造出对应的 BST（相等值挂在左子树即可）；
- 因此判定等价于**检查序列是否非递减**：从左到右扫描，一旦出现 $a_i < a_{i-1}$ 即不合法。

时间复杂度 $O(n)$（一遍扫描），空间复杂度 $O(n)$（读入数组；也可边读边比做到 $O(1)$）。

::: code-tabs
@tab C++
```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 1010;
int a[N];
int n;

int main()
{
    cin >> n;
    a[0]= -1;
    bool flag = true;
    for(int i = 1; i <= n; i ++)
    {
        cin >> a[i];
        if(a[i] < a[i - 1]) flag = false;
    }
    cout << (flag ? "YES" : "NO") << "\n";
    return 0;
}
```
:::

**相似题目**
- [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/) — 反过来：判断一棵给定树是否为 BST，同样依赖中序升序性质。
- [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/) — 中序遍历的基础模板，是理解本题的前提。
- [700. 二叉搜索树中的搜索](https://leetcode.cn/problems/search-in-a-binary-search-tree/) — 利用 BST 有序性的典型操作。
- [701. 二叉搜索树中的插入操作](https://leetcode.cn/problems/insert-into-a-binary-search-tree/) — 在保持 BST 性质下插入节点。
- [230. 二叉搜索树中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/) — 取中序遍历的第 k 个，直接利用升序性质。

---

### No.14 · 树的层次和

::: collapse
- 点击展开题目

    现有一棵 $n$ 个结点的树（结点编号为从 `0` 到 `n-1`，根结点为 `0` 号结点），每个结点有各自的权值 $w$。求这棵树每层的节点权值之和。

    提示可以练习分别用层次遍历和先根遍历解决本题。

    **输入描述**
    - 第一行一个整数 $n$（$1\le n\le 10^{3}$），表示树的结点个数；
    - 第二行 $n$ 个整数，分别给出编号从 `0` 到 `n-1` 的 $n$ 个结点的权值 $w$（$1\le w\le 10^{3}$）；
    - 接下来 $n$ 行，按节点编号从小到大的顺序，每行给出一个结点的子结点编号列表，格式如下：
      ```
      k child_1 child_2 ... child_k
      ```
      其中 $k$（$0\le k\le n-1$）表示该结点的子结点个数，`child_1`…`child_k` 表示子结点的编号。

    **输出描述**
    输出 $m$ 行（$m$ 为层数），按层号从上到下的顺序，每层输出一个整数，表示该层的节点权值之和。

    **样例 1**

    输入
    ```
    5
    1 2 3 4 5
    1 1
    3 2 3 4
    0
    0
    0
    ```
    输出
    ```
    1
    2
    12
    ```
    解释：树的结构如下：
    ```
        0
        |
        1
       /|\
      2 3 4
    ```
    - 第 1 层：只有节点 0，权值和为 1
    - 第 2 层：节点 1，权值和为 2
    - 第 3 层：节点 2、3、4，权值和为 3+4+5=12

:::

**思路**

本题求「每层的节点权值之和」，本质是树的**层次遍历（BFS）**，也可以先根遍历（DFS）配合深度标记来做。

**BFS 解法（本题给出）**
1. 用数组 `nodes[N]` 存储每个结点的权值 `data` 与子结点列表 `children`；下标即结点编号。
2. 将根结点 `0` 入队。
3. `while` 队列非空时，先用 `levelSize = q.size()` 记录当前层节点数，初始化 `levelSum = 0`；循环 `levelSize` 次：取出队首 `u`，将其权值累加进 `levelSum`，并把 `u` 的所有子结点入队。
4. 一层处理完即输出 `levelSum`（换行）。
关键在于「先记录层大小、再循环固定次数」的写法，确保一次循环只处理同一层的节点。

**DFS 解法（提示）**
先根遍历时额外携带「当前深度 `depth`」：进入结点时把 `sum[depth] += data`，再递归遍历子结点（深度 `depth+1`）。遍历结束后按 `depth` 从小到大输出 `sum[]` 即可。

**复杂度**：
- 时间复杂度：$O(n)$，每个结点入队/访问一次。
- 空间复杂度：$O(n)$，队列/递归栈最坏存 $O(n)$ 个结点。

::: code-tabs
@tab C++ (BFS)
```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 1010;

struct Node
{
  int data;
  vector<int> children;
} nodes[N];

int main()
{
  int n, k, child;
  cin >> n;
  for (int i = 0; i < n; i++)
  {
    cin >> nodes[i].data;
  }
  for (int i = 0; i < n; i++)
  {
    cin >> k;
    for (int j = 0; j < k; j++)
    {
      cin >> child;
      nodes[i].children.push_back(child);
    }
  }

  queue<int> q;
  q.push(0);
  while(q.size())
  {
      int levelSize = q.size();
      int levelSum = 0;
      for(int i = 0; i < levelSize; i ++)
      {
          int u = q.front();
          q.pop();
          levelSum += nodes[u].data;

          for(int j = 0; j < nodes[u].children.size(); j ++)
          {
              q.push(nodes[u].children[j]);
          }
      }
      cout << levelSum << "\n";
  }

  return 0;
}
```

@tab C++ (DFS)
```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 1010;

struct Node
{
  int data;
  vector<int> children;
} nodes[N];

int levelSum[N];
int maxLevel;

void dfs(int u, int level)
{
    levelSum[level] += nodes[u].data;
    if(level > maxLevel) maxLevel = level;
    for(int i = 0; i < nodes[u].children.size(); i ++)
    {
        dfs(nodes[u].children[i], level + 1);
    }
}

int main()
{
  int n, k, child;
  cin >> n;
  for (int i = 0; i < n; i++)
  {
    cin >> nodes[i].data;
  }
  for (int i = 0; i < n; i++)
  {
    cin >> k;
    for (int j = 0; j < k; j++)
    {
      cin >> child;
      nodes[i].children.push_back(child);
    }
  }

  dfs(0, 0);
  for(int i = 0; i <= maxLevel; i ++)
  {
      cout << levelSum[i] << "\n";
  }

  return 0;
}
```
:::

**相似题目**
- [429. N 叉树的层序遍历](https://leetcode.cn/problems/n-ary-tree-level-order-traversal/) — 与本题同为多叉树按层遍历，思想一致。
- [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/) — 二叉树版层次遍历，是本题基础。
- [637. 二叉树的层平均值](https://leetcode.cn/problems/average-of-levels-in-binary-tree/) — 同样是按层聚合节点信息（求平均）。
- [515. 在每个树行中找最大值](https://leetcode.cn/problems/find-largest-value-in-each-tree-row/) — 每层聚合（取最大值）的变体。
- [199. 二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/) — 层次遍历中关注每层特定位置节点。

---

### No.13 · 判断满二叉树

::: collapse
- 点击展开题目

    给定一棵二叉树的根节点 $root$，判断该二叉树是否是满二叉树。

    满二叉树的定义：
    - 二叉树的每个节点要么没有孩子，要么恰好有两个孩子；
    - 所有的叶子都在同一层上。

    **样例 1**

    输入
    ```
    root = [1,2,3,4,5,6,7]
    ```
    输出
    ```
    true
    ```
    解释：二叉树结构如下：
    ```
        1
       / \
      2   3
     / \ / \
    4  5 6  7
    ```
    这棵二叉树是满二叉树。

    **样例 2**

    输入
    ```
    root = [1,2,3,4,5,6]
    ```
    输出
    ```
    false
    ```
    解释：二叉树结构如下：
    ```
        1
       / \
      2   3
     / \ /
    4  5 6
    ```
    节点 $3$ 只有一个孩子 $6$（缺右孩子），且叶子不在同一层，因此不是满二叉树。

:::

**思路**

核心结论：**高度为 $h$（根在第 $1$ 层）的满二叉树，节点总数一定恰好是 $2^h-1$**。因此只需递归求出树的高度 $h$ 与节点总数 $n$，再验证 $n = 2^h-1$ 即可。

具体步骤：
1. 定义 `dfs(node, height, count)`：返回以 `node` 为根的子树的高度与节点数。
   - 空节点：`height = count = 0`。
   - 非空节点：递归求得左右子树的高度与节点数，则当前子树 `height = max(左高, 右高) + 1`，`count = 左节点数 + 右节点数 + 1`。
2. 对整棵树调用 `dfs`，得总高度 $h$ 与总节点数 $n$。
3. 判定 `n == (1 << h) - 1`（即 $2^h-1$）。

关于边界：叶子节点的左右均为空，故其 `height = 1`、`count = 1`，与「根在第 $1$ 层」的约定一致。空树（题目中通常约定返回 `true`，也由 `root == nullptr` 分支直接返回 `true` 处理）。

**复杂度**：时间复杂度 $O(n)$，每个节点访问一次；空间复杂度 $O(h)$，递归栈深度，最坏为树高。

::: code-tabs
@tab C++

```cpp
/**
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 * };
 */

/**
 * @param root: 二叉树的根节点
 * @return: 返回布尔值表示是否是满二叉树
 */
 void dfs(TreeNode* node, int& height, int& count)
{
    if(node == nullptr)
    {
        height = count = 0;
        return;
    }
    int leftHeight = 0, leftCount = 0;
    dfs(node->left, leftHeight, leftCount);
    int rightHeight = 0, rightCount = 0;
    dfs(node->right, rightHeight, rightCount);


    height = max(leftHeight, rightHeight) + 1;
    count = leftCount + rightCount + 1;
}


bool isFullTree(TreeNode* root) {
    if(root == nullptr) return true;
    int h = 0, n = 0;
    dfs(root, h, n);
    return n == (1 << h) - 1;
}
```
:::

**相似题目**

- [222. 完全二叉树的节点个数](https://leetcode.cn/problems/count-complete-tree-nodes/) — 本题同样需要先求节点总数，是满二叉树判定的基石。
- [958. 二叉树的完全性检验](https://leetcode.cn/problems/check-completeness-of-a-binary-tree/) — 与满二叉树判定同属「树形态性质检验」。
- [110. 平衡二叉树](https://leetcode.cn/problems/balanced-binary-tree/) — 同样通过递归求子树高度来做性质判定。
- [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/) — 本题中 `dfs` 求得的高度即最大深度。
- [226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/) — 二叉树递归遍历的基础模板。

---

### No.12 · 二叉树的逆层序遍历

::: collapse
- 点击展开题目

    给定一棵二叉树的根节点 $root$，返回该二叉树的「逆层序序列」。所谓「逆层序序列」是指按二叉树从上到下逐层遍历，每层按**从右到左**的顺序输出节点的值。

    **样例 1**

    输入
    ```
    root = [1,2,3,null,null,4,5]
    ```
    输出
    ```
    [1,3,2,5,4]
    ```
    解释：二叉树的结构如下：
    ```
        1
       / \
      2   3
         / \
        4   5
    ```
    逆层序遍历的顺序为：第一层 $1$，第二层 $3$、$2$，第三层 $5$、$4$。

:::

**思路**

标准层序遍历（BFS）天然就是「从上到下、逐层」地访问节点。要得到「每层从右到左」的顺序，只需在出队时**先将该节点的右孩子入队、再将其左孩子入队**——这样同层内后入队的左孩子会先被访问，等价于该层从右向左输出。

具体算法：
1. 若 `root == NULL` 直接返回空数组。
2. 用一个队列 `q`，初始放入 `root`。
3. 每次取出队首 `current`，将其值加入结果 `res`；**先**判右孩子非空则入队，**后**判左孩子非空则入队。
4. 队列空时结束，返回 `res`。

由于只是交换了左右孩子的入队顺序，整体仍是一次完整 BFS，时间 $O(n)$、空间 $O(n)$（队列最坏存满一层）。

**复杂度**：时间复杂度 $O(n)$，每个节点入队出队各一次；空间复杂度 $O(n)$，队列最多同时存一层节点。

::: code-tabs
@tab C++

```cpp
/**
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 * };
 */

/**
 * @param root: 二叉树的根节点
 * @return: 返回一个数组，表示逆层序遍历结果
 */
vector<int> reverseLevelOrder(TreeNode* root) {
    vector<int> res;
    if(root == NULL)
    {
        return res;
    }


    queue<TreeNode*> q;
    q.push(root);
    while(q.size())
    {
        TreeNode* current = q.front();
        q.pop();
        res.push_back(current->val);
        if(current->right != NULL)
        {
            q.push(current->right);
        }
        if(current->left != NULL)
        {
            q.push(current->left);
        }
    }
    return res;
}
```
:::

**相似题目**

- [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/) — 本题正序版，是逆层序的基础。
- [107. 二叉树的层序遍历 II](https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/) — 自底向上层序遍历，方向变体。
- [103. 二叉树的锯齿形层序遍历](https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/) — 每层交替方向的层序遍历。
- [199. 二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/) — 优先关注右侧节点的 BFS 实践。
- [429. N 叉树的层序遍历](https://leetcode.cn/problems/n-ary-tree-level-order-traversal/) — 队列层序遍历的拓展。

---

### No.11 · 移除二叉树的叶节点

::: collapse
- 点击展开题目

    给定一棵二叉树的根节点 $root$，你需要移除这棵树的所有叶节点。叶节点是指没有子节点的节点。移除叶节点后，如果新的叶节点产生，不需要再次移除（即只需要移除原始树的叶节点）。

    **样例 1**

    输入
    ```
    root = [1,2,3,4,5]
    ```
    输出
    ```
    [1,2]
    ```
    解释：原始二叉树如下：
    ```
        1
       / \
      2   3
     / \
    4   5
    ```
    原始叶节点为 $3$、$4$、$5$，将其移除后，树变为：
    ```
      1
     /
    2
    ```
    （节点 $2$ 原本不是叶节点，移除其子节点后沦为叶节点，按题意不再处理。）

:::

**思路**

本题要求**只删除原始树中的叶节点**，删除后即使产生新的叶节点也不再处理。这等价于：遍历时只对「当前节点的直接孩子」做叶节点判定——若孩子是叶子则删除，否则继续向下递归；**不向上回看**保证了新产生的叶节点不会被二次删除。

采用深度优先搜索（递归）实现：
1. **递归边界**：`root == NULL` 时直接返回。
2. **处理左子树**：若 `root->left` 存在且其左右孩子均为空（即它是叶节点），则 `delete root->left` 并将其置空；否则递归 `removeLeaf(root->left)`。
3. **处理右子树**：同理处理 `root->right`。

原始叶节点必在其父节点处被判定为叶子并删除；删除后沦为叶的内部节点不会再被其父节点回溯检查，因此恰好只移除一次、只移除原始叶节点，满足题意。

**复杂度**：时间复杂度 $O(n)$，每个节点最多访问一次；空间复杂度 $O(h)$，$h$ 为树高，即递归调用栈深度（最坏 $O(n)$，平衡时 $O(\log n)$）。

::: code-tabs
@tab C++

```cpp
/**
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 * };
 */

/**
 * @param root: 二叉树的根节点指针
 * @return: 无返回值，直接在原树上修改
 */
void removeLeaf(TreeNode* root) {
    if(root == NULL) return;


    //递归处理左子树
    if(root->left != NULL && root->left->left == NULL && root->left->right == NULL)
    {
        delete root->left;
        root->left = NULL;
    }else{
        removeLeaf(root->left);
    }


    if(root->right != NULL && root->right->left == NULL && root->right->right == NULL)
    {
        delete root->right;
        root->right = NULL;
    }else{
        removeLeaf(root->right);
    }
}
```
:::

**相似题目**

- [1325. 删除给定值的叶子节点](https://leetcode.cn/problems/delete-leaves-with-a-given-value/) — 按给定值删除叶节点的变体，思想高度相似。
- [814. 二叉树剪枝](https://leetcode.cn/problems/binary-tree-pruning/) — 按条件递归删除子树，递归删除思想一致。
- [1110. 删除节点并返回森林](https://leetcode.cn/problems/delete-nodes-and-return-forest/) — 删除指定节点并重构多棵树。
- [226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/) — 二叉树递归遍历的基础模板。
- [257. 二叉树的所有路径](https://leetcode.cn/problems/binary-tree-paths/) — 深度优先搜索遍历的经典实践。

---

### No.10 · 二叉树节点值加一

::: collapse
- 点击展开题目

    给定一棵二叉树的根节点 $root$，你需要对这棵二叉树进行修改：将每个节点的值都加 $1$。

    提示你可以分别用先序遍历、中序遍历、后序遍历完成本题。

    **样例 1**

    输入
    ```
    root = [1,2,3]
    ```
    输出
    ```
    [2,3,4]
    ```
    解释：初始二叉树如下：
    ```
        1
       / \
      2   3
    ```
    将每个节点的值加 $1$ 后，二叉树变为：
    ```
        2
       / \
      3   4
    ```

    **样例 2**

    输入
    ```
    root = [4,2,6,1,3,5,7]
    ```
    输出
    ```
    [5,3,7,2,4,6,8]
    ```
    解释：初始二叉树如下：
    ```
          4
         / \
        2   6
       / \ / \
      1  3 5  7
    ```
    将每个节点的值加 $1$ 后，二叉树变为：
    ```
          5
         / \
        3   7
       / \ / \
      2  4 6  8
    ```
:::

**思路**

本题要求对二叉树进行「每个节点值加 1」的修改。由于需要访问树中的每一个节点，本质上就是一次**二叉树遍历**。常见的先序、中序、后序三种遍历方式都可以完成本题，区别仅在于"对当前节点做修改"这一步被安排在递归序列中的哪个位置。

- **先序遍历（根 → 左 → 右）**：先修改当前节点，再递归左子树，最后递归右子树。
- **中序遍历（左 → 根 → 右）**：先递归左子树，再修改当前节点，最后递归右子树。
- **后序遍历（左 → 右 → 根）**：先递归左子树，再递归右子树，最后修改当前节点。

无论哪种顺序，每个节点都**恰好被访问一次**，因此三者的时间复杂度均为 $O(n)$（$n$ 为节点总数），空间复杂度取决于递归深度即树的高度，最坏情况下退化为链 $O(n)$。

**复杂度**：时间复杂度 $O(n)$，空间复杂度 $O(h)$（$h$ 为树高，最坏 $O(n)$）。

::: code-tabs
@tab C++

```cpp
/**
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 * };
 */

/**
 * @param root: 二叉树的根节点
 * @return: 直接在原二叉树上修改，不需要返回
 */
 // 先序遍历 （根 → 左 → 右）
void plusOne(TreeNode* root) {
    if(!root) return;
    root->val += 1;
    plusOne(root->left);
    plusOne(root->right);
}
//中序遍历 （左 → 根 → 右）
void plusOne(TreeNode* root) {
    if(!root) return;
    plusOne(root->left);   // 先左子树
    root->val += 1;        // 再处理当前节点
    plusOne(root->right);  // 再右子树
}
//后续遍历（左 → 右 → 根）
void plusOne(TreeNode* root) {
    if(!root) return;
    plusOne(root->left);   // 先左
    plusOne(root->right);  // 再右
    root->val += 1;        // 最后处理当前节点
}
```
:::

**相似题目**

- [226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/) — 同样基于遍历对每个节点做局部修改（交换左右子树）。
- [144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/) — 本题先序实现的基础遍历模板。
- [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/) — 中序遍历模板。
- [145. 二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/) — 后序遍历模板。
- [617. 合并二叉树](https://leetcode.cn/problems/merge-two-binary-trees/) — 同时遍历两棵树并对节点做合并修改。

---

### No.9 · 矩阵中的全向块

::: collapse
- 点击展开题目

    给定 $n$ 行 $m$ 列的 $0/1$ 矩阵。若两个 $1$ 在**水平、垂直或对角线**方向（共 8 个方向）上相邻，则认为这两个 $1$「连通」；连通关系具有传递性。所有连通的 $1$ 构成一个「全向块」。求矩阵中全向块的个数。

    - 输入：首行 $n\ m$（$2\le n,m\le 100$），随后 $n$ 行每行 $m$ 个 `0`/`1`（空格隔开）。
    - 输出：一个整数，表示全向块的个数。

    **样例 1**
    ```
    输入：
    6 7
    0 1 1 1 0 0 1
    0 0 1 0 0 0 0
    0 0 0 0 1 0 0
    0 0 0 1 1 1 0
    1 1 1 0 1 0 0
    1 1 1 1 0 0 0
    输出：
    3
    ```
    解释：矩阵中的 `1` 共形成 3 个块。
:::

**思路**

**思路：BFS 八连通块计数（经典「岛屿数量」的八连通版）**

逐格扫描矩阵。当遇到一个值为 `1` 且**未被访问过**的位置时，说明发现了一个新的「全向块」——计数器加 1，并以该位置为起点做一次 BFS，把与它连通的所有 `1` 全部标记为已访问，避免后续重复计数。

**八方向偏移**

用一个长度为 8 的方向数组表示上、下、左、右及四个对角线方向（代码中 `dx/dy` 即这 8 个方向的行列偏移，顺序不同但覆盖相同 8 个方向）。BFS 每弹出一个位置，就遍历这 8 个方向，算出相邻坐标 `(nextX, nextY)`。

**BFS 流程**

- 起点入队并标记 `inQueue`；
- 只要队列非空：取队首 `(x, y)` 出队，检查 8 个相邻位置；若满足 `canVisit`（在矩阵内、值为 `1`、未访问），则标记入队；
- 队列清空时，当前块的所有 `1` 已被完整访问，回到主循环继续扫描。

**复杂度**：每个位置至多入队一次，时间复杂度 $O(n\times m)$；`inQueue` 与 `matrix` 均为 $n\times m$，空间复杂度 $O(n\times m)$。在 $n,m\le 100$ 下完全可行。

::: code-tabs
@tab C++
```cpp
#include <bits/stdc++.h>
using namespace std;
typedef pair<int, int> Position;
const int N = 110;
int n, m, matrix[N][N];
bool inQueue[N][N] = {false};

const int M = 8;
int dx[M] = {-1, -1, -1, 0, 1, 1, 1, 0};
int dy[M] = {-1, 0, 1, 1, 1, 0, -1, -1};

bool canVisit(int x, int y)
{
    return x >= 0 && x < n && y >= 0 && y < m
        && matrix[x][y] == 1
        && !inQueue[x][y];
}

void BFS(int x, int y)
{
    queue<Position> q;
    q.push(Position(x, y));
    inQueue[x][y] = true;
    while(q.size())
    {
        Position front = q.front();
        q.pop();
        for(int i = 0; i < M; i ++)
        {
            int nextX = front.first + dx[i];
            int nextY = front.second + dy[i];
            if(canVisit(nextX, nextY))
            {
                inQueue[nextX][nextY] = true;
                q.push(Position(nextX, nextY));
            }
        }
    }
}

int main()
{
    cin >> n >> m;
    for(int i = 0; i < n; i ++)
        for(int j = 0; j < m; j ++)
            cin >> matrix[i][j];

    int counter = 0;
    for(int i = 0; i < n; i ++)
    {
        for(int j = 0; j < m; j ++)
        {
            if(matrix[i][j] == 1 && !inQueue[i][j])
            {
                BFS(i, j);
                counter ++;
            }
        }
    }

    cout << counter << "\n";
    return 0;
}
```
:::

**相似题目**

- **[AcWing 1097 池塘计数](https://www.acwing.com/problem/content/1099/)**：八连通块计数，思路几乎完全一致，可当作同题练手。
- **[LeetCode 200 岛屿数量（Number of Islands）](https://leetcode.cn/problems/number-of-islands/)**：四连通版，BFS/DFS 连通块计数思想同源。
- **[LeetCode 695 岛屿的最大面积（Max Area of Island）](https://leetcode.cn/problems/max-area-of-island/)**：连通块遍历的变形，顺带练习面积统计。

---
### No.8 · 奇数子集

::: collapse
- 点击展开题目

    给定正奇数 $n$，令序列 $S=[1, 3, 5, \dots, n]$（即不超过 $n$ 的所有正奇数）。求 $S$ 的**所有子集**。

    - 输入：一个正奇数 $n$（$1\le n\le 21$）。
    - 输出：每个子集一行，输出所有子集。
      - 输出顺序：(1) 元素个数少的子集优先；(2) 元素个数相同时，按升序字典序升序（即逐元素比较，前 $k-1$ 项相同则比第 $k$ 项小的优先）。
      - 子集内部按升序输出，数之间用空格隔开，**行末无多余空格**；**空集用空行表示**；不允许重复子集。

    **样例 1**
    ```
    输入：1
    输出：
    1
    ```
    **样例 2**
    ```
    输入：3
    输出：
    1
    3
    1 3
    ```
:::

**思路**

**核心转化：把"奇数子集"变成"连续正整数子集"**

$n$ 是第 $m=\lfloor n/2\rfloor+1$ 个正奇数，所以序列 $S=[1,3,\dots,n]$ 与 $[1,2,\dots,m]$ 一一对应（第 $i$ 个奇数 $=2i-1$）。于是只需先求连续序列 $[1,2,\dots,m]$ 的所有子集，**输出时把每个元素乘 $2$ 减 $1$ 还原成奇数**即可，问题被大幅简化。

**DFS 枚举子集**

定义 `temp` 保存当前子集，`result` 收集所有子集。`dfs(idx)` 表示处理到第 `idx` 个数：
- 若 `idx == m+1`，说明 $1..m$ 已决策完毕，把 `temp` 加入 `result`；
- 否则对第 `idx` 个数尝试**选**与**不选**两种分支：选则把 `idx` 压入 `temp` 后递归，递归返回后 `pop_back` 撤销；不选则直接递归下一个位置。这样完整遍历了所有 $2^m$ 个子集，且 `temp` 天然按升序生成。

**排序满足输出顺序**

收集完所有子集后按自定义 `cmp` 排序：先比元素个数（少的优先），个数相同再用 `vector` 自带的 `<`（逐元素字典序）比较。题目规则 (2) 的"前缀相同比第 $k$ 项"正是字典序的定义，`a < b` 天然满足，无需手写逐位比较。

**输出细节**：子集内已升序，按 `j < size-1` 控制空格避免行末多余空格；空集 `temp` 为空，循环不输出数字、只输出换行，即空行。

**复杂度**：$m=\Theta(n)$，子集总数 $2^m$，枚举与排序均为 $O(2^m)$ 量级；空间上 `result` 存全部子集 $O(2^m\cdot m)$。因 $n\le 21\Rightarrow m\le 11$，规模很小，完全可行。

::: code-tabs
@tab C++
```cpp
#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> result;
vector<int> temp;
int n, m;

void dfs(int idx)
{
    if(idx == m + 1)
    {
        result.push_back(temp);
        return;
    }

    temp.push_back(idx);
    dfs(idx + 1);
    temp.pop_back();
    dfs(idx + 1);
}

bool cmp(const vector<int> &a, const vector<int> &b)
{
    if(a.size() != b.size())
        return a.size() < b.size();
    else
        return a < b;
}

int main()
{
    cin >> n;
    m = n / 2 + 1;
    dfs(1);
    sort(result.begin(), result.end(), cmp);

    for(int i = 0; i < result.size(); i ++)
    {
        for(int j = 0; j < result[i].size(); j ++)
        {
            cout << result[i][j] * 2 - 1;
            if(j < result[i].size() - 1)
            {
                cout << " ";
            }
        }
        cout << "\n";
    }
    return 0;
}
```
:::

**相似题目**

- **[LeetCode 78 Subsets](https://leetcode.cn/problems/subsets/)**：求一个集合的所有子集，本体的直接原型。
- **[LeetCode 90 Subsets II](https://leetcode.cn/problems/subsets-ii/)**：含重复元素时的子集枚举，多一层去重思考。
- **[AcWing 92 递归实现指数型枚举](https://www.acwing.com/problem/content/94/)**：DFS「选/不选」枚举子集的经典模板题。

---
### No.7 · 相邻不等重排

::: collapse
- 点击展开题目

    给定长度为 $n$ 的整数数组，判断是否存在一种**重排**方式，使得重排后数组中任意相邻元素不相等。存在输出 `Yes`，否则输出 `No`。

    - 输入：首行 $n$，次行 $n$ 个整数 $a_i$（$1\le a_i\le 10^5$）。
    - 输出：`Yes` 或 `No`。

    **样例 1**
    ```
    输入：
    3
    1 1 2
    输出：
    Yes
    ```
    解释：可重排为 `[1, 2, 1]`，相邻元素均不相等。

    **样例 2**
    ```
    输入：
    4
    1 1 1 2
    输出：
    No
    ```
    解释：元素 `1` 出现 3 次，无法避免相邻重复。
:::

**思路**

**核心思路：问题等价于判断"出现次数最多的元素是否过多"。**

要让重排后任意相邻元素不同，限制条件完全由**出现次数最多的那个值**决定——只要它不相邻，其余值自然更容易错开（可把它插进其余值形成的空隙中）。

**判定条件**：设数组长度 $n$，最频繁元素的出现次数为 `maxCount`，若能重排则必有
$$\text{maxCount}\le \left\lfloor\frac{n+1}{2}\right\rfloor$$
即代码中的 `maxCount <= n + 1 >> 1`（注意 `>>` 优先级低于 `<=`，实际等价于 `(maxCount <= ((n+1)>>1))`，正是向下取整除法）。满足则 `Yes`，否则 `No`。

**为什么成立（鸽巢原理）**：把出现最频繁的元素记为 $x$，共 $k$ 个。要把它们排得互不相邻，需要"其他元素"隔开。先摆出 $k$ 个 $x$，它们周围共有如下插入位（用 `_` 表示）：

```
[前]  x  _  x  _  x  _  ...  _  x  [后]
```

- $k$ 个 $x$ 之间，有 **$k-1$ 个内部空隙**（必须填，否则两个 $x$ 贴在一起）；
- 再加上**最前面**和**最后面** 2 个端部位置。

因此插入位**总数**是 $(k-1)+2 = \mathbf{k+1}$ 个。

**关键区别**：这 $k+1$ 个位置**不是都要填满**。要满足"$x$ 互不相邻"，只有那 $k-1$ 个内部空隙是**强制的**——两端可以空着（空着表示 $x$ 排在首/末位，左边/右边无元素，谈不上相邻）。所以**最少**需要 $k-1$ 个"其他元素"去填充强制空隙。

> 易错点：若误以为全部 $k+1$ 个位置都必须填满，会得到过严的 $n-k\ge k+1$，进而误判。例如 $n=3,\ [1,1,2]$ 时 $k=2$，按"全填"会错判为 `No`；但只需 $k-1=1$ 个分隔符即可排成 `[1,2,1]`，正确答案是 `Yes`。**口诀：$k+1$ 是总数，$k-1$ 才是必填名额。**

其余元素一共有 $n-k$ 个，必须够填这 $k-1$ 个强制空隙：

$$n-k \ge k-1 \;\Rightarrow\; n+1 \ge 2k \;\Rightarrow\; k \le \left\lfloor\frac{n+1}{2}\right\rfloor$$

一旦 `maxCount` 超过这个上界，强制空隙填不满，必然有两个 $x$ 相邻，重排不可能。

**复杂度**：一次遍历统计频率并维护 `maxCount`，时间复杂度 $O(n)$，空间复杂度 $O(V)$（$V=10^5$ 为值域，用定长数组 `freq` 计数）。

::: code-tabs
@tab C++
```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 1e5 + 10;
int a[N], freq[N], n;

int main()
{
    cin >> n;
    int maxCount = 0;
    for(int i = 0; i < n; i ++)
    {
        cin >> a[i];
        freq[a[i]] ++;
        maxCount = max(maxCount, freq[a[i]]);
    }
    cout << ((maxCount <= n + 1 >> 1) ? "Yes" : "No") << "\n";
    return 0;
}
```
:::

**相似题目**

- **[LeetCode 767 Reorganize String](https://leetcode.cn/problems/reorganize-string/)**：重排字符串使相邻字符不同，核心判定（最频字符 ≤ ⌊(n+1)/2⌋）与本題完全一致。
- **[LeetCode 1054 Distant Barcodes](https://leetcode.cn/problems/distant-barcodes/)**：高频元素插空排列，同样的"最频繁元素受限"思路。
- 拓展练习：优先队列 / 奇偶位置穿插写法，可加深对本判据的理解。

---
### No.6 · 简单后缀表达式

::: collapse
- 点击展开题目

    给定一个**后缀表达式**（逆波兰表达式）字符串，只包含数字字符 `0–9`、加号 `+`、乘号 `*`，计算其值。

    计算规则（用栈模拟）：初始数组为空，依次处理每个字符——
    1. 遇到数字：转成整数，追加到数组末尾；
    2. 遇到 `+`：弹出末尾两个元素求和，结果追加回去；
    3. 遇到 `*`：弹出末尾两个元素求积，结果追加回去。

    处理完后数组唯一元素即答案。

    - 输入：长度 $1\sim 20$ 的字符串，仅含 `0–9`、`+`、`*`。
    - 输出：一个整数，结果保证在 `int` 范围内。

    **样例 1**
    ```
    输入：34+5*
    输出：35
    ```
    解释：`[3]→[3,4]→+ 得 [7]→[7,5]→* 得 [35]`。

    **样例 2**
    ```
    输入：99*
    输出：81
    ```
    解释：`[9]→[9,9]→* 得 [81]`。
:::

**思路**

**核心思路：用栈模拟逆波兰表达式求值。**

后缀表达式的好处是无需考虑运算符优先级，从左到右扫描即可：操作数直接入栈，遇到运算符就"消费"栈顶的两个操作数做运算，结果再压回栈。

**具体做法：**
1. 遍历字符串每个字符 `c`：
   - 若是数字（`isdigit(c)` 为真），将 `c - '0'` 入栈（单字符数字直接转成对应整数）。
   - 若是运算符（`+` 或 `*`），依次弹出栈顶两个元素：`op1 = 弹出第一个`、`op2 = 弹出第二个`，按运算符执行 `op1 + op2` 或 `op1 * op2`，把结果压回栈。
2. 扫描结束后，栈中仅剩一个元素，即表达式的值，输出 `stk.top()`。

**关于操作数顺序**：这里先弹出的是 `op1`（原栈顶，即后入的操作数），后弹出的是 `op2`（较早入的操作数）。由于本题运算符只有 `+` 和 `*`，两者都满足交换律，顺序不影响结果；若是减法或除法则需严格区分（先弹出的为右操作数）。

**复杂度**：每个字符只入栈/出栈一次，时间复杂度 $O(L)$（$L$ 为字符串长度，$\le 20$）；栈中最多同时存 $O(L)$ 个元素，空间复杂度 $O(L)$。

::: code-tabs
@tab C++
```cpp
#include <bits/stdc++.h>
using namespace std;
string str;
int res;
stack<int> stk;

int main()
{
    cin >> str;
    for(int i = 0; i < str.size(); i ++)
    {
        char c = str[i];
        if(isdigit(c))
        {
            stk.push(c - '0');
        }
        else
        {
            int op1 = stk.top();
            stk.pop();
            int op2 = stk.top();
            stk.pop();
            if(c == '+') stk.push(op1 + op2);
            else stk.push(op1 * op2);
        }
    }
    int res = stk.top();
    cout << res << "\n";
    return 0;
}
```
:::

**相似题目**

- **[LeetCode 150 Evaluate Reverse Polish Notation](https://leetcode.cn/problems/evaluate-reverse-polish-notation/)**：逆波兰表达式求值，与本体几乎同题（本题仅限 `+`、`*`）。
- **[AcWing 3302 表达式求值](https://www.acwing.com/problem/content/3304/)**：中缀表达式求值，可对比学习栈在表达式解析中的用法。

---
### No.5 · 减半递增

::: collapse
- 点击展开题目

    给定长度为 $n$ 的数组（$n$ 为 $2$ 的幂，$1\le n\le 2^{16}$）。每次操作可删除当前数组的**前半部分**或**后半部分**。通过若干次操作后，希望剩余部分**严格递增**，且保留的元素尽可能多。求可保留的最大长度。

    - 输入：首行 $n$，次行 $n$ 个整数 $a_i$（$1\le a_i\le 10^5$）。
    - 输出：一个整数，表示可保留的最大长度。

    **样例 1**
    ```
    输入：
    4
    1 2 3 4
    输出：
    4
    ```
    解释：数组已严格递增，长度 $4$。

    **样例 2**
    ```
    输入：
    8
    5 6 7 8 1 2 4 3
    输出：
    4
    ```
    解释：删后半部分，保留 `[5,6,7,8]`，长度 $4$。

    **样例 3**
    ```
    输入：
    4
    4 3 2 1
    输出：
    1
    ```
    解释：每次删一半，最终仅能保留 $1$ 个元素。
:::

**思路**

**核心思路：分治递归，把"只能整段删除一半"的约束转化为"每次把区间二分"。**

每次操作删除前半或后半，等价于：最终保留的一定是某次二分后某个**完整的子区间**（因为不允许从中间挖掉一块，只能整半整半地砍）。于是在整个数组上，我们要找到一个**完整子区间**尽可能长且严格递增。

**递归定义**：`dfs(l, r)` 表示区间 $[l, r]$ 内可保留的最大严格递增长度。

1. **判断当前区间是否严格递增**：`isIncrease(l, r)` 从左到右扫一遍，只要出现 `a[i] <= a[i-1]` 就不严格递增。若严格递增，直接返回区间长度 `r - l + 1`（已最优，无需再分）。
2. **否则二分**：从 `mid = (l + r) / 2` 处切成 $[l, mid]$ 和 $[mid+1, r]$ 两半，递归求两半各自能保留的最大长度，取 `max` 作为本区间答案。
3. 入口 `dfs(0, n-1)` 即全局答案。

**为什么正确**：任何"保留段"都可由不断对半砍得到，因此它必然等于某个递归叶子/中途节点的完整区间。递归穷举了所有合法保留段（且不重不漏），取最长者即得最优。

**复杂度**：每次递归把区间对半分，深度为 $\log_2 n = 16$；每个节点判断递增最坏 $O(\text{区间长})$，整棵树各节点区间长之和恰为 $O(n)$（每层区间拼起来覆盖整个数组），因此总时间复杂度 $O(n\log n)$。空间主要取决于递归调用栈，最大深度 $\log_2 n$，故空间复杂度 $O(\log n)$。

::: code-tabs
@tab C++
```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 1 << 16;
int a[N];
int n;

bool isIncrease(int l, int r)
{
    for(int i = l + 1; i <= r; i ++)
    {
        if(a[i] <= a[i - 1])
        {
            return false;
        }
    }
    return true;
}

int dfs(int l, int r)
{
    if(isIncrease(l, r)) return r - l + 1;
    int mid = l + r >> 1;
    return max(dfs(l, mid), dfs(mid + 1 ,r));
}

int main()
{
    cin >> n;
    for(int i = 0; i < n; i ++)
        cin >> a[i];
    int result = dfs(0, n - 1);
    cout << result << "\n";
    return 0;
}
```
:::

**相似题目**

- **[LeetCode 674 Longest Continuous Increasing Subsequence](https://leetcode.cn/problems/longest-continuous-increasing-subsequence/)**：最长连续递增子段，本体的基础形态（无"整段删半"约束）。
- **[LeetCode 53 Maximum Subarray](https://leetcode.cn/problems/maximum-subarray/)**：分治求解区间最值，与本题 `dfs` 二分思想同源。
- 拓展：含"只能整段删一半"约束的变体，可训练把操作约束翻译成区间划分的能力。

---
### No.4 · 生成对称链表

::: collapse
- 点击展开题目

    给定一个**带头节点**的单链表，要求以链表的**最后一个节点**为对称点，将链表中每个节点在对称点**右侧对应位置**复制出一个新节点。最终生成的新链表应当关于原链表尾节点对称。

    即：原链表为 `head → a₁ → a₂ → … → aₘ`，处理后应为 `head → a₁ → a₂ → … → aₘ → aₘ₋₁ → … → a₁`。

    函数签名（C++，原地修改，无返回值）：
    ```cpp
    void makeSymmetric(ListNode* head);
    ```

    **样例 1**
    ```
    输入：head = [3,4,1]
    输出：[3,4,1,4,3]
    ```
    解释：以尾节点 `1` 为对称中心，把 `4`、`3` 依次对称复制到 `1` 右侧，得到 `head → 3 → 4 → 1 → 4 → 3`。

    **样例 2**
    ```
    输入：head = [1,2,3,4]
    输出：[1,2,3,4,3,2,1]
    ```
    解释：以尾节点 `4` 为对称中心，把 `3`、`2`、`1` 依次复制到右侧，得到 `head → 1 → 2 → 3 → 4 → 3 → 2 → 1`。
:::

**思路**

**核心思路：先锁定对称中心（尾节点），再从前往后逐个"镜像复制"插到尾节点之后。**

要让链表关于尾节点对称，等价于：保留原链表前半段不动，再把前半段（除尾节点本身外）**逆序**接在尾节点之后。

**两步实现：**

1. **找对称中心**：定义指针 `p` 从第一个有效节点 `head->next` 出发，沿 `next` 走到 `p->next == NULL`，此时 `p` 停在最后一个有效节点（即对称中心）。`p` 的位置此后**固定不变**。
2. **镜像复制**：再用指针 `q` 从 `head->next` 出发，当 `q != p` 时循环（即只复制到尾节点之前，尾节点自身不复制）：
   - 用 `q->val` 新建一个节点 `newNode`；
   - 把它**头插**到 `p` 之后：`newNode->next = p->next;` 再 `p->next = newNode;`
   - 因为 `p` 永远是对称中心，`newNode` 总是插在已插入副本的**最前面**——每次插入都把新副本顶到 `p` 紧邻的右侧，于是原顺序的 `a₁,a₂,…` 被倒着排成 `…,a₂,a₁`，自然形成对称结构。
   - `q` 前进一步，继续处理下一个原节点。

循环结束时，尾节点右侧依次挂着 `aₘ₋₁, …, a₁`，整条链表即关于尾节点对称。

**复杂度**：每个原节点最多复制一次，且只做了两次完整遍历（找尾一次、复制一次），因此时间复杂度为 $O(n)$（$n$ 为原链表长度）；额外新建了与原链表节点数（除去尾节点）相同数量的节点，空间复杂度为 $O(n)$。

::: code-tabs
@tab C++
```cpp
/**
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(nullptr) {}
 * };
 */

/**
 * @param head: 链表的头节点，下一个节点是第一个有效节点
 * @return: 无返回值，直接在原链表上修改
 */
void makeSymmetric(ListNode* head) {
    ListNode* p = head -> next;        // 从第一个有效节点开始
    while(p->next != NULL)             // 遍历至尾节点
        p = p->next;

    ListNode* q = head->next;          // 从第一个有效节点重新开始
    while(q != p)                      // 遍历至尾节点前
    {
        ListNode* newNode = new ListNode(q->val); // 创建当前节点的副本
        newNode->next = p->next;       // 将新节点指向中心节点后
        p->next = newNode;             // 插入到中心节点之后
        q = q->next;                  // 移动到下一个原节点
    }
}
```
:::

**相似题目**

- **[LeetCode 234 Palindrome Linked List](https://leetcode.cn/problems/palindrome-linked-list/)**：判断链表是否回文，同样依赖"对称中心 + 反转/复制后半"的思路。
- **[LeetCode 206 Reverse Linked List](https://leetcode.cn/problems/reverse-linked-list/)**：链表反转，是「镜像/对称复制」的基础功。
- 拓展：原地复制、镜像链表、回文拼接类题目，可举一反三。

---
### No.3 · 元素唯一化

::: collapse
- 点击展开题目

    给定长度为 $n$ 的整数数组 $a$。允许对每个元素做**至多一次**调整：将值增加、减少或不变，但变化幅度**最多为 $1$。

    问是否存在一种调整方案，使得调整后所有元素**两两互不相同**。存在输出 `Yes`，否则输出 `No`。

    - 输入：首行 $n$，次行 $n$ 个整数 $a_i$（$0\le a_i\le 10^5$）。
    - 输出：`Yes` 或 `No`。

    **样例 1**
    ```
    输入：
    3
    5 5 5
    输出：
    Yes
    ```
    解释：可调整为 $[4, 5, 6]$，三个元素互不相同。

    **样例 2**
    ```
    输入：
    4
    0 0 0 0
    输出：
    No
    ```
    解释：无论怎么调整，$0$ 最多变到 $-1/0/1$，四个数无法全部互异。
:::

**思路**

**核心思路：排序后从左到右贪心，每个数取"能取到的最小且不重复的值"。**

调整只能让每个数在 $\{x-1,\,x,\,x+1\}$ 中选一个，且最终要互不相同。要留给后面的数尽量多的空间，理想策略是：**当前数在满足"严格大于前一个已确定数"的前提下，尽可能取小的值**。

**具体做法：**

1. 先将数组排序（下标从 $1$ 开始），并设哨兵 `a[0] = -2`，保证第一个元素（`a[1]`，初始 $\ge 0$）一定满足 $> a[0]$。
2. 从左到右遍历每个 $a_i$，依次尝试三个候选增量 `{-1, 0, +1}`（即候选值 $a_i-1,\ a_i,\ a_i+1$）。一旦某个候选值**严格大于前一个已经确定的数 `a[i-1]`**，就把它定为 $a_i$ 的新值并停止尝试（因为按这个顺序，第一个满足条件的就是"最小可行值"）。
3. 若三个候选全部 $\le a[i-1]$（说明无论怎么调都和前一个数撞上），则无解，直接输出 `No` 并退出。
4. 全部遍历通过则说明可全部互异，输出 `Yes`。

**为什么正确**：排序后只需关心"与前一个不重复"——只要每个数都严格大于前一个，整条序列自然严格递增、必然两两不同。每次取最小可行值，能最大程度压低当前数，给右侧数字保留更充裕的取值范围，不会因当前贪大而误判无解。时间复杂度 $O(n\log n)$（瓶颈在排序），空间 $O(1)$。

**补充**：样例 2 中四个 $0$，排序后依次为 $0,0,0,0$；第一个取 $0$（哨兵 $-2$ 不挡），第二个最小可行是 $1$，第三个需 $>1$ 最小取 $2$，第四个需 $>2$ 最小取 $3$——但 $0$ 最多只能调整到 $1$，取不到 $3$，于是第三步失败输出 `No`，符合预期。实际上当某个值连续出现过多（同一原始值出现超过 $3$ 次）就必然无解。

::: code-tabs
@tab C++
```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 1e5 + 10;
int a[N];
int b[] = {-1, 0, 1};
int n;

int main()
{
    cin >> n;
    for(int i = 1; i <= n; i ++) cin >> a[i];
    sort(a + 1, a + n + 1);
    a[0] = -2;
    for(int i = 1; i <= n; i ++)
    {
        bool flag = false;
        for(int j = 0; j < 3; j ++)
        {
            if(a[i] + b[j] > a[i - 1])
            {
                a[i] += b[j];
                flag = true;
                break;
            }
        }
        if(!flag)
        {
            puts("No");
            return 0;
        }
    }
    puts("Yes");
    return 0;
}
```
:::

**相似题目**

- **[LeetCode 945 Minimum Increment to Make Array Unique](https://leetcode.cn/problems/minimum-increment-to-make-array-unique/)**：通过 +1 操作使数组元素唯一，与本題思路同源（本题放宽到 ±1）。
- 拓展：允许每个元素在 $\{x-k,\dots,x+k\}$ 内调整的去重/构造类题，可训练贪心边界分析。

---
### No.2 · 353三元组

::: collapse
- 点击展开题目

    给定长度为 $n$ 的数组 $a$，统计满足以下条件的三元组 $(i, j, k)$ 的数量：

    1. $0\le i<j<k<n$；
    2. $a_i=3,\ a_j=5,\ a_k=3$。

    - 输入：首行 $n$，次行 $n$ 个整数 $a_i$（$1\le a_i\le 10^5$）。
    - 输出：一个整数，表示满足条件的三元组总数。

    **样例 1**
    ```
    输入：
    5
    3 5 3 5 3
    输出：
    4
    ```
    解释：$(0,1,2)$、$(0,1,4)$、$(0,3,4)$、$(2,3,4)$，共 $4$ 种。

    **样例 2**
    ```
    输入：
    3
    3 5 3
    输出：
    1
    ```
    解释：唯一三元组 $(0,1,2)$。
:::

**思路**

**核心思路：固定中间的 5，左右 3 的个数相乘，即为以它为中心的三元组数。**

目标模式是 `3 5 3`，中间那个数必须是 $5$。对于任意一个值为 $5$ 的位置 $j$，只要数出它**左边**有多少个 $3$、**右边**有多少个 $3$，那么以这个 $5$ 作为中间元素能凑出的合法三元组数，就等于「左侧 3 的个数 × 右侧 3 的个数」——左侧任取一个 3 作 $i$、右侧任取一个 3 作 $k$，配合中间固定的 $5$，自然满足 $i<j<k$。

**两步扫描实现：**

1. **第一次遍历**：统计整个数组中 $3$ 的总数，记为 `totalThree`。
2. **第二次遍历（从左到右）**：用 `leftThree` 记录「当前位置左侧已经出现过的 3 的个数」。当扫到某个 $a_i=5$ 时：
   - 它左侧的 $3$ 有 `leftThree` 个；
   - 它右侧的 $3$ 有 `totalThree - leftThree` 个（当前这个 $5$ 本身不是 $3$，不计入，恰好对应"右侧"的定义）。
   - 于是以当前这个 $5$ 为中间元素的三元组数为 `leftThree * (totalThree - leftThree)`，累加到 `sum`。
3. 遍历结束，`sum` 即答案。

**为什么正确且高效**：枚举每一个 $5$ 作为中心，左右 3 的数量独立相乘，恰好不重不漏地覆盖所有 `3 5 3` 组合。时间复杂度 $O(n)$，空间复杂度 $O(1)$。

**注意溢出**：三元组总数可能很大（最坏约 $n^3$ 量级，$n=10^5$ 时可达 $10^{14}$ 级别），因此答案与计数变量都要用 `long long`，代码已用 `LL` 处理。

::: code-tabs
@tab C++
```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;
const int N = 1e5 + 10;
int a[N], n;
LL totalThree;

int main()
{
    cin >> n;
    for(int i = 0; i < n; i ++)
    {
        cin >> a[i];
        totalThree += (a[i] == 3);
    }
    LL sum = 0, leftThree = 0;
    for(int i = 0; i < n; i ++)
    {
        if(a[i] == 3) leftThree ++;
        if(a[i] == 5)  sum += leftThree * (totalThree - leftThree);
    }
    cout << sum << endl;
    return 0;
}
```
:::

**相似题目**

- **[LeetCode 930 Binary Subarrays With Sum](https://leetcode.cn/problems/binary-subarrays-with-sum/)**：用「前缀和之差」统计满足和条件的区间，与本題"左右计数相乘"同属前缀统计技巧。
- **[LeetCode 1358 Number of Substrings Containing All Three Characters](https://leetcode.cn/problems/number-of-substrings-containing-all-three-characters/)**：固定模式/三元素的计数类题，思路可迁移。
- 拓展：固定"X Y X"型（中心对称）模式的计数，统一用「左计数 × 右计数」处理。

---
### No.1 · 减半平衡调整

::: collapse
- 点击展开题目

    给定长度为 $n$ 的整数数组 $a$，满足数组元素之和为 $0$。请构造长度为 $n$ 的整数数组 $b$，使得：

    1. 对每个 $i$，$b_i=\lfloor a_i/2\rfloor$ 或 $b_i=\lceil a_i/2\rceil$；
    2. 元素之和依然为 $0$。

    若有多解，输出**字典序最小**的解（优先让靠前的数尽可能小，相同再比较下一个）。

    **数据范围**：$2\le n\le 10^5$，$-10^5\le a_i\le 10^5$；保证 $\sum a_i=0$ 且一定有解。

    - 输入：首行 $n$，次行 $n$ 个整数 $a_i$。
    - 输出：一行 $n$ 个整数（空格分隔，行末无空格）。

    **样例 1**
    ```
    输入：
    3
    5 -3 -2
    输出：
    2 -1 -1
    ```
    解释：$b=[\lfloor5/2\rfloor,\ \lceil-3/2\rceil,\ \lfloor-2/2\rfloor]=[2,-1,-1]$，和为 $0$ 且字典序最小。

    **样例 2**
    ```
    输入：
    4
    3 3 -3 -3
    输出：
    1 1 -1 -1
    ```
    解释：$b=[\lfloor3/2\rfloor,\ \lfloor3/2\rfloor,\ \lceil-3/2\rceil,\ \lceil-3/2\rceil]=[1,1,-1,-1]$。
:::

**思路**

**核心思路：贪心构造 + 字典序最小化。**

对原数组 $a$ 中每个元素，合法的 $b_i$ 只有两个候选值——向下取整 $\lfloor a_i/2\rfloor$ 与向上取整 $\lceil a_i/2\rceil$；当 $a_i$ 为偶数时两者相等。为了最终字典序最小，我们遵循一个原则：**能取小就取小**。

**第一步（尽量取小）**

先让每个 $b_i$ 都取较小值 $\lfloor a_i/2\rfloor$（代码中对正数即 `a[i]/2` 下取整，对负奇数额外 `--` 修正，二者效果一致）。这样得到的数组和自然不会超过 $0$，记其与 $0$ 的差额为 $\text{need}=-\sum b_i\ (\ge 0)$。

**第二步（从后往前补差额）**

要让整体字典序最小，靠前位置的数**绝不轻易增大**，因此把"放大"操作尽量往后放。从数组末尾向前扫描，遇到某个 $a_i$ 是奇数（说明它还有"向上取整"这一更大的备选值）时，就把对应的 $b_i$ 加 $1$，并将 $\text{need}$ 减 $1$；一旦 $\text{need}$ 降为 $0$ 立刻停止。

为什么一定补得完、且首位永不需要动？因为 $\sum b_i$ 的"亏空"恰好等于所有奇数的个数的一半，而可用奇数位（不含下标 $0$）比所需数量更多，所以从后往前补一定能补满，无需触碰第一个元素。这也保证了字典序最小：任何让较靠前位置变大的方案，其字典序都大于本方案。

**复杂度**：$O(n)$ 时间与 $O(n)$ 空间，满足 $n\le 10^5$ 的数据规模。

::: code-tabs
@tab C++
```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;
const int N = 1e5 + 10;
int a[N], b[N];
LL sum;
int n;

int main()
{
    cin >> n;
    for(int i = 0; i < n; i ++)
    {
        cin >> a[i];
        b[i] = a[i] / 2;
        if(a[i] < 0 && a[i] % 2 != 0) b[i] --;
        sum += b[i];
    }
    int need = (int)(- sum);
    for(int i = n - 1; i > 0 && need > 0; i --)
    {
        if(a[i] % 2 != 0)
        {
            b[i] ++;
            need --;
        }
    }
    for(int i = 0; i < n; i ++)
        cout << b[i] << " \n"[i == n - 1];

    return 0;
}
```
:::

**相似题目**

- **[LeetCode 945 类构造贪心](https://leetcode.cn/problems/minimum-increment-to-make-array-unique/)**：每个元素在多个候选值中二选一、再满足全局约束并求字典序最小，思路可迁移。
- **[AtCoder Beginner Contest 构造/贪心题](https://atcoder.jp/contests)**：大量"每个元素二选一 + 字典序最小"的构造场景，建议作为同类训练。
- 拓展：Lexicographically smallest after operations 系列，强化"前不动、后补差"的贪心直觉。
