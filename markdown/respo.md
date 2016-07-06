
## Respo: a React-like DOM library

----

## 关于

ChenYong(题叶)

React 开发. CoffeeScript, ClojureScript.

<https://github.com/mvc-works/respo>

----

## React 与函数式编程

* `pure render` 纯函数
* DOM DSL, 一切皆是表达式
* immutable data, shallow equal

----

## React 的问题

* 实际上代码中 mutable 数据是混用的毫无限制
* JSX 繁琐, 且表达能力存在一些问题
* `this` 相关的奇怪行为
* 基于 class, 面向对象风格

当然 React 有自己的理由, 公司因素, 社区发展考虑, 性能考虑, 底层 API 等

----

## Clojure

* Lisp 方言 -- 强大的 DSL
* 不可变数据和 Atom -- 限制 mutable 数据使用
* shallow equal -- 性能优化相关
* 函数式语言 -- 没有 `this` 的坑
* 静态检查 -- 类比 ESlint

深思熟虑的语言

跨平台, Clojure, JavaScript, Mono...

ClojureScript, 编译到 JavaScript 运行, 项目活跃

----

## Component

    (ns respo.component.zero
      (:require [respo.alias :refer [create-comp div span]]))

    (defn render []
      (fn [state mutate]
        (div {} (span {:attrs {:inner-text "0"}}))))

    (def component-zero (create-comp :zero render))

More in repo...

----

## DOM DSL

    (input
      {:style style-input,
       :attrs {:placeholder "Text", :value (:draft state)},
       :event
         {:focus (on-focus props state),
          :input (on-text-change props state mutate)}})

----

## style DSL

    (def style-toolbar
     {:width "300px",
      :padding "4px 0",
      :justify-content "center",
      :display "flex",
      :flex-direction "row"})

----

## listener DSL

    (defn on-text-change [props state mutate]
      (fn [simple-event dispatch]
        (mutate {:draft (:value simple-event)})))

----

## Child Component

    (div
      {:style style-list, :attrs {:class-name "task-list"}}
      (map
        (fn [task]
          [(:id task) (task-component {:task task})])
        tasks))

----

## Diff an Element

* diff styles
* diff attributes
* diff events
* diff children

简化版的算法...

转化为 ordered-map

----

## Diff sorted-map

    {:a 1      :c 3 :d 5}
    {:a 1 :b 3 :c 4}

从头部开始判断:

* add :b
* set :c 4
* rm  :d

----

## Children 转化为 sorted-map

    div
      span
      input
      img

转化为

    div
      0 span
      1 input
      2 img

----

## list of items

    { :id1 component
    , :id2 component2
    , :id3 component3
    }

为了更方便做 Patch, 限制元素顺序, 因而只能用 CSS 控制顺序.

Diff/Patch 过程元素采用的是数组位置, 所以需要额外处理, 不展开.

灵活性不足, 但减少了节点 move 行为的探测.

----

## patch

* style -- 直接操作
* attributes -- 特殊处理 innerText
* events -- 特殊处理 bubble 和 not bubble
* children -- 位置问题

----

## 性能

组件级别判断 `old-DOM` 的 Component 是否可以复用.

* `states` -- 判断引用
* `props` -- 判断每个参数的引用
* `render` -- 判断引用, 热替换将函数更改

----

## 事件处理

通过节点上的 `data-coord` 属性查找, 最终映射到 Component 代码.

----

## Store

直接用 Clojure 的 Atom 解决

    (add-watch global-store :rerender render-app)
    (add-watch global-states :rerender render-app)

----

## 区别

问题:

* 性能
* 没有 hooks, 不适合处理状态
* 小众语言, 玩具项目

优点:

* FP 代码更灵活
* 数据流更加清晰
* 热替换过程 states 自动保存

----

## 概括

整体架构:

    f(render-tree, store, states) = new-DOM

加上性能优化:

    f(render-tree, store, states, old-DOM) = new-DOM

Model:

    store-and-states = (atom initial)
    dispatch-or-mutate(old-store-and-states) = new-store-and-states

----

如果感兴趣:

<https://github.com/mvc-works/respo>
