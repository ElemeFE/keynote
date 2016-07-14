## SameSite——防御 CSRF & XSSI 新方法
`SameSite-cookies` 是 Google 开发的用于防御 CSRF 和 XSSI（Cross Site Script Inclusion，跨域脚本包含）的新安全机制，只需在 `Set-Cookie` 中加入一个新的字段属性，浏览器会根据设置的安全级别进行对应的安全 cookie 发送拦截，而目前在 Chrome-dev（51.0.2704.4）中可用。

----

## XSSI——Cross Site Script Inclusion
`XSSI` 属于 `XSS` 攻击的一种攻击方式，一般来说，浏览器允许网页加载其他域的脚本或图片等，假设我们在安全的网站上 a.com 包含一个脚本文件 `getData.js` 用于读取用户的私人信息，第一次用户需要在 a.com 登录，然后就可以根据验证返回用户私人信息并设置 cookie 以便下次使用，此时我们只做一个恶意网站 c.com，并包含了 `getData.js` 这个脚本文件，当用户点击 c.com 时，他的信息就泄露了。

----

## 解决方案？

* 可以用 `token` 令牌等来解决

* 使用 `SameSite-Cookies`，通过验证是否是从 a.com 访问的 getData.js 的方式来阻止 cookie 的发送。

----

## SameSite 使用方式
需要在 `Set-Cookie` 中加入 `SameSite` 关键字，例如
> Set-Cookie: key=value; HttpOnly; SameSite=Strict

----

## SameSite 的两个属性
Lax and Strict

----

## no_restriction
当没有添加 SameSite 关键字的时候，默认是空的

----

## Lax
* 允许发送安全 HTTP 方法（`GET`, `HEAD`, `OPTIONS`, `TRACE`）第三方链接的 cookies

* 必须是 TOP-LEVEL 即可引起地址栏变化的跳转方式，例如 `<a>`, `<link rel="prerender">`, `GET 方式的 form 表单`，此外，`XMLHttpRequest`, `<img>` 等方式进行 GET 方式的访问将不会发送 cookies

* 但是禁止发送不安全 HTTP 方法（`POST`, `PUT`, `DELETE`）第三方链接的cookies

----

## Strict
禁止发送所有第三方链接的 cookies，默认情况下，如果添加了 SameSite 关键字，但是没有指定 value（Lax or Stict），那么默认为 Strict

----

## 添加 `SameSite=Strict` 并从其他网站跳转
![outerLink](http://7xoehm.com1.z0.glb.clouddn.com/samesite-on.png)

----

## 添加 `SameSite=Strict` 并从地址栏输入网址访问
![innerLink](http://7xoehm.com1.z0.glb.clouddn.com/samesite-off.png)

----

## 在 Chrome DevTools 中查看 cookie 字段保护级别
![devTools](http://7xoehm.com1.z0.glb.clouddn.com/samesite-devtools.png)

----

## 参考资料：
* http://www.sjoerdlangkemper.nl/2016/04/14/preventing-csrf-with-samesite-cookie-attribute/
* https://tools.ietf.org/html/draft-west-first-party-cookies-07
* https://chloe.re/2016/04/13/goodbye-csrf-samesite-to-the-rescue/

----

## Thanks
