title: 函数式编程简介
speaker: Lellansin
url: https://github.com/Lellansin
transition: zoomin

----

## 函数式编程简介
### 从入门到懵逼

----

## 函数 {:&.flexbox.vleft}
### 热身体操

----

## 常见的函数式编程语言
----


### {:&.flexbox.left}
* 比较纯粹的
	* Clojure
	* Erlang
	* Haskell
	* Lisp
	* Perl
	* Schema
	* Scala
	* ...


### {:&.flexbox.cernt}
* 支持函数式的
	* C++
	* Java
	* Javascript
	* PHP
	* Python
	* R
	* Ruby
	* ...

----

### 回调函数

```C++
#include <windows.h>
#include "resource.h"

BOOL CALLBACK DialogProc(HWND hwnd, UINT Message, WPARAM wParam, LPARAM lParam)
{
	switch(Message)
	{
		case WM_CLOSE:
			DestroyWindow(hwnd);
		break;
	}
	return 0;
}

int WINAPI WinMain( HINSTANCE hInstance, HINSTANCE hPrevInstance,
					LPSTR lpCmdLine, int nShowCmd )
{
	DialogBox( hInstance, MAKEINTRESOURCE(IDD_MAIN), NULL, DialogProc );
	return 0;
}
```

----

### Lambda 表达式 (匿名函数)

```C++
#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;

int main()
{
    int i = 1024;
    auto func = [=]{
        cout << i;
    };

    func();
}

void abssort(float* x, unsigned n) {
    sort(x, x + n,
        [](float a, float b) {
            return (abs(a) < abs(b));
        }
    );
}
```

----

先举一个普通的 Python 例子，将一个 list 里的每个元素都平方：
```python
arr = [1, 2, 3]
res = []

for x in arr:
    res.append(x * x)
```
加入回调函数
```python
def sq(x):
    return x * x

map(sq, [1, 2, 3])
```
使用匿名函数 (lambda表达式)
```python
map( lambda x: x*x, [1, 2, 3] )
```
对应 javascript
```javascript
[1, 2, 3].map((x) => x*x )
```

----

## Python {:&.flexbox.vleft}

The sum of all even numbers between 2 and 100(inclusive)

指令式
```python
res = 0

for x in range(1,101):
	if x % 2 == 0:
		res += x
```
函数式
```python
sum([x for x in range(2, 101) if x % 2 == 0])
```


----

如果你认同这样的写法比 for 循环<font color="skyblue">更清晰、简单</font> <br>
那么你就已经认同了 <font color="orange">函数式编程范式</font> 的一个核心思想<br>
使用`函数操作`代替`指令操作`

----

举例来说，现在有这样一个数学表达式：
```javascript
(1 + 2) * 3 - 4
```
传统的过程式编程，可能这样写：
```javascript
var a = 1 + 2;
var b = a * 3;
var c = b - 4;
```
使用函数代替指令后就变成下面这样：
```javascript
// var result = sub(multiply(add(1,2), 3), 4);
var result =
  sub(
    multiply(
        add(1,2),
      3),
    4);
```
在 Schema 中就变成了这样
```schema
(- ( * ( + 1 2) 3) 4)
```

----

## Everythins is sequence

Schema、Lisp、clojure ...

----

## 万物皆序列
##### <font color="grey">FP 程序员的洗脑口号</font>
<br>

```
函数( 参数序列 )
```

----

## 万物皆序列

```javascript
函数 ( [ 函数(函数(序列)), 函数(序列), 值, 值, ... ] )
```

----

```schema
 <!-- Scheme (1 + 2) * 3 - 4  -->
(- ( * ( + 1 2) 3) 4)
```

```clojure
;; clojure
(+ 1 1)
(- 2 1)
(* 1 2)
(/ 2 1)
(= 1 1)
(= 2 1)
(not true)
(+ 1 (- 3 2))
```

----

据说，一个黑客冒死偷到了美国用于导弹控制的lisp代码的最后一页，却发现那一页上全是右括号")"。

----

```lisp
; 排序
(list sort:(比较函数))

; 按钮点击
(按钮 左键点击:(login)
     右键点击:(popup)
     中键点击:(bomb)
     )

; 网络请求
(爪子 抓成功:(解析数据)
     抓失败:(弹窗告警写log)
     抓超时:(弹窗告警写log)
     )

; AI
(脚男 发现敌人:(跑过去砍)
     技能触发:(开大招)
     血量告警:(喝药/跑路)
     组队请求:(接受/拒绝)
     聊天信息:(忽略/回复)
     ...
     )
```

----

<h1 style="color: red">王垠的 40 行代码</h1>

----

Q: 为什么出现于上个世纪50年代的编程范式，到现在还没有过时？<br/>

A: 简单说，因为这种范式本质上不是一种技术，而是数学。<br/><br/>

<font color="orange">数学是不会过时的。</font><br/><br/>

函数式的初衷是为了实现理论演算，用更简洁的方式定义图灵机。<br/>

----

## 要想理解<font color="orange">递归</font>，必先理解<font color="orange">递归</font>。

<img style="width: 250px; float: left; margin: 0 auto;" src="../img/digui.jpg">

----

用 Lisp 举个简单的例子，求一个数组的总和<br>

```lisp
;; lisp
(defun total (x)
  (if (null x)
    0
    (+ (first x) (total (rest x)))
  )
)
(total '(1 5 1))
```

----

### 更强的表达能力

```
sub(multiply(add(1,2), 3), 4)
```
对它进行变形，不难得到另一种写法：
```
add(1,2).multiply(3).sub(4)
```

```
merge([1,2],[3,4]).sort().search("2")
```

```javascript
[1, 2, 3].map((x) => x*x )
```
通过 高阶函数、Currying等黑魔法可以得到接近自然语言的表达

----

* 只用"函数"，不用"指令"
  * 更强的表达能力
  * 更快的编写速度
* 更敏捷，操作只在函数内，对外没有"副作用"
  * 低耦合
  * 更容易并发/异步操作
  * 测试友好

----

## Linh Script

----
<div class="columns-2">
    <pre><code class="javascript">set i 10.

echo "i is" i.

if gt i 5, do
    echo "i > 5",
    inc i,
    echo "i after increase is" i.
    </code></pre>
    <pre><code class="javascript">set i 0.

while lt i 5, do
    echo i,
    inc i.

echo "over".
    </code></pre>
</div>

<br>
*https://github.com/Lellansin/Linh*

----

<h1>没有银弹</h1>
<h5><font color="skyblue">没有最好，只有最适合</font></h5><br>
## 编程能力决定了是否优雅
## Thanks
