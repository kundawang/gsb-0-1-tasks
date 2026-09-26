# 高难度 Bug 修复题·第四辑（40 道）

口径同前三辑：并发 / 取消 / 生命周期 / 状态一致性 / 协议与渲染正确性，改动跨多个文件，症状离根因远。

| 题号 | 上游仓库 | 分支 | 一句话 |
| --- | --- | --- | --- |
| T259 | mongodb/mongo-python-driver | `t259/base` | PYTHON-4782 Fix deadlock and blocking behavior in _ACondition.wait (#1875) |
| T260 | mongodb/mongo-python-driver | `t260/base` | PYTHON-4660 Fix AttributeError when MongoClient.bulk_write batch fails with InvalidBSON (#1792) |
| T261 | mongodb/mongo-python-driver | `t261/base` | PYTHON-5044 - Fix successive AsyncMongoClients on a single loop always ti… (#2065) |
| T262 | mongodb/mongo-python-driver | `t262/base` | PYTHON-5014 Fix handling of async socket errors in kms request (#2054) |
| T263 | openai/openai-python | `t263/base` | fix(structured outputs): resolve memory leak in parse methods (#2860) |
| T264 | openai/openai-python | `t264/base` | fix: avoid leaking memory when Client.with_options is used (#956) |
| T265 | openai/openai-python | `t265/base` | fix: include completion in content filter errors (#3094) |
| T266 | openai/openai-python | `t266/base` | fix(client): honor Retry-After delays up to two minutes (#3555) |
| T267 | openai/openai-python | `t267/base` | fix(api): fix imagegen `size` enum regression |
| T268 | nedbat/coveragepy | `t268/base` | fix: change how the core default adjusts if sysmon isn't right #2064 |
| T269 | nedbat/coveragepy | `t269/base` | fix: multiline statement branches with sysmon #2070 |
| T270 | nedbat/coveragepy | `t270/base` | fix: multi-line with-statements exit correctly. #1880 |
| T271 | nedbat/coveragepy | `t271/base` | fix: properly render double braces in f-strings. #1980 |
| T272 | graphql-python/graphql-core | `t272/base` | fix(OneOf): fail coercion when two fields are provided "pre-coercion-only" |
| T273 | fastapi/fastapi | `t273/base` | 🐛 Fix support for functools wraps and partial combined, for async and regular functions and classes in path operations and dependencies (#14448) |
| T274 | redis/redis-py | `t274/base` | Fixed async MultiDBClient with underlying RedisCluster (#4108) |
| T275 | dask/dask | `t275/base` | Add various fixes around axis=1 and dtype inconsistencies (#724) |
| T276 | dask/dask | `t276/base` | Fix `H5FD_lock` error when writing to hdf with distributed client (#10309) |
| T277 | python-poetry/poetry | `t277/base` | fix TypeError when using `installer.builtin-uninstall` (#11077) |
| T278 | python-poetry/poetry | `t278/base` | fix(env): fail on incompatible Python without venv creation (#10941) |
| T279 | pytest-dev/pytest-asyncio | `t279/base` | [fix] Fixes a bug that caused tests to run in the wrong event loop when requesting larger-scoped fixtures in a narrower-scoped test. |
| T280 | prompt-toolkit/python-prompt-toolkit | `t280/base` | Fix inputhook implementation to be compatible with asyncio.run(). |
| T281 | Textualize/textual | `t281/base` | Fix Number and Float validation errors, allow underscores, add tests.  Fix issue #4718 (#4784) |
| T282 | Textualize/textual | `t282/base` | fix for cache (#3538) |
| T283 | pygments/pygments | `t283/base` | fixed a token error, removed extraneous test files |
| T284 | locustio/locust | `t284/base` | UI: use currentRps/currentFailPerSec instead of totalRps everywhere except in the final table, now that the endpoint returns correct values. |
| T285 | pytest-dev/pytest | `t285/base` | testresult: correctly apply verbose word markup and avoid crash |
| T286 | ipython/ipython | `t286/base` | Add tests for resolving backend name and gui loop |
| T287 | encode/starlette | `t287/base` | Fixed import error when exceptiongroup isn't available (#2231) |
| T288 | simonw/sqlite-utils | `t288/base` | Polish: clearer errors, corrected docstrings, setuptools pin |
| T289 | django/django | `t289/base` | Fixed #35074 -- Fixed adding/removing indexes when spatial_index is changed on MySQL, PostgreSQL, and Oracle. |
| T290 | django/django | `t290/base` | Fixed #37263 -- Fixed changelist __exact search crashes and over-matching. |
| T291 | django/django | `t291/base` | Fixed #36903 -- Fixed further NameErrors when inspecting functions with deferred annotations. |
| T292 | django/django | `t292/base` | Fixed #35241 -- Cached model's full parent list. |
| T293 | pylint-dev/astroid | `t293/base` | Fix partial descriptor binding crash |
| T294 | pylint-dev/astroid | `t294/base` | Change order of search path to fix inconsistency between pylint and astroid. (#2589) |
| T295 | pylint-dev/astroid | `t295/base` | Fix ValueError in __str__/repr and error messages with extreme values (#2971) |
| T296 | sympy/sympy | `t296/base` | fix(ntheory): make ntheory mostly thread-safe |
| T297 | sympy/sympy | `t297/base` | fixed invert for Fp groups, preventing it from crashing with key errors, and added image membership test for Fp groups and permutation groups |
| T298 | sqlalchemy/alembic | `t298/base` | revert primary_key=True change and replace with inline_primary_key |

## T259 — mongodb/mongo-python-driver

- 仓库地址：https://github.com/mongodb/mongo-python-driver
- 初始环境：`t259/base`（上游 mongodb/mongo-python-driver @ 083359f95f7c）
- 上游修复提交：821811e80d72（2024-09-30）
- 改动文件：pymongo/asynchronous/pool.py, pymongo/asynchronous/topology.py, pymongo/lock.py, pymongo/synchronous/pool.py, pymongo/synchronous/topology.py, tools/synchro.py

```text
pymongo 在 asyncio 下有个死锁：等锁的时候被取消，`_ACondition.wait()` 这条路径会把锁和等待状态搞乱——被取消的等待者不唤醒后来者，或者唤醒之后重拿锁失败，压测里表现成整个客户端卡住不动。

请把 `pymongo/lock.py` 的 `_ACondition.wait()` 修好：被取消时要正确释放并唤醒等待者、唤醒后重拿锁要可靠；asynchronous 和 synchronous 两套调用方（连接池、topology）跟着一起调整。补测试覆盖取消后重新获取、取消时唤醒别人、以及上下文管理器路径。
```

## T260 — mongodb/mongo-python-driver

- 仓库地址：https://github.com/mongodb/mongo-python-driver
- 初始环境：`t260/base`（上游 mongodb/mongo-python-driver @ adf8817df8f3）
- 上游修复提交：297dfe6aa3d3（2024-08-15）
- 改动文件：pymongo/asynchronous/client_bulk.py, pymongo/asynchronous/mongo_client.py, pymongo/synchronous/client_bulk.py, pymongo/synchronous/mongo_client.py

```text
pymongo 的 `MongoClient.bulk_write` 在某一批失败时（比如服务端回了 InvalidBSON）会抛 AttributeError，把真正的错误盖掉，调用方拿不到原始原因，排查很痛苦。

请修好同步和异步两套 client_bulk，让非 pymongo 自身的异常也能正常往上抛（保留原始错误信息），补一个 batch 里出现非 pymongo 异常的测试。
```

## T261 — mongodb/mongo-python-driver

- 仓库地址：https://github.com/mongodb/mongo-python-driver
- 初始环境：`t261/base`（上游 mongodb/mongo-python-driver @ 2235b8354cef）
- 上游修复提交：f1af9178946c（2025-01-22）
- 改动文件：pymongo/network_layer.py, pymongo/periodic_executor.py

```text
pymongo 的异步客户端有个坑：在同一个事件循环里先后创建多个 `AsyncMongoClient`，后面的客户端总是超时连不上——周期性执行器和网络层那边没有清理干净。

请修好，补一个连续创建多个异步客户端都能正常工作的测试。
```

## T262 — mongodb/mongo-python-driver

- 仓库地址：https://github.com/mongodb/mongo-python-driver
- 初始环境：`t262/base`（上游 mongodb/mongo-python-driver @ 6c9a20a49d37）
- 上游修复提交：493fc2ab3e23（2025-01-10）
- 改动文件：pymongo/asynchronous/encryption.py, pymongo/synchronous/encryption.py

```text
pymongo 的客户端加密（KMS）在异步模式下碰到 socket 错误处理得不对：异常不会传到调用方，连接状态也不对；同步那一侧是正常的。

请把 asynchronous/encryption.py 这块对齐同步实现，补测试。
```

## T263 — openai/openai-python

- 仓库地址：https://github.com/openai/openai-python
- 初始环境：`t263/base`（上游 openai/openai-python @ d81ee8f85207）
- 上游修复提交：72e1e15abfc2（2026-02-13）
- 改动文件：src/openai/lib/_parsing/__init__.py, src/openai/lib/_parsing/_completions.py, src/openai/lib/_parsing/_responses.py, src/openai/lib/streaming/chat/_completions.py, tests/lib/utils.py

```text
openai-python 的 structured outputs 解析（`responses.parse`、`chat.completions.parse`，以及流式解析）有内存泄漏：每次调用都会把响应或 schema 相关的对象留在某个引用里，长时间跑内存只涨不降。

请找出并修掉这处引用（流式那条路径一起处理），补一个能验证对象可回收的测试。
```

## T264 — openai/openai-python

- 仓库地址：https://github.com/openai/openai-python
- 初始环境：`t264/base`（上游 openai/openai-python @ d468f301a897）
- 上游修复提交：d052708a5b7f（2023-12-08）
- 改动文件：pyproject.toml, src/openai/_base_client.py, src/openai/_client.py

```text
openai-python 里 `client.with_options(...)` 会泄漏内存：每次派生一个新 client，父子之间互相持有，旧的回收不掉，长期跑的服务里很明显。

请修好派生逻辑，补测试（派生出来的 client 构造请求的行为要和原来一致）。
```

## T265 — openai/openai-python

- 仓库地址：https://github.com/openai/openai-python
- 初始环境：`t265/base`（上游 openai/openai-python @ 233d9557be3e）
- 上游修复提交：e57a1b19fbcc（2026-09-15）
- 改动文件：src/openai/_exceptions.py, src/openai/lib/_parsing/_completions.py, src/openai/lib/streaming/chat/_completions.py

```text
openai-python 解析响应时如果命中内容过滤（ContentFilterFinishReasonError），抛出来的异常里没有带 completion，调用方拿不到 usage 等信息；流式那条路径也一样。

请把 completion 附到异常上（解析和流式都要），补三个测试：没有 completion 的错误、解析路径、流式路径。
```

## T266 — openai/openai-python

- 仓库地址：https://github.com/openai/openai-python
- 初始环境：`t266/base`（上游 openai/openai-python @ 3844843c277f）
- 上游修复提交：7fa7946485b5（2026-07-30）
- 改动文件：src/openai/_base_client.py, src/openai/_constants.py

```text
openai-python 的客户端重试没有正确处理 `Retry-After`：服务端让等 30 秒，客户端却按自己的指数退避去重试；等得比上限还久的请求也会被重试；非法日期还会把原始的 HTTP 状态错误盖掉。

请改成：正的、有限的 `Retry-After`（上限两分钟）就按它等；超过上限视为不可重试；为零或没这个头时保持指数退避；非法日期不要吞掉状态错误。补测试。
```

## T267 — openai/openai-python

- 仓库地址：https://github.com/openai/openai-python
- 初始环境：`t267/base`（上游 openai/openai-python @ 99b9c422f385）
- 上游修复提交：14b8afce7f17（2026-05-06）
- 改动文件：.stats.yml, src/openai/resources/images.py, src/openai/types/image_edit_params.py, src/openai/types/image_generate_params.py, src/openai/types/responses/tool.py, src/openai/types/responses/tool_param.py

```text
openai-python 的图像生成接口有个回归：`size` 参数的枚举值跟服务端接受的对不上，传合法值会被拒。

请按最新的 API 定义修正这个枚举（相关 types 里的定义一起改），补测试。
```

## T268 — nedbat/coveragepy

- 仓库地址：https://github.com/nedbat/coveragepy
- 初始环境：`t268/base`（上游 nedbat/coveragepy @ 2047a7992fd9）
- 上游修复提交：c2127c69ce25（2025-11-05）
- 改动文件：coverage/core.py, coverage/exceptions.py, metacov.ini

```text
coverage.py 在 3.12/3.13 上用 sys.monitoring 测量时分支测量是完不成的，但现在不会明确告诉用户：核心的默认值在这种情况下应该换一种处理方式，并给出一个能被上层识别的异常（好让测试跳过这类场景）。

请修好这个默认值调整逻辑并加上对应异常，补测试。
```

## T269 — nedbat/coveragepy

- 仓库地址：https://github.com/nedbat/coveragepy
- 初始环境：`t269/base`（上游 nedbat/coveragepy @ d2b0a9b6fd7d）
- 上游修复提交：31f91f816244（2025-10-27）
- 改动文件：coverage/bytecode.py, coverage/sysmon.py

```text
coverage.py 用 sys.monitoring（3.14 起是默认）时，多行的 `for` 和 `match/case` 被报成"分支缺失"，其实是漏记了，覆盖率数字因此虚低。

请修好 bytecode / sysmon 这两处的分支拆分，补 for 和 match/case 的测试。
```

## T270 — nedbat/coveragepy

- 仓库地址：https://github.com/nedbat/coveragepy
- 初始环境：`t270/base`（上游 nedbat/coveragepy @ 64b7a45de600）
- 上游修复提交：b8c236aa620f（2024-10-20）
- 改动文件：coverage/env.py, coverage/parser.py

```text
coverage.py 在多行 `with` 语句上退出位置记错了：一个 with 里套多个上下文管理器、或者跨行写的时候，行号和分支报告跟实际不一致。

请修好解析器这块，补单行和多行 with 的测试。
```

## T271 — nedbat/coveragepy

- 仓库地址：https://github.com/nedbat/coveragepy
- 初始环境：`t271/base`（上游 nedbat/coveragepy @ 1958c3f60acd）
- 上游修复提交：9f94c87677fd（2025-06-08）
- 改动文件：coverage/env.py, coverage/htmlfiles/style.scss, coverage/phystokens.py

```text
coverage.py 渲染代码（annotate/html 输出）时，f-string 里成对的花括号 `{{`、`}}` 会被当成真实花括号处理，导致渲染出来的代码错位。

请修好这块渲染，补测试。
```

## T272 — graphql-python/graphql-core

- 仓库地址：https://github.com/graphql-python/graphql-core
- 初始环境：`t272/base`（上游 graphql-python/graphql-core @ 8676357c65c0）
- 上游修复提交：5f93d17eb96e（2026-06-11）
- 改动文件：src/graphql/utilities/coerce_input_value.py, src/graphql/utilities/value_from_ast.py

```text
graphql-core 的 OneOf 输入类型：同时提供两个字段时应该在校验阶段直接失败，现在只有部分路径会拒（"pre-coercion-only" 的场景漏掉），而且 `value_from_ast` 和 `coerce_input_value` 两条路径的行为不一致。

请对齐 graphql-js 的实现，让两条路径一致地拒绝，补测试。
```

## T273 — fastapi/fastapi

- 仓库地址：https://github.com/fastapi/fastapi
- 初始环境：`t273/base`（上游 fastapi/fastapi @ c57ac7bdf361）
- 上游修复提交：bba4d4c95e0d（2025-12-03）
- 改动文件：fastapi/dependencies/models.py, fastapi/dependencies/utils.py

```text
fastapi 的路径操作和依赖，一旦被 `functools.wraps`（或者 `functools.partial`）包过一层，参数识别就乱了：路径参数、查询参数、依赖注入都会认错；包过的 async 函数、同步函数和类都有问题。

请修好依赖模型这处识别（wraps 和 partial 的组合都要正确），不要破坏原有签名推断，补测试。
```

## T274 — redis/redis-py

- 仓库地址：https://github.com/redis/redis-py
- 初始环境：`t274/base`（上游 redis/redis-py @ 3431570ceaf2）
- 上游修复提交：640f0d055f19（2026-06-10）
- 改动文件：.github/actions/run-tests/action.yml, .github/workflows/install_and_test.sh, .github/workflows/integration.yaml, docker-compose.yml, pyproject.toml, redis/asyncio/multidb/healthcheck.py, tasks.py, tests/test_multidb/_integration_endpoints.py

```text
redis-py 的 asyncio MultiDBClient 在底层是 RedisCluster 时用不了：健康检查那条路径按单节点处理，cluster 场景直接失败（或者一直判不健康）。

请修好 healthcheck 这块，补一个对两个数据库 ping 的测试。
```

## T275 — dask/dask

- 仓库地址：https://github.com/dask/dask
- 初始环境：`t275/base`（上游 dask/dask @ 3bfdc8682418）
- 上游修复提交：6aea3b046771（2024-01-15）
- 改动文件：dask_expr/_collection.py, dask_expr/_cumulative.py, dask_expr/_expr.py, dask_expr/_reductions.py

```text
dask-expr 里 `axis=1` 相关的一批操作结果不对：dtype 跟 pandas 对不上，某些聚合和累积在 axis=1 上算错或者报错。

请修好 _collection / _expr / _reductions / _cumulative 这几处，补测试。
```

## T276 — dask/dask

- 仓库地址：https://github.com/dask/dask
- 初始环境：`t276/base`（上游 dask/dask @ a5d5e43de73a）
- 上游修复提交：d8934fe477fa（2023-06-12）
- 改动文件：dask/dataframe/io/hdf.py, dask/dataframe/io/utils.py, dask/utils.py

```text
用 distributed 客户端往同一个 hdf 文件写数据会报 `H5FD_lock` 错误：多个进程同时写同一个文件，没有调度级别的文件锁。

请在 dask 里加一个跨进程的文件锁（单机也要能用），补测试：单机获取锁、distributed 下获取锁、以及写 hdf 的用例。
```

## T277 — python-poetry/poetry

- 仓库地址：https://github.com/python-poetry/poetry
- 初始环境：`t277/base`（上游 python-poetry/poetry @ 165fb4b42e01）
- 上游修复提交：f8408cab10a9（2026-09-20）
- 改动文件：src/poetry/installation/uninstaller.py, src/poetry/utils/env/base_env.py, src/poetry/utils/env/null_env.py, src/poetry/utils/env/system_env.py, src/poetry/utils/env/virtual_env.py

```text
poetry 用 `installer.builtin-uninstall` 卸载包时会抛 TypeError：内部的环境接口签名和回退路径对不上（base_env / null_env / system_env 几处不一致）。

请修好并统一这些接口，补一个带回退路径的卸载测试。
```

## T278 — python-poetry/poetry

- 仓库地址：https://github.com/python-poetry/poetry
- 初始环境：`t278/base`（上游 python-poetry/poetry @ f46702336862）
- 上游修复提交：a07d84a7ece1（2026-07-26）
- 改动文件：src/poetry/utils/env/env_manager.py, src/poetry/utils/env/python/exceptions.py

```text
poetry 在当前 Python 版本不受支持、而且还没有创建虚拟环境的时候不会给出清楚的失败，而是一直往下走最后报个莫名其妙的错。

请改成直接失败并说明原因（env_manager 这条路径），补测试。
```

## T279 — pytest-dev/pytest-asyncio

- 仓库地址：https://github.com/pytest-dev/pytest-asyncio
- 初始环境：`t279/base`（上游 pytest-dev/pytest-asyncio @ fe12dcb7c872）
- 上游修复提交：810c9d7a2e9a（2023-11-15）
- 改动文件：docs/source/reference/markers/class_scoped_loop_with_fixture_strict_mode_example.py, pytest_asyncio/plugin.py

```text
pytest-asyncio 有个 bug：在作用域更窄的测试里请求作用域更大的 fixture 时，测试会跑在错误的事件循环上。原因是循环作用域以前靠 collector 上的 mark 判断，拆到 fixture 之后这条逻辑失效了。

请修好作用域判定，补测试：class 作用域 fixture + function 作用域测试、module + class、module + function、package + class、package + function 都要覆盖。
```

## T280 — prompt-toolkit/python-prompt-toolkit

- 仓库地址：https://github.com/prompt-toolkit/python-prompt-toolkit
- 初始环境：`t280/base`（上游 prompt-toolkit/python-prompt-toolkit @ b6a9f05f9a71）
- 上游修复提交：2e2175a736fd（2023-11-11）
- 改动文件：.github/workflows/test.yaml, src/prompt_toolkit/application/application.py, src/prompt_toolkit/application/dummy.py, src/prompt_toolkit/eventloop/__init__.py, src/prompt_toolkit/eventloop/inputhook.py, src/prompt_toolkit/layout/controls.py, src/prompt_toolkit/shortcuts/prompt.py

```text
prompt-toolkit 的 inputhook 实现在 `asyncio.get_event_loop()` 被废弃之后就不对了：它还在启动阶段预先装事件循环，于是 `asyncio.run()` 里用不了，换到别的循环里跑也会出问题。

请改成把 inputhook 作为 `Application.run()` / `PromptSession` 的参数传进去，不要在导入或初始化阶段绑定循环，补测试。
```

## T281 — Textualize/textual

- 仓库地址：https://github.com/Textualize/textual
- 初始环境：`t281/base`（上游 Textualize/textual @ 61530d3691e1）
- 上游修复提交：43dfe081178d（2024-09-05）
- 改动文件：src/textual/validation.py, src/textual/widgets/_input.py

```text
textual 的 Input 里 Number / Float 校验器有问题：非法值不报错、合法值反而被拒，而且数字里带下划线（`1_000`）不被接受。

请把 Number / Integer / Float 的校验和正则修对（支持下划线），补测试。
```

## T282 — Textualize/textual

- 仓库地址：https://github.com/Textualize/textual
- 初始环境：`t282/base`（上游 Textualize/textual @ 9c1e89fcf014）
- 上游修复提交：fdc96f8c0e22（2023-10-17）
- 改动文件：src/textual/_cache.py, src/textual/widgets/_log.py

```text
textual 的 `_cache` 在 discard 之后还会命中旧值（Log 组件上尤其明显），淘汰/丢弃的语义不对。

请修好缓存实现，补一个 discard 的回归测试。
```

## T283 — pygments/pygments

- 仓库地址：https://github.com/pygments/pygments
- 初始环境：`t283/base`（上游 pygments/pygments @ 3746ded95655）
- 上游修复提交：2c463c680943（2024-06-12）
- 改动文件：json5-tests/json5.py, json5-tests/jsonnet.py, json5-tests/test.json5, json5-tests/test.jsonnet, json5-tests/test0.json5, json5-tests/test0.jsonnet, pygments/lexers/json5.py

```text
pygments 的 JSON5 / JSONnet 词法分析有 token 错误：一些合法写法（注释、尾逗号、标识符那几类）会被解析成错误的 token 类型。

请修好 token 规则，补测试。
```

## T284 — locustio/locust

- 仓库地址：https://github.com/locustio/locust
- 初始环境：`t284/base`（上游 locustio/locust @ ec93dd994675）
- 上游修复提交：da94639a74b5（2026-07-09）
- 改动文件：locust/webui/src/components/Layout/Navbar/SwarmMonitor.test.tsx, locust/webui/src/components/Layout/Navbar/SwarmMonitor.tsx, locust/webui/src/hooks/useFetchStats.ts, locust/webui/src/redux/slice/ui.slice.ts, locust/webui/src/types/ui.types.ts

```text
locust 的 Web UI 好几处还在用总 RPS / 总失败数（totalRps），但接口现在返回的是当前值（currentRps / currentFailPerSec），只有最终统计表该用总数，其它地方用错了，界面数字对不上。

请改好前端这几处（Navbar 的 SwarmMonitor、useFetchStats、ui.slice），补测试。
```

## T285 — pytest-dev/pytest

- 仓库地址：https://github.com/pytest-dev/pytest
- 初始环境：`t285/base`（上游 pytest-dev/pytest @ dbf7dee8c881）
- 上游修复提交：41ca4dd44eed（2024-06-18）
- 改动文件：src/_pytest/reports.py, src/_pytest/terminal.py

```text
pytest 的终端报告在自定义 `pytest_report_teststatus` 返回元组形式的 verbose word 时会崩：`_get_verbose_word` 只接受字符串；带 markup 的词也没有被正确处理。

请修好 reports.py 和 terminal.py 这两处，补测试（用 hook 返回带 markup 的元组）。
```

## T286 — ipython/ipython

- 仓库地址：https://github.com/ipython/ipython
- 初始环境：`t286/base`（上游 ipython/ipython @ f9ce8c21a550）
- 上游修复提交：6dcf7cf50689（2024-04-02）
- 改动文件：IPython/core/display_functions.py, IPython/terminal/embed.py

```text
IPython 解析显示后端（backend）名字时几处行为不一致：builtin 名字、entry point 注册的名字、以及未知名字的处理路径不一样，terminal/embed 里拿到 gui loop 的结果也不对。

请修好解析逻辑，补三种情况的测试（builtin / entry point / 未知）。
```

## T287 — encode/starlette

- 仓库地址：https://github.com/encode/starlette
- 初始环境：`t287/base`（上游 encode/starlette @ a8b8856ce393）
- 上游修复提交：7349c60a8139（2023-08-25）
- 改动文件：starlette/_utils.py, starlette/middleware/base.py

```text
starlette 在没有 exceptiongroup 依赖的 Python 版本上导入就会失败：middleware/base 里直接用了那个包。

请改成兼容写法（没有该依赖时用内置的 ExceptionGroup），补测试。
```

## T288 — simonw/sqlite-utils

- 仓库地址：https://github.com/simonw/sqlite-utils
- 初始环境：`t288/base`（上游 simonw/sqlite-utils @ 30cc95c0a6c4）
- 上游修复提交：397cdcc49134（2026-07-04）
- 改动文件：pyproject.toml, sqlite_utils/cli.py, sqlite_utils/db.py, sqlite_utils/migrations.py

```text
sqlite-utils 有几处报错很难用：往一个其实是 view 的名字里 insert/upsert 会直接吐 traceback；对其实是 table 的名字调 `db.view()` 也不说清楚；迁移名字重复时的提示同样不明确。

请把这些改成清晰的错误信息（相关 docstring 一并更正），补测试。
```

## T289 — django/django

- 仓库地址：https://github.com/django/django
- 初始环境：`t289/base`（上游 django/django @ ae1ee24178ec）
- 上游修复提交：f8cc9285e14c（2024-08-18）
- 改动文件：django/contrib/gis/db/backends/mysql/schema.py, django/contrib/gis/db/backends/oracle/schema.py, django/contrib/gis/db/backends/postgis/schema.py

```text
django 的 GIS 后端在 `spatial_index` 改变时（MySQL / PostgreSQL / Oracle）不会正确地加/删索引：把一个字段的 spatial_index 从 True 改成 False（或反过来）之后，表结构没有跟着变。

请修好这三个后端的 schema 编辑逻辑，补测试：加索引、删索引、以及带 nullable 的情况。
```

## T290 — django/django

- 仓库地址：https://github.com/django/django
- 初始环境：`t290/base`（上游 django/django @ 73cc09f14f13）
- 上游修复提交：fe81969e83d0（2026-08-08）
- 改动文件：django/contrib/admin/formfields.py, django/contrib/admin/options.py, tests/admin_changelist/admin.py, tests/admin_changelist/models.py, tests/admin_changelist/tests.py

```text
django admin 的 changelist 搜索，对非文本字段用 `__exact` 时有问题：非法搜索词不会在入口被拒（后面直接崩），而布尔 / choices 字段的精确匹配又会过度匹配——大小写不敏感，把不该匹配的记录也搜出来。

请修好搜索词的转换与匹配逻辑（用对应的表单字段来校验，不要自己拿 to_python），补测试：布尔字段的 exact（含显式 None、大小写）、choices 字段的 exact 以及 changelist 视图。
```

## T291 — django/django

- 仓库地址：https://github.com/django/django
- 初始环境：`t291/base`（上游 django/django @ 2c2d36376a0c）
- 上游修复提交：56ed37e17e5b（2026-02-09）
- 改动文件：django/contrib/auth/__init__.py, django/core/checks/security/csrf.py, django/core/checks/urls.py, django/db/models/expressions.py, django/template/base.py, django/utils/deprecation.py, django/utils/inspect.py, tests/check_framework/urls/good_error_handler_deferred_annotations.py

```text
django 在 Python 3.14+（延迟注解，PEP 649）下检查用户函数和可调用对象时会抛 NameError：好几处直接对函数签名求值，碰到前向引用就炸。

请提供一个安全的 introspection 包装并把这些调用点换过去，补测试：带延迟注解的 backend、callable、装饰器拒绝可变位置参数、表达式签名、错误视图。
```

## T292 — django/django

- 仓库地址：https://github.com/django/django
- 初始环境：`t292/base`（上游 django/django @ 6e1ece7ed522）
- 上游修复提交：73d5eb808435（2024-02-23）
- 改动文件：django/contrib/admin/helpers.py, django/db/models/base.py, django/db/models/deletion.py, django/db/models/expressions.py, django/db/models/options.py, django/db/models/query.py, django/db/models/query_utils.py, django/db/models/sql/compiler.py

```text
django 的模型每次取父类列表（`_meta.get_parent_list` / all_parents）都要重新走一遍 meta 查找，继承链多的地方开销明显；admin helpers、删除、表达式构造这些调用点还在反复取。

请把父类列表缓存起来（注意不能改变删除、表达式和 admin 那几处的行为），补测试。
```

## T293 — pylint-dev/astroid

- 仓库地址：https://github.com/pylint-dev/astroid
- 初始环境：`t293/base`（上游 pylint-dev/astroid @ 848d754518b0）
- 上游修复提交：4e1842043b61（2026-06-24）
- 改动文件：astroid/brain/brain_functools.py, astroid/interpreter/objectmodel.py, astroid/objects.py

```text
astroid 在推断被 `functools.partial` 包住的描述符（比如 partial 一个方法或属性访问器）时会崩，抛的是内部推断异常。

请修好 brain_functools / objectmodel / objects 这几处，补一个 partial 描述符绑定的测试。
```

## T294 — pylint-dev/astroid

- 仓库地址：https://github.com/pylint-dev/astroid
- 初始环境：`t294/base`（上游 pylint-dev/astroid @ 8696918751ef）
- 上游修复提交：f201120ba4c9（2024-10-08）
- 改动文件：ChangeLog, astroid/modutils.py, astroid/util.py

```text
astroid 和 pylint 对同一个文件算出来的模块搜索路径顺序不一致，于是两边对"这个 import 到底解析到哪个模块"的判断不一样（modutils 和 util 各有一套顺序）。

请统一成同一套顺序，补一个 `modpath_from_file` 顺序的测试。
```

## T295 — pylint-dev/astroid

- 仓库地址：https://github.com/pylint-dev/astroid
- 初始环境：`t295/base`（上游 pylint-dev/astroid @ ef5d473252d0）
- 上游修复提交：2c08ac19bd34（2026-03-02）
- 改动文件：ChangeLog, astroid/interpreter/objectmodel.py, astroid/nodes/node_classes.py, astroid/nodes/node_ng.py

```text
astroid 在生成节点的 `__str__`/`repr` 和错误信息时，碰到极端值会抛 ValueError：标识符特别长（50 多个字符）时 pprint 的宽度算成负数，超大整数做下标也会崩。

请修好这几处，补测试：长名字、超大整数、超大整数下标。
```

## T296 — sympy/sympy

- 仓库地址：https://github.com/sympy/sympy
- 初始环境：`t296/base`（上游 sympy/sympy @ d780c8bd9d05）
- 上游修复提交：b4d02dcd82df（2025-12-22）
- 改动文件：sympy/ntheory/generate.py, sympy/ntheory/partitions_.py

```text
sympy 的 ntheory 不是线程安全的：素数筛 `Sieve` 的数组和 partitions_ 里的全局变量在多线程下会被写坏，或者抛内部错误。

请把筛数组改成 copy-on-write、全局变量改成原子赋值，让这块基本可重入，补测试。
```

## T297 — sympy/sympy

- 仓库地址：https://github.com/sympy/sympy
- 初始环境：`t297/base`（上游 sympy/sympy @ 52a71d9c1d8d）
- 上游修复提交：9d16993f3bdd（2025-11-26）
- 改动文件：sympy/combinatorics/coset_table.py, sympy/combinatorics/homomorphisms.py

```text
sympy 的 Fp 群求逆会崩：`invert` 在某些元素上找不到逆就抛 KeyError，而不是给出正确结果；顺带 Fp 群和置换群的 image 成员判断也需要补上。

请修好 coset_table 和 homomorphisms 这两处，补一个 Fp 群同构的测试。
```

## T298 — sqlalchemy/alembic

- 仓库地址：https://github.com/sqlalchemy/alembic
- 初始环境：`t298/base`（上游 sqlalchemy/alembic @ 588bdacfac73）
- 上游修复提交：fa35ee9264cb（2026-02-10）
- 改动文件：alembic/ddl/base.py, alembic/ddl/impl.py, alembic/op.pyi, alembic/operations/base.py, alembic/operations/ops.py, alembic/operations/toimpl.py

```text
alembic 的 `Operations.add_column` 在较新版本里会自动把 `primary_key=True` 渲染成内联的 `PRIMARY KEY`，这会让"只加一列"的迁移顺带改掉表的主键约束，对已有主键的表是破坏性的。

请把默认行为改回不内联，同时提供显式的内联方式（`inline_primary_key`），并保持 add_column 既有入口兼容；补测试：内联主键、普通主键、默认不内联、以及删掉主键列再加回来的场景。
```
