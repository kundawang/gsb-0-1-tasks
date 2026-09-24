filelock 的 SoftReadWriteLock：内部状态锁的超时设置没有生效，等锁会一直等下去。
请让超时生效并在超时时给出可读错误，补测试。
