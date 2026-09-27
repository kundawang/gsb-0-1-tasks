# 高难度 Bug 修复题·第六辑（50 道）

本辑门槛：改动 ≥100 行（中位数 210），全部跨文件并自带回归测试；集中在并发租约 / 取消传播 / 编译竞态 / 协议与状态一致性。

| 题号 | 上游仓库 | 分支 | 一句话 |
| --- | --- | --- | --- |
| T349 | temporalio/sdk-python | `t349/base` | Fix cancellations being swallowed in some circumstances (#1671) |
| T350 | temporalio/sdk-python | `t350/base` | Fix repeated Deep Agents tool calls with identical arguments (#1806) |
| T351 | temporalio/sdk-python | `t351/base` | Fix pdb / breakpoint() hang in workflow code (#1104) (#1568) |
| T352 | temporalio/sdk-python | `t352/base` | Add WorkflowUpdateRPCTimeoutOrCancelledError (#548) |
| T353 | temporalio/sdk-python | `t353/base` | Fix interceptor contract inconsistency for start_update_with_start_workflow (#1588) |
| T354 | temporalio/sdk-python | `t354/base` | fix(contrib): pool and idle-evict MCP connections in google_adk_agents (#1664) |
| T355 | dbt-labs/dbt-core | `t355/base` | Implement correct state:modified behavior for changed macros (#8760) |
| T356 | dbt-labs/dbt-core | `t356/base` | fix jinja stacktrace (#4772) |
| T357 | dbt-labs/dbt-core | `t357/base` | fix(snowflake): control the retry loop on the dbt side by setting a short LOGIN_TIMEOUT on the Snowflake driver (#10019) |
| T358 | dbt-labs/dbt-core | `t358/base` | fix stacktrace for run_operator (#5006) |
| T359 | dbt-labs/dbt-core | `t359/base` | fix(databricks): detect changed view definition for view_update_via_alter |
| T360 | dbt-labs/dbt-core | `t360/base` | Fix duplicate CTE race condition in ephemeral model compilation (#12602) |
| T361 | dbt-labs/dbt-core | `t361/base` | fix(dbt-run-cache): cached state_auth.json takes precedence over platform auth chain (#10676) |
| T362 | dbt-labs/dbt-core | `t362/base` | Fix concurrent batches deadlock (#12335) |
| T363 | PrefectHQ/prefect | `t363/base` | fix(concurrency): release leases granted to callers that were cancelled mid-acquire (#22621) |
| T364 | PrefectHQ/prefect | `t364/base` | Fix TOCTOU race conditions in concurrency lease renewal (#19187) |
| T365 | PrefectHQ/prefect | `t365/base` | Fix inconsistent work queue handling by agent when cancelling flow runs (#9757) |
| T366 | PrefectHQ/prefect | `t366/base` | Add `on_crashed` flow run state change hook (#9418) |
| T367 | streamlit/streamlit | `t367/base` | [fix] Prevent upload hang when middleware reads the body first (#16709) |
| T368 | streamlit/streamlit | `t368/base` | [fix] iframe and html change in default width when no width specified. (#12148) |
| T369 | kubernetes-client/python | `t369/base` | Correct generated synchronous resource deletion responses |
| T370 | kubernetes-client/python | `t370/base` | Correct generated asyncio resource deletion responses |
| T371 | celery/celery | `t371/base` | fix: prevent graceful shutdown regression in connection recovery (GH-9705) (#10242) |
| T372 | celery/celery | `t372/base` | fix: prevent celery from hanging due to spawned greenlet errors in greenlet drainers (#9371) |
| T373 | redis/redis-py | `t373/base` | fix(asyncio): raise on EOF in can_read() so pools replace server-closed connections (#4260) |
| T374 | redis/redis-py | `t374/base` | fix(asyncio): release pooled connection when Pipeline.reset() is cancelled (#4123) |
| T375 | redis/redis-py | `t375/base` | Fix ConnectionPool to raise MaxConnectionsError instead of Connection… (#3698) |
| T376 | redis/redis-py | `t376/base` | fix(cluster): initialize async Pub/Sub before routing (#4297) |
| T377 | redis/redis-py | `t377/base` | add async Retry ``__eq__`` and ``__hash__`` & fix ExponentialWithJitterBackoff ``__eq__`` (#3668) |
| T378 | psycopg/psycopg | `t378/base` | fix: more careful stripping of error prefixes |
| T379 | psycopg/psycopg | `t379/base` | fix: set minimum timeout to 2s |
| T380 | psycopg/psycopg | `t380/base` | fix: don't hang forever if async connection is closed while querying |
| T381 | pypa/virtualenv | `t381/base` | 🐛 fix(seed): fail closed when PyPI digest is unknown (#3302) |
| T382 | getsentry/sentry-python | `t382/base` | fix(asyncpg): Use distinct span ops for cursor iteration and fetch to prevent N+1 false positives (#6609) |
| T383 | sphinx-doc/sphinx | `t383/base` | linkcheck: Fix race condition that could lead to checking the availability of the same URL twice |
| T384 | sqlfluff/sqlfluff | `t384/base` | [BUGFIX] Changing cwd temporarily on manifest load as dbt is not using project_dir to read/write target folder (#3979) |
| T385 | aio-libs/aiobotocore | `t385/base` | Fixes context propagation, adds context tests (#1369) |
| T386 | aio-libs/aiobotocore | `t386/base` | fix: build SSL context off event loop (closes #1469) (#1587) |
| T387 | fastapi/typer | `t387/base` | 🐛 Fix escaping in help text when `rich` is installed but not used (#1089) |
| T388 | fastapi/typer | `t388/base` | ✨ Add pretty error tracebacks for user errors and support for Rich (#412) |
| T389 | strawberry-graphql/strawberry | `t389/base` | Fix unclear error when missing dependencies (#3511) |
| T390 | tortoise/tortoise-orm | `t390/base` | Fix unittest error with pydantic2.9 (#1734) |
| T391 | tortoise/tortoise-orm | `t391/base` | Fix python3.11 testcase error & Allow ForeignKeyField(on_delete=NO_ACTION) (#1410) |
| T392 | celery/kombu | `t392/base` | [fix #1726] Use boto3 for SQS async requests (#1759) |
| T393 | django/django | `t393/base` | Fixed #27380 -- Added "raw" argument to m2m_changed signals. |
| T394 | django/django | `t394/base` | Fixed #35303 -- Implemented async auth backends and utils. |
| T395 | django/django | `t395/base` | Fixed #34901 -- Added async-compatible interface to session engines. |
| T396 | fsspec/filesystem_spec | `t396/base` | Support cache mapper that is basename plus fixed number of parent directories (#1318) |
| T397 | tkem/cachetools | `t397/base` | Fix #334: Drop MRUCache. |
| T398 | aiogram/aiogram | `t398/base` | Fail redis and mongo tests if incorrect URI provided + some storages tests refactoring (#1510) |

## T349 — temporalio/sdk-python

- 仓库地址：https://github.com/temporalio/sdk-python
- 初始环境：`t349/base`（上游 temporalio/sdk-python @ 5df719234117）
- 上游修复提交：a66bca14a596（2026-07-27）
- 改动文件：temporalio/worker/_replayer.py, temporalio/worker/_worker.py, temporalio/worker/_workflow.py, temporalio/worker/_workflow_instance.py

```text
temporalio 的 Python SDK 里，取消信号在某些情况下会被吞掉：工作流被取消之后，等待中的活动/子工作流没有按预期收到取消，重放（replay）还会出现历史不一致。

请修好取消的传播与重放路径（不要靠 monkeypatch 兜），补测试：重放时的异步顺序、未标记的历史。
```

## T350 — temporalio/sdk-python

- 仓库地址：https://github.com/temporalio/sdk-python
- 初始环境：`t350/base`（上游 temporalio/sdk-python @ a6a8b572a007）
- 上游修复提交：ab25ed693f7e（2026-09-11）
- 改动文件：temporalio/contrib/deepagents/_activity.py, temporalio/contrib/deepagents/_tools.py, temporalio/contrib/deepagents/workflow.py, tests/contrib/deepagents/histories/legacy_cache_carried_across_can.json, tests/contrib/deepagents/histories/legacy_dedup_repeated_tool_calls.json

```text
temporalio 的 Deep Agents 集成里，参数完全相同的工具调用会被错误地缓存复用：第二次调用直接拿到上一次的结果，跨 continue-as-new 之后更明显，等于重复调用被吞。

请修好这条缓存键的计算（可以用开关控制新旧行为），补测试：跨 continue-as-new 的相同调用要真的重跑、以及旧行为兼容。
```

## T351 — temporalio/sdk-python

- 仓库地址：https://github.com/temporalio/sdk-python
- 初始环境：`t351/base`（上游 temporalio/sdk-python @ 7ab0e9d8e7ae）
- 上游修复提交：29dc19c2ea3f（2026-06-15）
- 改动文件：temporalio/worker/_debugger.py, temporalio/worker/_workflow.py, temporalio/worker/workflow_sandbox/_importer.py, temporalio/worker/workflow_sandbox/_restrictions.py

```text
temporalio 的工作流在 debug 模式（debug_mode=True 或 TEMPORAL_DEBUG=1）下遇到 `breakpoint()` 会卡死：pdb 的交互提示出不来，工作流就挂在那儿。

请让 debug 模式下断点能正常进入交互、退出后工作流继续跑，补测试（含从子工作流/异步上下文进入断点的情况）。
```

## T352 — temporalio/sdk-python

- 仓库地址：https://github.com/temporalio/sdk-python
- 初始环境：`t352/base`（上游 temporalio/sdk-python @ 4f646c20bd63）
- 上游修复提交：2331aa4617dc（2024-06-20）
- 改动文件：.github/workflows/ci.yml, temporalio/client.py, tests/helpers/__init__.py

```text
temporalio SDK 里工作流更新（Workflow Update）超时或被取消时，抛出来的异常跟其它 RPC 不一致：调用方拿不到能区分的错误类型，也没法判断是超时还是取消。

请补上可区分的错误类型（超时/取消），补一个对应的测试。
```

## T353 — temporalio/sdk-python

- 仓库地址：https://github.com/temporalio/sdk-python
- 初始环境：`t353/base`（上游 temporalio/sdk-python @ 24badcfd8095）
- 上游修复提交：b9b2cc31db8f（2026-06-11）
- 改动文件：temporalio/client/_client.py, temporalio/client/_impl.py, temporalio/client/_interceptor.py, temporalio/client/_workflow.py

```text
temporalio 的拦截器约定不一致：`start_update_with_start_workflow` 这条路径没有把顶层的 rpc_metadata / rpc_timeout 传给拦截器，其它调用路径都传了，于是自定义拦截器在这条路径上拿到的是空值。

请把约定统一（顶层字段要转发到拦截器），补测试。
```

## T354 — temporalio/sdk-python

- 仓库地址：https://github.com/temporalio/sdk-python
- 初始环境：`t354/base`（上游 temporalio/sdk-python @ 39b820d6786c）
- 上游修复提交：2eea03055170（2026-08-06）
- 改动文件：temporalio/contrib/google_adk_agents/__init__.py, temporalio/contrib/google_adk_agents/_mcp.py, temporalio/contrib/google_adk_agents/_plugin.py, tests/contrib/google_adk_agents/__init__.py

```text
temporalio 的 google_adk_agents 集成里 MCP 连接没有池化也没有空闲回收：每次列工具/调工具都新建连接，出错时还不关闭，跑久了连接数一直涨。

请加上连接池与空闲淘汰（出错路径也要关闭），补测试。
```

## T355 — dbt-labs/dbt-core

- 仓库地址：https://github.com/dbt-labs/dbt-core
- 初始环境：`t355/base`（上游 dbt-labs/dbt-core @ 6737ed27e1b6）
- 上游修复提交：9362e62672ed（2026-03-20）
- 改动文件：crates/dbt-adapter/src/bridge_adapter.rs, crates/dbt-adapter/src/engine/adapter_engine.rs, crates/dbt-adapter/src/engine/xdbc.rs, crates/dbt-adapter/src/funcs.rs, crates/dbt-adapter/src/parse/adapter.rs, crates/dbt-adapter/src/python/snowflake.rs, crates/dbt-adapter/src/query_ctx.rs, crates/dbt-adapter/src/typed_adapter.rs

```text
dbt 的 `state:modified` 判断漏掉了宏：模型依赖的宏改了，`state:modified` 仍然认为模型没变，于是选择集不对（该跑的不跑）。从 manifest 里加载的宏节点还会被丢掉。

请把宏依赖纳入状态比较（记录项目内宏的依赖、保留从 manifest 加载的宏节点），补测试。
```

## T356 — dbt-labs/dbt-core

- 仓库地址：https://github.com/dbt-labs/dbt-core
- 初始环境：`t356/base`（上游 dbt-labs/dbt-core @ d593f605e808）
- 上游修复提交：380f1016c767（2025-08-01）
- 改动文件：.changes/unreleased/Fixes-20250730-074232.yaml, crates/dbt-common/src/error/code_location.rs, crates/dbt-jinja-utils/src/environment_builder.rs, crates/dbt-jinja-utils/src/phases/compile/compile_node_context.rs, crates/dbt-jinja-utils/src/phases/parse/resolve_model_context.rs, crates/dbt-jinja-utils/src/phases/run/run_node_context.rs, crates/dbt-jinja/minijinja/src/compiler/cfg.rs, crates/dbt-jinja/minijinja/src/compiler/codegen.rs

```text
dbt 在 Jinja 渲染出错时给出的堆栈没法看：错误位置指向 dbt 自己的包装层，用户看不出是模板哪一行的问题。

请改成能定位到模板/模型实际位置的堆栈，补测试。
```

## T357 — dbt-labs/dbt-core

- 仓库地址：https://github.com/dbt-labs/dbt-core
- 初始环境：`t357/base`（上游 dbt-labs/dbt-core @ 9ae1971c1d48）
- 上游修复提交：dd8225436a2a（2026-05-11）
- 改动文件：crates/dbt-adapter/Cargo.toml, crates/dbt-adapter/src/connection.rs, crates/dbt-adapter/src/engine/mod.rs, crates/dbt-adapter/src/engine/retry.rs, crates/dbt-adapter/src/engine/xdbc.rs, crates/dbt-auth/src/config.rs, crates/dbt-auth/src/snowflake/mod.rs

```text
dbt 的 snowflake 连接有线程局部缓存的连接残留：重试循环由 dbt 侧控制不住，旧连接被复用后报 context deadline exceeded 之类的超时，任务就卡住/失败。

请把重试循环的控制权收到 dbt 这边并处理陈旧连接，补测试。
```

## T358 — dbt-labs/dbt-core

- 仓库地址：https://github.com/dbt-labs/dbt-core
- 初始环境：`t358/base`（上游 dbt-labs/dbt-core @ 68a8c15d8039）
- 上游修复提交：088119f8f493（2025-08-11）
- 改动文件：.changes/unreleased/Fixes-20250809-153705.yaml, Cargo.toml, crates/dbt-error/src/code_location.rs, crates/dbt-jinja/minijinja/src/vm/macro_object.rs, crates/dbt-jinja/minijinja/src/vm/mod.rs, crates/dbt-parser/src/resolve/resolve_operations.rs, crates/dbt-schemas/src/schemas/manifest/manifest.rs, crates/dbt-schemas/src/schemas/project/dbt_project.rs

```text
dbt 的 `run_operator` 出错时抛出的堆栈指向内部而不是实际出问题的位置（宏/模型），也很难看出实际执行的 SQL 属于哪个节点。

请修好这条错误路径的堆栈，补测试。
```

## T359 — dbt-labs/dbt-core

- 仓库地址：https://github.com/dbt-labs/dbt-core
- 初始环境：`t359/base`（上游 dbt-labs/dbt-core @ cd84fc80d2f5）
- 上游修复提交：1304ee3d13fa（2026-07-29）
- 改动文件：crates/dbt-adapter/src/adapter/mod.rs, crates/dbt-adapter/src/relation/databricks/config/components/query.rs, crates/dbt-adapter/src/relation/databricks/config/relation_types/view.rs, crates/dbt-jinja-utils/src/phases/parse/resolve_model_context.rs, crates/dbt-jinja-utils/src/phases/run/run_config.rs, crates/dbt-jinja-utils/src/phases/run/run_node_context.rs, crates/dbt-parser/src/resolve/resolve_models.rs, crates/dbt-scheduler/src/node_selector.rs

```text
dbt 的 databricks 适配在 `view_update_via_alter` 下检测不到视图定义变化：视图的 query 配置改了，却被判定为没变，于是不会执行 ALTER。

请把视图定义纳入变化检测，补测试。
```

## T360 — dbt-labs/dbt-core

- 仓库地址：https://github.com/dbt-labs/dbt-core
- 初始环境：`t360/base`（上游 dbt-labs/dbt-core @ 7e472738e87f）
- 上游修复提交：1b00927a14bc（2026-03-09）
- 改动文件：.changes/unreleased/Fixes-20260305-133929.yaml, core/dbt/compilation.py, core/dbt/contracts/graph/nodes.py

```text
dbt 并发编译 ephemeral 模型会有竞态：多个线程同时编译同一个 ephemeral 节点，生成的 CTE 重复/互相覆盖，产物不稳定。

请给编译加按节点的锁（避免重复生成），补测试：并发编译同一 ephemeral 模型、以及锁不会互相阻塞。
```

## T361 — dbt-labs/dbt-core

- 仓库地址：https://github.com/dbt-labs/dbt-core
- 初始环境：`t361/base`（上游 dbt-labs/dbt-core @ 67450d802b4e）
- 上游修复提交：0f09e949f1b5（2026-05-29）
- 改动文件：crates/dbt-run-cache/src/auth/oauth.rs, crates/dbt-run-cache/src/service_client.rs

```text
dbt 的 run-cache 里，缓存的 `state_auth.json` 没有优先于平台自身的认证链：缓存命中时仍然走了平台认证，导致本可离线/免认证的场景失败。

请让缓存的 state_auth 优先生效，补测试。
```

## T362 — dbt-labs/dbt-core

- 仓库地址：https://github.com/dbt-labs/dbt-core
- 初始环境：`t362/base`（上游 dbt-labs/dbt-core @ 9b4a8bba77bf）
- 上游修复提交：e72b3b0f4807（2026-01-12）
- 改动文件：.changes/unreleased/Fixes-20260109-141332.yaml, core/dbt/graph/queue.py, core/dbt/graph/thread_pool.py, core/dbt/task/run.py, core/dbt/task/runnable.py

```text
dbt 的 microbatch 并发批次会死锁：多个批次同时编译/执行同一批模型时互相等待，整个运行挂住不推进。

请把在推进中的批次节点记录下来、避免相互等待，补测试。
```

## T363 — PrefectHQ/prefect

- 仓库地址：https://github.com/PrefectHQ/prefect
- 初始环境：`t363/base`（上游 PrefectHQ/prefect @ 9ffc22b77ab9）
- 上游修复提交：920e9f52ff2a（2026-08-07）
- 改动文件：src/prefect/_internal/concurrency/services.py, src/prefect/concurrency/_asyncio.py, src/prefect/concurrency/services.py

```text
prefect 的并发限流（concurrency lease）在调用方被取消/中断之后不会释放已经授予的租约：名额一直被占，后续流程拿不到许可，只能干等超时。

请让没被真正使用或被中断的租约被释放（已经用完的不重复释放），补测试。
```

## T364 — PrefectHQ/prefect

- 仓库地址：https://github.com/PrefectHQ/prefect
- 初始环境：`t364/base`（上游 PrefectHQ/prefect @ 256e188058ce）
- 上游修复提交：5ec04cda05a4（2025-10-16）
- 改动文件：src/integrations/prefect-redis/prefect_redis/lease_storage.py, src/prefect/server/api/concurrency_limits_v2.py, src/prefect/server/concurrency/lease_storage/__init__.py, src/prefect/server/concurrency/lease_storage/filesystem.py, src/prefect/server/concurrency/lease_storage/memory.py, src/prefect/server/utilities/leasing.py

```text
prefect 的并发租约续租有 TOCTOU 竞态：检查与续租之间租约可能已经过期或被别人拿走，于是出现同一名额被两个执行体同时持有。

请把续租做成原子/带版本校验，补测试（含旧的实现要走兼容路径）。
```

## T365 — PrefectHQ/prefect

- 仓库地址：https://github.com/PrefectHQ/prefect
- 初始环境：`t365/base`（上游 PrefectHQ/prefect @ 6185549ca64a）
- 上游修复提交：55269f90e9cd（2023-06-01）
- 改动文件：src/prefect/agent.py, tests/fixtures/database.py

```text
prefect 的 agent 在被取消时对工作队列（work queue）的处理不一致：有些路径不清理、有些把别的池/队列的许可也动了，表现为取消后队列状态错乱。

请统一取消路径的队列处理，补测试（含跨工作池同名队列的情况）。
```

## T366 — PrefectHQ/prefect

- 仓库地址：https://github.com/PrefectHQ/prefect
- 初始环境：`t366/base`（上游 PrefectHQ/prefect @ f929e3646116）
- 上游修复提交：e4f53f8c14a5（2023-05-03）
- 改动文件：src/prefect/engine.py, src/prefect/flows.py

```text
prefect 缺少流运行崩溃（crashed）状态的钩子：进程被杀之类的场景下想在崩溃时做告警/清理，现在没有对应入口，只能靠轮询状态。

请补上 `on_crashed` 状态变化钩子（子流程也要触发），补测试。
```

## T367 — streamlit/streamlit

- 仓库地址：https://github.com/streamlit/streamlit
- 初始环境：`t367/base`（上游 streamlit/streamlit @ 913f77c7ceed）
- 上游修复提交：a0394068b623（2026-08-31）
- 改动文件：e2e_playwright/mega_tester_app_test.py, lib/streamlit/web/server/starlette/starlette_routes.py

```text
streamlit 的文件上传在中间件（比如 Sentry 的 ASGI 中间件）先把请求体读过一遍之后会挂住：上传一直不返回。

请修好这条路径（请求体已被缓存时也要能正常取到），补测试：小文件上传、PUT 请求体。
```

## T368 — streamlit/streamlit

- 仓库地址：https://github.com/streamlit/streamlit
- 初始环境：`t368/base`（上游 streamlit/streamlit @ ca1485a55779）
- 上游修复提交：dd6b8497c4e6（2025-08-08）
- 改动文件：e2e_playwright/__snapshots__/linux/st_components_v1_test/st_components-html-iframe-in-vertical-container[chromium].png, e2e_playwright/__snapshots__/linux/st_components_v1_test/st_components-html-iframe-in-vertical-container[firefox].png, e2e_playwright/__snapshots__/linux/st_components_v1_test/st_components-html-iframe-in-vertical-container[webkit].png, e2e_playwright/__snapshots__/linux/st_components_v1_test/st_components-html-no-width-height-container[chromium].png, e2e_playwright/__snapshots__/linux/st_components_v1_test/st_components-html-no-width-height-container[firefox].png, e2e_playwright/__snapshots__/linux/st_components_v1_test/st_components-html-no-width-height-container[webkit].png, e2e_playwright/__snapshots__/linux/st_components_v1_test/st_components-iframe-fixed-width-height[chromium].png, e2e_playwright/__snapshots__/linux/st_components_v1_test/st_components-iframe-fixed-width-height[firefox].png

```text
streamlit 的 `st.components.v1.iframe` 和 `st.html` 在没显式指定宽度时，默认宽度变了（跟着容器布局走），嵌进去的组件被拉伸或压扁。

请把默认宽度行为修回原来的语义，补测试。
```

## T369 — kubernetes-client/python

- 仓库地址：https://github.com/kubernetes-client/python
- 初始环境：`t369/base`（上游 kubernetes-client/python @ 81fce07b6033）
- 上游修复提交：1c5984c4de04（2026-07-23）
- 改动文件：kubernetes/.openapi-generator/swagger.json-default.sha256, kubernetes/client/api/admissionregistration_v1_api.py, kubernetes/client/api/admissionregistration_v1alpha1_api.py, kubernetes/client/api/admissionregistration_v1beta1_api.py, kubernetes/client/api/apiextensions_v1_api.py, kubernetes/client/api/apiregistration_v1_api.py, kubernetes/client/api/apps_v1_api.py, kubernetes/client/api/autoscaling_v1_api.py

```text
kubernetes 的 Python 客户端在同步资源的删除响应上处理不对：Kubernetes 的删除可能返回被删对象，也可能返回 Status，生成的客户端只认一种，另一种会被当成错误。

请修好同步生成的删除响应处理（代码和文档从同一份契约生成），补测试。
```

## T370 — kubernetes-client/python

- 仓库地址：https://github.com/kubernetes-client/python
- 初始环境：`t370/base`（上游 kubernetes-client/python @ 3954eb45f9f5）
- 上游修复提交：81fce07b6033（2026-07-23）
- 改动文件：kubernetes/aio/.openapi-generator/swagger.json-default.sha256, kubernetes/aio/client/api/admissionregistration_v1_api.py, kubernetes/aio/client/api/admissionregistration_v1alpha1_api.py, kubernetes/aio/client/api/admissionregistration_v1beta1_api.py, kubernetes/aio/client/api/apiextensions_v1_api.py, kubernetes/aio/client/api/apiregistration_v1_api.py, kubernetes/aio/client/api/apps_v1_api.py, kubernetes/aio/client/api/autoscaling_v1_api.py

```text
kubernetes 的 Python 客户端在 asyncio 版本的资源删除上同样只认一种响应：返回 Status 时判错，导致删除其实成功但调用方拿到异常。

请修好 asyncio 生成的删除响应处理，补测试。
```

## T371 — celery/celery

- 仓库地址：https://github.com/celery/celery
- 初始环境：`t371/base`（上游 celery/celery @ c7018110173e）
- 上游修复提交：feb789accf0d（2026-04-06）
- 改动文件：celery/worker/consumer/connection.py, celery/worker/consumer/consumer.py

```text
celery 优雅关闭之后连接重建有问题：消费者重启时旧的（已经断掉的）socket 没有被关，`restart()` 之后连接状态是错的，任务发不出去或报连接错误。

请给连接的 bootstep 补上 stop（重启时把坏连接关掉），补测试。
```

## T372 — celery/celery

- 仓库地址：https://github.com/celery/celery
- 初始环境：`t372/base`（上游 celery/celery @ 166f705adcae）
- 上游修复提交：6804ea8615af（2025-08-30）
- 改动文件：.gitignore, celery/backends/asynchronous.py, celery/backends/redis.py

```text
celery 依赖的 event drainer 在 greenlet 已经退出时不会把错误抛出来：worker 陷在无限循环里不推进，只能手动重启。

请把 drainer 的错误传播出去（别再死循环），补测试。
```

## T373 — redis/redis-py

- 仓库地址：https://github.com/redis/redis-py
- 初始环境：`t373/base`（上游 redis/redis-py @ 6a6b581b4822）
- 上游修复提交：0d2ce3b5a777（2026-08-17）
- 改动文件：redis/_parsers/base.py, redis/_parsers/hiredis.py

```text
redis-py 的异步解析器把 EOF 折进了 can_read()：服务端把连接关掉时它只说"没数据可读"，连接池因此不换连接，调用方一直卡在同一个死连接上。

请让 can_read() 在连接已被服务端关闭时抛错（有缓冲数据时优先返回缓冲），这样连接池会重建连接；补测试。
```

## T374 — redis/redis-py

- 仓库地址：https://github.com/redis/redis-py
- 初始环境：`t374/base`（上游 redis/redis-py @ 1c77108df0ae）
- 上游修复提交：7abefd7e2699（2026-06-15）
- 改动文件：redis/asyncio/client.py, redis/asyncio/cluster.py

```text
redis-py 的 Pipeline 在被取消时不会把池化连接还回去：连接泄漏，池子很快耗尽。

请修好 Pipeline.reset 的释放路径，补一个取消后连接被归还的测试。
```

## T375 — redis/redis-py

- 仓库地址：https://github.com/redis/redis-py
- 初始环境：`t375/base`（上游 redis/redis-py @ a00141618572）
- 上游修复提交：4cf094fdd2c1（2025-07-22）
- 改动文件：redis/__init__.py, redis/asyncio/cluster.py, redis/cluster.py, redis/connection.py, redis/exceptions.py

```text
redis-py 的连接池在达到 max_connections 时抛的是通用 ConnectionError，调用方没法区分"池满"和"连不上"。

请补一个 `MaxConnectionsError`（继承 ConnectionError，保持兼容）并在池满时抛出，补测试（含集群客户端）。
```

## T376 — redis/redis-py

- 仓库地址：https://github.com/redis/redis-py
- 初始环境：`t376/base`（上游 redis/redis-py @ d6e0669120f8）
- 上游修复提交：c73fdd92c955（2026-09-04）
- 改动文件：redis/asyncio/cluster.py, redis/cluster.py

```text
redis-py 的异步集群客户端在刷新拓扑时会破坏 pub/sub 的订阅状态：刷新之后之前退订的频道又被重新订阅上。

请把异步 Pub/Sub 的初始化放到路由之前，并在刷新时保住订阅状态（空分片退订要跳过），补测试。
```

## T377 — redis/redis-py

- 仓库地址：https://github.com/redis/redis-py
- 初始环境：`t377/base`（上游 redis/redis-py @ 4cf094fdd2c1）
- 上游修复提交：7291deb5eb80（2025-07-23）
- 改动文件：redis/asyncio/retry.py, redis/backoff.py, redis/retry.py

```text
redis-py 的重试策略有两个问题：`ExponentialWithJitterBackoff.__eq__` 比较逻辑写错（同名不同参数被判相等），异步 Retry 也没有实现 `__eq__`/`__hash__`，放进集合/去重时行为不对。

请修好这两处，补一个 Retry 可比较、可哈希的测试。
```

## T378 — psycopg/psycopg

- 仓库地址：https://github.com/psycopg/psycopg
- 初始环境：`t378/base`（上游 psycopg/psycopg @ 5e7948742534）
- 上游修复提交：31905a6fa55a（2024-03-31）
- 改动文件：psycopg/psycopg/pq/misc.py, pyproject.toml, tools/update_error_prefixes.py

```text
psycopg 剥掉错误信息前缀的做法太粗暴：只要开头像就剥，会把正文里真实的内容也去掉，非英文（本地化）消息前缀同样认不出来。

请改成只剥已知的前缀（含已知本地化版本），补测试。
```

## T379 — psycopg/psycopg

- 仓库地址：https://github.com/psycopg/psycopg
- 初始环境：`t379/base`（上游 psycopg/psycopg @ b9c1a802f82b）
- 上游修复提交：04e3d6fa4d69（2023-12-13）
- 改动文件：psycopg/psycopg/_connection_base.py, psycopg/psycopg/connection.py, psycopg/psycopg/connection_async.py, psycopg/psycopg/conninfo.py, tests/_test_connection.py

```text
psycopg 的等待超时没有下限：用户传了很小的值（甚至 0）时会忙等/行为怪异，而 libpq 自己是有最小超时约定的。

请把超时下限设成 2 秒（和 libpq 一致，不要改动连接本身），补测试。
```

## T380 — psycopg/psycopg

- 仓库地址：https://github.com/psycopg/psycopg
- 初始环境：`t380/base`（上游 psycopg/psycopg @ 24774792abf1）
- 上游修复提交：15280ed243d6（2023-09-26）
- 改动文件：psycopg/psycopg/connection.py, psycopg/psycopg/connection_async.py, psycopg/psycopg/waiting.py

```text
psycopg 的异步连接在关闭过程中如果还有并发操作，会永远等下去（而不是给出明确错误）。

请修好这条路径，别让调用方挂死，补一个并发关闭的测试。
```

## T381 — pypa/virtualenv

- 仓库地址：https://github.com/pypa/virtualenv
- 初始环境：`t381/base`（上游 pypa/virtualenv @ 73c67e4058e5）
- 上游修复提交：91460add8f53（2026-09-22）
- 改动文件：src/virtualenv/seed/wheels/acquire.py, src/virtualenv/seed/wheels/periodic_update.py

```text
virtualenv 用内嵌 wheel 建环境时，如果拿不到 PyPI 上的摘要（离线/镜像异常），它会继续装下去而不是停下来：装出来的环境可能被投毒或损坏。

请改成 digest 未知时 fail closed，补测试。
```

## T382 — getsentry/sentry-python

- 仓库地址：https://github.com/getsentry/sentry-python
- 初始环境：`t382/base`（上游 getsentry/sentry-python @ 7f20c235adef）
- 上游修复提交：dafa2bd4b1a4（2026-06-22）
- 改动文件：sentry_sdk/consts.py, sentry_sdk/integrations/asyncpg.py, sentry_sdk/tracing_utils.py

```text
sentry-python 的 asyncpg 集成把游标迭代和分批取数（Cursor.fetch）混用同一个 span 操作名，链路里分不清是迭代还是取数。

请给两类操作不同的 span 操作，补测试。
```

## T383 — sphinx-doc/sphinx

- 仓库地址：https://github.com/sphinx-doc/sphinx
- 初始环境：`t383/base`（上游 sphinx-doc/sphinx @ a7b6b6bb7fe7）
- 上游修复提交：cead0f6ddfaa（2021-01-19）
- 改动文件：CHANGES, sphinx/builders/linkcheck.py, tests/roots/test-linkcheck-localserver-two-links/conf.py

```text
sphinx 的 linkcheck 有竞态：同一个 URL 被多个线程同时检查，出现重复报告/结果互相覆盖，有时还会漏报坏链接。

请把同一 URL 的检查串行化（去重后再并发），补测试。
```

## T384 — sqlfluff/sqlfluff

- 仓库地址：https://github.com/sqlfluff/sqlfluff
- 初始环境：`t384/base`（上游 sqlfluff/sqlfluff @ e233d8a317a4）
- 上游修复提交：172dafea124f（2022-10-20）
- 改动文件：plugins/sqlfluff-templater-dbt/sqlfluff_templater_dbt/templater.py, src/sqlfluff/utils/testing/cli.py, test/cli/commands_test.py

```text
sqlfluff 加载 dbt manifest 时会依赖当前工作目录（dbt 侧相对路径）：从别的目录调用时 manifest 里的路径解析错，找不到模型。

请改成加载期间临时切换工作目录（用完恢复），补测试。
```

## T385 — aio-libs/aiobotocore

- 仓库地址：https://github.com/aio-libs/aiobotocore
- 初始环境：`t385/base`（上游 aio-libs/aiobotocore @ e3bfcf870751）
- 上游修复提交：e3c37ee943d9（2025-06-03）
- 改动文件：aiobotocore/context.py, aiobotocore/paginate.py, aiobotocore/waiter.py, tests/botocore_tests/__init__.py, tests/botocore_tests/functional/__init__.py

```text
aiobotocore 的上下文传播有问题：注册过的特性标识会跨线程串（一个线程注册的配置影响另一个线程），并发场景下行为不可预期。

请修好上下文的传播与隔离，补测试。
```

## T386 — aio-libs/aiobotocore

- 仓库地址：https://github.com/aio-libs/aiobotocore
- 初始环境：`t386/base`（上游 aio-libs/aiobotocore @ 2085dd1b543b）
- 上游修复提交：9b5e4058eb34（2026-06-03）
- 改动文件：aiobotocore/httpsession.py, aiobotocore/httpxsession.py

```text
aiobotocore 在事件循环里构建 SSL 上下文（要读证书文件），第一次请求会把整个循环卡住。

请把 SSL 上下文的构建挪到循环外（线程里做），补测试：首次请求不在循环内构建。
```

## T387 — fastapi/typer

- 仓库地址：https://github.com/fastapi/typer
- 初始环境：`t387/base`（上游 fastapi/typer @ 66acaedd9845）
- 上游修复提交：c0aeb6e1f2a4（2026-01-06）
- 改动文件：tests/assets/cli/multi_app_norich.py, typer/cli.py, typer/core.py

```text
typer 在装了 rich 但没用 rich 的格式化时，帮助文本里的转义（方括号之类）会被吃掉或显示错。

请修好帮助文本的转义处理，补测试（没有 rich 的场景）。
```

## T388 — fastapi/typer

- 仓库地址：https://github.com/fastapi/typer
- 初始环境：`t388/base`（上游 fastapi/typer @ 04898575a96d）
- 上游修复提交：252ed30936fd（2022-07-06）
- 改动文件：pyproject.toml, tests/assets/type_error_no_rich.py, tests/assets/type_error_normal_traceback.py, tests/assets/type_error_rich.py, typer/main.py

```text
typer 的用户错误（参数写错之类）现在抛出的是原始堆栈，很难看；也没有区分"用户错误"和"程序内部错误"。

请给用户错误加上友好的回溯（保留程序内部错误原样抛出），补测试。
```

## T389 — strawberry-graphql/strawberry

- 仓库地址：https://github.com/strawberry-graphql/strawberry
- 初始环境：`t389/base`（上游 strawberry-graphql/strawberry @ 61f9e3a1baf5）
- 上游修复提交：dd4c343da5a0（2024-05-25）
- 改动文件：strawberry/cli/__init__.py, strawberry/exceptions/__init__.py, strawberry/exceptions/missing_dependencies.py

```text
strawberry 缺少可选依赖（比如某些集成需要的包）时，报的是 ImportError 或者含义不明的 AttributeError，用户不知道是缺包。

请补一个明确的 MissingOptionalDependenciesError 并在缺包时抛出，补测试。
```

## T390 — tortoise/tortoise-orm

- 仓库地址：https://github.com/tortoise/tortoise-orm
- 初始环境：`t390/base`（上游 tortoise/tortoise-orm @ 101eb871b7b9）
- 上游修复提交：c7d5be1a5fe7（2024-10-13）
- 改动文件：poetry.lock, pyproject.toml, tortoise/backends/psycopg/client.py, tortoise/contrib/fastapi/__init__.py, tortoise/expressions.py, tortoise/models.py

```text
tortoise-orm 在 pydantic 2.9 下单元测试跑不过：类型标注和实际类型对不上，pydantic 校验直接失败（连测试套件都起不来）。

请修好类型标注与兼容（顺带把 README 的安装说明补清楚），补测试。
```

## T391 — tortoise/tortoise-orm

- 仓库地址：https://github.com/tortoise/tortoise-orm
- 初始环境：`t391/base`（上游 tortoise/tortoise-orm @ a819a7924f3d）
- 上游修复提交：f6b3eb120583（2023-07-20）
- 改动文件：.github/workflows/ci.yml, examples/pydantic/basic.py, examples/relations.py, examples/relations_with_unique.py, pyproject.toml, tests/schema/models_fk_2.py, tests/schema/models_o2o_2.py, tests/testmodels.py

```text
tortoise-orm 有两个问题：Python 3.11 下测试用例失败（生成的 schema SQL 与预期不一致），以及 `ForeignKeyField(on_delete=NO_ACTION)` 不可用。

请修好这两处（schema 生成与 NO_ACTION 支持），补测试。
```

## T392 — celery/kombu

- 仓库地址：https://github.com/celery/kombu
- 初始环境：`t392/base`（上游 celery/kombu @ 68cb9ce011d2）
- 上游修复提交：862d0bc7281e（2023-06-26）
- 改动文件：kombu/asynchronous/aws/sqs/connection.py, kombu/asynchronous/aws/sqs/queue.py, kombu/transport/SQS.py

```text
kombu 的 SQS 异步请求走的是自己手工构造的请求，服务端协议一变就挂（之前出过一次事故）；而且它依赖的 boto3 路径是阻塞的。

请改成用 boto3 发 SQS 异步请求（协议由 boto3 保证），补测试覆盖队列创建/发送/接收。
```

## T393 — django/django

- 仓库地址：https://github.com/django/django
- 初始环境：`t393/base`（上游 django/django @ 12d574407c46）
- 上游修复提交：4702b36120ea（2025-11-07）
- 改动文件：django/core/serializers/base.py, django/db/models/fields/related_descriptors.py, tests/m2m_signals/tests.py

```text
django 的 `m2m_changed` 信号没有告诉接收者这次改动是不是"原始"批量操作（比如在 fixture 加载或原始保存里），接收者没法区分要不要做副作用。

请给信号加上 `raw` 参数（默认值保持兼容），补测试。
```

## T394 — django/django

- 仓库地址：https://github.com/django/django
- 初始环境：`t394/base`（上游 django/django @ 4cad317ff1f9）
- 上游修复提交：50f89ae850f6（2024-03-31）
- 改动文件：django/contrib/auth/__init__.py, django/contrib/auth/backends.py, django/contrib/auth/base_user.py, django/contrib/auth/decorators.py, django/contrib/auth/middleware.py, django/contrib/auth/models.py, tests/auth_tests/models/custom_user.py

```text
django 的认证后端与工具函数只有同步版本：在 async 视图里调用要么得用 sync_to_async 包，要么直接报错，而 ORM 那边已经有 async 接口了。

请补上 async 版本（`aauthenticate`、`alogin`、`alogout`、`aget_user` 等）并与同步版本行为一致，补测试。
```

## T395 — django/django

- 仓库地址：https://github.com/django/django
- 初始环境：`t395/base`（上游 django/django @ 33c06ca0da6c）
- 上游修复提交：f5c340684be3（2023-10-16）
- 改动文件：django/contrib/auth/__init__.py, django/contrib/sessions/backends/base.py, django/contrib/sessions/backends/cache.py, django/contrib/sessions/backends/cached_db.py, django/contrib/sessions/backends/db.py, django/contrib/sessions/backends/file.py, django/contrib/sessions/backends/signed_cookies.py, tests/cache/failing_cache.py

```text
django 的 session 引擎只有同步接口，async 视图里用不了（要额外包一层）。

请给 session 引擎补 async 兼容接口（`aget`/`aset`/`acycle_key` 之类），行为与同步一致，补测试。
```

## T396 — fsspec/filesystem_spec

- 仓库地址：https://github.com/fsspec/filesystem_spec
- 初始环境：`t396/base`（上游 fsspec/filesystem_spec @ a988ce5c9565）
- 上游修复提交：2fbe8deff1c8（2023-08-17）
- 改动文件：fsspec/implementations/cache_mapper.py, fsspec/implementations/cached.py

```text
fsspec 的缓存文件命名不够用：只能按 basename 或固定层级的父目录拼缓存名，碰撞概率高（不同目录下同名文件会互相覆盖缓存）。

请支持"basename + 固定数量的父目录"这种缓存映射，补测试。
```

## T397 — tkem/cachetools

- 仓库地址：https://github.com/tkem/cachetools
- 初始环境：`t397/base`（上游 tkem/cachetools @ 2ce38a9974b0）
- 上游修复提交：143e78d528aa（2025-02-21）
- 改动文件：src/cachetools/__init__.py, src/cachetools/func.py

```text
cachetools 里的 MRUCache 语义有问题（最近使用淘汰在并发/连续访问下与文档不符），维护者决定直接移除它，保留其它缓存类型不变。

请把 MRUCache 移除（相关导出、文档、测试一起清理），保证其它接口不受影响，补/改测试。
```

## T398 — aiogram/aiogram

- 仓库地址：https://github.com/aiogram/aiogram
- 初始环境：`t398/base`（上游 aiogram/aiogram @ 7760ab1d0d7f）
- 上游修复提交：1df3adaba188（2024-06-17）
- 改动文件：aiogram/filters/command.py, examples/multibot.py

```text
aiogram 的存储后端在 URI 写错时会一直等（Mongo 默认 30 秒超时）或者干脆不报错，测试里很难发现配置问题。

请让 Redis/Mongo 存储在 URI 错误时快速失败并给出明确错误（同时缩短 Mongo 的连接超时），补测试。
```
