psycopg_pool 里 CancelledError 的处理不一致：只在一部分地方兜住了，回滚和任务调度那几条路径漏掉，取消时会冒出去或者把池状态搞乱。

请统一在池代码里处理取消（rollback、sched 也要覆盖），补一个回滚时被取消的测试。
