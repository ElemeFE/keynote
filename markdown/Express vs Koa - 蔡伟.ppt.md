title: 4月14日分享
speaker: David Cai
url: https://github.com/DavidCai1993
transition: move
theme: moon

----

## Express & Koa

```js
'use strict'
const express = require('express')
const Koa = require('koa')

let app

IAmVeryVeryHandsome ? app = new Koa() : app = express()
```

----

## 从异步流程控制的发展说起

### Callback & Events

```js
'use strict'
const fs = require('fs')

fs.readFile('/etc/passwd', 'utf8', function (error, data) {
  if (error) return console.error(error)
  // ...
})

fs.createReadStream('/etc/passwd')
.on('data', function (data) {
  // ...
})
.on('error', console.error)
```

----

## 从异步流程控制的发展说起

### Promise

```js
'use strict'
const fs = require('mz/fs')

fs.exists(__filename)
.then(function (exists) {
  // ...
})
.catch(console.error)
```

----

## 从异步流程控制的发展说起

### Thunk 函数

```js
'use strict'
const fs = require('fs')

function exists (filePath) {
  return function (callback) {
    fs.exists(filePath, function (error, exists) {
      if (error) return callback(error)
      callback(null, exists)
    })
  }
}

exists(__filename)(function (error, exists) {
  if (error) return console.error(error)
  // ...
})
```

----

## 从异步流程控制的发展说起

### 基于 generator 函数的 co

```js
'use strict'
const fs = require('mz/fs')
const co = require('co')

co(function * () {
  let exists = yield fs.exists(__filename)
  // ...
}).catch(console.error)
```

----

## 从异步流程控制的发展说起

### co 的标准化，async / await

```js
'use strict'
const fs = require('mz/fs')

(async function () {
  let exists = await fs.exists(__filename)
  // ...
})().catch(console.error)
```

----

## 两个框架中异步流程控制的核心理念不同

### Express: error first callback

### Koa: async / await

```js
// express
app.use(function (req, res, next) {
  someAsyncFunction(function (error) {
    if (error) return next(error)
    // ...
    next()
  })
})

// koa
app.use(async function (ctx, next) {
  await somePromise
  await next()
})
```

----

## 首当其冲会导致的结果

### 错误的捕获机制不同，基于 async / await 的捕获，同步异步一手抓

```js
// express
app.use(function (req, res, next) {
  someAsyncFunction(function (error) {
    if (error) return next(error)
    throw new Error('wtf?') // boom!
    // ...
    next()
  })
})

// koa
app.use(async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    console.log('Haha, I got u: %s', err)
    // throw err
  }
})

app.use(async function (ctx, next) {
  await somePromise
  throw new Error('wtf?') // will be caught
  await next()
})
```

----

## 又一个导致的结果

### 中间件的模型不同

#### express: 顺序传递
```js
// expressjs/morgan

// ...
return function logger (req, res, next) {
  // request data
  req._startAt = undefined
  req._startTime = undefined
  req._remoteAddress = getip(req)

  // response data
  res._startAt = undefined
  res._startTime = undefined
  // ...
}
```
----

#### Koa: 洋葱模型

```js
app.use(async function (ctx, next) {
  let start = Date.now()
  await next()
  let ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

app.use(async function (ctx) {
  ctx.body = 'hello world'
})
```

----

## 总结一下

### 使用 koa 的话

更舒爽的异步流程控制体验。

更完备的错误捕获机制。

更强大的中间件传递模型。

（koa 生态哪里找？ https://github.com/koajs/koa/wiki）

----

## 一些黑科技

----

## express 也用上 async / await

```js
app.use(wrap(async function (req, res, next) {
  await somePromise
  throw new Error('wtf?') // will be passed through to the end
  next()
}))

app.use(function (err, req, res, next) {
  console.error(err)
})

function wrap (fn, ctx) {
  ctx = ctx || null

  (function (req, res, next) {
    fn.call(ctx, req, res, next).catch(next)
  })()
}
```

----

## 既然 koa 的官方 README 上已经都是 ES2017 的 async / await 函数了

### 那就让 ES2017 的特性来的更猛烈一下吧

```js
// api/alarm.js

'use strict'
const {router, required} = require('koa-decorators')
const db = require('../models')

module.exports = class AlarmController {
  @router({method: 'get', path: '/v1/alarm/:_id'})
  async getById(ctx) {
    ctx.body = await db.alarm.findById(ctx.params._id)
  }

  @router({method: 'post', path: '/v1/alarm'})
  @required({body: ['name', 'url', 'rules']})
  async create(ctx) {
    ctx.body = await db.alarm.create(ctx.request.body)
  }

  @router({method: 'put', path: '/v1/alarm/:_id'})
  async update(ctx) {
    ctx.body = await db.alarm.findByIdAndUpdate(ctx.params._id, ctx.request.body, {new: true})
  }
  // ...
}
```

----

https://github.com/DavidCai1993

https://github.com/DavidCai1993/koa-decorators

----

## Thanks
