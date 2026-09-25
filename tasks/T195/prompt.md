kombu 的 ignore_errors() 在装了 gevent 的进程里会漏掉 gevent 的并发使用错误：那个 concurrentObjectUseErrors 类是在模块导入的时候查的，如果 gevent 还没导入就先固定成了"没有"，等后来 gevent 被导进来（celery 的 start/stop 流程里经常这样），这类噪音异常就会直接冒出来，把正常关闭流程搞得很乱。

请改成运行时判断：gevent 在不在 sys.modules、那个类在不在，都要现查；没装 gevent 的时候异常该照样往外抛。补测试覆盖 gevent 已加载、未加载、以及后续再 import 的情况，还有 mock connection 下不要炸。
