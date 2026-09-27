redis-py 的重试策略有两个问题：`ExponentialWithJitterBackoff.__eq__` 比较逻辑写错（同名不同参数被判相等），异步 Retry 也没有实现 `__eq__`/`__hash__`，放进集合/去重时行为不对。

请修好这两处，补一个 Retry 可比较、可哈希的测试。
