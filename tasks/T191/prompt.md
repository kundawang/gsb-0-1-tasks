celery 开了任务去重之后我们碰上一个丢任务的问题：worker 在 mark_as_done 之后、broker ack 之前崩掉，任务被重投，重投的这次命中"去重快路径"就直接返回了 —— chain 和 callback 都没有派发。

结果就是整条 chain 永久丢了，后面挂的 callback 再也不会跑，而且没有任何报错，我们查了很久才发现是重投那一轮什么都没做。

请把去重快路径补上 chain/callback 的派发。补测试：去重命中重投时 callback 和 chain 都要被派发、派发失败要记日志并且不要把任务错误地记进 successful requests、去重时不能改动 request 里原本的 chain。
