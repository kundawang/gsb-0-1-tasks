openai-python 的 `AsyncResponses.parse()` 有内存泄漏：每次都重新参数化 TextFormatT，pydantic 的 schema 对象无上限地累积（有人用火焰图抓到过）。

请去掉这处参数化（让类型在上下文之间复用），补测试。
