title: CSS3之3D动画
speaker: 廖艳玲
url: https://github.com/ksky521/nodePPT
transition: zoomin
theme:light
files: /js/demo.js,/css/demo.css

[slide]

# CSS3之3D动画
## 演讲者：廖艳玲

[slide]

# 3D笛卡尔坐标系统
<div style="text-align:center">
首先，脑海里要有一个3D坐标体系：
<br>
<br>
<img width="400" height="400" src="/img/donghua14.png" alt="">
</div>


[slide]

# transform

[subslide]
* CSS3中的3D变换主要包括以下几种功能函数：

 * 3D位移：CSS3中的3D位移主要包括`translateZ()`和`translate3d()`两个功能函数
 * 3D旋转：CSS3中的3D旋转主要包括`rotateX()`、`rotateY()`、`rotateZ()`和`rotate3d()`四个功能函数；
 * 3D缩放：CSS3中的3D缩放主要包括`scaleZ()`和`scale3d()`两个功能函数；
 * 3D矩阵：CSS3中3D变形中和2D变形一样也有一个3D矩阵功能函数`matrix3d()`。

<div class="hide">
本质上都是应用的`matrix()`方法实现的（修改`matrix()`方法固定几个值），只是类似于`transform`、`rotate`这种表现形式，我们更容易理解，记忆与上手。

</div>
  ============

<div class="alignCenter">
 <code>translate3d(tx,ty,tz)</code>
 <br>
 <br>
  => 
 <br>
 <br>
 <code>matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,tx,ty,tz,1)</code>
 <br><br>
 <img src="/img/translate.png" alt="">
</div>

 ============

<div class="alignCenter">
 <code>scale3d(sx,sy,sz)</code>
  <br>
  <br>
  => 
 <br>
 <br>
 <code>matrix3d(sx,0,0,0,0,sy,0,0,0,0,sz,0,0,0,0,1)</code>
 <br><br>
 <img src="/img/scale.png" alt="">
</div>

 ============
<div class="alignCenter">
 <code>rotate3d(x,y,z,a)</code>中的第四个参数alpha用于sc和sq中,如下图：
 <br><br>
 <img src="/img/rotate.png" alt="">
 <br><br>
 <img src="/img/rotate1.png" alt="">
</div>


[/subslide]


[slide]
# 3D位移-translate3d

```css
transform: translate3d(x,y,z)
transform: translateZ(z)
```

> z不能取百分比值，否则无效。<br/>z轴越大，元素离用户越近，反之越远！

 <div class="camera-n">
    <div class="stage-n">
      <div class="translate-n translatex-n">X</div>
    </div>
    <div class="stage-n">
      <div class="translate-n translatey-n">Y</div>
    </div>
    <div class="stage-n">
      <div class="translate-n translatez-n">Z</div>
    </div>
    <div class="stage-n">
      <div class="translate-n translate3d-n">3D</div>
    </div>
  </div>


[slide]

# 3D旋转-rotate3d

```css
rotate3d(x,y,z,angle)
```

* `rotate3d(x,y,z,a)`中取值说明：
  * x：主要用来描述元素围绕X轴旋转的矢量值；
  * y：主要用来描述元素围绕Y轴旋转的矢量值；
  * z：主要用来描述元素围绕Z轴旋转的矢量值；
  * a：是一个角度值，主要用来指定元素在3D空间旋转的角度，如果其值为正值，元素顺时针旋转，反之元素逆时针旋转。 

[slide]

上面介绍的三个旋转函数功能等同：

- rotateX(a)函数功能等同于rotate3d(1,0,0,a)
- rotateY(a)函数功能等同于rotate3d(0,1,0,a)
- rotateZ(a)函数功能等同于rotate3d(0,0,1,a)
<br>

 <div class="camera-n">
    <div class="stage-n">
      <div class="rotate-n rotatex-n">X</div>
    </div>
    <div class="stage-n">
      <div class="rotate-n rotatey-n">Y</div>
    </div>
    <div class="stage-n">
      <div class="rotate-n rotatez-n">Z</div>
    </div>
    <div class="stage-n">
      <div class="rotate-n rotate3d-n">3D</div>
    </div>
  </div>

[slide]

# 3D缩放-scale3d

```css
scale3d(x,y,z)
```
> 默认值为１，当值大于１时，元素放大，反之小于１大于0.01时，元素缩小。

<br>

 <div class="camera-n">
    <div class="stage-n">
      <div class="scale-n scalex-n">X</div>
    </div>
    <div class="stage-n">
      <div class="scale-n scaley-n">Y</div>
    </div>
    <div class="stage-n">
      <div class="scale-n scalez-n">Z</div>
    </div>
    <div class="stage-n">
      <div class="scale-n scale3d-n">3D</div>
    </div>
  </div>


[slide]

# transform-style

要利用 CSS3 实现 3D 的效果，最主要的就是借助 `transform-style` 属性。

```css
transform-style: flat|preserve-3d;
transform-style: flat; // 默认，子元素将不保留其位置
transform-style: preserve-3d; 
```


当我们指定一个容器的 `transform-style` 的属性值为 `preserve-3d` 时，容器的后代元素便会具有 3D 效果，也就是当前父容器设置了 `preserve-3d` 值后，它的子元素就可以相对于父元素所在的平面，进行 3D 变形操作。

[slide]

# transform-origin

```css
transform-origin: x y z
```
<div class="transformOrigin">
  <img src="/img/transformPrigin.png" alt="">
  <div>
    元素变形的原点默认为物体的正中心（<code>transform-origin: 50% 50% 0</code>），该数值和后续提及的百分比均默认基于元素自身的宽高算出具体数值：
  </div>
</div>

<div class="transformO">
  <div><code>transform-origin</code>来对元素进行原点位置改变，使元素原点不在元素的中心位置，以达到需要的原点位置。
  <br/></div>
  <img src="/img/transform-2.jpg" alt="">
</div>

[slide]

# perspective

[subslide]
  ===========

  ```css
  perspective: number|none;
  ```
<div class="hide">
  但是在css里它是有数值的，例如perspective: 1000px这个代表什么呢？我们可以这样理解，如果我们直接眼睛靠着物体看，物体就超大占满我们的视线，我们离它距离越来越大，它在变小，立体感也就出来了是不是，其实这个数值构造了一个我们眼睛离屏幕的距离，也就构造了一个虚拟3D假象。

</div>
  > `perspective` 为一个元素设置三维透视的距离，仅作用于元素的后代，而不是其元素本身。

  ===========
<div class="per-box">
  <div class="desc">
    <ul>
      <li><code>perspective</code>取值为none或不设置，就没有真3D空间。此時所有后代元素被压缩在同一个二维平面上，不存在景深的效果。</li>
      <li><code>perspective</code>取值越小，3D效果就越明显，也就是你的眼睛越靠近真3D。</li>
      <li><code>perspective</code>的值无穷大，或值为0时与取值为none效果一样。</li>
    </ul>   
  </div>
  <img src="/img/prs.jpg" alt="">
</div>
[/subslide]

[slide]

## 使用场景

<div class="hide">
在3D变形中，除了perspective属性可以激活一个3D空间之外，在3D变形的函数中的perspective()也可以激活3D空间。他们不同的地方是：perspective用在舞台元素上（变形元素们的共同父元素）；perspective()就是用在当前变形元素上，并且可以与其他的transform函数一起使用。
</div>

```css
.stage {
    perspective: 600px
}
```
写成：

```css
.stage .box {
    transform: perspective(600px);
}
```

<div class="perContainer">
<div class="perspecticeBox">
<div class="red">
  <figure></figure>
  <figure></figure>
  <figure></figure>
  <figure></figure>
  <figure></figure>
  <figure></figure>
  <figure></figure>
  <figure></figure>
  <figure></figure>
</div>
<div class="blue">
  <figure></figure>
  <figure></figure>
  <figure></figure>
  <figure></figure>
  <figure></figure>
  <figure></figure>
  <figure></figure>
  <figure></figure>
  <figure></figure>
</div>
</div>
<div class="desc">
<ul>
<li><code>perspective</code>属性可以取值为none或长度值；</li>
<li><code>perspective()</code>函数取值只能大于0，如果取值为0或比0小的值，将无法激活3D空间;</li>
<li><code>perspective</code>属性用于变形对像父元素；</li>
<li><code>perspective()</code>函数用于变形对像自身，并和transform其他函数一起使用;</li>
</ul>
</div>
</div>
<p class="align-left hide">虽然<code>perspective</code>属性和<code>perspective()</code>函数所起的功能是一样的，但其取值以及以运用的对像有所不同：</p>

[slide]
# 消失点
请问下面哪个div的perspective更大？
  <div class="per-two">
    <div class="per-content">
    <div class="one-per per" id="oneper" onclick="javascript:this.innerHTML=100"></div>
    </div>
    <div class="per-content">
    <div class="two-per per" id="twoper" onclick="javascript:this.innerHTML=150"></div>
    </div>
  </div>

 [slide]

## perspective-origin

[subslide]

  ===========

    ```css
    perspective-origin: x y
    ```
    > 第一个数值是 3D 元素所基于的 X 轴，第二个定义在 y 轴上的位置

<br>
    <p class="align-left">
    <code>perspective-origin</code> 表示 3D 元素透视视角的基点位置，默认的透视视角中心在容器是 <code>perspective</code> 所在的元素，而不是他的后代元素的中点。
    </p>
    <br>
    <p class="align-left">
    默认值：<code>perspectice-origin: 50% 50%</code>
     </p>
   


    <div class="hide">
        我们前面说的这个是眼睛离物体的距离，而这个就是眼睛的视线，我们的视点的不同位置就决定了我们看到的不同景象，默认是中心，为perspectice-origin: 50% 50%,第一个数值是 3D 元素所基于的 X 轴，第二个定义在 y 轴上的位置
    往往我们看一样东西不可能一直都在中心位置看，想换个角度，换个位置一看究竟，这个时候就离不开perspective-origin这个属性，
    </div>

  ===========
<blockquote>
  <p>
  当为元素定义 `perspective-origin` 属性时，其子元素会获得透视效果，而不是元素本身。必须与 `perspective` 属性一同使用，而且只影响 3D 转换元素。
  </p>
  <p style="text-align:right;">---W3school</p>
</blockquote>
<br>
<br>
<br>
<img src="/img/prso.jpg" alt="">

===========
[/subslide]

[slide]

# backface-visibility

```css
backface-visibility: visible | hidden
```

backface-visibility属性决定元素旋转背面是否可见，默认为可见。


<img src="/img/transform-28.jpg" alt="">

[slide]

## perspective，preserve-3d，translate

<p style="text-align:left">3D环境3个要素，摄像机（Camera）、舞台（stage）和物体（Object）本身:</p>

- 摄像机 
  - 为摄像机加上`perspective`
- 舞台
  - 为舞台加上`preserve-3d`，使到一个舞台内为同一3D渲染环境
- 物体
  - 实际`transform`效果

[slide]
# 3D与硬件加速
<div style="display:flex;flex-direction:row">
  <div class="ballcontainer">
    <div class="ball ball1">absolute</div>
  </div>

  <div class="ballcontainer">
    <div class="ball ball2">transform</div>
  </div>
  <br>
</div>

  <button class="toggleAnim">Start</button>

[slide]


 > transform 属性不会触发浏览器的 repaint，而 left 和 top 则会一直触发 repaint。

那么，为什么 transform 没有触发 repaint 呢？简而言之，transform 动画由GPU控制，支持硬件加速，并不需要软件方面的渲染。


注意：

* 如果GPU加载了大量的纹理，那么很容易就会发生内容问题，这一点在移动端浏览器上尤为明显，所以，一定要牢记不要让页面的每个元素都使用硬件加速。

* 使用GPU渲染会影响字体的抗锯齿效果。这是因为GPU和CPU具有不同的渲染机制。即使最终硬件加速停止了，文本还是会在动画期间显示得很模糊。

[slide]
<blockquote style="font-size:15px">
<code>transform</code>的顺序很重要!!!
</blockquote>
<br>
<br>
<div class="hide">
`transform`的顺序很重要，如果先`rotateY`再`translateZ`, 那么`translateZ`是以`rotate`以后的坐标轴进行平移，这样才能达到前后左右平移的效果； 如果先`translateZ`再`rotateY`, 那么所有元素都会先平移，然后在一个位置上进行旋转了！
</div>
<div style="font-size:12px;position:absolute;left:-150px;">
<ul class="show3dInfo">
  <li>前 - translateZ(100px)</li>
  <li>后 - rotateY(180deg) translateZ(100px)</li>
  <li>上 - rotateY(90deg) translateZ(100px)</li>
  <li>下 - rotateY(-90deg) translateZ(100px)</li>
  <li>左 - rotateY(-90deg) translateZ(100px)</li>
  <li>右 - rotateY(90deg) translateZ(100px)</li>
</ul>
</div>

  <div class="camera" id="camera">
    <div class="stage" id="stage">
      <div class="cube up">3</div>
      <div class="cube down">5</div>
      <div class="cube left">2</div>
      <div class="cube right">4</div>
      <div class="cube front">1</div>
      <div class="cube back">6</div>
    </div>
  </div>
  <div class="range-box">
    <div class="range-item">
      <input type="range" value="0" onchange="show3d('rotateY',value)" max="360">
      <span id="rotateY">rotateY(0)</span>
    </div>
    <div class="range-item">
      <input type="range" value="0" onchange="show3d('rotateX',value)" max="360">
      <span id="rotateX">rotateX(0)</span>
    </div>
    <div class="range-item">
      <input type="range" value="0" onchange="show3d('rotate3d',value)" max="360">
      <span id="rotate3d">rotate3d(0)</span>
    </div>
    <div class="range-item">
      <input type="range" value="1000" onchange="show3d('perspective',value)" max="3000"><span id="perspective">perspective(1000)</span>
    </div>
    <div class="range-item">
      <input type="range" value="50" onchange="show3d('perspectiveOrigin',value)">
      <span id="perspectiveOrigin">perspectiveOrigin(50)</span>
    </div>
    <div class="range-item">
      <input type="range" value="0" onchange="show3d('translateZ',value)" min="-100" max="100">
      <span id="translateZ">translateZ(0)</span>
    </div>
    <div class="range-item">
      <input type="range" value="50" onchange="show3d('transformOrigin',value)">
      <span id="transformOrigin">transformOrigin(50)</span>
    </div>
    <div class="range-item">
      <label for="">
        <input type="checkbox" checked="checked" onchange="show3d('backfaceVisibility',checked)">
        <span id="backfaceVisibility">backfaceVisibility</span>
      </label>
    </div>
    <div class="range-item" style="text-align:right;">
      <button onclick="javascript:window.location.reload();">重置</button>
    </div>
  </div>


[slide]

 <div class="container">
    <div class="piece-box">
      <div class="piece-box2">
        <div class="piece piece-1"></div>
        <div class="piece piece-2"></div>
        <div class="piece piece-3"></div>
        <div class="piece piece-4"></div>
        <div class="piece piece-5"></div>
        <div class="piece piece-6"></div>
      </div>
    </div>
  </div>
[slide]

<img src="/img/demo.jpeg" alt="">

[slide]

<div id="animation">
    <div class="ring one">
        <div class="electron"></div>
    </div>
    
    <div class="ring two">
        <div class="electron"></div>
        <div class="electron"></div>
    </div>
    
    <div class="ring three">
        <div class="electron"></div>
        <div class="electron"></div>
        <div class="electron"></div>
    </div>
</div>


<div class="lastContent">
  <h1 class="thankyou">THANK YOU</h1>
</div>