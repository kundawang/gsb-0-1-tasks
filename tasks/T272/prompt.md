graphql-core 的 OneOf 输入类型：同时提供两个字段时应该在校验阶段直接失败，现在只有部分路径会拒（"pre-coercion-only" 的场景漏掉），而且 `value_from_ast` 和 `coerce_input_value` 两条路径的行为不一致。

请对齐 graphql-js 的实现，让两条路径一致地拒绝，补测试。
