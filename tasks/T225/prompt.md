graphql-core 的 incremental：异步流里第二个及之后的 item，给出的 path 是错的，和 graphql-js 的行为对不上，客户端按 path 归位数据就错位了。

请对齐 graphql-js 的实现把后续 item 的 path 修好，补测试。
