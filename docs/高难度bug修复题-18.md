# 高难度 Bug 修复题（18 道）

难度定位：并发 / 取消语义 / 生命周期 / 状态机 / 缓存失效这类，改动分布在多个文件，症状和根因之间隔得比较远。

| 题号 | 上游仓库 | 分支 | 一句话 |
| --- | --- | --- | --- |
| T171 | agronholm/anyio | `t171/base` | Fixed TaskGroup and CancelScope exit issues on asyncio (#774) |
| T172 | agronholm/anyio | `t172/base` | Fixed memory object stream sometimes dropping sent items (#735) |
| T173 | agronholm/anyio | `t173/base` | Fixed `run_process()` and `open_process().__aexit__` leaking an orphan process when cancelled (#672) |
| T174 | agronholm/anyio | `t174/base` | Fixed cyclic garbage that keeps traceback frames alive in task group exceptions (#806) |
| T175 | agronholm/anyio | `t175/base` | Fixed start inconsistencies between trio and asyncio (#1198) |
| T176 | tox-dev/filelock | `t176/base` | 🐛 fix(async): make cancellation atomic (#652) |
| T177 | tox-dev/filelock | `t177/base` | 🔒 fix(soft): harden stale-lock breaking and self-heal malformed locks (#551) |
| T178 | tox-dev/filelock | `t178/base` | 🐛 fix(api): detect same-thread self-deadlock (#481) |
| T179 | aio-libs/aiohttp | `t179/base` | Fix WebSocket compressed sends to be cancellation safe (#11726) |
| T180 | aio-libs/aiohttp | `t180/base` | Fix AsyncResolver to match ThreadedResolver behavior (#8270) (#8295) |
| T181 | aio-libs/aiohttp | `t181/base` | Fix memory consumption on empty/small messages (#13393) |
| T182 | celery/celery | `t182/base` | [Bug] chord hangs when a member is revoked through app.control.revoke (#10527) |
| T183 | celery/celery | `t183/base` | Fix: Broker heartbeats not sent during graceful shutdown (#9986) |
| T184 | celery/celery | `t184/base` | fix(base): add timeout to broker pool acquisition to prevent indefinite blocking (#10174) |
| T185 | pydantic/pydantic | `t185/base` | Use WeakValueDictionary to fix generic memory leak (#6681) |
| T186 | pytest-dev/pytest | `t186/base` | Fix teardown error reporting when `--maxfail=1` (#11721) |
| T187 | pytest-dev/pytest | `t187/base` | Fix: assertrepr_compare respects dict insertion order (#14050) |
| T188 | Delgan/loguru | `t188/base` | Fix possible deadlock with "complete()" and async sink (#906) |

## T171 — agronholm/anyio

- 仓库地址：https://github.com/agronholm/anyio
- 初始环境：`t171/base`（上游 agronholm/anyio @ 7f35ce79e3eb）
- 上游修复提交：01a37c603d55（2024-09-21）
- 改动文件：.github/workflows/test.yml, pyproject.toml, src/anyio/_backends/_asyncio.py, src/anyio/_backends/_trio.py, src/anyio/_core/_fileio.py, src/anyio/_core/_signals.py, src/anyio/_core/_streams.py, src/anyio/_core/_subprocesses.py

```text
我们内部库用的是 anyio，测试同时跑 asyncio 和 trio 两个后端。最近发现 asyncio 后端上取消相关的行为跟 trio 对不上，具体这几个：
反复进出嵌套的 cancel scope 之后取消计数就对不上了，后面再判断取消状态得到的结果是错的；
子任务失败引发的取消处理完之后，外层的取消状态没恢复干净；
空的 TaskGroup 在 asyncio 上不产生检查点（trio 上会老老实实让出一次）；
最难受的是有个取消异常从它所属的 scope 外面冒出来了——我们只是想取消一个子任务，结果把调用方的 await 整个打断，日志里看像我们自己崩了。

请把 asyncio 后端这几处的语义对齐成和 trio 一致，两个后端都要能跑通。补测试把嵌套 scope、空 task group、子任务失败之后 uncancel 这几条钉住。对外的 API 不要动。
```

## T172 — agronholm/anyio

- 仓库地址：https://github.com/agronholm/anyio
- 初始环境：`t172/base`（上游 agronholm/anyio @ 9f5f14b3eb57）
- 上游修复提交：e7f750b96f54（2024-05-27）
- 改动文件：src/anyio/_backends/_asyncio.py, src/anyio/_backends/_trio.py, src/anyio/_core/_testing.py, src/anyio/abc/_eventloop.py, src/anyio/streams/memory.py

```text
anyio 的 memory object stream 我们拿来当进程内的消息队列，压测的时候偶发丢消息：发送方 send() 正常返回，接收方那边却什么都没收到，也没报错，查了好久才定位到是接收方被取消的那个时刻。

按理儿讲，往一个已经有取消在挂着的接收方发消息，这条消息就不该算送达——要么发不进去，要么老老实实等。现在它是"发出去了但没人收"，消息就凭空没了。

请把这段修好。补两个用例：接收方在缓冲读取的过程中被取消、以及往已经被原生取消的接收方发消息。
```

## T173 — agronholm/anyio

- 仓库地址：https://github.com/agronholm/anyio
- 初始环境：`t173/base`（上游 agronholm/anyio @ 3f14df89fe4c）
- 上游修复提交：1e60219d95bb（2024-01-25）
- 改动文件：src/anyio/_backends/_asyncio.py, src/anyio/_backends/_trio.py, src/anyio/_core/_subprocesses.py

```text
anyio 里用 `async with await open_process(...)` 管子进程（run_process 同理），如果退出 with 块的过程中这个任务被取消了，子进程不会被收掉，直接变成孤儿进程挂在系统里继续跑，标准输入输出那几个流也没关。我们是长跑的服务，这么漏几次机器上就一堆僵尸进程。

请让取消的时候也能把进程和它的流收干净。补两个测试：退出时被取消不能留下孤儿进程、退出时被取消要关掉标准流。其它平台的行为别动，公开接口也别改。
```

## T174 — agronholm/anyio

- 仓库地址：https://github.com/agronholm/anyio
- 初始环境：`t174/base`（上游 agronholm/anyio @ 0614b4fcb0b1）
- 上游修复提交：163f10cbde2a（2024-10-13）
- 改动文件：src/anyio/_backends/_asyncio.py, src/anyio/_backends/_trio.py

```text
anyio 的 TaskGroup 抛异常的时候会形成引用环：异常对象和回溯帧互相引用，GC 收不掉，服务跑久了内存一直往上涨。用 task group 包一堆会抛异常的子任务、反复跑，能明显看到对象下不来。

请把这块的引用环断掉（回溯里该留的信息还是要留）。补几个用 weakref / gc 断言的测试：直接抛出的、嵌套 ExceptionGroup、跟父任务相关的、以及取消相关的路径都要覆盖。
```

## T175 — agronholm/anyio

- 仓库地址：https://github.com/agronholm/anyio
- 初始环境：`t175/base`（上游 agronholm/anyio @ b05fe6d160a6）
- 上游修复提交：9727dc504681（2026-08-30）
- 改动文件：src/anyio/_backends/_asyncio.py, src/anyio/_core/_tasks.py

```text
anyio 的 TaskGroup.start() 在 asyncio 和 trio 两个后端上行为不一致：
trio 那边 started(value) 传的值会正常交回到 start() 的调用方，取消要到下一次检查点才生效；
asyncio 这边如果 start() 还在等的时候外层被取消了，CancelledError 会从 start() 里直接被扔给调用方，值也没交回去。

我们要两个后端语义一样，请按 trio 的行为把 asyncio 这边对齐（started 传的值必须能交回到调用方手上），补一个对应的测试。公开 API 保持不变。
```

## T176 — tox-dev/filelock

- 仓库地址：https://github.com/tox-dev/filelock
- 初始环境：`t176/base`（上游 tox-dev/filelock @ 6633781d21c7）
- 上游修复提交：3b1511281a77（2026-07-14）
- 改动文件：pyproject.toml, src/filelock/_api.py, src/filelock/_async.py, src/filelock/_async_read_write.py, src/filelock/_read_write.py, src/filelock/_soft.py, src/filelock/_soft_rw/_async.py, src/filelock/_soft_rw/_sync.py

```text
filelock 的异步那套（asyncio 模式的 FileLock，还有共享/读写那几类）在取消上有洞。
底层的拿锁操作是丢到执行器里跑的，await 的调用方被取消之后执行器里的操作还在继续，最后结果就是：取消掉的那个调用把已经拿到的锁给放了，或者锁停在一个没人持有的状态，后面进来的调用方看到的状态就是乱的。我们并发 acquire/release 再随机插取消，能稳定复现"锁被释放了，但没有任何一方认为自己是持有者"。

请让取消变成原子的：调用方取消了，要么这次获取整个回滚干净、要么就正常持有，绝不能把别人刚拿到的描述符一起释放掉；同一把锁上的获取/释放过渡要串行化。
补测试覆盖：执行器还没起来就被取消、取消之后 rollback 又失败、重复取消、取消过程中别人在排队释放这些情况。对外接口保持不变，同步那套行为也别改坏。
```

## T177 — tox-dev/filelock

- 仓库地址：https://github.com/tox-dev/filelock
- 初始环境：`t177/base`（上游 tox-dev/filelock @ 150ba66c0a69）
- 上游修复提交：d244c6dc3aed（2026-06-05）
- 改动文件：src/filelock/_api.py, src/filelock/_async_read_write.py, src/filelock/_read_write.py, src/filelock/_soft.py, src/filelock/_soft_rw/_sync.py, src/filelock/_util.py

```text
filelock 的 soft 锁靠 mtime 判断过期，这条路径能被人绕过：把被持有的锁文件换成一个指向很久以前文件的软链，等锁的人按软链目标的 mtime 一看"这锁过期了"，就把还活着的锁给破掉了，结果两个进程同时拿到锁。
另外锁文件内容被写坏（标记残缺）的时候应该能自愈，而不是一直卡在那里。

请把破锁这条路径收紧，并且能修好坏掉的锁文件。补测试：破锁时目标消失要中止、源文件不存在要报错、文件 mtime 被改过就不能破、确实没被改动的才允许破。公开接口别改。
```

## T178 — tox-dev/filelock

- 仓库地址：https://github.com/tox-dev/filelock
- 初始环境：`t178/base`（上游 tox-dev/filelock @ 57251e9f311c）
- 上游修复提交：fa6a27b84043（2026-02-13）
- 改动文件：src/filelock/_api.py, src/filelock/_soft.py

```text
同一个线程里对同一个路径建了两个 FileLock 实例，两个都用阻塞模式 acquire，程序就那么卡死了——自己等自己，永远等不到。
这种情况应该直接报错告诉我们死锁了，而不是干等。注意别误伤：非阻塞模式和带 timeout 的还是要报超时、不能被当成死锁；不同线程、不同路径不能误报；同一个实例重复进入（reentrant）还得是正常行为。
补测试把这些都钉住。
```

## T179 — aio-libs/aiohttp

- 仓库地址：https://github.com/aio-libs/aiohttp
- 初始环境：`t179/base`（上游 aio-libs/aiohttp @ 82ce525b3b3d）
- 上游修复提交：6cffcfd74973（2025-10-28）
- 改动文件：aiohttp/_websocket/writer.py, aiohttp/compression_utils.py

```text
aiohttp 的 WebSocket 开了 permessage-deflate 之后，send_str 的过程中如果被取消，压缩器的状态就坏了：之后再在同一个连接上发消息，对端解出来是乱码；连续发多条的时候更明显。
压缩是流式的，发到一半被打断确实麻烦，但对外表现不能坏掉压缩上下文。请让压缩发送在取消下是安全的：要么整条发出去、要么就当没发过，压缩状态不能被写坏。
补测试：单次发送过程中取消、连续多次发送过程中取消。
```

## T180 — aio-libs/aiohttp

- 仓库地址：https://github.com/aio-libs/aiohttp
- 初始环境：`t180/base`（上游 aio-libs/aiohttp @ ef06656568de）
- 上游修复提交：38dd9b8557f3（2024-04-04）
- 改动文件：aiohttp/abc.py, aiohttp/connector.py, aiohttp/resolver.py, docs/conf.py, examples/fake_server.py, requirements/runtime-deps.in, setup.cfg

```text
aiohttp 的 AsyncResolver 和 ThreadedResolver 结果对不上，切过去之后一堆毛病：
getaddrinfo 返回多条记录的时候只用了第一条；
主机名查不到的时候不是返回空结果，而是直接抛异常；
IPv6 的 link-local 地址（带 % 那种）处理不对；
hosts 文件里没有的条目行为也不一样。

请把 AsyncResolver 对齐成 ThreadedResolver 的语义，IPv4/IPv6、正查、负查都要一致。补测试覆盖多结果、查不到、link-local v6 这几种。
```

## T181 — aio-libs/aiohttp

- 仓库地址：https://github.com/aio-libs/aiohttp
- 初始环境：`t181/base`（上游 aio-libs/aiohttp @ 5fa85842951a）
- 上游修复提交：5e54037933fa（2026-08-25）
- 改动文件：aiohttp/_websocket/reader_c.pxd, aiohttp/_websocket/reader_py.py, aiohttp/client.py, aiohttp/client_ws.py, aiohttp/web_ws.py

```text
aiohttp 的 WebSocket 读端在我们这种"每帧很小、帧数特别多"的场景下内存一直涨：
空消息和小消息不走背压，读端跟不上（stalled）的时候缓冲只增不减，连接断了这些挂着的缓冲也不释放，读端对象一直被引用着回收不了。

请让空/小消息也走背压和高水位，挂住的读取器在 drain 之后要把引用放掉，别一直留着帧对象。补测试：空消息背压、高水位以上的突发数据、stalled reader 在 drain 和断连之后的释放。现有行为别改坏。
```

## T182 — celery/celery

- 仓库地址：https://github.com/celery/celery
- 初始环境：`t182/base`（上游 celery/celery @ a277d3d673fe）
- 上游修复提交：a7d9c79688d3（2026-09-03）
- 改动文件：celery/worker/control.py, celery/worker/request.py

```text
celery 里我们用 chord，其中某个成员任务被 app.control.revoke 撤销之后，整个 chord 永远不结束——一直在等那个已经被撤掉的成员。
看着问题出在 worker 的 control revoke 这条路径上：它只在 backend 里把任务标成 REVOKED，没有把 worker 这边的 Request 一起传下去，chord 的记账就被跳过了，所以它一直等不到回调。
请修好这条路径，让撤销成员之后 chord 能正常收尾。补测试：撤销被预留的成员之后 chord 能完成、重复撤销不能重复记账、找不到的任务 id 行为跟以前一样。
```

## T183 — celery/celery

- 仓库地址：https://github.com/celery/celery
- 初始环境：`t183/base`（上游 celery/celery @ fc947644289c）
- 上游修复提交：ab711a0b2de8（2025-12-05）
- 改动文件：celery/concurrency/prefork.py, celery/worker/components.py, celery/worker/consumer/consumer.py, celery/worker/loops.py

```text
celery worker 优雅退出（冷关闭、等长任务跑完）的这段时间里不再往 broker 发心跳了，broker 那边按心跳超时把连接掐掉，结果长任务跑完的结果根本发不回去，日志里一堆连接断开的报错。
请让排空（drain）的这段时间心跳照发。补测试覆盖：关闭时定时器还能触发、没有 hub 的情况下不要炸、以及带长任务退出的场景。
```

## T184 — celery/celery

- 仓库地址：https://github.com/celery/celery
- 初始环境：`t184/base`（上游 celery/celery @ 066092edc2f9）
- 上游修复提交：1a39f8ca68a3（2026-04-06）
- 改动文件：celery/app/base.py, celery/app/defaults.py

```text
celery 的 broker 连接池打满之后，pool.acquire(block=True) 会一直阻塞，没有超时。
我们并发 apply_async（在 Django 的信号里发的）的时候，延时能从 100ms 滚雪球到 40 秒以上，全卡在等连接上。
请给池获取加一个可配置的超时（给个合理的默认值），超时之后抛明确的错误，别让调用方无限等下去。补测试：池打满要抛、池没打满正常、超时设成 None 的时候保持原来的阻塞行为。
```

## T185 — pydantic/pydantic

- 仓库地址：https://github.com/pydantic/pydantic
- 初始环境：`t185/base`（上游 pydantic/pydantic @ 197bf18bf341）
- 上游修复提交：f5e3aa950ffb（2023-07-25）
- 改动文件：pydantic/_internal/_model_construction.py, pydantic/main.py

```text
pydantic 里参数化的泛型模型（Model[int] 这种）用完不会被回收，一直挂在缓存里，服务跑久了内存只涨不降。我们那边还带循环引用，GC 也收不掉。
请把这块的缓存换成不会阻止回收的引用方式（弱引用之类）。补一个测试：造一个带循环引用的泛型模型，删掉外部引用之后能被 gc 收掉，用 weakref 断言。模型类和实例的正常语义别动。
```

## T186 — pytest-dev/pytest

- 仓库地址：https://github.com/pytest-dev/pytest
- 初始环境：`t186/base`（上游 pytest-dev/pytest @ f017df443a58）
- 上游修复提交：12b9bd580198（2024-01-03）
- 改动文件：AUTHORS, src/_pytest/main.py, src/_pytest/runner.py

```text
pytest 加 --maxfail=1 的时候，如果 teardown 阶段又出错，这个错误会被吞掉、或者报的位置不对。
看着是早先那次失败把 maxfail 的状态置上了，teardown 的失败就没法正确上报；session 级的 teardown 失败/停止两种情况也不对。
请修好这块的状态处理，让 teardown 的错误该报就报。补测试覆盖：session teardown 失败、session teardown 停止、以及 shouldfail / shouldstop 的状态是不是该"粘住"。
```

## T187 — pytest-dev/pytest

- 仓库地址：https://github.com/pytest-dev/pytest
- 初始环境：`t187/base`（上游 pytest-dev/pytest @ 2f09ddc84ea6）
- 上游修复提交：966edc9d517c（2026-02-14）
- 改动文件：src/_pytest/_io/pprint.py, src/_pytest/_io/saferepr.py, src/_pytest/pytester_assertions.py

```text
pytest 的断言 diff 在比较 dict 的时候会把 key 排序，导致"只是插入顺序不同"的失败看起来两边一模一样，根本找不到差别；dict 被截断（truncate）的时候顺序也该按插入顺序来。
请改成保留插入顺序。补测试：多出来的项要保持插入顺序、截断之后的顺序、以及空 dict 的显示。
```

## T188 — Delgan/loguru

- 仓库地址：https://github.com/Delgan/loguru
- 初始环境：`t188/base`（上游 Delgan/loguru @ 2c585a1c186b）
- 上游修复提交：8c2044efdf0e（2023-09-03）
- 改动文件：loguru/_file_sink.py, loguru/_handler.py, loguru/_logger.py, loguru/_simple_sinks.py

```text
loguru 用 logger.complete() 等日志落盘，如果 sink 是我们自己写的（写文件、或者 sink 内部还要跟子进程/别的线程打交道），偶发死锁：complete() 和 sink 的 write 撞在一起就卡住不动。
加上 logger.contextualize() 之后更容易复现，多进程场景下也出过。
请把这几个锁的获取顺序理清楚，别让 complete 和写互相等死。补测试：complete 和 sink write 并发、complete 和 contextualize 并发、以及多进程的场景。
```
