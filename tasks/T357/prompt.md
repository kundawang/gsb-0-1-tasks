dbt 的 snowflake 连接有线程局部缓存的连接残留：重试循环由 dbt 侧控制不住，旧连接被复用后报 context deadline exceeded 之类的超时，任务就卡住/失败。

请把重试循环的控制权收到 dbt 这边并处理陈旧连接，补测试。
