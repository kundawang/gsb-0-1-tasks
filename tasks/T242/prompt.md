tenacity 把函数包一层之后，被包装函数上的 retry 属性丢了：我们的代码会直接取 func.retry 用，现在拿到的是 AttributeError；再套一层用 functools.wraps 的装饰器之后更取不到。

请把这个属性保留下来，同步和异步两条路径都要，补测试。
