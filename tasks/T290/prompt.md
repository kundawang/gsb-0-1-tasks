django admin 的 changelist 搜索，对非文本字段用 `__exact` 时有问题：非法搜索词不会在入口被拒（后面直接崩），而布尔 / choices 字段的精确匹配又会过度匹配——大小写不敏感，把不该匹配的记录也搜出来。

请修好搜索词的转换与匹配逻辑（用对应的表单字段来校验，不要自己拿 to_python），补测试：布尔字段的 exact（含显式 None、大小写）、choices 字段的 exact 以及 changelist 视图。
