# Vue2服务端渲染
> NODE组 - [夏浩茗](https://github.com/smallpath)

----

# 服务端渲染(SSR)简介

- 技术基础：
  - 虚拟dom
- 目的：
  - SEO
  - 减少首屏加载时间

----

# Vue2与Vue1的区别

- 虚拟dom
- 单向数据流
  - vuex已加入全家桶套餐
  - vue1.0的sync和once这种双向绑定已经在2.0中被取消.
- API变更
  - 大部分是API改名
- API去除
  - 例如，指令中不再支持模版以及filter

----
# SSR流程图

![](https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png)

----

# 1.拆分入口文件
将其拆分为`client-entry`和`server-entry`

### `client-entry.js`
客户端入口文件。  
执行初始化全局状态，以及挂载浏览器dom的操作

----

### `server-entry.js`
服务端入口文件。
要求导出Promise:
```
import { app, router, store } from './main'

const isDev = process.env.NODE_ENV !== 'production'

const s = isDev && Date.now()

export default context => {

  router.push(context.url)

  return Promise.all(router.getMatchedComponents().map(function (component, index) {
    if (component.preFetch) {
      return component.preFetch(store, context)
    }
  })).then((arr) => {
    console.log(`data pre-fetch: ${Date.now() - s}ms`)

    context.initialState = store.state
    return app
  })
}
```

*`router.getMatchedComponents()`的匹配问题*

----

# 2.修改webpack配置
开发与构建过程中，需要如下四种配置：
- 开发时打包：
  - 打包客户端
  - 打包服务端
- 构建时打包：
  - 打包客户端
  - 打包服务端

从vue-cli构建而来的项目需要修改所有的webpack配置

webpack1.x建议配置：[链接](https://github.com/Smallpath/Blog/tree/32465f04ffe90623a83a5c8bad69f5ecedef6328/client/front/build)  
webpack2.x建议配置：[链接](https://github.com/Smallpath/Blog/tree/develop/client/front/build)  

----

## webpack2

支持ES6 Module。只修改`.babelrc`，就可以进行:
### tree-shaking
- 目的
  - 去除未使用代码，减小客户端打包文件大小
- 技术基础
  - 静态分析 AST
  - ES6 module的严格设计
    - 包名不允许变量，只能是字符串常量
    - 只允许在模块顶层export，不能在function或if中
    - 模块初始化时所有的import必须已经导入完成
    - 禁止修改import进来的变量，类似const声明

----

### 修改npm scripts
```
    "dev": "node server",
    "lint": "eslint --ext .js,.vue src test/unit/specs test/e2e/specs",
    "build:c": "webpack --config build/webpack.client.config.js",
    "build:s": "webpack --config build/webpack.server.config.js",
    "build": "npm run build:c && npm run build:s",
    "start": "npm run build && node server"
```

----

# 3.添加服务端dev-server
- 推荐服务端配置：[vue-hacker-news2.0](https://github.com/vuejs/vue-hackernews-2.0/blob/master/build/setup-dev-server.js)
- 如果为了避免跨域而使用了本地webpack代理，不要忘记在dev-server这里也加上webpack代理中间件  

```
app.use(require('webpack-hot-middleware')(clientCompiler))

Object.keys(proxyTable).forEach(function(context) {
  var options = proxyTable[context]
  app.use(proxyMiddleware(context, options))
})
```

- 推荐使用koa2等Node服务端框架，以防未来有异步流程控制的需求。

*客户端打包无法热重载*

----

# 4.添加SSR的服务端
- express与koa都非常轻量，一个文件足以完成vue2.0的服务端渲染。  
- 可以参考vue ssr官方演示项目的服务端[实现](https://github.com/vuejs/vue-hackernews-2.0/blob/master/server.js)
- SSR服务端适合定时任务，例如rss，sitemap等
- 再安装服务端的依赖
```
npm install --save vue-server-renderer lru-cache serialize-javascript
```

*与组件按需加载冲突*

----

# 5.修改源码，添加接口
```
function fetchPage (store, { path: pathName, params, query }) {
  return store.dispatch('FETCH_PAGE', { pathName }})
}

export default {
  data () {
    return {}
  },
  computed: {
    page () {
      return this.$store.state.page
    }
  },
  preFetch: fetchPage,
  beforeMount () {
    if (this.$root._isMounted) {
      fetchPage(this.$store, this.$store.state.route)
    }
  },
}
```
另外，需保证组件能够挂载到与路由对应的router-view中

----

# 6.`npm run build`

- 如果打包出错，而且报错信息中出现vue-resource，那么是时候扔掉它了

> vue-resource并不是vue官方出的

- window，location等纯前端的变量随处可见的vue-resource，根本不支持vue2的ssr
- 有社区贡献的PR却[不合并](https://github.com/yyx990803/vue-resource/pull/453)

----

### 去除vue-resource

vue-resource还有一个功能： URI TEMPLATE
```
                        ?conditions={"type":0}
                          ||
                          ||
                          \/
                        ?conditions["type"]=0
```
URI TEMPLATE默认开启，无法关闭

推荐服务端与客户端同构的axios或superagent

----

# 7.实现组件级缓存
```
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  serverCacheKey: props => {
    return `${props.article._id}::${props.article.updatedAt}`
  }
}
```

- 适合列表单元： id + 更新时间
- 官方demo未缓存前3000ms首屏，缓存后100ms首屏

*性能是否有优化的余地*  
已经有提升20%的PR在前天被合并了[via](https://github.com/vuejs/vue/pull/4007)

----

# 8.SSR效果

- [x] SEO 
  - 谷歌引擎第二天就已经完成了收录
- [x] 减少首屏渲染时间

无图无真相

----

SSR前： 首屏强刷976ms  
![before](https://oebegwmfv.qnssl.com/static/upload/201611/vue2.0.png)

----

SSR后： 首屏强刷163ms  
![after](https://oebegwmfv.qnssl.com/static/upload/201611/ssr.png)

----

# Q&A

----
<h1>Thanks</h1>
<h5><font color="skyblue">Node组 夏浩茗</font></h5><br>

- 参考项目
  - [vue-hacker-news2.0](https://github.com/vuejs/vue-hackernews-2.0) 
  - [Blog](https://github.com/smallpath/blog)

- E-Mail：haoming.xia@ele.me
- Github: smallpath
