
## CSS3 Transform Matrix

----

## Matrix

* 本意是母体，基础，孕育生命的地方

* 数学中，表示矩形阵列
  ![matrix](http://odqtkmbuu.bkt.clouddn.com/1.png)

----

## Transform Properties

* translate
  - `translate(10px 10px)`
* scale
  - `scale(2, 2)`
* rotate
  - `rotate(30deg)`
* skew
  - `skew(60deg)`
* matrix
  - `matrix(1, 0, 0, 1, 10, 10)`

----

## Transform Origin

* length
  - `transform-origin: 50px 70px`
* percentage
  - `transform-origin: 10% 10%`
* direction
  - `transform-origin: top left`
* default
  - `transform-origin: 50% 50%`
  ![transform origin](http://odqtkmbuu.bkt.clouddn.com/2.png)

----

## Transform Style

`transform-style: flat | preserve-3d`

----

## Transform Matrix

* transform: matrix(a, b, c, d, e, f)
  ![transform matrix](http://odqtkmbuu.bkt.clouddn.com/3.png)
* 转换公式
  ![transform formula](http://odqtkmbuu.bkt.clouddn.com/4.png)
* 计算公式
  - `x为 transform-origin 第一个参数，y为 transform-origin 第二个参数`
  - `x’ = ax + cy + e，x'，为变换元素后的水平位置`
  - `y’ = bx + dy + f，y'，为变换元素后的垂直位置`

----

## Translate => Matrix

* transform: translate(10px, 10px)
  - `matrix(1, 0, 0, 1, 10, 10)`

* 计算
  - `x’ = 1*x + 0*y + 10 = x + 10`
  - `y’ = 0*x + 1*y + 10 = y + 10`

* 只跟 e, f 的值有关

----

## Scale => Matrix

* transform: scale(2, 2)
  - `matrix(sx, 0, 0, sy, 0, 0)`

* 计算
  - `x’ = s*x + 0*y + 0 = sx`
  - `y’ = 0*x + s*y + 0 = sy`

* 只跟 a, d 的值有关，其实是把元素的宽、高增大 or 减少相应的倍数

----

## Rotate => Matrix

* transform: rotate(30deg)
  - `matrix(cosθ, sinθ, -sinθ, cosθ, 0, 0)`
* 计算
  - `x’ = x*cosθ - y*sinθ + 0 = x*cosθ - y*sinθ`
  - `y’ = x*sinθ + y*cosθ + 0 = x*sinθ + y*cosθ`

----

## Skew => Matrix

* transform: skew(60deg)
  - `matrix(1, tan(θy), tan(θx), 1, 0, 0)`
  - *θy：相对y轴倾斜的角度，θx：相对x轴倾斜的角度*

* 计算
  - `x’ = x + y*tan(θx) + 0 = x + y*tan(θx)`
  - `y’ = x*tan(θy) + y + 0 = x*tan(θy) + y`

----

## Extensions

* 3D transform
  - `matrix3d(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1)`
  ![4x4 matrix](http://odqtkmbuu.bkt.clouddn.com/5.png)
* perspective
  - `perspective: 1000px;`
  - *定义3D元素距视图的距离，单位为px，其子元素获得透视效果*
* perspective-origin
  - *和 transform origin 类似*
* backface-visibility
  - `backfire-visibility: visible | hidden;`
  - *定义当元素不面向屏幕时是否可见*

----

## Reference

* [https://www.w3.org/TR/css-transforms-1](https://www.w3.org/TR/css-transforms-1)
* [https://dev.opera.com/articles/understanding-the-css-transforms-matrix](https://dev.opera.com/articles/understanding-the-css-transforms-matrix)
