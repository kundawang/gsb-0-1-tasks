pylint 的 `not-context-manager` 检查在上下文管理器没有名字的时候会崩：它直接用 inferred.name 拼消息，而某些推断结果（比如 `async with slice(None)`）根本没有 name。

请修好这条路径（async_checker / typecheck 两处），补测试。
