trio 的锁在超时和被打断时的异常语义不对：等锁超时应该抛 StalledLockError，现在抛的是别的；acquire 里被打破时应该把 BrokenResourceError 原样重抛，也不对。

请把这两个语义对齐，补测试。
