hypercorn 的 lifespan 启动失败如果被 ASGI 应用包进了 ExceptionGroup，服务不会像预期那样直接崩掉，而是继续跑一个状态不对的实例。

请让这种失败也终止服务（asyncio 和 trio 两套实现都要），补测试。
