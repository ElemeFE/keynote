### 演示方法
凡是文件带有(.ppt)的后缀 都支持 nodeppt 演示

#### nodeppt安装方法

```
npm install -g nodeppt
```

#### shell使用

##### 启动

```
# 获取帮助
nodeppt start -h
# 绑定端口
nodeppt start -p <port>
```

```
nodeppt start -p 8090 -d path/for/ppts
# 绑定host，默认绑定0.0.0.0
nodeppt start -p 8080 -d path/for/ppts -H 127.0.0.1
```
