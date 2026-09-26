strawberry 的 dataclass transform 在生成 ordering 元数据时顺序不对：自定义 ordering 方法、federation 场景下的 schema directive 都把字段顺序搞乱，生成的排序参数跟声明顺序不一致。

请修好这处元数据顺序（含 federation 和 schema_directive 两条路径），补测试。
