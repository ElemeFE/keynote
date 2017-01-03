
### The Humble Border-radius
#### 技术运营部 孙卓怡

----

### 为什么叫做
### border-radius

----

### 用来设置边框圆角
### 当使用一个半径时确定一个圆形
### 当使用两个半径时确定一个椭圆
### 这个（椭）圆与边框的交集形成圆角效果

----

![](https://mdn.mozillademos.org/files/3638/border-radius-sh.png)

----

### 当border的值小于border-radius
#### $$r_{inner} = max(0,r_{outer} - border)$$

----

#### 即使元素没有边框，圆角也可以用到background上面,具体效果受background-clip影响

----

### 当border-radius的值大于border box
#### $$r_{top-left}=min(r_{top-left},width*r_{top-left}/(r_{top-left}+r_{top-right}))

----

### 简写属性
#### border-top-left-radius
#### border-top-right-radius
#### border-bottom-left-radius
#### border-bottom-right-radius

----

### Formal syntax
#### [<length>|<percentage>]{1,4}[/[<length>|<percentage>]{1,4}]

----

### border-radius:4px 3px 6px / 2px 4px;

 * border-top-left-radius: 4px 2px;
 * border-top-right-radius: 3px 4px;
 * border-bottom-right-radius: 6px 2px;
 * border-bottom-left-radius:  3px 4px;

----

### box-shadow & outline

----

### border-corner-shape

![](http://media02.hongkiat.com/thumbs/640x410/css3-border-shape.webp)

----

### 重要意义
### 方便拓展出多种图形
![](http://media02.hongkiat.com/css3-border-shape/scoop.jpg)

----

![](http://pic.pimg.tw/dinosaurs/1390188620-4014889388.jpg)
###祝大家元旦快乐

----


