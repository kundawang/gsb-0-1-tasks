loguru 用 logger.complete() 等日志落盘，如果 sink 是我们自己写的（写文件、或者 sink 内部还要跟子进程/别的线程打交道），偶发死锁：complete() 和 sink 的 write 撞在一起就卡住不动。
加上 logger.contextualize() 之后更容易复现，多进程场景下也出过。
请把这几个锁的获取顺序理清楚，别让 complete 和写互相等死。补测试：complete 和 sink write 并发、complete 和 contextualize 并发、以及多进程的场景。
