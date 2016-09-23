title: 9月18日分享
speaker: 杨一新
url: https://github.com/ExinCoda
transition: move

----

## [Dart](dartlang.org)

* 专注于客户端：指的是浏览器、Android、iOS
* 精心设计：精心编写的核心库，自带依赖管理、静态分析工具
* 易于编写：似曾相识的词法、清爽稳定的语法
* 大型项目：Google的最主要收入来源AdWords的下一版本使用Dart编写，另外还有Fiber的Web页面、内部CRM系统

----

## 入口

```dart
// Dart程序的唯一入口是main函数
main() {
  print(‘Hello, World!’);
}

// CLI模式下可以通过main函数参数获取命令行参数
void main(List<String> args) {
  // …
}

```
----

## 变量

```dart
/*
  Dart中变量声明方式有var, const, final，作用域都是块级
  特别的是final，final定义的变量以及成员都是不可变动的。
  比如final定义的数组，不允许push、pop等操作，const定义的则可以
*/
if (true) {
  var a;         // a == null
  a ??= 0;       // a == 0;
  a ??= 1;       // a == 0;
  num b = 100;   // num: int, double
}
// print(a);     // !not defined!

const arr1 = [];
arr1.push(0);    // arr1: [0];
final arr2 = [];
// arr2.push(0); // !error!

```
----

## 类

```dart

// 抽象类
abstract class Abstract {
  void method(); // 抽象方法
}

class Vector extends Abstract with sth implements AnotherClass {
  //        |     inherit    |  mixin |        interface      |
  final int x, y;
  // 快速设置x, y
  const Vector(this.x, this.y);

  /// 操作符重载:+ (a + b)
  //  a + b >> a.+(b)
  Vector operator +(Vector v) {
    return new Vector(x + v.x, y + v.y);
  }
  
  // 调用父类方法
  void extendSuperMethod () {
    super.method();
    // … extra code
  }
  
  //带参数的标签
  @deprecated(args)
  void deprecatedMethod();
}
```
----

## [异步](https://www.dartlang.org/guides/language/language-tour#asynchrony-support)

### [Future](https://www.dartlang.org/guides/libraries/library-tour#future) & [Stream](https://www.dartlang.org/guides/libraries/library-tour#stream)

----

## Future

```dart
//Promise in js, as ’then’ in Future

runUsingThen() {
  one()
  .then(first =>
    two(first, args);
    })
  .then(three)
  .catchError(err => {
  // error handling
  });
}

//**********************************

// ‘await’ in Future

runUsingAwait() async {
  try {
    var first = await one();
    var second = await two(first, args);
    await three(second);
  } catch (e) {
    // error handling
  }
}

```
----

## 等待多个异步

```dart
Future A = get();
Future B = post();
Future C = delete();

Future
    .wait([A, B, C])
    .then((List values) {
      print(‘Done with all.’);
    });

```
----

## Stream

```dart
// 搜索文件，使用then
FileSystemEntity
  .isDirectory(searchPath)
  .then((isDir) {
    if (isDir) {
      final startingDir = new Directory(searchPath);
      startingDir
        .list()
        .listen((entity) {
          if (entity is File) searchFile(entity, searchTerms);
        });
    } else {
      searchFile(new File(searchPath), searchTerms);
    }
  });

// ***************************************************

// 使用await，更简短直观

if (await FileSystemEntity.isDirectory(searchPath)) {
  final startingDir = new Directory(searchPath);
  await for (var entity in startingDir.list()) {
    if (entity is File) searchFile(entity, searchTerms);
  }
} else {
  searchFile(new File(searchPath), searchTerms);
}

```

----

## 分支

[Flutter](https://flutter.io/): Android & iOS

[WebDev](https://webdev.dartlang.org/): Web

----

## 工具

[Dartium](https://webdev.dartlang.org/tools/dartium): 直接支持Dart的浏览器

[WebStorm](https://webdev.dartlang.org/tools/webstorm): 已经良好支持Dart

[DartPad](https://dartpad.dartlang.org): Dart在线编辑器

----

## Angular 2


[Angular 2 + Dart](https://angular.io/dart)

----

## Thanks
