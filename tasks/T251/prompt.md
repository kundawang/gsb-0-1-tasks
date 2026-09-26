mitmproxy 里好几处直接 asyncio.create_task 起后台任务，返回的任务对象不留引用，随时可能被 GC 掉（异常也被吞了）；addon 和 proxy server 那边都有这个问题。

请统一改成保留引用的做法（给个封装函数），补测试。
