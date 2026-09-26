strawberry 在出错的时候没有把异步生成器（asyncgen）正确关闭，导致 'async generator was never awaited' 之类的告警和资源泄漏。

请修好错误路径上的关闭逻辑，补测试。
