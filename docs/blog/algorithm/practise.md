---
title: 每日一题
tags:
  - c++
  - 算法
createTime: 2026/07/05 23:29:21
permalink: /blog/8jm33pcw/
---
## 07-05
### [数组折叠求和](https://sunnywhy.com/camp/3415/model/4144?itemId=3314)

::: collapse
- 点击展开题目
    **数组折叠求和**

    给定一个长度为 $n$ 的整数数组 $a$，将数组以中间位置为轴，把数组的左半部分折叠到右半部分，折叠时重合在相同位置的两个元素相加作为折叠后该位置的结果。例如将 $[1, 2, 3, 4]$ 折叠后为 $[(3 + 2), (4 + 1)]$ => $[5, 5]$，而 $[1, 2, 3]$ 折叠后为 $[2, (3 + 1)]$ => $[2, 4]$。

    重复这个操作，直到数组中只剩下一个元素。请输出每一步的新数组的元素之和的总和。

    **输入描述**：
    第一行一个整数 $n$($1\le n\le 10^{5}$)，表示数组长度。

    第二行 $n$ 个整数 $a_{1}, a_{2}, \ldots, a_{n}$($−10^{5}\le a_{i}\le 10^{5}$)，表示初始数组。

    **输出描述**：
    输出一个整数，表示每一步的新数组的元素之和的总和。

    **输入样本**：
    ```
    3
    1 2 3
    ```

    **样本输出**：
    ```
    12
    ```

    **解释**：
    初始数组为 $[1, 2, 3]$，长度为奇数，折叠后得到 $[2, (3 + 1)] = [2, 4]$，新数组元素之和为 $2 + 4 = 6$。

    新数组为 $[2, 4]$，再次折叠得到 $[2 + 4] = [6]$，新数组元素之和为 $6$。

    总和的求和结果为 $6 + 6 = 12$。

    > 代码长度限制[待补充] KB | 时间限制[待补充] ms | 内存限制[待补充] MB | 栈限制[待补充] KB
:::

**思路**
通过观察可知每次折叠操作后数组长度减半（向上取整），直到数组只剩一个元素。每次折叠后的新数组元素之和与初始数组元素之和相等。因此，只需计算从初始数组到只剩一个元素的折叠次数，再乘以初始数组元素之和，即可得到每一步新数组元素之和的总和。

::: code-tabs
@tab C++
```C++
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;
const int N = 1e5 + 10;
LL a[N], sum;
int n, len, step;

int main()
{
    scanf("%d", &n);
    for(int i = 0; i < n; i ++)
    {
        scanf("%lld", &a[i]);
        sum += a[i];
    }
    len = n;
    while(len > 1)
    {
        len = len + 1 >> 1;
        step ++;
    }
    printf("%lld\n", step * sum);
    return 0;
}
```

@tab Java
```java
[待补充]
```

@tab Python
```python
[待补充]
```
:::

### [统计目标字符](https://sunnywhy.com/camp/3415/model/4144?itemId=3315)

::: collapse
- 点击展开题目
    **统计目标字符**

    给定一个字符串(由若干大写字母组成)，表示目标字符集;以及一个由大写字母构成的矩阵 `grid`。请计算并输出矩阵 `grid` 中属于目标元素集的字符总数。

    **输入描述**：
    第一行是一个字符串，长度在 $1$ 到 $10^{3}$ 之间，仅由大写字母组成。

    第二行是一个正整数 $M$($1\le M\le 500$)，表示矩阵行数。

    接下来 $M$ 行，每行长度相同(在 $1$ 到 $500$ 之间)，且均由大写字母组成。

    **输出描述**：
    一个整数，表示矩阵中属于目标字符集中字符的总个数。

    **输入样本**：
    ```
    FIR
    3
    FAAB
    CIFR
    DRRI
    ```

    **样本输出**：
    ```
    7
    ```

    **解释**：
    目标集合包含字符 `F`、`I`、`R`。矩阵中：

    - `FAAB` → `F`($1$)、`A`(不计数)、`A`(不计数)、`B`(不计数)→ 有效数 $1$
    - `CIFR` → `C`(不计数)、`I`($1$)、`F`($1$)、`R`($1$)→ 有效数 $3$
    - `DRRI` → `D`(不计数)、`R`($1$)、`R`($1$)、`I`($1$)→ 有效数 $3$

    总计 $1 + 3 + 3 = 7$。

    > 代码长度限制[待补充] KB | 时间限制[待补充] ms | 内存限制[待补充] MB | 栈限制[待补充] KB
:::

**思路**
先遍历目标字符集字符串，将目标字符在布尔数组 `isTarget` 中对应的位置标记为 `true`。然后遍历矩阵的每一个字符，若该字符在 `isTarget` 中对应位置为 `true`，则计数加一。最后输出计数结果，即为矩阵中属于目标字符集的字符总数。

::: code-tabs
@tab C++
```C++
#include <bits/stdc++.h>
using namespace std;
const int N = 1010;
string grid[N];
int n;
bool isTarget[26] = {false};

int main()
{
    string target;
    cin >> target;
    for(int i = 0; i < target.size(); i ++)
    {
        isTarget[target[i] - 'A'] = true;
    }

    cin >> n;
    int total = 0;
    for(int i = 0; i < n; i ++)
    {
        cin >> grid[i];
        for(int j = 0; j < grid[i].size(); j ++)
        {
            total += isTarget[grid[i][j] - 'A'];
        }
    }
    cout << total << "\n";
    return 0;
}
```

@tab Java
```java
[待补充]
```

@tab Python
```python
[待补充]
```
:::



### [第一个正元素]([待补充链接])

::: collapse
- 点击展开题目
    **第一个正元素**

    给定一个长度为 $n$ 的数组 $a$，其中数组 $a$ 中的元素均为非零整数，且所有负元素的下标都比所有正元素的下标小。

    求数组 $a$ 中下标最小的正元素的下标。如果数组中不存在正元素，那么输出 $−1$。

    你能用 $O(\log n)$ 的时间复杂度完成查找过程吗?

    **输入描述**：
    第一行一个整数 $n$（$1 \leq n \leq 10^{5}$），表示数组长度。

    第二行 $n$ 个整数 $a[i]$（$−10^{5} \leq a[i] \leq 10^{5}, a[i] \neq 0$），表示数组元素。

    **输出描述**：
    输出一个整数，表示数组 $a$ 中下标最小的正元素的下标。如果数组中不存在正元素，那么输出 $−1$。

    **输入样本**：
    ```
    5
    -1 -2 3 1 2
    ```

    **样本输出**：
    ```
    2
    ```

    **解释**：
    第一个正元素是 $3$，下标为 $2$。

    > 代码长度限制[待补充] KB | 时间限制[待补充] ms | 内存限制[待补充] MB | 栈限制[待补充] KB
:::

**思路**
利用数组中负元素在前、正元素在后的有序性质，采用二分查找法。通过比较中间元素的正负，动态调整左右指针，逐步缩小查找区间，最终找到第一个正元素的下标。若遍历完整个区间都未找到正元素，则输出 $-1$。该方法时间复杂度为 $O(\log n)$，符合题目要求。

::: code-tabs
@tab C++
```C++
#include <bits/stdc++.h>
using namespace std;
const int N = 1e5 + 10;
int a[N], n;
int main()
{
    cin >> n;
    for(int i = 0; i < n; i ++) cin >> a[i];
    int l = 0, r = n;
    while(l < r)
    {
        int mid = l + r >> 1;
        if(a[mid] < 0) l = mid + 1;
        else r = mid;
    }
    cout << (l < n? l : -1) << "\n";
    return 0;
}
```

@tab Java
```java
import java.util.Scanner;

public class FirstPositiveElement {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) {
            scanner.nextInt();
        }
        int l = 0, r = n;
        while (l < r) {
            int mid = l + r >> 1;
            if (a[mid] < 0) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        System.out.println(l < n? l : -1);
    }
}
```

@tab Python
```python
n = int(input())
a = list(map(int, input().split()))
l, r = 0, n
while l < r:
    mid = l + r >> 1
    if a[mid] < 0:
        l = mid + 1
    else:
        r = mid
print(l if l < n else -1)
```
:::


### [交替最大最小元素]([待补充链接])

::: collapse
- 点击展开题目
    **交替最大最小元素**

    给定一个长度为 $n$ 的整数序列，所有元素互不相同。从中选取最大的元素，然后选取剩余元素中最小的元素，接下来再选择剩余最大的元素、再选择最小的元素，依此类推，直到所有元素均被选取。请输出按选取顺序组成的新序列。

    **输入描述**：
    第一行包含整数 $n$ ($1\le n\le 10^{5}$)，表示序列长度;

    第二行包含 $n$ 个互不相同的整数 $a[i]$ ($−10^{9}\le a[i]\le 10^{9}$)，表示原始序列。

    **输出描述**：
    输出一行，包含按照规则重排后的序列，元素间以空格分隔，行末不允许有多余的空格。

    **输入样本**：
    ```
    5
    5 3 1 2 4
    ```

    **样本输出**：
    ```
    5 1 4 2 3
    ```

    **解释**：
    依次选取：最大(5) => 最小(1) => 次大(4) => 次小(2) => 次次大(3)，得到 [5, 1, 4, 2, 3]。

    > 代码长度限制[待补充] KB | 时间限制[待补充] ms | 内存限制[待补充] MB | 栈限制[待补充] KB
:::

**思路**
先对给定的整数序列进行排序，然后使用双指针法。一个指针从排序后数组的末尾（指向最大元素），另一个指针从数组开头（指向最小元素）。每次交替从两端取元素放入新数组，直至所有元素都被处理。这样就得到了按照先最大、再最小交替选取规则组成的新序列。

::: code-tabs
@tab C++
```C++
#include <bits/stdc++.h>
using namespace std;
const int N = 1e5 + 10;
int a[N], b[N];
int n;

int main()
{
    cin >> n;
    for(int i = 0; i < n; i ++) cin >> a[i];
    sort(a, a + n);
    int l = 0, r = n - 1, idx = 0;
    while(l <= r)
    {
        b[idx ++] = a[r --];
        if(l <= r)
        {
            b[idx ++] = a[l ++];
        }
    }
    for(int i = 0; i < n; i ++)
        cout << b[i] << " \n"[i == n - 1];
    
    return 0;
}
```

@tab Java
```java
import java.util.Arrays;
import java.util.Scanner;

public class AlternateMaxMin {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) {
            a[i] = scanner.nextInt();
        }
        Arrays.sort(a);
        int[] b = new int[n];
        int l = 0, r = n - 1, idx = 0;
        while (l <= r) {
            b[idx++] = a[r--];
            if (l <= r) {
                b[idx++] = a[l++];
            }
        }
        for (int i = 0; i < n; i++) {
            if (i == n - 1) {
                System.out.print(b[i]);
            } else {
                System.out.print(b[i] + " ");
            }
        }
    }
}
```

@tab Python
```python
n = int(input())
a = list(map(int, input().split()))
a.sort()
b = []
l, r = 0, n - 1
while l <= r:
    b.append(a[r])
    r -= 1
    if l <= r:
        b.append(a[l])
        l += 1
print(' '.join(str(x) for x in b))
```
:::


### [最大分割奇偶乘积]([待补充链接])

::: collapse
- 点击展开题目
    **最大分割奇偶乘积**

    有一个长度为 $n$ 的正整数数组，以某个位置为分割点，将该数组分割为前后两部分。分割点可以是任意位置(包括数组两端)，使得：

    - 前半部分中所有属于原数组的 **奇数** 位置的元素之和 $P$(不存在相关位置的元素时记为 $0$)。
    - 后半部分中所有属于原数组的 **偶数** 位置的元素之和 $Q$(不存在相关位置的元素时记为 $0$)。

    求这两个值的乘积 $P∗Q$ 的最大可能值。

    **输入描述**：
    第一行包含一个整数 $n$($2\le n\le 10^{5}$)。

    第二行 $n$ 个整数 $a_{i}$($1\le a_{i}\le 10^{4}$)，表示数组元素。

    **输出描述**：
    输出乘积的最大值。

    **输入样本**：
    ```
    3
    2 3 4
    ```

    **样本输出**：
    ```
    6
    ```

    **解释**：
    当分割为：

    - 前半部分：`2`
    - 后半部分：`3 4`

    前半部分的奇数位置和为 $2$($2$ 在原数组中为 $1$ 号位置)，后半部分的偶数位置和为 $3$($3$ 在原数组中为 $2$ 号位置)，乘积为 $2\times 3=6$，是最大值。

    > 代码长度限制[待补充] KB | 时间限制[待补充] ms | 内存限制[待补充] MB | 栈限制[待补充] KB
:::

**思路**
通过前缀和数组 `oddPrefix` 记录前 $i$ 个元素中奇数位置元素的和。然后从后往前遍历数组，计算后半部分偶数位置元素的和 `evenSum`，在遍历过程中，每次计算 `oddPrefix[i] * evenSum` 并更新最大值，最终得到最大乘积。

::: code-tabs
@tab C++
```C++
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;
const int N = 1e5 + 10;
LL a[N], oddPrefix[N];
int n;
LL maxProduct, evenSum;

int main()
{
    scanf("%d", &n);
    for(int i = 1; i <= n; i ++)
    {
        scanf("%lld", &a[i]);
        oddPrefix[i] = oddPrefix[i - 1] + (i % 2? a[i] : 0);
    }
    for(int i = n; i >= 1; i --)
    {
        if(i % 2 == 0)
            evenSum += a[i];
        maxProduct = max(maxProduct, oddPrefix[i] * evenSum);

    }
    printf("%lld\n", maxProduct);
    return 0;
}
```

@tab Java
```java
import java.util.Scanner;

public class MaxSplitOddEvenProduct {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        long[] a = new long[n + 1];
        long[] oddPrefix = new long[n + 1];
        for (int i = 1; i <= n; i++) {
            a[i] = scanner.nextLong();
            oddPrefix[i] = oddPrefix[i - 1] + (i % 2 == 1? a[i] : 0);
        }
        long maxProduct = 0;
        long evenSum = 0;
        for (int i = n; i >= 1; i--) {
            if (i % 2 == 0) {
                evenSum += a[i];
            }
            maxProduct = Math.max(maxProduct, oddPrefix[i] * evenSum);
        }
        System.out.println(maxProduct);
    }
}
```

@tab Python
```python
n = int(input())
a = list(map(int, input().split()))
odd_prefix = [0]
for i in range(n):
    if (i + 1) % 2:
        odd_prefix.append(odd_prefix[-1] + a[i])
    else:
        odd_prefix.append(odd_prefix[-1])
max_product = 0
even_sum = 0
for i in range(n - 1, -1, -1):
    if (i + 1) % 2 == 0:
        even_sum += a[i]
    max_product = max(max_product, odd_prefix[i + 1] * even_sum)
print(max_product)
```
:::