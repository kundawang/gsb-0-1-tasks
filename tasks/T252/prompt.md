apscheduler 用 asyncpg / psycopg 的事件代理时，跑完会报一堆 ResourceWarning：asyncio 的内存对象流没有被关闭。

请把这些流正确关闭，别留警告，补测试。
