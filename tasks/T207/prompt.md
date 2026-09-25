pytest 检查"fixture 返回值是没被解析的 awaitable"的时机不对：这个检查跑在别的插件 hook 之前，而 async 插件（anyio / asyncio 那类）本来会在自己的 hook 里把这个 awaitable 解析掉，结果我们先报了错，误伤一批正常用例。

请把这个检查挪到 pytest_fixture_setup 里、等各插件 hook 都跑完之后再做。补测试确认被 async 插件解析过的 fixture 不再被误报。
