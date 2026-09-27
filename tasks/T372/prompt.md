celery 依赖的 event drainer 在 greenlet 已经退出时不会把错误抛出来：worker 陷在无限循环里不推进，只能手动重启。

请把 drainer 的错误传播出去（别再死循环），补测试。
