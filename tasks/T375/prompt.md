redis-py 的连接池在达到 max_connections 时抛的是通用 ConnectionError，调用方没法区分"池满"和"连不上"。

请补一个 `MaxConnectionsError`（继承 ConnectionError，保持兼容）并在池满时抛出，补测试（含集群客户端）。
