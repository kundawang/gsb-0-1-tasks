pymongo 在 gevent 模式下会死锁：一个 greenlet 在还连接的过程中被 kill 掉，checkin 那条路径的计数簿记没补回来，池子里的可用连接就少一个、而且卡在里面出不来。我们反复借还 + 随机 kill，跑一会儿整个进程就不动了。同一块还有个小问题：借出失败的时候计数会被多扣一次。

请把 synchronous 和 asynchronous 两套 pool 都修好。补测试：借出出错时计数只能扣一次、acquire 过程中被 kill 的簿记要对、以及反复 kill 的压测不能死锁。
