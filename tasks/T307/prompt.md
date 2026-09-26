sentry-python 的 openai agents 集成里，工具执行失败时 span 没有被标成 error：错误追踪那段逻辑没有覆盖到这条路径。

请接到错误追踪函数上把状态标对，补测试。
