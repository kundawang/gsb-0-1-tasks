# 高难度 Bug 修复题·第三辑（40 道）

口径同前两辑：并发 / 取消 / 生命周期 / 状态一致性 / 协议正确性，改动跨多个文件，症状离根因远。

| 题号 | 上游仓库 | 分支 | 一句话 |
| --- | --- | --- | --- |
| T219 | mongodb/mongo-python-driver | `t219/base` | PYTHON-6074 Fix pool deadlock when a greenlet is killed during checkin (#3041) |
| T220 | mongodb/mongo-python-driver | `t220/base` | PYTHON-5794 - Add prose tests to verify correct retry behavior when a… (#2755) |
| T221 | mongodb/mongo-python-driver | `t221/base` | PYTHON-3519 Fix race condition in pool _reset() causing flaky test (#2848) |
| T222 | mongodb/mongo-python-driver | `t222/base` | PYTHON-5021 - Fix usages of getaddrinfo to be non-blocking (#2059) |
| T223 | mongodb/mongo-python-driver | `t223/base` | PYTHON-5288: SRV hostname validation fails when resolver and resolved hostnames are identical with three domain levels (#2272) |
| T224 | graphql-python/graphql-core | `t224/base` | fix(incremental): await async incremental cleanup |
| T225 | graphql-python/graphql-core | `t225/base` | fix(incremental): fix paths for subsequent async stream items |
| T226 | graphql-python/graphql-core | `t226/base` | fix(incremental): emit only single completion when multiple deferred grouped field sets error |
| T227 | graphql-python/graphql-core | `t227/base` | fix: enhance runtime invalid default value error messages |
| T228 | dask/dask | `t228/base` | Fix annotations and spans leaking between threads (#10367) |
| T229 | dask/dask | `t229/base` | Fix orphaned dependencies in Fused expression (#1163) |
| T230 | dask/dask | `t230/base` | Fix crash in `asarray(..., like=...)` vs. scipy.sparse objects (#11755) |
| T231 | python-poetry/poetry | `t231/base` | fix(keyring): make keyring unlock thread safe |
| T232 | python-poetry/poetry | `t232/base` | fix: reinstall editable dependencies when develop mode changes (#11022) |
| T233 | python-poetry/poetry | `t233/base` | fix index error for yanked releases without dependencies |
| T234 | Textualize/textual | `t234/base` | fix threading issue (#3779) |
| T235 | Textualize/textual | `t235/base` | Fix CSS watcher crashing when file becomes unavailable... (#4079) |
| T236 | Textualize/textual | `t236/base` | fix screen padding crash |
| T237 | redis/redis-py | `t237/base` | fix(connection): parse retry_on_error URL query as exception classes (#4281) |
| T238 | ipython/ipython | `t238/base` | Try to fix history manager thread leakage |
| T239 | ipython/ipython | `t239/base` | Fix issues due to breaking tokenize changes in 3.12 |
| T240 | celery/celery | `t240/base` | Fix #6912 rpc backend reconnection error (#10179) |
| T241 | celery/celery | `t241/base` | Choose queue type and exchange type when creating missing queues (fix #9671) (#9815) |
| T242 | jd/tenacity | `t242/base` | fix: Restore contents of retry attribute for wrapped functions (#484) |
| T243 | jd/tenacity | `t243/base` | Keep statistics visible when @retry is further wrapped (fixes #519) (#653) |
| T244 | pytest-dev/pytest | `t244/base` | Remove PytestReturnNotNoneWarning and PytestUnhandledCoroutineWarning. Make tests fail instead of raising warning/exception. fix tests. add changelog. |
| T245 | pytest-dev/pytest | `t245/base` | Fix crash when passing a very long cmdline argument (#11404) |
| T246 | nedbat/coveragepy | `t246/base` | fix: avoid max recursion errors in ast code. #1774 |
| T247 | python-trio/trio | `t247/base` | raise brokenresourceerror if registering an already exited task. fix docstring. fix runtimewarning transforming into triointernalerror. add a bunch of tests |
| T248 | python-trio/trio | `t248/base` | add newsfragments, add StalledLockError, reraise BrokenResourceError as it in acquire, update docstrings. docs are failing to build locally but idk wth is wrong |
| T249 | encode/uvicorn | `t249/base` | Fix spurious LocalProtocolError errors when processing pipelined requests (#2243) |
| T250 | fastapi/fastapi | `t250/base` | 🐛 Fix unhandled growing memory for internal server errors, refactor dependencies with `yield` and `except` to require raising again as in regular Python (#11191) |
| T251 | mitmproxy/mitmproxy | `t251/base` | fix use of `asyncio.create_task` (#7443) |
| T252 | agronholm/apscheduler | `t252/base` | Fixed ResourceWarnings about unclosed memory object streams |
| T253 | tox-dev/filelock | `t253/base` | 🐛 fix(soft-rw): replace the state mutex with a generation log (#738) |
| T254 | tox-dev/tox | `t254/base` | Fix TOML configuration errors (#3388) |
| T255 | sqlalchemy/sqlalchemy | `t255/base` | deprecate joinedload, subqueryload with DML; use correct statement |
| T256 | Delgan/loguru | `t256/base` | Fix error using "set_start_method()" after "logger" import (#974) |
| T257 | pallets/werkzeug | `t257/base` | fix cache control issues |
| T258 | pypa/pip | `t258/base` | Fix crash on invalid entry points (#14220) |

## T219 — mongodb/mongo-python-driver

- 仓库地址：https://github.com/mongodb/mongo-python-driver
- 初始环境：`t219/base`（上游 mongodb/mongo-python-driver @ 6ba1e27e4079）
- 上游修复提交：0a81ea377195（2026-09-08）
- 改动文件：pymongo/asynchronous/pool.py, pymongo/synchronous/pool.py

```text
pymongo 在 gevent 模式下会死锁：一个 greenlet 在还连接的过程中被 kill 掉，checkin 那条路径的计数簿记没补回来，池子里的可用连接就少一个、而且卡在里面出不来。我们反复借还 + 随机 kill，跑一会儿整个进程就不动了。同一块还有个小问题：借出失败的时候计数会被多扣一次。

请把 synchronous 和 asynchronous 两套 pool 都修好。补测试：借出出错时计数只能扣一次、acquire 过程中被 kill 的簿记要对、以及反复 kill 的压测不能死锁。
```

## T220 — mongodb/mongo-python-driver

- 仓库地址：https://github.com/mongodb/mongo-python-driver
- 初始环境：`t220/base`（上游 mongodb/mongo-python-driver @ 35e51a50f3ec）
- 上游修复提交：5da91837d4db（2026-04-15）
- 改动文件：pymongo/asynchronous/mongo_client.py, pymongo/synchronous/mongo_client.py

```text
pymongo 的重试退避（Retryable Writes / Reads 那套）行为不对：服务端过载错误之后紧接着一个普通错误时，读和写的重试次数没有被正确增加；反过来，非过载的错误也不该套用退避。我们对着驱动的规范逐条核过，这块和规范对不上。

请把同步和异步两套客户端都修对。补测试：非过载错误不退避、过载之后又遇到非过载错误时读/写的重试次数要按规范增加。
```

## T221 — mongodb/mongo-python-driver

- 仓库地址：https://github.com/mongodb/mongo-python-driver
- 初始环境：`t221/base`（上游 mongodb/mongo-python-driver @ e82e6d7e8491）
- 上游修复提交：06041261cb90（2026-06-08）
- 改动文件：pymongo/asynchronous/pool.py, pymongo/synchronous/pool.py

```text
pymongo 的 ConnectionPool._reset() 有竞态：重置刚好和别的操作撞上时状态会不一致，我们 CI 上表现为偶发失败，本地跑个几百次能撞到一次。

请把 _reset 这条路径的竞态修掉，synchronous 和 asynchronous 都要，补一个能稳定复现的测试。
```

## T222 — mongodb/mongo-python-driver

- 仓库地址：https://github.com/mongodb/mongo-python-driver
- 初始环境：`t222/base`（上游 mongodb/mongo-python-driver @ 8fa6750a7e07）
- 上游修复提交：e4d84494c321（2025-01-17）
- 改动文件：pymongo/asynchronous/auth.py, pymongo/asynchronous/helpers.py, pymongo/asynchronous/pool.py, pymongo/synchronous/auth.py, pymongo/synchronous/helpers.py, pymongo/synchronous/pool.py

```text
pymongo 里做 DNS 解析用的是阻塞式 getaddrinfo，在 asyncio 里会把整个事件循环卡住（认证、连接池、helper 好几处都有调用）。我们的服务在解析慢的时候会整体卡顿几秒。

请把这些解析改成非阻塞（asyncio 里丢到执行器跑），同步那套保持原来的语义不要改。补测试确认解析过程不再阻塞事件循环。
```

## T223 — mongodb/mongo-python-driver

- 仓库地址：https://github.com/mongodb/mongo-python-driver
- 初始环境：`t223/base`（上游 mongodb/mongo-python-driver @ 3c2ce16ad85d）
- 上游修复提交：86e221eb5cc6（2025-04-09）
- 改动文件：pymongo/asynchronous/srv_resolver.py, pymongo/synchronous/srv_resolver.py

```text
pymongo 的 SRV 主机名校验太严了：当 SRV 记录返回的主机名和查询用的 hostname 完全一样、而 hostname 只有三段（形如 a.b.c）时，按规范这是合法的，现在却被判成不合法，连接直接失败。

请把这条校验修对，同步和异步解析器都要，补一个这种"三段同名"的用例。
```

## T224 — graphql-python/graphql-core

- 仓库地址：https://github.com/graphql-python/graphql-core
- 初始环境：`t224/base`（上游 graphql-python/graphql-core @ b933887be051）
- 上游修复提交：d8a96ac7f5e5（2026-06-10）
- 改动文件：src/graphql/execution/execute.py, src/graphql/execution/incremental_graph.py, src/graphql/execution/incremental_publisher.py, src/graphql/execution/types.py, src/graphql/pyutils/boxed_awaitable_or_value.py

```text
graphql-core 的 incremental 执行（@defer / @stream）异步清理没做对：停掉 publisher 的时候，挂着的增量任务不会被取消、也不会等它们收尾；流该关的时候没关；abort 之后，之前排队的结果还会继续发出来，而且没有带上 abort 原因。

请按 graphql-js 那边的语义把异步清理补齐：停止要取消并等待所有挂起的增量工作结束、流源只在异常停止时关闭、abort 要在清理完成之后才把后续结果用 abort 原因拒掉，同时要有多个消费者时的行为。补测试覆盖这些时序。
```

## T225 — graphql-python/graphql-core

- 仓库地址：https://github.com/graphql-python/graphql-core
- 初始环境：`t225/base`（上游 graphql-python/graphql-core @ 53aa07bd17bc）
- 上游修复提交：bab512e5abc7（2026-03-05）
- 改动文件：src/graphql/execution/execute.py, src/graphql/execution/incremental_graph.py

```text
graphql-core 的 incremental：异步流里第二个及之后的 item，给出的 path 是错的，和 graphql-js 的行为对不上，客户端按 path 归位数据就错位了。

请对齐 graphql-js 的实现把后续 item 的 path 修好，补测试。
```

## T226 — graphql-python/graphql-core

- 仓库地址：https://github.com/graphql-python/graphql-core
- 初始环境：`t226/base`（上游 graphql-python/graphql-core @ ba48968a507b）
- 上游修复提交：793700214c53（2025-10-29）
- 改动文件：src/graphql/execution/incremental_graph.py, src/graphql/execution/incremental_publisher.py

```text
graphql-core 的 incremental：当多个 deferred 的 grouped field set 同时出错时，会发出多条 completion，客户端收到重复的结束事件（有的框架会因此重复收尾）。

请改成只发一条 completion，补测试。
```

## T227 — graphql-python/graphql-core

- 仓库地址：https://github.com/graphql-python/graphql-core
- 初始环境：`t227/base`（上游 graphql-python/graphql-core @ 31171e1425de）
- 上游修复提交：a4b1d6f741e8（2026-06-11）
- 改动文件：src/graphql/execution/values.py, src/graphql/type/validate.py, src/graphql/utilities/coerce_input_value.py

```text
graphql-core 里 schema 中非法默认值的报错信息很难用：它把 Python 对象直接打出来，AST 节点没有被展开，用户看到的是 <ast.Constant ...> 这种东西，根本不知道哪段字面量有问题。

请把这类报错改成能看清实际字面量的形式（像 print_ast 那样展开），执行期取值、schema 校验、输入强制转换这三条路径都要覆盖。补测试。
```

## T228 — dask/dask

- 仓库地址：https://github.com/dask/dask
- 初始环境：`t228/base`（上游 dask/dask @ 416be4d99a05）
- 上游修复提交：0454f34432f5（2023-06-22）
- 改动文件：dask/__init__.py, dask/base.py, dask/dataframe/io/parquet/core.py, dask/highlevelgraph.py

```text
dask 的 annotations（以及 span 相关标注）会在线程之间串：一个线程里设的 annotation 会漏到另一个线程正在构造的图里，于是本该只在 A 线程生效的配置出现在了 B 线程的图上；另外出错的图还会把 annotation 留着不清理。

请把 annotation 的作用域按线程隔离好，异常路径也要清理。补测试：annotation 不跨线程泄漏、出错之后要被清掉。
```

## T229 — dask/dask

- 仓库地址：https://github.com/dask/dask
- 初始环境：`t229/base`（上游 dask/dask @ 735fc8904832）
- 上游修复提交：4cb13201687f（2024-11-13）
- 改动文件：dask_expr/_expr.py, dask_expr/_indexing.py

```text
dask-expr 的 Fused 表达式会留下孤立的依赖：融合之后有些依赖没被带上去、有些没被清掉，图里出现孤儿节点，执行时会去取已经不该存在的依赖。

请把 Fused 的依赖管理修好，补一个测试。
```

## T230 — dask/dask

- 仓库地址：https://github.com/dask/dask
- 初始环境：`t230/base`（上游 dask/dask @ 6b2c08beda5f）
- 上游修复提交：019309acc16e（2025-02-21）
- 改动文件：dask/array/core.py, dask/array/utils.py

```text
dask.array 的 asarray(..., like=xxx) 碰到 scipy.sparse 对象会直接崩；meta 推导那条路径也不认 scipy 的稀疏矩阵，拿它当 ndarray 处理。

请把这两处修好（meta 推导要认稀疏矩阵，asarray 的 like= 分支不要崩），补测试。
```

## T231 — python-poetry/poetry

- 仓库地址：https://github.com/python-poetry/poetry
- 初始环境：`t231/base`（上游 python-poetry/poetry @ 1ac829f5e49c）
- 上游修复提交：11d76b6ecc91（2025-01-27）
- 改动文件：src/poetry/console/commands/installer_command.py, src/poetry/utils/password_manager.py, tests/helpers.py

```text
poetry install 的时候执行器是用线程池并发跑的，于是多个 keyring 解锁请求会同时打出去：凭据存储被锁住时，要么卡住、要么多个解锁互相打架、行为完全不确定；坏掉的 keyring 也报不出清楚的错。

请让 keyring 这块的解锁变成线程安全的（同时只允许一次解锁、其它等结果），错误要能正常冒出来。补测试：坏掉的 keyring、被锁住的 keyring 两种情况。
```

## T232 — python-poetry/poetry

- 仓库地址：https://github.com/python-poetry/poetry
- 初始环境：`t232/base`（上游 python-poetry/poetry @ acb779e60add）
- 上游修复提交：d447dacd7c45（2026-09-18）
- 改动文件：src/poetry/puzzle/transaction.py, src/poetry/repositories/installed_repository.py

```text
poetry 里依赖在"可编辑安装"和"普通安装"之间切换时不会重新安装：本来 dev 模式装进去的包，改了 develop 设置之后还是老样子；反过来，不属于 editable 的包类型不该被这个设置影响。

请把这块的判断逻辑修好，补两个测试（可编辑切换要重装、非 editable 类型忽略该设置）。
```

## T233 — python-poetry/poetry

- 仓库地址：https://github.com/python-poetry/poetry
- 初始环境：`t233/base`（上游 python-poetry/poetry @ ebe7adad3a3a）
- 上游修复提交：6e1bf8b72e8f（2024-11-17）
- 改动文件：src/poetry/repositories/http_repository.py, src/poetry/repositories/pypi_repository.py, tests/repositories/fixtures/distribution_hashes.py, tests/repositories/fixtures/pypi.org/generate.py, tests/repositories/fixtures/pypi.org/json/isodate.json, tests/repositories/fixtures/pypi.org/json/isodate/0.7.0.json, tests/repositories/fixtures/pypi.org/metadata/isodate-0.7.0-py3-none-any.whl.metadata, tests/repositories/fixtures/pypi.org/stubbed/isodate-0.7.0-py3-none-any.whl

```text
poetry 解析 PyPI 元数据时，碰到被 yanked 且没有依赖信息的 release 会抛 IndexError（列表越界），整个解析就断了。

请修好这条路径，补一个这种包的测试。
```

## T234 — Textualize/textual

- 仓库地址：https://github.com/Textualize/textual
- 初始环境：`t234/base`（上游 Textualize/textual @ eed7a94edac0）
- 上游修复提交：1a76b628c78c（2023-11-29）
- 改动文件：pyproject.toml, src/textual/app.py, src/textual/driver.py, src/textual/pilot.py

```text
textual 在非主线程里驱动的时候会出问题：线程相关的状态没有隔离，driver 那层也没按线程区分，跑起来要么报错要么行为不一致。

请把这块的线程处理修好，补测试。
```

## T235 — Textualize/textual

- 仓库地址：https://github.com/Textualize/textual
- 初始环境：`t235/base`（上游 Textualize/textual @ f017604cfcc1）
- 上游修复提交：60e0d8d4c131（2024-01-31）
- 改动文件：src/textual/app.py, src/textual/file_monitor.py

```text
textual 的 CSS 文件监听在文件临时不可用的时候会崩：文件被删掉、还没创建出来、或者刚被移走，watcher 就抛异常，整个 app 起不来或者刷错误日志。

请让这些情况优雅处理（给个警告就好，文件回来之后能继续监听），补测试：文件不存在、文件被删、文件从来没出现过。
```

## T236 — Textualize/textual

- 仓库地址：https://github.com/Textualize/textual
- 初始环境：`t236/base`（上游 Textualize/textual @ 8ce58dc0287e）
- 上游修复提交：e02c6cc01461（2026-06-25）
- 改动文件：src/textual/_compositor.py, src/textual/pilot.py, src/textual/screen.py

```text
textual 里带 padding 的 Screen 在某些操作下会崩：比如在屏幕上做选择、然后往下移动的时候直接抛异常。

请修好这条路径，补测试。
```

## T237 — redis/redis-py

- 仓库地址：https://github.com/redis/redis-py
- 初始环境：`t237/base`（上游 redis/redis-py @ 6edf0f886411）
- 上游修复提交：0f3a2ebd6e83（2026-08-29）
- 改动文件：redis/asyncio/connection.py, redis/connection.py

```text
redis-py 从连接 URL 里解析 retry_on_error 参数是坏的：它把字符串按字符拆开，结果 Retry 拿到一堆单字符的 except 子句，一用就 TypeError。

请改成按逗号拆分，并把里面的异常名解析成 redis.exceptions 里真正的异常类（空项要报错、方括号列表写法也要支持），同步和异步连接都要。补测试覆盖逗号分隔、方括号列表、空项、以及解析成异常类这几种。
```

## T238 — ipython/ipython

- 仓库地址：https://github.com/ipython/ipython
- 初始环境：`t238/base`（上游 ipython/ipython @ 051b3c36fafe）
- 上游修复提交：52af196c2eee（2025-02-14）
- 改动文件：IPython/core/history.py, IPython/core/interactiveshell.py

```text
IPython 的 history manager 会漏线程：它自己起的保存线程基本只在进程退出时才清理，下游用一阵子就攒出几十个阻塞线程，查死锁特别费劲。

请把这套清理逻辑重做（保存线程和 history manager 分开管、该停的时候要能停掉），补测试。
```

## T239 — ipython/ipython

- 仓库地址：https://github.com/ipython/ipython
- 初始环境：`t239/base`（上游 ipython/ipython @ cf7c26643542）
- 上游修复提交：1098b2c170ae（2023-06-28）
- 改动文件：IPython/core/inputsplitter.py, IPython/core/inputtransformer.py, IPython/core/inputtransformer2.py, IPython/utils/tokenutil.py

```text
IPython 在 Python 3.12 上因为 tokenize 的行为变化出了问题：inputsplitter、inputtransformer、tokenutil 这几处解析出来的结果和以前不一样，有些输入会被判错（该完整的说不完整、该报错的又不报）。

请修好让 3.12 上和旧版本行为一致，补测试。
```

## T240 — celery/celery

- 仓库地址：https://github.com/celery/celery
- 初始环境：`t240/base`（上游 celery/celery @ 6b1fad369597）
- 上游修复提交：6b20dcd2d16b（2026-03-08）
- 改动文件：celery/backends/asynchronous.py, celery/backends/rpc.py

```text
celery 的 RPC 结果后端连接断了之后不会重连：drain events 那条路径碰到连接或 channel 错误直接把异常抛出去，worker 之后就再也收不到结果了；有时候只报个 OSError 就断了。

请给这条路径加上重连处理（该重试的重试、不是连接类的错误照常抛、原有的队列要保住），补测试。
```

## T241 — celery/celery

- 仓库地址：https://github.com/celery/celery
- 初始环境：`t241/base`（上游 celery/celery @ 3703beb4589b）
- 上游修复提交：166f705adcae（2025-08-31）
- 改动文件：celery/app/amqp.py, celery/app/control.py, celery/app/defaults.py, celery/events/receiver.py

```text
celery 自动创建不存在的队列（task_create_missing_queues=True）时，队列类型和交换器类型都写死成经典队列 + direct 交换器，没法配成 quorum 之类的类型。

请加两个配置项分别控制自动创建时的 queue type 和 exchange type（默认行为一点都不能变），control mailbox 和事件队列那条路径也要跟着支持，不合法的组合要明确报错。补测试。
```

## T242 — jd/tenacity

- 仓库地址：https://github.com/jd/tenacity
- 初始环境：`t242/base`（上游 jd/tenacity @ 33cd0e1d4ac5）
- 上游修复提交：31fe2d0cf250（2024-07-05）
- 改动文件：releasenotes/notes/fix-retry-wrapper-attributes-f7a3a45b8e90f257.yaml, tenacity/__init__.py, tenacity/asyncio/__init__.py

```text
tenacity 把函数包一层之后，被包装函数上的 retry 属性丢了：我们的代码会直接取 func.retry 用，现在拿到的是 AttributeError；再套一层用 functools.wraps 的装饰器之后更取不到。

请把这个属性保留下来，同步和异步两条路径都要，补测试。
```

## T243 — jd/tenacity

- 仓库地址：https://github.com/jd/tenacity
- 初始环境：`t243/base`（上游 jd/tenacity @ b2cd0274c676）
- 上游修复提交：4213bad95604（2026-07-12）
- 改动文件：releasenotes/notes/fix-statistics-through-outer-decorator-b8a6d6b9a6a70833.yaml, tenacity/__init__.py, tenacity/asyncio/__init__.py

```text
tenacity：@retry 装饰过的函数，外面再套一个用 functools.wraps 的装饰器（比如加个计时），之后 func.statistics 就变成空的 {}，统计全丢了——外层包装的 __dict__ 把内层的统计对象覆盖掉了。

请让统计在这种嵌套包装下依然可访问，补测试。
```

## T244 — pytest-dev/pytest

- 仓库地址：https://github.com/pytest-dev/pytest
- 初始环境：`t244/base`（上游 pytest-dev/pytest @ 45c2ffb635ad）
- 上游修复提交：216ec3c0ba87（2024-10-25）
- 改动文件：src/_pytest/config/exceptions.py, src/_pytest/python.py, src/_pytest/warning_types.py, src/pytest/__init__.py, testing/acceptance_test.py

```text
pytest 里"测试函数返回了非 None"和"忘了 await 的协程测试"这两类问题现在只是警告或者干脆以异常形式冒出来，很容易被忽略掉，我们踩过好几次。

请把它们改成明确的失败（对应的警告类型一起移除），补测试：同步函数返回非 None、async 函数、async generator 三种都要报错。
```

## T245 — pytest-dev/pytest

- 仓库地址：https://github.com/pytest-dev/pytest
- 初始环境：`t245/base`（上游 pytest-dev/pytest @ 333e4eba6b09）
- 上游修复提交：28ccf476b91b（2023-09-07）
- 改动文件：src/_pytest/main.py, src/_pytest/pathlib.py

```text
pytest 收到超长的命令行参数时会崩（我们项目里有个路径特别长），报出来的是文件系统层面的异常，看不出跟参数有关。

请修好这条路径，补测试。
```

## T246 — nedbat/coveragepy

- 仓库地址：https://github.com/nedbat/coveragepy
- 初始环境：`t246/base`（上游 nedbat/coveragepy @ 34af01dfc877）
- 上游修复提交：5fa9f67853a7（2024-05-04）
- 改动文件：coverage/phystokens.py, coverage/regions.py

```text
coverage.py 在分析某些源码的 AST 时会撞到 Python 的递归上限：解析嵌套很深的表达式或者多行结构时直接 RecursionError，覆盖率跑不完。

请把 phystokens 和 regions 里这两处递归改成不会爆栈，补测试。
```

## T247 — python-trio/trio

- 仓库地址：https://github.com/python-trio/trio
- 初始环境：`t247/base`（上游 python-trio/trio @ c742a52da0fe）
- 上游修复提交：7a1ce5b755b5（2024-10-02）
- 改动文件：src/trio/_core/_parking_lot.py, src/trio/_core/_run.py

```text
trio 里往一个已经退出的 task 上注册（parking lot 那条路径）时行为不对：本该抛 BrokenResourceError，现在要么不抛、要么把一个 RuntimeWarning 转成了 TrioInternalError。相关函数的 docstring 也和实际行为对不上。

请把语义修对、docstring 一并更正，补测试。
```

## T248 — python-trio/trio

- 仓库地址：https://github.com/python-trio/trio
- 初始环境：`t248/base`（上游 python-trio/trio @ 94ff9a27ca03）
- 上游修复提交：eb7a451022a6（2024-09-10）
- 改动文件：src/trio/__init__.py, src/trio/_core/_parking_lot.py, src/trio/_sync.py

```text
trio 的锁在超时和被打断时的异常语义不对：等锁超时应该抛 StalledLockError，现在抛的是别的；acquire 里被打破时应该把 BrokenResourceError 原样重抛，也不对。

请把这两个语义对齐，补测试。
```

## T249 — encode/uvicorn

- 仓库地址：https://github.com/encode/uvicorn
- 初始环境：`t249/base`（上游 encode/uvicorn @ 4f74ed144768）
- 上游修复提交：2ff704b91c8a（2024-02-10）
- 改动文件：uvicorn/protocols/http/h11_impl.py, uvicorn/protocols/http/httptools_impl.py

```text
uvicorn 处理 HTTP pipelining（同一个连接上连着发多个请求）时会冒出莫名其妙的 LocalProtocolError：第二个请求在第一个还没处理完的时候就被喂进 h11，keep-alive 超时那条路径上特别容易触发。

请修好，补一个 pipelining + keepalive 超时的测试。
```

## T250 — fastapi/fastapi

- 仓库地址：https://github.com/fastapi/fastapi
- 初始环境：`t250/base`（上游 fastapi/fastapi @ 6336604906d5）
- 上游修复提交：bf771bd7817f（2024-02-25）
- 改动文件：docs_src/dependencies/tutorial008c.py, docs_src/dependencies/tutorial008c_an.py, docs_src/dependencies/tutorial008c_an_py39.py, docs_src/dependencies/tutorial008d.py, docs_src/dependencies/tutorial008d_an.py, docs_src/dependencies/tutorial008d_an_py39.py, fastapi/routing.py

```text
fastapi 里用 yield 做资源清理的依赖，在内部错误（500）的时候清理没跑，跑久了内存一直涨——except 分支把异常吞掉之后，依赖的收尾逻辑就不执行了。

请按普通 Python 的语义来要求这个写法（异常要重新抛出才能正常收尾），routing 和文档示例一起改，补测试覆盖正常、404、内部错误三种情况。
```

## T251 — mitmproxy/mitmproxy

- 仓库地址：https://github.com/mitmproxy/mitmproxy
- 初始环境：`t251/base`（上游 mitmproxy/mitmproxy @ 6e4cb235fdc7）
- 上游修复提交：9957abf10673（2025-01-06）
- 改动文件：mitmproxy/addons/clientplayback.py, mitmproxy/addons/keepserving.py, mitmproxy/addons/proxyserver.py, mitmproxy/addons/readfile.py, mitmproxy/addons/script.py, mitmproxy/master.py, mitmproxy/proxy/server.py, mitmproxy/tools/web/app.py

```text
mitmproxy 里好几处直接 asyncio.create_task 起后台任务，返回的任务对象不留引用，随时可能被 GC 掉（异常也被吞了）；addon 和 proxy server 那边都有这个问题。

请统一改成保留引用的做法（给个封装函数），补测试。
```

## T252 — agronholm/apscheduler

- 仓库地址：https://github.com/agronholm/apscheduler
- 初始环境：`t252/base`（上游 agronholm/apscheduler @ 791b6947b8a9）
- 上游修复提交：43acae07db36（2024-07-13）
- 改动文件：src/apscheduler/eventbrokers/asyncpg.py, src/apscheduler/eventbrokers/psycopg.py

```text
apscheduler 用 asyncpg / psycopg 的事件代理时，跑完会报一堆 ResourceWarning：asyncio 的内存对象流没有被关闭。

请把这些流正确关闭，别留警告，补测试。
```

## T253 — tox-dev/filelock

- 仓库地址：https://github.com/tox-dev/filelock
- 初始环境：`t253/base`（上游 tox-dev/filelock @ 20929f7d1439）
- 上游修复提交：f9743288a288（2026-09-17）
- 改动文件：src/filelock/_lease.py, src/filelock/_soft_rw/__init__.py, src/filelock/_soft_rw/_async.py, src/filelock/_soft_rw/_protocol.py, src/filelock/_soft_rw/_storage.py, src/filelock/_soft_rw/_sync.py, tasks/coverage_pragmas.py

```text
filelock 的 soft-rw（共享读写那套）现在用一个状态互斥量维护跨进程/跨任务的状态，压测下会出这些问题：读到过期的列表、被压缩掉的 generation 还有参与者在用、以及提交明明落地了却被上报成丢失。

请把这套状态改成 generation log 的形式：能识别被压缩掉的 generation、参与者落后时重新扫描、拿不准的情况要 fail closed。补测试覆盖这几种时序。
```

## T254 — tox-dev/tox

- 仓库地址：https://github.com/tox-dev/tox
- 初始环境：`t254/base`（上游 tox-dev/tox @ 719b3462b58b）
- 上游修复提交：34d3adc0ed53（2024-10-02）
- 改动文件：.pre-commit-config.yaml, src/tox/config/loader/convert.py, src/tox/config/loader/memory.py, src/tox/config/loader/str_convert.py, src/tox/config/loader/toml/__init__.py, src/tox/config/loader/toml/_replace.py, src/tox/config/loader/toml/_validate.py, src/tox/config/set_env.py

```text
tox 读 TOML 配置时有一批问题：replace 的占位符解析（包括空的位置参数）不对、deps / requires 的写法处理错、展示配置的路径也不对，用户照着文档写就报错。

请把 TOML loader 这块修好（转换、校验、替换三条都要），补测试。
```

## T255 — sqlalchemy/sqlalchemy

- 仓库地址：https://github.com/sqlalchemy/sqlalchemy
- 初始环境：`t255/base`（上游 sqlalchemy/sqlalchemy @ 75ab6b370034）
- 上游修复提交：9ea449bf4100（2024-09-09）
- 改动文件：lib/sqlalchemy/orm/bulk_persistence.py, lib/sqlalchemy/orm/context.py, lib/sqlalchemy/orm/query.py, lib/sqlalchemy/orm/strategies.py, lib/sqlalchemy/orm/strategy_options.py

```text
sqlalchemy 里对不是 SELECT 的语句（比如 insert().returning()）用顶层的 joinedload / subqueryload，现在行为很乱：SQL 里既没有 JOIN 也没有子查询可放，结果错误或者直接崩，用户完全不知道为什么。

请改成明确报 ORM 异常并说清原因，把相关的 deprecation 处理一起补齐。补测试覆盖 insert 支持/不支持、隐含场景、以及二次选项。
```

## T256 — Delgan/loguru

- 仓库地址：https://github.com/Delgan/loguru
- 初始环境：`t256/base`（上游 Delgan/loguru @ 14fa062bdb43）
- 上游修复提交：086126fd8d00（2023-09-11）
- 改动文件：loguru/_handler.py, loguru/_logger.py

```text
loguru 里在导入 logger 之后再调 multiprocessing.set_start_method() 会报错：loguru 内部用了 multiprocessing.get_context(method=None)，而这个调用有个副作用——它会把全局的 start method 固定下来，之后就改不了了。

请把这个副作用去掉（enqueue=False 的时候不要碰全局设置），补测试。
```

## T257 — pallets/werkzeug

- 仓库地址：https://github.com/pallets/werkzeug
- 初始环境：`t257/base`（上游 pallets/werkzeug @ 855665483334）
- 上游修复提交：b28001e06f71（2024-04-19）
- 改动文件：src/werkzeug/datastructures/cache_control.py, src/werkzeug/datastructures/cache_control.pyi, src/werkzeug/utils.py

```text
werkzeug 的 Cache-Control 解析有两处不符合 RFC：
no-transform 是无参数指令，现在不管有没有这个指令都返回 None，应该返回 True/False；
min-fresh 是必须带参数的，现在参数可以不写，类型标注也不对。

请按规范修好解析和类型标注，补测试。
```

## T258 — pypa/pip

- 仓库地址：https://github.com/pypa/pip
- 初始环境：`t258/base`（上游 pypa/pip @ e62cc2de8abf）
- 上游修复提交：d7d0d0a39494（2026-08-04）
- 改动文件：src/pip/_internal/metadata/importlib/_dists.py, src/pip/_internal/metadata/pkg_resources.py

```text
pip 在安装的包里 entry_points.txt 有非法内容时会直接吐 traceback：pkg_resources 抛的是裸的 ValueError，没有被转成安装错误，用户看到一大段堆栈。

请把这类错误转成清晰的 InstallationError（Python 3.15 的 importlib.metadata 也会在解析时校验 entry points，一并处理），补测试。
```
