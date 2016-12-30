title: 前端工程师如何快速入侵ios开发
speaker: 徐亚光
url: https://github.com/ksky521/nodePPT
transition: move
files: /js/demo.js,/css/demo.css,/js/zoom.js
theme: dark
usemathjax: yes

[slide]
# 前端工程师如何快速入侵ios开发
## by：信息平台部-徐亚光

[slide data-transition="kontext"]
## 工欲善其事，必先利其器

----
* 宇宙最强IDE—Xcode {:&.rollIn}


[slide data-transition="circle"]
## feature:

* 一个IDE，支持apple全系列开发 {:&.rollIn}
* 语法格式，自动转换
* playground—学习测试利器
* storyboard，将UI和代码彻底分离


[slide]
# swift

[slide]
## 变量声明
----
{:&.rollIn}
### 哇！一个变量
<div class="columns-2">
    <pre>
    <code class="swift">
    //swift

    var a = 0;
    let b = 1;
    </code></pre>
    <pre>
    <code class="javascript">
    //javascript

    let a = 0;
    const b = 1;
    </code></pre>
</div>

[slide data-transition="newspaper"]
## 闭包
----
{:&.rollIn}
----
<div class="columns-2">
<pre>
<code>
function a(){
    function b(i){
        return i
    }
    return b
}
</code>
</pre>
<pre>
<code>
func a() -> ((Int) -> Int){
    func b(i: Int) -> Int{
        return i
    }
    return b
}
</code>
</pre>
</div>

[slide data-transition="horizontal"]
## nil

[slide data-transition="zoomin"]

## storyboard

### 将MVC分离到底

[slide data-transition="pulse"]

## 各大App中xib文件数量

<img src="/form.png" />

[slide data-transition="earthquake"]
## 谢谢