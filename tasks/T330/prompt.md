cachetools 的 `@cachedmethod` 没有 `cache_info()`：按方法缓存之后拿不到命中率/淘汰统计，跟 `@cached` 不一致。

请补上 `cache_info()` 支持（含 clear 等属性行为一致），补测试。
