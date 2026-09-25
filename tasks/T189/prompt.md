我们的测试用 anyio 的 pytest 插件，同一批用例参数化跑 asyncio 和 trio 两个后端。
Trio 后端下用 request.getfixturevalue() 动态拿一个 async fixture，整个测试就卡死不动了，得手动 Ctrl-C 才停；同样这段换 asyncio 后端跑是正常的。插件里从同步上下文把 async fixture 的值取回来这块，看起来没走通。

请修好让两个后端都能动态取 async fixture、不要挂住。补一个用例断言它不会 hang。插件里那个占位/无操作的分支也别漏掉。
