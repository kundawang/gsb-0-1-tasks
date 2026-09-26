tenacity：@retry 装饰过的函数，外面再套一个用 functools.wraps 的装饰器（比如加个计时），之后 func.statistics 就变成空的 {}，统计全丢了——外层包装的 __dict__ 把内层的统计对象覆盖掉了。

请让统计在这种嵌套包装下依然可访问，补测试。
