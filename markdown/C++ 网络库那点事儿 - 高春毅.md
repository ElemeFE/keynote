# C++网络库那点事儿

<p> 大前端-机动架构组-高春毅 </p>

----

## 石器时代的 C/C++
    
C/C++ 标准库中并没有包含网络库，基本上处于石器时代。C 语言一般可以用操作系统提供的非常原始的库进行一些网络访问。对网络感兴趣的 C 语言系小伙伴都会有过自己实现网络库的经历。
    

----
    
## 简介
C/C++ 下的 TCP 网络库已经非常成熟了，其中著名的有libevent，Boost.Asio，muduo 等。以 Reactor 模式为代表的是 libevent，而 Boost.Asio 则是 Proactor 模式。

----

## 跨平台的痛
Linux 与 Windows 操作系统下的最佳实践是不一样的。Windows 通常使用 Proactor 模式， 而 Linux 使用 Reactor 模式的居多。Proactor 模式一般比 Reactor 多做一些事。 
如果想要实现跨平台，那么统一使用 Proactor 是个不错的主意。但是在 Linux 上模拟 Proactor 可能会损失一部分性能。这也是 Boost.Asio 备受争议的原因之一。

----
    
    
 ## Reactor 模式的主循环
 
 ```c
 void loop() {
    while (true) {
        err, events = poller.wait(interval)
        process_timer_task() //处理定时器任务
        if (err) {
            //处理错误
            continue
        } 
        for (auto &event : events) {
            if (event.readable()) {   /*处理读事件*/ }
            if (event.writeable()) {   /*处理写事件*/  }
            if (event.closed()) {       /*处理关闭套接字事件*/ }
            if (event.error()) {      /*处理错误事件*/  }
        }
    }
}
 ```
 
----

 ## one loop per thread
 
 libev的作者说：
    One loop per thread is usually a good model. Doing this is almost never wrong, some times a better-performance model exists, but it is always a good start.

这种方式的好处是：
a：线程数目基本固定，可以在程序启动的时候设置，不会频繁创建与销毁。
b：可以很方便地在线程间调配负载。
c：IO事件发生的线程是固定的，同一个TCP连接不必考虑事件并发。

----

## 充分利用多核

显而易见，设置和核心数一样的线程数能最大程度减小线程切换带来的开销，使得拥有良好性能。开多个线程跑多个 Loop 是个好主意。
在老版本的 Linux 无法多个线程同时监听同一个 TCP 端口。如果想实现 HTTP 服务器，那么端口只能有一个。并发模型会变得很复杂。
在 Linux 3.9 之后，可以用 SO_REUSEPORT 解决。多个线程同时监听， 操作系统自己来均衡分配。只要把单线程模型多开几个线程同时监听一个端口，就能得到性能提升。

----
    
## 非阻塞的connect

   linux 下的 ::connect 函数默认是阻塞的，可以设置套接字为非阻塞模式。设置非阻塞以后，无论连接成功失败，立即返回。由于这时候还处在三次握手当中，需要配合 epoll 一起使用。
```
    struct pollfd pfd;
    pfd.fd = fd;
    pfd.events = POLLOUT | POLLERR;
    int r = poll(&pfd, 1, 0);
    if (r == 1 && pfd.revents == POLLOUT) {
         // 三路握手成功       
    } else {

    }
 ```
 
----

 ## 实现高效率 write
 
调用 write 时，write 会返回成功写出的字节数。只是成功写入缓冲区里，并没有实际上的发送。当缓冲区写满了会返回 EAGAIN 。
LT 模式可以让代码变得简洁。开启 EPOLLOUT 以后，每次可写都会触发写事件，所以发送非常悠然自得。而 ET 只会在可写的时候提示一次，增加了代码编写难度。
    
  
 ## 定时器
 
Linux 下关于时间的函数非常多。
time/ time_t,
ftime/timeb, 
gettimeofday/ timeval, 
clock_gettime/timespec 等等。
    其中 time 精度低，ftime 被废弃，clock_gettime 精度太高开销太大。 gettimeofday 刚刚好

    timerfd_create 把时间变成了文件描述符，在定时器超时的时候文件描述符可读， 和 epoll 配合起来相当愉悦。
    
  ## 定时器2
  
如果不想用 linux 提供的 timerfd_create. 可以自行用红黑树（或者最大堆）实现定时器的就绪队列。在每次 epoll 返回的时候判断头部是否超时，超时则拿出来执行。

----

```
 while(!time_queue_.empty()) {
        Time time_now;
        time_now.now();
        TimeEvent::Pointer event = time_queue_.top();
        if (event->time() > time_now) {
            return;
        }
        time_queue_.pop();
        event->set_execute_times(event->execute_times() + 1);
        event->execute_callback();
    }
  ```  

----

## 忽略SIGPIPE信号
  
对一个对端已经关闭的socket调用两次write, 第二次将会生成SIGPIPE信号, 该信号默认结束进程。

忽略SIGPIPE信号的方法：
```
struct sigaction sa;
sa.sa_handler = SIG_IGN;
sa.sa_flags = 0;
if (sigemptyset(&sa.sa_mask) == -1 ||  sigaction(SIGPIPE, &sa, 0) == -1) {  
    perror("failed to ignore SIGPIPE; sigaction");
    exit(EXIT_FAILURE);
}
```

----

## 文件描述符达到上限
   accept 可能会返回 EMFILE 表示本进程的文件描述符用完了。 于是乎 LT 模式的 epoll 会疯狂提示文件描述符可读，但是没有新的文件描述符可用, 无法处理该事情，造成无限循环， CPU 占用率可达100%。

调成 ET 模式可以解决一半事情，但是会丢连接。 调高文件描述符数目治标不治本。

可以先预留一个空的文件描述符，站着茅坑不拉屎。等真正需要的时候释放它，得到一个空闲的文件描述符位置。

----

## 诊断日志

生产环境无时无刻都在打印各种各样的日志信息。设置 Trace， Debug， Info， Warn ，Error， Fatal 等多种级别。日志一般写在本地文件里。往网络写日志可能会遇到网络故障。不靠谱。有中心节点这种，中心节点挂了就悲剧了。
日志需要实现“滚动”，不可以无限扩充导致硬盘不够。可以用几十个大小合理的文件轮流滚动记录，超过了就覆盖前面的内容，形成一个环。
    

----
    
## 日志的性能

要求：
    1.每秒一万条日志不要有明显的性能损失
    2.不要阻塞主线程

   
  一般来说，网络库的日志（或者独立的日志库）会新开线程以实现“异步”存储。在估算某个网络程序最佳线程数量的时候，应该把他们包含进去，否则会有误差。
  
 
----
 
## 心跳与清理连接

  one loop per thread 的心跳是最准的。我们通常认为只有主循环活着才算真的活着。新启一个线程发心跳，或者使用 TCP 层面的 keepalive 都不太准。主线程如果卡死了， 心跳线程还活着继续当植物人没什么意义。 TCP 层面只能确保机器（网卡）还存活， 不代表应用层是否真的处理了。

  清理连接有个时钟轮算法很有意思， 每秒走一格，有心跳的会被更新到离指针很远的位置。时钟走到的那格指向的所有连接会被踢出。

----
   
 ## HTTP 服务器妙用
 
  许多 C++ 网络库并没有实现功能强大的 HTTP Server，因为语言本身并不擅长这个，也没有人愿意拿 C++ 开发网页后端。
但是很多C++网络库都会带一个 HTTPServer。一般用作服务程序的内置监控接口。

----
   
   
## 使用 HTTP 暴露程序的状态信息
   
  linux 下有许多文件保存了操作系统或者某个进程的许多信息。比如 /proc/cpuinfo，/proc/pid/status 这些。除此之外，我们可能还想知道：目前为止有多少活动连接，接收过多少 TCP 连接， 目前程序占用的内存， 进程打开了多少数据库连接 等等等等。

如果直接能通过 http://ip/cpuinfo 获取某个分布式机器的信息，会给检查机器状态带来极大的方便。

----
## 参考

陈硕 《linux多线程网络编程-使用muduo网络库》

----
