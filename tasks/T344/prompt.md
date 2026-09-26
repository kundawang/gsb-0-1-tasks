openai-python 的 `prompt_cache_retention` 枚举值写错了（写成了 in-memory，服务端要的是 in_memory），传进去会被拒。

请把相关资源与类型定义里的枚举值改对，补测试。
