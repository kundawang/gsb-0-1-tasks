pymongo 在 asyncio 下有个死锁：等锁的时候被取消，`_ACondition.wait()` 这条路径会把锁和等待状态搞乱——被取消的等待者不唤醒后来者，或者唤醒之后重拿锁失败，压测里表现成整个客户端卡住不动。

请把 `pymongo/lock.py` 的 `_ACondition.wait()` 修好：被取消时要正确释放并唤醒等待者、唤醒后重拿锁要可靠；asynchronous 和 synchronous 两套调用方（连接池、topology）跟着一起调整。补测试覆盖取消后重新获取、取消时唤醒别人、以及上下文管理器路径。
