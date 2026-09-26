celery 自动创建不存在的队列（task_create_missing_queues=True）时，队列类型和交换器类型都写死成经典队列 + direct 交换器，没法配成 quorum 之类的类型。

请加两个配置项分别控制自动创建时的 queue type 和 exchange type（默认行为一点都不能变），control mailbox 和事件队列那条路径也要跟着支持，不合法的组合要明确报错。补测试。
