redis-py 的 asyncio MultiDBClient 在底层是 RedisCluster 时用不了：健康检查那条路径按单节点处理，cluster 场景直接失败（或者一直判不健康）。

请修好 healthcheck 这块，补一个对两个数据库 ping 的测试。
