# 高难度 Bug 修复题·第二辑（30 道）

口径同一辑：并发 / 取消语义 / 生命周期 / 状态机 / 缓存与协议正确性，改动分布在多个文件，症状和根因之间隔得比较远。

| 题号 | 上游仓库 | 分支 | 一句话 |
| --- | --- | --- | --- |
| T189 | agronholm/anyio | `t189/base` | Fixed Trio backend hangs when dynamically accessing async fixture via getfixturevalue (#1149) |
| T190 | agronholm/anyio | `t190/base` | Fixed missing or inconsistent error when acquiring already owned Lock (#799) |
| T191 | celery/celery | `t191/base` | fix(trace): dispatch chain/callbacks on dedup fast-path for redelivered tasks (#10159) |
| T192 | celery/celery | `t192/base` | fix: (#8786) time out when chord header fails with group body (#9788) |
| T193 | celery/celery | `t193/base` | Fix/10096 worker fails to reconnect after redis failover (#10151) |
| T194 | celery/kombu | `t194/base` | Fix for SQS transport deadlock (#2479) |
| T195 | celery/kombu | `t195/base` | Fix/2463 gevent concurrent error (#2478) |
| T196 | celery/kombu | `t196/base` | Use the correct protocol for SQS requests (#1807) |
| T197 | redis/redis-py | `t197/base` | Fix PubSub timeout propagation to prevent indefinite hangs on socket read operations (#3982) |
| T198 | redis/redis-py | `t198/base` | Fix ClusterClient behavior when cluster topology is refreshed. Fix several places where connections might leak. (#3917) |
| T199 | redis/redis-py | `t199/base` | Fixing pubsub's listen method to be blocking. (#4119) |
| T200 | tox-dev/filelock | `t200/base` | 🐛 fix(async-rw): give each task its own hold (#746) |
| T201 | tox-dev/filelock | `t201/base` | 🔒 fix(soft): fail safe on transient heartbeat errors (#661) |
| T202 | tox-dev/filelock | `t202/base` | 🐛 fix: retry transient denials on open and claim read (#705) |
| T203 | tox-dev/tox | `t203/base` | 🐛 fix(session): fix package env failure cascade and state corruption (#3991) |
| T204 | tox-dev/tox | `t204/base` | 🐛 fix(run): honor the fail-fast contract, resilient teardown (#3999) |
| T205 | tox-dev/tox | `t205/base` | 🐛 fix(cli): honor tox c -o, clean devenv ALL error, correct provision pin (#3998) |
| T206 | pytest-dev/pytest | `t206/base` | Hard error when setting a mark on a fixture function |
| T207 | pytest-dev/pytest | `t207/base` | change implementation so the check happens in pytest_fixture_setup after any hooks (from async plugins) has had a chance to resolve the awaitable |
| T208 | pytest-dev/pytest | `t208/base` | Fix assertion rewriting with importlib mode (#12716) |
| T209 | aio-libs/aiohttp | `t209/base` | Fix file uploads failing with HTTP 422 on 307/308 redirects (#11290) |
| T210 | HypothesisWorks/hypothesis | `t210/base` | Fix recursion limit error |
| T211 | HypothesisWorks/hypothesis | `t211/base` | Fix unsafe cache pin semantics |
| T212 | pydantic/pydantic | `t212/base` | Fixing `__iter__` returning private `cached_property` info (#7570) |
| T213 | pydantic/pydantic | `t213/base` | Fix error when using type aliases referencing other type aliases (#10809) |
| T214 | sqlalchemy/sqlalchemy | `t214/base` | fix AsyncSession.close_all() |
| T215 | jd/tenacity | `t215/base` | fix: Avoid overwriting local contexts with retry decorator (#479) |
| T216 | jd/tenacity | `t216/base` | fix: make Retrying and retry strategies picklable for multiprocessing (#615) |
| T217 | nedbat/coveragepy | `t217/base` | fix: sysmon conflicts no longer cause errors |
| T218 | python-trio/trio | `t218/base` | Add message with debugging info to Cancelled (#3256) |

## T189 — agronholm/anyio

- 仓库地址：https://github.com/agronholm/anyio
- 初始环境：`t189/base`（上游 agronholm/anyio @ b4059c7268ad）
- 上游修复提交：142dbccc97e8（2026-05-27）
- 改动文件：src/anyio/_backends/_asyncio.py, src/anyio/_backends/_trio.py, src/anyio/abc/_testing.py, src/anyio/pytest_plugin.py

```text
我们的测试用 anyio 的 pytest 插件，同一批用例参数化跑 asyncio 和 trio 两个后端。
Trio 后端下用 request.getfixturevalue() 动态拿一个 async fixture，整个测试就卡死不动了，得手动 Ctrl-C 才停；同样这段换 asyncio 后端跑是正常的。插件里从同步上下文把 async fixture 的值取回来这块，看起来没走通。

请修好让两个后端都能动态取 async fixture、不要挂住。补一个用例断言它不会 hang。插件里那个占位/无操作的分支也别漏掉。
```

## T190 — agronholm/anyio

- 仓库地址：https://github.com/agronholm/anyio
- 初始环境：`t190/base`（上游 agronholm/anyio @ 1a64bfb20eb7）
- 上游修复提交：5c6029199dba（2024-10-12）
- 改动文件：src/anyio/_backends/_asyncio.py, src/anyio/_backends/_trio.py

```text
anyio 的 Lock，如果同一个任务已经持有、又去 acquire 一次，两个后端给出来的行为对不上：一个直接抛错误、另一个默默地又拿了一次，还有的情况下干脆挂住。我们要的是明确且一致的报错。

请把 asyncio 和 trio 两个后端对齐：重复获取自己已经持有的 Lock 要抛同样的异常、错误信息也说清楚。补两个用例，同步和异步的获取路径都要覆盖。
```

## T191 — celery/celery

- 仓库地址：https://github.com/celery/celery
- 初始环境：`t191/base`（上游 celery/celery @ ffc1aaa927e8）
- 上游修复提交：865922abda95（2026-03-09）
- 改动文件：.github/workflows/python-package.yml, celery/app/trace.py, t/integration/tasks.py

```text
celery 开了任务去重之后我们碰上一个丢任务的问题：worker 在 mark_as_done 之后、broker ack 之前崩掉，任务被重投，重投的这次命中"去重快路径"就直接返回了 —— chain 和 callback 都没有派发。

结果就是整条 chain 永久丢了，后面挂的 callback 再也不会跑，而且没有任何报错，我们查了很久才发现是重投那一轮什么都没做。

请把去重快路径补上 chain/callback 的派发。补测试：去重命中重投时 callback 和 chain 都要被派发、派发失败要记日志并且不要把任务错误地记进 successful requests、去重时不能改动 request 里原本的 chain。
```

## T192 — celery/celery

- 仓库地址：https://github.com/celery/celery
- 初始环境：`t192/base`（上游 celery/celery @ 6d8bfd1d1d30）
- 上游修复提交：9cb389d31ad8（2025-07-02）
- 改动文件：celery/app/builtins.py, celery/backends/base.py, celery/backends/gcs.py, celery/backends/redis.py

```text
celery 的 chord，如果 header 是个 group 而且里面某个任务失败了，整个 chord 就一直等下去：不超时、也不报错，卡在那儿直到我们手工重启 worker。group 作为 body 的场景下基本必现。

请把这条失败路径补上：header 失败要能让 chord 正常收尾、错误要能报出来，清理过程本身再出错也不能把原始错误吞掉。补测试覆盖 header 失败、多个任务失败、以及清理抛异常这几条路径。
```

## T193 — celery/celery

- 仓库地址：https://github.com/celery/celery
- 初始环境：`t193/base`（上游 celery/celery @ b0fdb91ccf99）
- 上游修复提交：2b3c6fa38c6c（2026-03-01）
- 改动文件：celery/concurrency/asynpool.py, celery/worker/loops.py

```text
celery worker（prefork + redis）在 redis 主从切换之后连不回来，一直重连失败；日志里能看到 flush 那块有问题：要写的 ack 协程被直接丢掉了，没被推进；开 synack 和不开 synack 我们都试过，表现还不一样；另外 worker 进程已经死了的时候，flush 会陷在死循环里不出来。

请把这条恢复路径修好：进程还活着就要把写 ack 的协程推进下去（别丢），进程死了要把对应的请求丢掉，没开 synack 时那些没被接受的 job 也要丢掉，hub 在出错之后要能重置。补测试把这几条分支都钉住。
```

## T194 — celery/kombu

- 仓库地址：https://github.com/celery/kombu
- 初始环境：`t194/base`（上游 celery/kombu @ e3207800e57a）
- 上游修复提交：6cc2228f3b75（2026-03-10）
- 改动文件：kombu/transport/SQS/SNS.py, kombu/transport/SQS/exceptions.py

```text
kombu 的 SQS 传输里 SNS 那块多线程下会死锁：创建/查询 topic 的初始化路径和另一条路径互相等对方的锁，一卡就是永远。我们生产上碰到过一次，worker 全卡住。

请把这处锁的顺序理清楚（初始化只做一次、查询路径不要重复加锁），补测试：已经初始化过、还没初始化、预定义 exchange 命中、预定义 exchange 没命中这几种情况都要覆盖，另外 topic arn 走缓存的路径也要测。
```

## T195 — celery/kombu

- 仓库地址：https://github.com/celery/kombu
- 初始环境：`t195/base`（上游 celery/kombu @ 156e003e5a5c）
- 上游修复提交：829433043dbc（2026-03-06）
- 改动文件：kombu/common.py, kombu/utils/compat.py

```text
kombu 的 ignore_errors() 在装了 gevent 的进程里会漏掉 gevent 的并发使用错误：那个 concurrentObjectUseErrors 类是在模块导入的时候查的，如果 gevent 还没导入就先固定成了"没有"，等后来 gevent 被导进来（celery 的 start/stop 流程里经常这样），这类噪音异常就会直接冒出来，把正常关闭流程搞得很乱。

请改成运行时判断：gevent 在不在 sys.modules、那个类在不在，都要现查；没装 gevent 的时候异常该照样往外抛。补测试覆盖 gevent 已加载、未加载、以及后续再 import 的情况，还有 mock connection 下不要炸。
```

## T196 — celery/kombu

- 仓库地址：https://github.com/celery/kombu
- 初始环境：`t196/base`（上游 celery/kombu @ 75650c511b74）
- 上游修复提交：6121539379bc（2023-11-16）
- 改动文件：kombu/asynchronous/aws/connection.py, kombu/asynchronous/aws/sqs/connection.py

```text
kombu 发 SQS 请求的时候协议用错了：查询协议（query）和 JSON 协议混着用，一旦依赖默认值，碰上 botocore 那边把默认协议改了就直接挂（我们上次就是这么出的线上事故）。

请把请求按正确的协议显式构造并发出去，不要再依赖默认值；补测试：JSON 协议、query 协议各一条，以及 make_request 两个分支都要覆盖。
```

## T197 — redis/redis-py

- 仓库地址：https://github.com/redis/redis-py
- 初始环境：`t197/base`（上游 redis/redis-py @ e0456542b064）
- 上游修复提交：53e6d8af1e0d（2026-03-10）
- 改动文件：redis/_parsers/hiredis.py, redis/_parsers/resp2.py, redis/_parsers/resp3.py, redis/_parsers/socket.py, redis/asyncio/client.py, redis/client.py, redis/cluster.py, redis/connection.py

```text
redis-py 的 PubSub 在 socket 读上会无限等：我们给 get_message 传了 timeout，但这个 timeout 根本没有传到解析器/socket 的读操作上，结果 get_message(timeout=1) 照样一直阻塞，进程就卡死在那里。

同步客户端、asyncio 客户端、hiredis 解析器和 resp2/resp3 几个解析器都有这个问题，cluster/sentinel 那边也受影响。

请把 timeout 一路传到 socket 读上。补测试：timeout 生效、timeout=None 时保持原来的阻塞行为、timeout=0 立即返回、以及有消息时能正常拿到（sharded pubsub 的分支也要覆盖）。
```

## T198 — redis/redis-py

- 仓库地址：https://github.com/redis/redis-py
- 初始环境：`t198/base`（上游 redis/redis-py @ 42f823f85a50）
- 上游修复提交：c40ec527c204（2026-01-27）
- 改动文件：redis/asyncio/cluster.py, redis/asyncio/connection.py, redis/cluster.py

```text
redis-py 的 Cluster 客户端在刷新拓扑的时候会把连接池里"正在用"的连接也一起断开，导致正在跑的命令直接报连接错误；另外好几个地方连接断开之后没有正确归还/释放，跑久了会泄漏。

请改成：刷新时只把在用连接标记成需要重连、空闲的才断开；实在要遍历连接池的地方加个防御性检查。补测试：move_node_to_end_of_cached_nodes 的几种输入、断开空闲连接的分支、以及连接错误时节点缓存的调整。
```

## T199 — redis/redis-py

- 仓库地址：https://github.com/redis/redis-py
- 初始环境：`t199/base`（上游 redis/redis-py @ 8210f32f0175）
- 上游修复提交：1c77108df0ae（2026-06-15）
- 改动文件：redis/asyncio/client.py, redis/asyncio/connection.py, redis/client.py

```text
redis-py 的 PubSub.listen() 本该一直阻塞等消息，但我们给连接设了 socket_timeout 之后，listen() 到了这个超时就返回了，而且这个设置还把连接上的 socket timeout 状态改坏了，后面的读也跟着受影响。

请让 listen() 不受 socket_timeout 影响（该阻塞就一直阻塞），并且不要改动连接上的 timeout 状态。补测试：block=True 时能超过 socket_timeout 继续阻塞、之后继续读不受污染、以及传 timeout 的获取路径行为正确。
```

## T200 — tox-dev/filelock

- 仓库地址：https://github.com/tox-dev/filelock
- 初始环境：`t200/base`（上游 tox-dev/filelock @ fe0e99d00f3a）
- 上游修复提交：6c46312e5aaa（2026-09-23）
- 改动文件：src/filelock/_async.py, src/filelock/_async_read_write.py, src/filelock/_soft_rw/_async.py

```text
filelock 的异步读写锁（async 的 read-write，以及 soft-rw 的异步版）现在把"谁持有"记在锁对象上，同一把锁被多个 asyncio 任务共享的时候就全乱了：
两个任务一起拿读锁会被误判；写锁本该排队，结果放行了；某个排队的任务被取消之后，后面排队的写者再也进不来；还有嵌套写锁的 release 计数也不对。

请改成按任务记录持有情况，每个任务自己一份 hold。补测试：两个任务共同持读锁、写锁一次只给一个任务、被取消的写者要放行后面的读者、嵌套写锁的最后一个 release 才算真正释放、不在任务里 acquire 要报错、没持有的任务去 release 也要报错。
```

## T201 — tox-dev/filelock

- 仓库地址：https://github.com/tox-dev/filelock
- 初始环境：`t201/base`（上游 tox-dev/filelock @ 0f86a94a6b3d）
- 上游修复提交：9cbcbcc8611e（2026-07-15）
- 改动文件：src/filelock/_identity.py, src/filelock/_lease.py, src/filelock/_soft_rw/_sync.py, src/filelock/_strict.py

```text
filelock 的 lease / 心跳这块碰到临时错误就直接崩：刷新租约标记的时候偶尔会读到写了一半的标记（内容不完整），或者一次临时的刷新失败，现在实现都是直接抛异常，锁的状态就卡在中间。

我们希望这种情况是 fail-safe 的：标记短暂读坏要让心跳挺过去、坏掉的标记能自愈、一次临时的刷新失败要能容忍，而不是把整个锁搞死。补对应用例。
```

## T202 — tox-dev/filelock

- 仓库地址：https://github.com/tox-dev/filelock
- 初始环境：`t202/base`（上游 tox-dev/filelock @ 4aa742ca0992）
- 上游修复提交：13b82a64adf5（2026-08-15）
- 改动文件：src/filelock/_strict.py, src/filelock/_windows.py

```text
filelock 在 Windows 上偶尔会因为文件被临时占用（拒绝访问）直接失败，其实等几十毫秒就能读到；strict soft 锁里那条 claim 读的路径也有同样的问题。

请给"打开"和"claim 读"这两条路径加上在宽限时间内重试临时拒绝的逻辑，别让瞬时占用变成失败。补测试：被拒绝一次之后重试要成功、宽限期内要按预期重试、以及超出宽限期之后还是要报错。
```

## T203 — tox-dev/tox

- 仓库地址：https://github.com/tox-dev/tox
- 初始环境：`t203/base`（上游 tox-dev/tox @ bedbcbe0b63a）
- 上游修复提交：122bdb60a37c（2026-07-20）
- 改动文件：.git.premigrate, src/tox/session/cmd/run/common.py, src/tox/session/env_select.py, src/tox/tox_env/python/virtual_env/package/pyproject.py

```text
tox 里只要创建 package 环境（.pkg）失败过一次，后面就连环崩：再跑别的 run 环境会报 `duplicate configuration definition for .pkg`，看起来跟我们把 work_dir 放到另一个文件系统上有关系，但那个报错只是连带反应。

真正的原因应该是失败的时候 `_get_package_env` 把半注册的配置留在缓存里了，之后共享 .pkg 的环境再注册就撞车。

请把这条失败回滚路径修好：失败要报第一个真实错误、不能把半成品留在缓存里、共享环境要被保住、被插件 hook 跳过的环境也要处理。补测试（含 depends 循环的场景）。
```

## T204 — tox-dev/tox

- 仓库地址：https://github.com/tox-dev/tox
- 初始环境：`t204/base`（上游 tox-dev/tox @ b1b0159a3f9e）
- 上游修复提交：fa6ec2bb6b5e（2026-07-20）
- 改动文件：src/tox/session/cmd/run/common.py, src/tox/tox_env/python/virtual_env/package/pyproject.py, src/tox/tox_env/runner.py

```text
tox 的 run 有两条契约没守住：
一是 fail-fast 的退出码应该是第一个失败的退出码，而且并行跑到一半失败时，已经在跑的环境应该让它跑完，而不是粗暴掐掉；
二是 teardown 遇到某个环境失败之后就不往下走了，剩下的环境该收尾的没收。

请把这两块修好。补测试：退出码取第一个失败、并行 fail-fast 让在跑的跑完、teardown 在失败后继续。
```

## T205 — tox-dev/tox

- 仓库地址：https://github.com/tox-dev/tox
- 初始环境：`t205/base`（上游 tox-dev/tox @ fa6ec2bb6b5e）
- 上游修复提交：09dad3d69d7a（2026-07-20）
- 改动文件：src/tox/provision.py, src/tox/session/cmd/devenv.py, src/tox/session/cmd/show_config/ini.py

```text
tox 有三个小地方不对：
`tox c -o <文件>` 的输出文件没被遵守，内容还是打到 stdout 了；
`tox devenv -e ALL` 的报错信息不对（不是该有的那条）；
provision 那块 tox 的版本 pin 不对，不重建环境的时候会 pin 成错的版本。

请逐个修好，各补一个测试。
```

## T206 — pytest-dev/pytest

- 仓库地址：https://github.com/pytest-dev/pytest
- 初始环境：`t206/base`（上游 pytest-dev/pytest @ a6f3ec732798）
- 上游修复提交：86608c3aaca8（2025-11-09）
- 改动文件：src/_pytest/deprecated.py, src/_pytest/fixtures.py, src/_pytest/mark/structures.py, testing/deprecated_test.py

```text
pytest 里给 fixture 函数加标记（fixture 函数上再套一个 @pytest.mark.xxx）现在是安静地不生效，什么都不说。我们要把它变成明确的报错——这个用法已经被标记为要移除、9.0 会删掉。

请改成硬报错并给出清楚的提示。补测试：直接标在 fixture 函数上、标在已经被标记过的函数上、以及夹在几个标记中间的情况，都要报错。
```

## T207 — pytest-dev/pytest

- 仓库地址：https://github.com/pytest-dev/pytest
- 初始环境：`t207/base`（上游 pytest-dev/pytest @ 7256c0c226b0）
- 上游修复提交：c98ef2bdcaf4（2024-11-11）
- 改动文件：src/_pytest/compat.py, src/_pytest/fixtures.py, testing/acceptance_test.py

```text
pytest 检查"fixture 返回值是没被解析的 awaitable"的时机不对：这个检查跑在别的插件 hook 之前，而 async 插件（anyio / asyncio 那类）本来会在自己的 hook 里把这个 awaitable 解析掉，结果我们先报了错，误伤一批正常用例。

请把这个检查挪到 pytest_fixture_setup 里、等各插件 hook 都跑完之后再做。补测试确认被 async 插件解析过的 fixture 不再被误报。
```

## T208 — pytest-dev/pytest

- 仓库地址：https://github.com/pytest-dev/pytest
- 初始环境：`t208/base`（上游 pytest-dev/pytest @ 419bc7a7c39d）
- 上游修复提交：9a444d113658（2024-08-30）
- 改动文件：AUTHORS, src/_pytest/assertion/rewrite.py, src/_pytest/pathlib.py

```text
pytest 加 --import-mode=importlib 的时候，命名空间包里的测试模块断言重写不生效：失败的断言不会展开，报错信息里看不到中间值；多层命名空间包（好几层没有 __init__.py 的目录）尤其明显。

请修好这条重写路径。补一个多层命名空间包的用例，断言重写确实生效。
```

## T209 — aio-libs/aiohttp

- 仓库地址：https://github.com/aio-libs/aiohttp
- 初始环境：`t209/base`（上游 aio-libs/aiohttp @ 57983b4ac1d1）
- 上游修复提交：16703bb955ae（2025-07-10）
- 改动文件：aiohttp/client.py, aiohttp/payload.py

```text
aiohttp 的客户端在遇到 307/308 重定向时，会把带文件的表单请求重新构造一遍，结果 body 被改坏，服务端直接返回 422。只有"重定向 + multipart 文件上传"这个组合会有，普通表单和没有重定向都不受影响。

请修好重定向时请求体的重建，带文件的表单要能被正确重新发送。补测试覆盖 307 和 308 两种情况。
```

## T210 — HypothesisWorks/hypothesis

- 仓库地址：https://github.com/HypothesisWorks/hypothesis
- 初始环境：`t210/base`（上游 HypothesisWorks/hypothesis @ 68a9105e5ac6）
- 上游修复提交：422763a58d44（2023-06-25）
- 改动文件：hypothesis-python/src/hypothesis/core.py, hypothesis-python/src/hypothesis/internal/conjecture/data.py, hypothesis-python/src/hypothesis/internal/conjecture/engine.py, hypothesis-python/src/hypothesis/internal/conjecture/junkdrawer.py

```text
hypothesis 在我们某些用例上会撞到递归深度上限，直接抛 RecursionError —— 递归的不是我们的代码，是库内部那套引擎，用例稍微深一点就能复现。

请修掉内部这处递归，让这类用例正常跑；该失败的用例还是要照常失败并给出正常的最小化结果，不能为了不报错而妥协。补测试。
```

## T211 — HypothesisWorks/hypothesis

- 仓库地址：https://github.com/HypothesisWorks/hypothesis
- 初始环境：`t211/base`（上游 HypothesisWorks/hypothesis @ 309ab67891ba）
- 上游修复提交：2dcb6ac0cd95（2024-06-20）
- 改动文件：hypothesis-python/src/hypothesis/internal/cache.py, hypothesis-python/src/hypothesis/internal/conjecture/engine.py

```text
hypothesis 内部那个 LRU 缓存（internal/cache.py）的 pin 语义不安全：被 pin 住的条目在某些淘汰顺序下还是会被换掉，于是 conjecture 引擎拿着一个已经失效的条目继续用，行为就变得不可预期。

请把 pin / 淘汰的语义修正确。补测试把"pin 住之后不能被淘汰、unpin 之后正常淘汰"钉住。
```

## T212 — pydantic/pydantic

- 仓库地址：https://github.com/pydantic/pydantic
- 初始环境：`t212/base`（上游 pydantic/pydantic @ f120e7c92871）
- 上游修复提交：1546db3cae01（2023-09-22）
- 改动文件：pydantic/fields.py, pydantic/main.py

```text
pydantic 的模型把私有属性泄漏到 __iter__ 里了：dict(model) 会带出这些私有字段，用 cached_property 声明的私有属性也一样，这在做序列化的时候会把内部状态漏出去。默认 repr 里也不该显示它们。

请修好让私有属性不出现在 __iter__/dict 和默认 repr 里。补测试：普通私有属性和 cached_property 两种都要覆盖 __iter__ 和默认 repr。
```

## T213 — pydantic/pydantic

- 仓库地址：https://github.com/pydantic/pydantic
- 初始环境：`t213/base`（上游 pydantic/pydantic @ 96876ef7c819）
- 上游修复提交：ff4a325cb1a1（2024-11-12）
- 改动文件：pydantic/_internal/_core_utils.py, pydantic/errors.py

```text
pydantic 里类型别名引用另一个类型别名会报错：A = B，B = C 这种链式的也认不了；如果别名之间还有循环引用，报错信息更是没法看。

请修好别名解析，中间别名、别名链、循环别名都要能正常处理（循环的那条要给出合理的报错），JSON 相关的类型路径也别漏。补测试覆盖这几种情况。
```

## T214 — sqlalchemy/sqlalchemy

- 仓库地址：https://github.com/sqlalchemy/sqlalchemy
- 初始环境：`t214/base`（上游 sqlalchemy/sqlalchemy @ efe4025c068d）
- 上游修复提交：29948f6848a8（2023-10-18）
- 改动文件：lib/sqlalchemy/ext/asyncio/__init__.py, lib/sqlalchemy/ext/asyncio/scoping.py, lib/sqlalchemy/ext/asyncio/session.py, lib/sqlalchemy/util/langhelpers.py

```text
sqlalchemy 的 AsyncSession.close_all() 现在根本用不了：要么直接报错、要么什么也没关掉，跟同步那套 close_all_sessions 的行为完全对不上。

请修好它，并补上 async 版的 close_all_sessions；旧入口的 deprecation 行为也要保持一致。补测试：close_all 能把所有 session 都关掉、以及旧的调用方式仍然按 deprecation 走。
```

## T215 — jd/tenacity

- 仓库地址：https://github.com/jd/tenacity
- 初始环境：`t215/base`（上游 jd/tenacity @ ee6a8f7a7665）
- 上游修复提交：a15fa645326e（2024-06-24）
- 改动文件：releasenotes/notes/fix-local-context-overwrite-94190ba06a481631.yaml, tenacity/__init__.py, tenacity/asyncio/__init__.py

```text
tenacity 的 @retry 装饰器会污染调用方的上下文：我们在外面用 contextvars 设了值，调用被装饰的函数之后，里面的值被 tenacity 的内部状态覆盖了，跨协程/线程再取就拿到错的值。

请修好让重试装饰器别动调用方的上下文，同步和异步两条路径都要处理。补测试：同步和异步各一个，断言进入前后调用方上下文里的值没被改掉。
```

## T216 — jd/tenacity

- 仓库地址：https://github.com/jd/tenacity
- 初始环境：`t216/base`（上游 jd/tenacity @ 0a3ca8a208a9）
- 上游修复提交：cb320c4d80d8（2026-02-25）
- 改动文件：tenacity/__init__.py, tenacity/retry.py

```text
tenacity 的 Retrying 对象和各类重试策略没法 pickle（里面用了 threading.local 和 lambda），所以我们想把重试逻辑丢给 multiprocessing / 进程池的时候直接失败。

请让它们能正常序列化，往返之后行为要一致。补测试：策略可 pickle、Retrying 可 pickle、跑过之后再 pickle、pickle 往返之后还能正常重试。
```

## T217 — nedbat/coveragepy

- 仓库地址：https://github.com/nedbat/coveragepy
- 初始环境：`t217/base`（上游 nedbat/coveragepy @ 1f211841cfe5）
- 上游修复提交：843479261fd9（2025-11-09）
- 改动文件：coverage/core.py, coverage/exceptions.py, metacov.ini, pyproject.toml

```text
coverage.py 用上 sys.monitoring 之后，如果同一个进程里还有别的工具也在用 sysmon（比如同时挂着别的 profiler 或者调试器），coverage 会直接抛错崩掉，而不是退让。

请让这种 sysmon 冲突变成可容忍的情况：能继续采集就继续、不能让整个测量崩掉，并且给出明确的说明。补测试覆盖冲突和不冲突两种场景。
```

## T218 — python-trio/trio

- 仓库地址：https://github.com/python-trio/trio
- 初始环境：`t218/base`（上游 python-trio/trio @ bb63c53681cd）
- 上游修复提交：23b2d318622a（2025-05-15）
- 改动文件：src/trio/_channel.py, src/trio/_core/_asyncgens.py, src/trio/_core/_exceptions.py, src/trio/_core/_run.py, src/trio/_highlevel_generic.py, src/trio/_highlevel_open_tcp_stream.py, src/trio/_subprocess.py, src/trio/_threads.py

```text
trio 抛出来的 Cancelled 现在只有一句"被取消了"，排查问题时完全不知道是谁、因为什么取消的，日志里看不出任何线索。

请给 Cancelled 带上调试信息（哪个 cancel scope、什么原因）。注意不能影响取消本身的语义：多层取消的时候后面那个不能把前面的原因覆盖掉；字符串化和 pickle 要正常；子类和构造函数的签名也别破坏。补测试覆盖这几点。
```
