sentry-python 的 batcher：`_flush_loop` 里调用 `_flush()` 没有包异常，任何一次 flush 失败（序列化或发送时报错）都会把 flusher 线程直接干掉，之后事件再也发不出去。

请让 flush 失败不再杀死线程（记录并继续），补一个 flush 抛异常后循环仍存活的测试。
