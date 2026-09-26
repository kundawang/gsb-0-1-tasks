poetry 解析 PyPI 元数据时，碰到被 yanked 且没有依赖信息的 release 会抛 IndexError（列表越界），整个解析就断了。

请修好这条路径，补一个这种包的测试。
