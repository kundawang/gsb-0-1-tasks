openai-python 的 structured outputs 解析（`responses.parse`、`chat.completions.parse`，以及流式解析）有内存泄漏：每次调用都会把响应或 schema 相关的对象留在某个引用里，长时间跑内存只涨不降。

请找出并修掉这处引用（流式那条路径一起处理），补一个能验证对象可回收的测试。
