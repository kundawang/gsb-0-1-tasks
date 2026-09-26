psycopg 连接失败时，抛出的异常上带着一个没有 finish 的 PGconn：应用如果没及时处理这个异常对象，libpq 的连接结构就不会被释放（我们线上看到文件描述符和内存一直在涨）。

请改成连接失败时先把 PGconn finish 掉再抛异常，纯 Python 和 C 加速两条实现都要改，补一个能验证 PGconn 已被 finish 的测试。
