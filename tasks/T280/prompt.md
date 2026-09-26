prompt-toolkit 的 inputhook 实现在 `asyncio.get_event_loop()` 被废弃之后就不对了：它还在启动阶段预先装事件循环，于是 `asyncio.run()` 里用不了，换到别的循环里跑也会出问题。

请改成把 inputhook 作为 `Application.run()` / `PromptSession` 的参数传进去，不要在导入或初始化阶段绑定循环，补测试。
