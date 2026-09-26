# 高难度 Bug 修复题·第五辑（50 道）

口径同前四辑：并发 / 取消 / 资源生命周期 / 状态一致性 / 协议与迁移正确性，改动跨多个文件，症状离根因远。

| 题号 | 上游仓库 | 分支 | 一句话 |
| --- | --- | --- | --- |
| T299 | psycopg/psycopg | `t299/base` | fix: finish the PGconn upon connection failure |
| T300 | psycopg/psycopg | `t300/base` | fix: include timeout as part of the generators/wait conversation |
| T301 | psycopg/psycopg | `t301/base` | fix(pool): fix infinite loop with close_returns=True |
| T302 | psycopg/psycopg | `t302/base` | fix(pool): trap CancelledError more consistently in the pool codebase |
| T303 | psycopg/psycopg | `t303/base` | fix: cancel a running query on SystemExit |
| T304 | getsentry/sentry-python | `t304/base` | fix(batcher): Do not let a failed flush kill the flusher thread |
| T305 | getsentry/sentry-python | `t305/base` | Fix cache pollution from mutable reference (#3887) |
| T306 | getsentry/sentry-python | `t306/base` | fix(grpc): Derive interception state from channel fields (#5302) |
| T307 | getsentry/sentry-python | `t307/base` | fix(integrations): hooking into error tracing function to find out if an execute tool span should be set to error (#4986) |
| T308 | getsentry/sentry-python | `t308/base` | fix(asyncpg): Add db.query.text to streamed query spans (#6633) |
| T309 | strawberry-graphql/strawberry | `t309/base` | fix: correct dataclass transform ordering metadata (#4591) |
| T310 | strawberry-graphql/strawberry | `t310/base` | Fix cleanup logic in graphql_ws protocol handler (#3778) |
| T311 | strawberry-graphql/strawberry | `t311/base` | Fix graphql ws did not ignore parsing errors (#3670) |
| T312 | strawberry-graphql/strawberry | `t312/base` | fix: Ensure asyncgens gets properly closed in case of errors (#3834) |
| T313 | strawberry-graphql/strawberry | `t313/base` | Fix MaskErrors for synchronous pre-execution errors (#3968) |
| T314 | tortoise/tortoise-orm | `t314/base` | Fix concurrent initialization of connection pool (#1825) |
| T315 | tortoise/tortoise-orm | `t315/base` | Fix AlterField ignoring max_length changes in migrations (#2128) |
| T316 | tortoise/tortoise-orm | `t316/base` | Fix query error when model with o2o pk and m2m field (#1783) |
| T317 | tortoise/tortoise-orm | `t317/base` | fix: update pk field only raises unfriendly error (#1873) |
| T318 | pdm-project/pdm | `t318/base` | fix: don't touch caches if no-cache is given (#2913) |
| T319 | pdm-project/pdm | `t319/base` | fix(cache): ensure installation and cache works with any environment (#2839) |
| T320 | pylint-dev/pylint | `t320/base` | Fix multiple crashes for classes with duplicate or inconsistent bases (#11272) |
| T321 | pylint-dev/pylint | `t321/base` | Fix a crash in not--context-manager when the manager has no name (#11103) |
| T322 | networkx/networkx | `t322/base` | New PR for Fixes minimal d-separator function failing to handle cases where no d-separators exist (#7019) |
| T323 | networkx/networkx | `t323/base` | BUG: Hold the graph weakly in cached edge and degree views (#8892) |
| T324 | pgjones/hypercorn | `t324/base` | Bugfix ensure ExceptionGroup lifespan failures crash the server |
| T325 | pgjones/hypercorn | `t325/base` | fix connection state leak |
| T326 | fsspec/filesystem_spec | `t326/base` | Fix infinite recursion in expand_path when resolving paths with glob magic characters (#2036) (#2038) |
| T327 | fsspec/filesystem_spec | `t327/base` | LocalFileSystem fix _strip_protocol for root directory (#1477) |
| T328 | fsspec/filesystem_spec | `t328/base` | fixes to parquet and known cache (#1982) |
| T329 | tkem/cachetools | `t329/base` | Fix #294: Prevent "cache stampede" in cachetools.func decorators. |
| T330 | tkem/cachetools | `t330/base` | Fix #357: Add cache_info() support for @cachedmethod. |
| T331 | wntrblm/nox | `t331/base` | fix: percolate the `verbose` global option to the `silent` argument for session installation commands, and document it (#983) |
| T332 | wntrblm/nox | `t332/base` | fix: error with helpful message if invalid option is set via nox.options (#871) |
| T333 | pypa/virtualenv | `t333/base` | fix 'Too many open files' error and improve error message (#2922) |
| T334 | pypa/virtualenv | `t334/base` | 🐛 fix(util): replace a stale symlink instead of writing through it (#3229) |
| T335 | pytest-dev/pytest-cov | `t335/base` | Use coverage's functions for checking fail_under. Bumps min coverage requirement to 7.5.0. Closes #611. Fixes #601. Fixes #403. |
| T336 | boto/botocore | `t336/base` | Protocol selection bugfix (#3473) |
| T337 | mongodb/motor | `t337/base` | MOTOR-1479 & MOTOR-1480 Fix build failures from PyMongo 4.17 changes (#386) |
| T338 | kiorky/croniter | `t338/base` | Fix overflow error on 32bit systems |
| T339 | joblib/joblib | `t339/base` | FIX revert MemorizedFunc.call API change (#1576) |
| T340 | nedbat/coveragepy | `t340/base` | fix: avoid a SQLite error when async mode isn't available. #1646 |
| T341 | nedbat/coveragepy | `t341/base` | fix: multi-line statements no longer confuse branch target descriptions. #1874 #1875 |
| T342 | nedbat/coveragepy | `t342/base` | fix: a non-string value in a TOML setting exits with a traceback (#2263) |
| T343 | nedbat/coveragepy | `t343/base` | fix: loop completion arcs on Python 3.14 (#2281) |
| T344 | openai/openai-python | `t344/base` | fix(api): correct prompt_cache_retention enum value from in-memory to in_memory (#1822) |
| T345 | openai/openai-python | `t345/base` | fix(parsing): drop TextFormatT parameterization in parse_response to fix memory leak (#3084) (#3088) |
| T346 | aio-libs/aiohttp | `t346/base` | [PR #11634/cde03b9 backport][3.14] Fix blocking I/O to load netrc when creating requests (#11679) |
| T347 | django/django | `t347/base` | Fixed #36564 -- Changed DEFAULT_AUTO_FIELD from AutoField to BigAutoField. |
| T348 | sqlalchemy/sqlalchemy | `t348/base` | ensure SQL expressions w/o bool pass through to correct typing error |

## T299 — psycopg/psycopg

- 仓库地址：https://github.com/psycopg/psycopg
- 初始环境：`t299/base`（上游 psycopg/psycopg @ 84cb324b267d）
- 上游修复提交：e70010fa2626（2023-05-19）
- 改动文件：psycopg/psycopg/errors.py, psycopg/psycopg/generators.py, psycopg_c/psycopg_c/_psycopg/generators.pyx

```text
psycopg 连接失败时，抛出的异常上带着一个没有 finish 的 PGconn：应用如果没及时处理这个异常对象，libpq 的连接结构就不会被释放（我们线上看到文件描述符和内存一直在涨）。

请改成连接失败时先把 PGconn finish 掉再抛异常，纯 Python 和 C 加速两条实现都要改，补一个能验证 PGconn 已被 finish 的测试。
```

## T300 — psycopg/psycopg

- 仓库地址：https://github.com/psycopg/psycopg
- 初始环境：`t300/base`（上游 psycopg/psycopg @ 63cb46c384c9）
- 上游修复提交：4dbd5c2fdcf4（2024-01-24）
- 改动文件：psycopg/psycopg/_enums.py, psycopg/psycopg/abc.py, psycopg/psycopg/generators.py, psycopg/psycopg/waiting.py, psycopg_c/psycopg_c/_psycopg/generators.pyx, psycopg_c/psycopg_c/_psycopg/waiting.pyx

```text
psycopg 的 wait 函数会把等待超时挡在生成器外面：生成器感知不到超时，于是没法被中断；我们希望超时作为 generators / wait 之间约定的一部分传进去，让等待可以被打断。

请把这套约定改好（同步和异步路径、wait_c 也一起考虑），补测试：wait_ready、异步 wait_ready、以及超时路径。
```

## T301 — psycopg/psycopg

- 仓库地址：https://github.com/psycopg/psycopg
- 初始环境：`t301/base`（上游 psycopg/psycopg @ aa17f53a5364）
- 上游修复提交：6b74a2d0f974（2025-07-26）
- 改动文件：psycopg_pool/psycopg_pool/pool.py, psycopg_pool/psycopg_pool/pool_async.py

```text
psycopg_pool 开了 close_returns=True 之后关池会陷进死循环（池一直认为自己还有连接要关）。同步和异步的池都有这个问题。

请修好关闭逻辑，补测试：close_returns 不死循环、自定义 close() 的情况、以及子类覆盖 close 的场景。
```

## T302 — psycopg/psycopg

- 仓库地址：https://github.com/psycopg/psycopg
- 初始环境：`t302/base`（上游 psycopg/psycopg @ e1c6920f3d62）
- 上游修复提交：cee9e574b7c8（2025-11-21）
- 改动文件：psycopg_pool/psycopg_pool/pool.py, psycopg_pool/psycopg_pool/pool_async.py, psycopg_pool/psycopg_pool/sched.py, psycopg_pool/psycopg_pool/sched_async.py

```text
psycopg_pool 里 CancelledError 的处理不一致：只在一部分地方兜住了，回滚和任务调度那几条路径漏掉，取消时会冒出去或者把池状态搞乱。

请统一在池代码里处理取消（rollback、sched 也要覆盖），补一个回滚时被取消的测试。
```

## T303 — psycopg/psycopg

- 仓库地址：https://github.com/psycopg/psycopg
- 初始环境：`t303/base`（上游 psycopg/psycopg @ 7ce96a874186）
- 上游修复提交：bea9e0c8e29d（2026-09-14）
- 改动文件：psycopg/psycopg/connection.py, psycopg/psycopg/connection_async.py

```text
psycopg 在收到 SystemExit（进程要退出）的时候不会取消正在跑的查询：连接就那么挂在那里，服务端要等超时才回收。

请按 Ctrl-C 那套做法尽力取消查询（同步和异步连接都要），补测试。
```

## T304 — getsentry/sentry-python

- 仓库地址：https://github.com/getsentry/sentry-python
- 初始环境：`t304/base`（上游 getsentry/sentry-python @ 9147b3c8bf03）
- 上游修复提交：e17291eea3d2（2026-08-25）
- 改动文件：sentry_sdk/_batcher.py, sentry_sdk/_span_batcher.py

```text
sentry-python 的 batcher：`_flush_loop` 里调用 `_flush()` 没有包异常，任何一次 flush 失败（序列化或发送时报错）都会把 flusher 线程直接干掉，之后事件再也发不出去。

请让 flush 失败不再杀死线程（记录并继续），补一个 flush 抛异常后循环仍存活的测试。
```

## T305 — getsentry/sentry-python

- 仓库地址：https://github.com/getsentry/sentry-python
- 初始环境：`t305/base`（上游 getsentry/sentry-python @ c3516db643af）
- 上游修复提交：bb85c26a2b87（2024-12-23）
- 改动文件：sentry_sdk/_lru_cache.py, sentry_sdk/flag_utils.py, sentry_sdk/scope.py

```text
sentry-python 的缓存被可变引用污染：缓存里存的对象被外部改动之后再命中，拿到的就是改过的内容（scope / flag_utils 这条链路上出过问题）。

请把这处缓存改成不会被调用方改动影响（不要靠覆盖 copy 行为来兜），补测试。
```

## T306 — getsentry/sentry-python

- 仓库地址：https://github.com/getsentry/sentry-python
- 初始环境：`t306/base`（上游 getsentry/sentry-python @ b5e7e052dd6a）
- 上游修复提交：b0885b88f4fd（2026-01-13）
- 改动文件：sentry_sdk/integrations/grpc/__init__.py, sentry_sdk/integrations/grpc/client.py

```text
sentry-python 的 gRPC 集成用集成级别的标志位判断"是否已经插过 ClientInterceptor"，同一个 channel 被多个客户端复用时判断失效，拦截器会被重复插入。

请改成通过检查 grpc.Channel 上的字段来判断（提供个 helper），补测试。
```

## T307 — getsentry/sentry-python

- 仓库地址：https://github.com/getsentry/sentry-python
- 初始环境：`t307/base`（上游 getsentry/sentry-python @ d7ccf06aea28）
- 上游修复提交：b3b2eb62d9f1（2025-10-29）
- 改动文件：sentry_sdk/integrations/openai_agents/__init__.py, sentry_sdk/integrations/openai_agents/patches/__init__.py, sentry_sdk/integrations/openai_agents/patches/error_tracing.py

```text
sentry-python 的 openai agents 集成里，工具执行失败时 span 没有被标成 error：错误追踪那段逻辑没有覆盖到这条路径。

请接到错误追踪函数上把状态标对，补测试。
```

## T308 — getsentry/sentry-python

- 仓库地址：https://github.com/getsentry/sentry-python
- 初始环境：`t308/base`（上游 getsentry/sentry-python @ de01d8b82131）
- 上游修复提交：c04b9445fc51（2026-06-23）
- 改动文件：sentry_sdk/consts.py, sentry_sdk/tracing_utils.py

```text
sentry-python 的 asyncpg 集成：流式查询（cursor 迭代 / fetch）生成的 span 上缺少 `db.query.text`，看链路的时候对不上是哪个查询。

请把查询文本带上（常量表也要补），补一个 cursor 迭代产生 span 的测试。
```

## T309 — strawberry-graphql/strawberry

- 仓库地址：https://github.com/strawberry-graphql/strawberry
- 初始环境：`t309/base`（上游 strawberry-graphql/strawberry @ c3caabd1188a）
- 上游修复提交：8957d683744b（2026-08-30）
- 改动文件：strawberry/federation/object_type.py, strawberry/federation/schema_directive.py, strawberry/schema_directive.py, strawberry/types/object_type.py

```text
strawberry 的 dataclass transform 在生成 ordering 元数据时顺序不对：自定义 ordering 方法、federation 场景下的 schema directive 都把字段顺序搞乱，生成的排序参数跟声明顺序不一致。

请修好这处元数据顺序（含 federation 和 schema_directive 两条路径），补测试。
```

## T310 — strawberry-graphql/strawberry

- 仓库地址：https://github.com/strawberry-graphql/strawberry
- 初始环境：`t310/base`（上游 strawberry-graphql/strawberry @ 951e56c5885c）
- 上游修复提交：33a5fbd70325（2025-02-27）
- 改动文件：noxfile.py, strawberry/federation/field.py, strawberry/relay/fields.py, strawberry/subscriptions/protocols/graphql_ws/handlers.py, tests/views/schema.py

```text
strawberry 的 graphql-ws 协议处理器清理逻辑不对：连接断开/出错时没有把订阅和资源收干净，长跑会泄漏。

请把清理逻辑修好，补测试。
```

## T311 — strawberry-graphql/strawberry

- 仓库地址：https://github.com/strawberry-graphql/strawberry
- 初始环境：`t311/base`（上游 strawberry-graphql/strawberry @ 2a6d7884b8cd）
- 上游修复提交：b701eb00b398（2024-10-21）
- 改动文件：strawberry/aiohttp/views.py, strawberry/asgi/__init__.py, strawberry/channels/handlers/ws_handler.py, strawberry/http/async_base_view.py, strawberry/http/exceptions.py, strawberry/litestar/controller.py, strawberry/subscriptions/protocols/graphql_transport_ws/handlers.py, strawberry/subscriptions/protocols/graphql_ws/handlers.py

```text
strawberry 的 graphql-ws 在收到非 JSON / 非文本消息时会崩，而不是按协议忽略掉（各种后端——aiohttp / asgi / channels 都一样）。

请改成忽略这类消息（必要时关连接），补测试覆盖协议各阶段。
```

## T312 — strawberry-graphql/strawberry

- 仓库地址：https://github.com/strawberry-graphql/strawberry
- 初始环境：`t312/base`（上游 strawberry-graphql/strawberry @ f0cb9654fcb4）
- 上游修复提交：46b7d6d1a755（2025-04-05）
- 改动文件：strawberry/relay/types.py, strawberry/schema/schema.py, strawberry/utils/aio.py

```text
strawberry 在出错的时候没有把异步生成器（asyncgen）正确关闭，导致 'async generator was never awaited' 之类的告警和资源泄漏。

请修好错误路径上的关闭逻辑，补测试。
```

## T313 — strawberry-graphql/strawberry

- 仓库地址：https://github.com/strawberry-graphql/strawberry
- 初始环境：`t313/base`（上游 strawberry-graphql/strawberry @ b9cfcda3e114）
- 上游修复提交：3ba583f8776b（2026-07-23）
- 改动文件：strawberry/extensions/mask_errors.py, strawberry/schema/schema.py

```text
strawberry 的 MaskErrors 扩展只处理执行期错误：同步的预执行错误（校验/解析阶段）会被原样漏出去，没被掩码。

请把预执行错误也纳入掩码，补同步和异步两条路径的测试。
```

## T314 — tortoise/tortoise-orm

- 仓库地址：https://github.com/tortoise/tortoise-orm
- 初始环境：`t314/base`（上游 tortoise/tortoise-orm @ 29d7e024a303）
- 上游修复提交：513f852dab0c（2024-12-26）
- 改动文件：tortoise/__init__.py, tortoise/backends/asyncpg/client.py, tortoise/backends/base/client.py, tortoise/backends/base_postgres/client.py, tortoise/backends/mssql/client.py, tortoise/backends/mysql/client.py, tortoise/backends/odbc/client.py, tortoise/backends/oracle/client.py

```text
tortoise-orm 的连接池在并发初始化时会打架：多个协程同时首次访问数据库，池被重复初始化/状态错乱，压测下报错或卡住。

请把初始化做成并发安全（含 asyncpg 后端），补测试：并发查询和并发事务。
```

## T315 — tortoise/tortoise-orm

- 仓库地址：https://github.com/tortoise/tortoise-orm
- 初始环境：`t315/base`（上游 tortoise/tortoise-orm @ 332709fa1a73）
- 上游修复提交：5d08bc297f21（2026-03-03）
- 改动文件：tortoise/migrations/schema_editor/base.py, tortoise/migrations/schema_editor/mssql.py, tortoise/migrations/schema_editor/mysql.py, tortoise/migrations/schema_editor/oracle.py

```text
tortoise 的迁移 `_alter_field` 只比较了 nullable / index / unique / description / default / rename，没比较 SQL 类型，于是把 max_length 从 32 改成 64 这种改动不会生成 ALTER。

请把类型比较补上（各后端一起），补测试：MySQL / PostgreSQL / MSSQL 的 max_length 变更。
```

## T316 — tortoise/tortoise-orm

- 仓库地址：https://github.com/tortoise/tortoise-orm
- 初始环境：`t316/base`（上游 tortoise/tortoise-orm @ 1e6089d04a86）
- 上游修复提交：3d18d030a63e（2024-11-25）
- 改动文件：tests/testmodels.py, tortoise/backends/base/schema_generator.py, tortoise/models.py

```text
tortoise 里主键用 OneToOneField、同时又有 m2m 字段的模型，查询会报错（字段映射/生成器那块组合不对）。

请修好这种组合的查询，补测试。
```

## T317 — tortoise/tortoise-orm

- 仓库地址：https://github.com/tortoise/tortoise-orm
- 初始环境：`t317/base`（上游 tortoise/tortoise-orm @ 4e47cffeb4d4）
- 上游修复提交：0898c2bb0344（2025-02-17）
- 改动文件：poetry.lock, pyproject.toml, tortoise/backends/base/executor.py, tortoise/models.py

```text
tortoise 里用 `save(update_fields=...)` 只更新主键字段时，报出来的是一个很难懂的错（内部异常），既没说清为什么不支持、也不好排查。

请改成明确的异常和说明，补测试并检查异常信息。
```

## T318 — pdm-project/pdm

- 仓库地址：https://github.com/pdm-project/pdm
- 初始环境：`t318/base`（上游 pdm-project/pdm @ 78110b22e5bd）
- 上游修复提交：d925136c3f78（2024-05-29）
- 改动文件：src/pdm/core.py, src/pdm/environments/base.py, src/pdm/models/caches.py, src/pdm/models/candidates.py, src/pdm/models/session.py, src/pdm/project/core.py

```text
pdm 加了 `--no-cache` 之后还是会去写缓存、动缓存目录：这个开关的语义应该是完全不碰缓存。

请修好这条路径（cache 相关的几个调用点一起看），补测试。
```

## T319 — pdm-project/pdm

- 仓库地址：https://github.com/pdm-project/pdm
- 初始环境：`t319/base`（上游 pdm-project/pdm @ b203d171b404）
- 上游修复提交：e3784d814729（2024-04-20）
- 改动文件：src/pdm/installers/installers.py, src/pdm/models/cached_package.py

```text
pdm 的安装缓存换个环境就用不了：同一个 wheel 在不同项目/环境之间复用缓存会失败或者装错。

请让缓存的安装逻辑与具体环境解耦，补一个跨项目复用缓存的测试。
```

## T320 — pylint-dev/pylint

- 仓库地址：https://github.com/pylint-dev/pylint
- 初始环境：`t320/base`（上游 pylint-dev/pylint @ 48d3c5490fe5）
- 上游修复提交：5ba4f69e7a95（2026-08-27）
- 改动文件：doc/whatsnew/fragments/11272.bugfix, pylint/checkers/base/name_checker/checker.py, pylint/checkers/classes/class_checker.py, pylint/checkers/refactoring/refactoring_checker.py, pylint/checkers/utils.py, tests/checkers/unittest_utils.py, tests/functional/d/duplicate/duplicate_bases.py, tests/functional/d/duplicate/duplicate_bases_class_assign.py

```text
pylint 碰到"重复基类"或者"基类不一致"（MRO 算不出来）的类时会直接崩，好几处 checker 都中招（名字检查、类检查）。

请让这些地方在 MRO 不可用时安全退化（返回空/跳过而不是抛异常），补测试。
```

## T321 — pylint-dev/pylint

- 仓库地址：https://github.com/pylint-dev/pylint
- 初始环境：`t321/base`（上游 pylint-dev/pylint @ 2757ade252e3）
- 上游修复提交：c4f8d9b94dbb（2026-06-14）
- 改动文件：doc/whatsnew/fragments/11102.bugfix, pylint/checkers/async_checker.py, pylint/checkers/typecheck.py, tests/functional/n/not_async_context_manager.py, tests/functional/n/not_context_manager.py

```text
pylint 的 `not-context-manager` 检查在上下文管理器没有名字的时候会崩：它直接用 inferred.name 拼消息，而某些推断结果（比如 `async with slice(None)`）根本没有 name。

请修好这条路径（async_checker / typecheck 两处），补测试。
```

## T322 — networkx/networkx

- 仓库地址：https://github.com/networkx/networkx
- 初始环境：`t322/base`（上游 networkx/networkx @ b7d0b0cc8f73）
- 上游修复提交：a97c162a9a4a（2023-12-22）
- 改动文件：networkx/algorithms/d_separation.py

```text
networkx 的 `is_minimal_d_separator` 在"根本不存在 d-分离集"的场景下判断错误：它会把不合法的集合当成合法的。

请把校验补上（集合必须先真的是 d-分离集，再谈最小性），补测试。
```

## T323 — networkx/networkx

- 仓库地址：https://github.com/networkx/networkx
- 初始环境：`t323/base`（上游 networkx/networkx @ 8977f1cfbae6）
- 上游修复提交：083e47255d70（2026-09-17）
- 改动文件：networkx/classes/graph.py, networkx/classes/reportviews.py

```text
networkx 的边视图/度视图缓存里强引用了图对象：临时图用完也回收不了，还会造成引用环；pickle 和 deepcopy 之后视图也不好用。

请改成弱引用持有图，并让视图在临时图被回收后仍能正常调用，补测试。
```

## T324 — pgjones/hypercorn

- 仓库地址：https://github.com/pgjones/hypercorn
- 初始环境：`t324/base`（上游 pgjones/hypercorn @ edd0aac58504）
- 上游修复提交：bfb087756da5（2024-05-28）
- 改动文件：src/hypercorn/asyncio/lifespan.py, src/hypercorn/trio/lifespan.py, tests/helpers.py

```text
hypercorn 的 lifespan 启动失败如果被 ASGI 应用包进了 ExceptionGroup，服务不会像预期那样直接崩掉，而是继续跑一个状态不对的实例。

请让这种失败也终止服务（asyncio 和 trio 两套实现都要），补测试。
```

## T325 — pgjones/hypercorn

- 仓库地址：https://github.com/pgjones/hypercorn
- 初始环境：`t325/base`（上游 pgjones/hypercorn @ 50057c4ac733）
- 上游修复提交：cd992f80010e（2025-02-01）
- 改动文件：src/hypercorn/asyncio/tcp_server.py, src/hypercorn/protocol/http_stream.py, src/hypercorn/protocol/ws_stream.py, src/hypercorn/trio/tcp_server.py

```text
hypercorn 的 HTTP/WS 流在隔离（isolate）状态下会泄漏连接状态：流被换掉之后旧状态还留着，后续请求会串。

请修好这条路径（tcp_server / http_stream / ws_stream），补测试。
```

## T326 — fsspec/filesystem_spec

- 仓库地址：https://github.com/fsspec/filesystem_spec
- 初始环境：`t326/base`（上游 fsspec/filesystem_spec @ 24e5cbf6cfc4）
- 上游修复提交：85facaaf2659（2026-05-11）
- 改动文件：fsspec/asyn.py, fsspec/spec.py

```text
fsspec 的 `expand_path` 在路径里带 glob 元字符（`*`、`?`、`[`）时会无限递归，栈直接爆掉。同步和异步两条路径都有。

请修好解析逻辑，补测试（特殊字符、带 magic 的输入、异步版本）。
```

## T327 — fsspec/filesystem_spec

- 仓库地址：https://github.com/fsspec/filesystem_spec
- 初始环境：`t327/base`（上游 fsspec/filesystem_spec @ ecc576506567）
- 上游修复提交：16535529c794（2024-03-19）
- 改动文件：fsspec/implementations/local.py, fsspec/mapping.py

```text
fsspec 的 LocalFileSystem 处理根目录时 `_strip_protocol` 结果不对：`/` 这种根路径被剥成了空串，映射层跟着出错。

请修好根目录的处理，补测试。
```

## T328 — fsspec/filesystem_spec

- 仓库地址：https://github.com/fsspec/filesystem_spec
- 初始环境：`t328/base`（上游 fsspec/filesystem_spec @ 2576617e5cbe）
- 上游修复提交：9603a7c8329c（2026-01-29）
- 改动文件：fsspec/caching.py, fsspec/parquet.py, fsspec/utils.py

```text
fsspec 的 parquet 缓存和 known-cache 有几处对不上：嵌套 schema/嵌套 arrow 类型缓存命中错误，导致读到错的元数据。

请修好 caching / parquet / utils 这几处，补一个嵌套 arrow 类型的测试。
```

## T329 — tkem/cachetools

- 仓库地址：https://github.com/tkem/cachetools
- 初始环境：`t329/base`（上游 tkem/cachetools @ 143e78d528aa）
- 上游修复提交：a2d34a0d4d29（2025-02-20）
- 改动文件：src/cachetools/__init__.py, src/cachetools/_decorators.py, src/cachetools/func.py

```text
cachetools 的 `func` 装饰器在并发下会出现缓存击穿（cache stampede）：同一个 key 被多个线程同时算，全部穿透到被装饰函数。

请加上"同 key 只算一次"的机制（注意零容量缓存等边界），补测试。
```

## T330 — tkem/cachetools

- 仓库地址：https://github.com/tkem/cachetools
- 初始环境：`t330/base`（上游 tkem/cachetools @ 86352aed2bed）
- 上游修复提交：bb72c21aab48（2026-01-30）
- 改动文件：src/cachetools/__init__.py, src/cachetools/_cachedmethod.py, tests/__init__.py

```text
cachetools 的 `@cachedmethod` 没有 `cache_info()`：按方法缓存之后拿不到命中率/淘汰统计，跟 `@cached` 不一致。

请补上 `cache_info()` 支持（含 clear 等属性行为一致），补测试。
```

## T331 — wntrblm/nox

- 仓库地址：https://github.com/wntrblm/nox
- 初始环境：`t331/base`（上游 wntrblm/nox @ 05f0d0bbf7f1）
- 上游修复提交：a4b43d5f34a0（2025-10-08）
- 改动文件：nox/_options.py, nox/sessions.py

```text
nox 的 `--verbose` 全局选项没有传到会话安装命令的 `silent` 参数上：加了 -v 之后安装命令还是静默的，日志看不到。

请把 verbose 传递到安装（含 conda）那条路径，补测试。
```

## T332 — wntrblm/nox

- 仓库地址：https://github.com/wntrblm/nox
- 初始环境：`t332/base`（上游 wntrblm/nox @ 7a94886faaee）
- 上游修复提交：6edc697d317f（2024-10-29）
- 改动文件：nox/_option_set.py, nox/_options.py

```text
nox 里如果通过 `nox.options` 设置了一个不存在的选项，现在报的错很难懂（或者干脆不报）。

请改成给出明确的错误信息（说明选项名和可用选项），补测试。
```

## T333 — pypa/virtualenv

- 仓库地址：https://github.com/pypa/virtualenv
- 初始环境：`t333/base`（上游 pypa/virtualenv @ f264539ffc14）
- 上游修复提交：0c847288171b（2025-08-01）
- 改动文件：src/virtualenv/__main__.py, src/virtualenv/seed/embed/via_app_data/pip_install/base.py, src/virtualenv/util/lock.py

```text
virtualenv 在某些环境里创建/安装会报 'Too many open files'：内嵌 wheel 安装那条路径没有及时关闭文件句柄。

请修好句柄泄漏并改进错误信息，补测试。
```

## T334 — pypa/virtualenv

- 仓库地址：https://github.com/pypa/virtualenv
- 初始环境：`t334/base`（上游 pypa/virtualenv @ 4b31a6316a87）
- 上游修复提交：66fadcbfeac2（2026-09-08）
- 改动文件：src/virtualenv/create/via_global_ref/builtin/ref.py, src/virtualenv/util/path/_sync.py

```text
virtualenv 重建环境时，如果旧的符号链接已经失效（dangling），现在会顺着链接往里写，导致新环境建出来是坏的。

请改成先把失效链接替换掉再写，补测试：重建带 dangling alias 的环境、替换 dangling symlink。
```

## T335 — pytest-dev/pytest-cov

- 仓库地址：https://github.com/pytest-dev/pytest-cov
- 初始环境：`t335/base`（上游 pytest-dev/pytest-cov @ 66e4a0b639f4）
- 上游修复提交：75174bd4087d（2024-09-16）
- 改动文件：.github/workflows/test.yml, setup.py, src/pytest_cov/plugin.py, tox.ini

```text
pytest-cov 自己实现了一套 fail_under 判断，和 coverage 的行为对不上（阈值、精度、报错方式都有差异）。

请改用 coverage 提供的函数来判断 fail_under（同时放宽最低 coverage 版本要求），补测试。
```

## T336 — boto/botocore

- 仓库地址：https://github.com/boto/botocore
- 初始环境：`t336/base`（上游 boto/botocore @ 5a144086d234）
- 上游修复提交：09d168c57166（2025-06-05）
- 改动文件：botocore/args.py, botocore/endpoint.py, botocore/model.py, botocore/response.py, botocore/utils.py, tests/functional/models/test-protocol-list/2020-08-20/service-2.json

```text
botocore 选择协议（protocol）的逻辑有 bug：模型的 protocols 列表没被正确解析/排序，导致选错协议（选了低优先级甚至不支持的），或者本该报错的情况安静通过。

请修好 args / endpoint / model 这几处的协议选择，补测试：正确选择、选最高优先级、缺 trait 的情况、不支持协议要报错。
```

## T337 — mongodb/motor

- 仓库地址：https://github.com/mongodb/motor
- 初始环境：`t337/base`（上游 mongodb/motor @ 3cd98d9b9417）
- 上游修复提交：0876271b12d7（2026-06-03）
- 改动文件：doc/conf.py, motor/web.py, synchro/__init__.py, synchro/synchrotest.py

```text
motor 适配新版 PyMongo 之后有几处构建/运行失败：web 那层的 API 和 synchro 的签名跟 PyMongo 4.17 对不上。

请把这些适配点修好，补测试。
```

## T338 — kiorky/croniter

- 仓库地址：https://github.com/kiorky/croniter
- 初始环境：`t338/base`（上游 kiorky/croniter @ 40920bc724f7）
- 上游修复提交：99bf300473a6（2019-04-27）
- 改动文件：src/croniter/__init__.py, src/croniter/croniter.py

```text
croniter 在 32 位系统上会抛 OverflowError：内部用的是 time_t 范围之外的时间戳。

请修好溢出（别依赖 time_t 的位宽），补测试。
```

## T339 — joblib/joblib

- 仓库地址：https://github.com/joblib/joblib
- 初始环境：`t339/base`（上游 joblib/joblib @ 2be8dcd4cb77）
- 上游修复提交：398d8ee669ee（2024-05-02）
- 改动文件：joblib/memory.py

```text
joblib 的 MemorizedFunc.call 之前被改过 API，导致老用法不兼容（记忆化函数调用行为变了）。

请把 API 恢复回原样，补测试：记忆化/非记忆化调用、异步调用。
```

## T340 — nedbat/coveragepy

- 仓库地址：https://github.com/nedbat/coveragepy
- 初始环境：`t340/base`（上游 nedbat/coveragepy @ a5f37e0ba1d0）
- 上游修复提交：21251361e87c（2023-06-22）
- 改动文件：coverage/debug.py, coverage/sqldata.py

```text
coverage.py 在 async 模式不可用的环境下用 SQLite 数据文件会直接抛 SQLite 错误，而不是给出可读的说明（或者优雅退让）。

请修好这条路径并给出清楚的错误，补测试。
```

## T341 — nedbat/coveragepy

- 仓库地址：https://github.com/nedbat/coveragepy
- 初始环境：`t341/base`（上游 nedbat/coveragepy @ 73e58fa9dd36）
- 上游修复提交：c85eaba206e1（2024-12-24）
- 改动文件：coverage/parser.py, coverage/results.py

```text
coverage.py 在多行语句（跨行的条件和表达式）上会把分支目标描述串错：报告里显示的分支指向了错误的行。

请修好 parser/results 这两处，补测试：多行条件、模块退出。
```

## T342 — nedbat/coveragepy

- 仓库地址：https://github.com/nedbat/coveragepy
- 初始环境：`t342/base`（上游 nedbat/coveragepy @ 93fc29d0931f）
- 上游修复提交：0a5df250a473（2026-08-18）
- 改动文件：coverage/config.py, coverage/tomlconfig.py

```text
coverage.py 读 TOML 配置时，如果某个设置写成了非字符串值，程序直接吐 traceback，而不是给出"哪个设置在哪个文件里类型不对"的提示。

请改成清晰的配置错误，补测试。
```

## T343 — nedbat/coveragepy

- 仓库地址：https://github.com/nedbat/coveragepy
- 初始环境：`t343/base`（上游 nedbat/coveragepy @ cc1ced4d4c8e）
- 上游修复提交：f653aaec4c58（2026-09-21）
- 改动文件：coverage/ctracer/tracer.c, coverage/pytracer.py

```text
coverage.py 在 Python 3.14 上循环的完成弧（loop completion arcs）记错了：循环里提前 return 的场景会漏掉/多算分支，和 3.13 的行为不一致。

请修好 pytracer / C tracer 两处，补一个"循环里提前 return"的测试。
```

## T344 — openai/openai-python

- 仓库地址：https://github.com/openai/openai-python
- 初始环境：`t344/base`（上游 openai/openai-python @ e507a4ebeea4）
- 上游修复提交：f9d2d1359688（2026-04-24）
- 改动文件：src/openai/resources/chat/completions/completions.py, src/openai/resources/responses/responses.py, src/openai/types/chat/completion_create_params.py, src/openai/types/responses/response.py, src/openai/types/responses/response_create_params.py, src/openai/types/responses/responses_client_event.py, src/openai/types/responses/responses_client_event_param.py

```text
openai-python 的 `prompt_cache_retention` 枚举值写错了（写成了 in-memory，服务端要的是 in_memory），传进去会被拒。

请把相关资源与类型定义里的枚举值改对，补测试。
```

## T345 — openai/openai-python

- 仓库地址：https://github.com/openai/openai-python
- 初始环境：`t345/base`（上游 openai/openai-python @ bccad31277a9）
- 上游修复提交：009b7f6ae649（2026-09-18）
- 改动文件：src/openai/lib/_parsing/_responses.py, src/openai/lib/streaming/responses/_responses.py, src/openai/resources/responses/responses.py

```text
openai-python 的 `AsyncResponses.parse()` 有内存泄漏：每次都重新参数化 TextFormatT，pydantic 的 schema 对象无上限地累积（有人用火焰图抓到过）。

请去掉这处参数化（让类型在上下文之间复用），补测试。
```

## T346 — aio-libs/aiohttp

- 仓库地址：https://github.com/aio-libs/aiohttp
- 初始环境：`t346/base`（上游 aio-libs/aiohttp @ fb69cf0bc9f3）
- 上游修复提交：46ef156b015a（2025-10-16）
- 改动文件：aiohttp/client.py, aiohttp/client_reqrep.py

```text
aiohttp 在创建请求时读 netrc 是阻塞 I/O，在事件循环里会卡住整个循环（尤其 netrc 在网络文件系统上时）。

请把这段改成非阻塞（丢到执行器里），保持 netrc 认证行为不变，补测试：环境变量里的 netrc、host 不在 netrc 里、以及连接复用。
```

## T347 — django/django

- 仓库地址：https://github.com/django/django
- 初始环境：`t347/base`（上游 django/django @ 0ddbe12ea99a）
- 上游修复提交：2a636118dacd（2025-08-19）
- 改动文件：django/conf/app_template/apps.py-tpl, django/conf/global_settings.py, django/conf/project_template/project_name/settings.py-tpl, django/db/backends/postgresql/features.py, django/db/models/base.py, tests/admin_scripts/tests.py, tests/check_framework/apps.py, tests/introspection/tests.py

```text
django 新建项目/应用的默认主键类型还是 AutoField：大表跑到 21 亿就溢出，官方建议改成 BigAutoField，但改默认值涉及全局设置和模板，还要保证已有项目不受影响。

请把默认值改成 BigAutoField（全局设置 + 项目/应用模板一起），并处理好迁移相关的影响，补测试。
```

## T348 — sqlalchemy/sqlalchemy

- 仓库地址：https://github.com/sqlalchemy/sqlalchemy
- 初始环境：`t348/base`（上游 sqlalchemy/sqlalchemy @ 1d49add43530）
- 上游修复提交：b19a09812c2b（2025-03-17）
- 改动文件：lib/sqlalchemy/orm/decl_base.py, lib/sqlalchemy/orm/exc.py, lib/sqlalchemy/orm/properties.py, lib/sqlalchemy/orm/util.py, lib/sqlalchemy/util/typing.py

```text
sqlalchemy 2.0.37 之后有个回归：在 `Mapped[...]` 里用不合适类型/对象时，本该抛出的 `ArgumentError` 消失了——错误被类型系统吞掉，用户拿到的是别的报错。

请把这条检查恢复（decl_base / properties / exc 三处一起看），补一个构造左侧类型不对的测试。
```
