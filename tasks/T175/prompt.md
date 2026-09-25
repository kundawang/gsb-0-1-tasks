anyio 的 TaskGroup.start() 在 asyncio 和 trio 两个后端上行为不一致：
trio 那边 started(value) 传的值会正常交回到 start() 的调用方，取消要到下一次检查点才生效；
asyncio 这边如果 start() 还在等的时候外层被取消了，CancelledError 会从 start() 里直接被扔给调用方，值也没交回去。

我们要两个后端语义一样，请按 trio 的行为把 asyncio 这边对齐（started 传的值必须能交回到调用方手上），补一个对应的测试。公开 API 保持不变。
