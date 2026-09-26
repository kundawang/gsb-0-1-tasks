loguru 里在导入 logger 之后再调 multiprocessing.set_start_method() 会报错：loguru 内部用了 multiprocessing.get_context(method=None)，而这个调用有个副作用——它会把全局的 start method 固定下来，之后就改不了了。

请把这个副作用去掉（enqueue=False 的时候不要碰全局设置），补测试。
