## TypeScript = Type + JavaScript

> [李通洲](https://github.com/CarterLi) -- 创新前端组

----

## JavaScript: 动态类型语言

* JavaScript 不是没有类型。所谓“动态”类型语言只是不在代码里显式指定变量的类型。

```js
var a = 1;
typeof a === 'number';
```

```js
var b = [ 1, 2, 3 ];
typeof b === 'object';
Object.prototype.toString.call(b) === '[object Array]';
```

----

## 动态类型语言的问题

* JavaScript 作为动态类型语言，在给开发人员带来一些便利的同时，带来的更多是数不清的暗坑。比如下面这个表达式：

```js
a + b
```

* 可以代表数学相加，也可以代表字符串拼接，这都没有问题。但事情并没这么简单。问：

```js
var a = [1], b = [2];
a + b = ?
```

* 如果你去问 python、ruby 程序员，他可能会认为 a + b = [1, 2]；如果你去问 Java 程序员，他可能会期望报错，至少是个运行时的 TypeError。然并卵，JavaScript 的做法是：把两边操作数都转字符串后拼接，结果为 '12'

----

## TypeScript: 给 JavaScript 加入类型检查

* 那么怎么解决呢？微软给出的方案是：给 JavaScript 引入静态类型检查就好了。于是 TypeScript 诞生了。

* 微软给 TypeScript 的官方定义

> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

----

## TypeScript: 给 JavaScript 加入类型检查

* 作为 JavaScript 语言的超集，它保留了 JavaScript 的所有语法、概念。`undefined` 这种概念不清也没什么卵用的东西依然存在，`typeof null` 依然是 `'object'`。但至少，TypeScript 给变量引入了静态类型，而且舍弃了一些 JavaScript 里明显的糟粕（隐式类型转换）

----

## TypeScript 保护你的代码质量 1

* 现在是 TypeScript 了，问：

```typescript
var a = [1], b = [2];
a + b = ?
```

* 答：在 TypeScript 里一切变量皆有静态类型。虽然没有显式声明a、b 的类型，因为两者都被初始化数组，a 和 b 都被推导为数组类型（number[]）。

* 两个数组类型相加是什么呢？TypeScript 的创造者认为至少不应该是隐式转换后拼接字符串，于是 TypeScript 拒绝编译这段代码：

> error TS2365: Operator '+' cannot be applied to types 'number[]' and 'number[]'.

----

## TypeScript 保护你的代码质量 2

* 例如跟 JavaScript 初学者（后端程序员）反复强调的 == 问题，更直接的办法是建议他去用 TypeScript。

```typescript
var a = 1, b = '1';
a == b // error TS2365: Operator '==' cannot be applied to types 'number' and 'string'.
```

* TypeScript 直接禁止不同类型的比较运算，这对于 === 也适用

```typescript
a === b  // error TS2365: Operator '===' cannot be applied to types 'number' and 'string'.
```

* 有人可能会问为什么连 === 也禁止，那我问都知道 a 和 b 类型不同结果是false了干嘛还去比？

----

## TypeScript 保护你的代码质量 3

* 再例如常见的分号问题。TypeScript 语法上继承了这点，但是 TypeScript 在分号问题上扔有帮助。

```typescript
var a = 1 // 此处无分号
+function() { console.log(a) }; // error TS2365: Operator '+' cannot be applied to types 'number' and '() => void'.

function f() {
  return // 此处被 JavaScript 隐式加入了分号
    { a: 1 }; // error TS7027: Unreachable code detected.
}
```

----

## TypeScript 保护你的代码质量 4

* 再再例如，这是🐟老板的题目：

```js
parseInt(0.0000008) = ?
```

* 这是 TypeScript 给出的答案：

> error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.

* 因为在 TypeScript 中 parseInt 被声明为：

```typescript
function parseInt(s: string, radix?: number): number;
```

* 而 0.0000008 不能传值给 string 类型，编译失败。

----

## TypeScript 保护你的代码质量 5

* TypeScript 可以帮你检查拼写错误。一个简单的例子：

```js
var today = new Date();
today.toLocalString();
```

* 如果不是非常熟悉这个函数，乍一看似乎没有问题。但是 TypeScript 会告诉你：

> error TS2339: Property 'toLocalString' does not exist on type 'Date'.

* 当然如果使用 TypeScript 一般不会遇到这个问题，因为：

----

## TypeScript 给你真正语义化的智能提示

* 说到 JavaScript 智能提示，无论 IDE 多么牛B，无论再怎么上下文推导，还是弱爆了

* 这个不是编辑器的问题。JavaScript 作为动态类型语言，变量的类型只能是运行时确定，编辑器不会运行你的 JS 代码，对于很显而易见的代码可以通过关联上下文猜到变量的类型，但对于这种：

```js
function f(today) {
  console.log(today.???);
}
```

----

## TypeScript 给你真正语义化的智能提示

* today 是什么类型？天知道。因为没有规定它是什么类型，today可以是任意类型，看调用方穿什么值。

* 不知道变量是什么类型，自然也就不知道变量有什么成员。

* 但如果显式指定了 today 的类型，编辑器就能知道 today 含有什么成员，就能准确的列出 today 的成员列表。

----

## TypeScript 给你的文件之间建立关联

* 文件之间的关联在编译期都是已知的，编译器（甚至IDE）知道不同文件所引用的变量是同一个东西，从而实现查找引用、代码重构等高级功能。

----

## TypeScript 与 JS 标准化进程保持同步

* TypeScript 支持所有已经标准化的特性，包括 ES2016 的 `**` 运算符

* TypeScript 支持编译 Decorator，async、await（仅支持编译为 generator）到 ES6 代码

* 在此基础上，TypeScript 还支持enum、类成员变量初始化等特性。

----

## 请给 TypeScript 一个机会 ~~~~

```shell
$ npm install typescript -g
```

> http://typescriptlang.org

* 完
