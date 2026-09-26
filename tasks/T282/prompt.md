textual 的 `_cache` 在 discard 之后还会命中旧值（Log 组件上尤其明显），淘汰/丢弃的语义不对。

请修好缓存实现，补一个 discard 的回归测试。
