pytest-asyncio 有个 bug：在作用域更窄的测试里请求作用域更大的 fixture 时，测试会跑在错误的事件循环上。原因是循环作用域以前靠 collector 上的 mark 判断，拆到 fixture 之后这条逻辑失效了。

请修好作用域判定，补测试：class 作用域 fixture + function 作用域测试、module + class、module + function、package + class、package + function 都要覆盖。
