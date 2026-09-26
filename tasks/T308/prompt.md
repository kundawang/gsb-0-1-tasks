sentry-python 的 asyncpg 集成：流式查询（cursor 迭代 / fetch）生成的 span 上缺少 `db.query.text`，看链路的时候对不上是哪个查询。

请把查询文本带上（常量表也要补），补一个 cursor 迭代产生 span 的测试。
