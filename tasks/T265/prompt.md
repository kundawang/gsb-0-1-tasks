openai-python 解析响应时如果命中内容过滤（ContentFilterFinishReasonError），抛出来的异常里没有带 completion，调用方拿不到 usage 等信息；流式那条路径也一样。

请把 completion 附到异常上（解析和流式都要），补三个测试：没有 completion 的错误、解析路径、流式路径。
