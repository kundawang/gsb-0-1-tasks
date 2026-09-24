playwright-python：Video.path() 返回的是字符串而不是 pathlib.Path，和类型标注/文档不一致，调用方拿 `.name` 之类属性会失败。
请改回 Path（保持字符串化行为不变），补测试。
