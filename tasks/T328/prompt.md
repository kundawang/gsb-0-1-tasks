fsspec 的 parquet 缓存和 known-cache 有几处对不上：嵌套 schema/嵌套 arrow 类型缓存命中错误，导致读到错的元数据。

请修好 caching / parquet / utils 这几处，补一个嵌套 arrow 类型的测试。
