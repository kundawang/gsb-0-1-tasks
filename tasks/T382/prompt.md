sentry-python 的 asyncpg 集成把游标迭代和分批取数（Cursor.fetch）混用同一个 span 操作名，链路里分不清是迭代还是取数。

请给两类操作不同的 span 操作，补测试。
