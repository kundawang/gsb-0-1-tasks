redis-py 的 PubSub 在 socket 读上会无限等：我们给 get_message 传了 timeout，但这个 timeout 根本没有传到解析器/socket 的读操作上，结果 get_message(timeout=1) 照样一直阻塞，进程就卡死在那里。

同步客户端、asyncio 客户端、hiredis 解析器和 resp2/resp3 几个解析器都有这个问题，cluster/sentinel 那边也受影响。

请把 timeout 一路传到 socket 读上。补测试：timeout 生效、timeout=None 时保持原来的阻塞行为、timeout=0 立即返回、以及有消息时能正常拿到（sharded pubsub 的分支也要覆盖）。
