----
# What is pure function

参考文献：

- [Master the JavaScript Interview: What is a Pure Function?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976#.1g8tkeswc)
- [Pure function - Wikipedia](https://en.wikipedia.org/wiki/Pure_function)
- [JavaScript 中的“纯函数”](http://web.jobbole.com/86136/)

----

# Pure

### 中文意思：纯、纯洁、纯粹
### 发音：英  [pjʊə]   美  [pjʊr]

常见用法：

- Pure Javascript OCR for 62 languages. // [tesseract.js](https://github.com/naptha/tesseract.js)
- A pure node.js JavaScript Client implementing the MySql protocol. // [mysql.js](https://github.com/mysqljs/mysql)

----

# 定义

- 传入同样参数，总是返回同样的输出结果
- 不依赖且不改变它作用域之外的变量状态
- 也就是说，纯函数的返回值只由它调用时的参数决定，它的执行不依赖于系统的状态

----

# 举个栗子

```javascript
const values = { a: 1 };

function impureFunction (items) {
  const b = 1;

  items.a = items.a + b;

  return items.a;
}

const c = impureFunction(values); // 2
```

----

# 改造一下

```javascript
const values = { a: 1 };

function pureFunction (items) {
  const b = 1;

  return items.a + b;
}

const c = pureFunction(values); // 2
```

```javascript
const values = { a: 1 };

function pureFunction (a) {
  const b = 1;

  a = a + b;

  return a;
}

const c = pureFunction(values.a); // 2
```

----

# 再来看一种情况

```javascript
const values = { a: 1 };
let b = 1;

function impureFunction (a) {
  return a + b;
}

const c = impureFunction(values.a); // 2

b = 2;

const d = impureFunction(values.a); // 3
```

----

# 改造一下

```javascript
改造一下
const values = { a: 1 };
let b = 1;

function pureFunction (a, c) {
  return a + c;
}

const c = pureFunction(values.a, b); // 2

b = 2;

const d = pureFunction(values.a, b); // 3

// 这次的结果变化是因为传入参数的变化而导致的
```

----

# Why pure function?

- 最主要的好处是没有副作用。纯函数不会修改作用域之外的状态，做到这一点，代码就变得足够简单和清晰：当你调用一个纯函数，你只要关注它的返回值，而不用担心因为别处的问题导致错误。
- 纯函数是健壮的，改变执行次序不会对系统造成影响，因此纯函数的操作可以并行执行。
- 纯函数非常容易进行单元测试，因为不需要考虑上下文环境，只需要考虑输入和输出。
- 最后，尽可能使用纯函数让你的代码保持简单和灵活。

----

>只要应用的某个部分过分依赖另一部分，代码就是耦合过紧，难于维护。典型的问题如：对象直接引用另一对象，并且当修改其中一个的同时需要修改另外一个。紧密耦合的软件难于维护并且需要经常重写。

<p style="text-align: right;">《JavaScript高级程序设计》</p>

----

# Have a try

```javascript
Have a try
// setPrice(item: Object, price: Number) => item: Object
const setPrice = (item, price) => {
  return Object.assign(item, { price });
}

// addToCart(cart: Array, item: Object) => cart: Array
const addToCart = (cart, item) => {
  cart.push(item);
  return cart;
};
```

[JSBin](http://jsbin.com/pejagim/1/edit?html,js)

----

<h3 style="text-align: center;">尽量多使用地纯函数，你就可以更轻松地调试和维护你的代码。</h3>

----

<h3 style="text-align: center;">
以上所有内容<br>
如有雷同，纯属抄袭。<br>
如有错误，当我没说。<br>
Bye~
</h3>
