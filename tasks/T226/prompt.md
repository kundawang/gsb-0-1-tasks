graphql-core 的 incremental：当多个 deferred 的 grouped field set 同时出错时，会发出多条 completion，客户端收到重复的结束事件（有的框架会因此重复收尾）。

请改成只发一条 completion，补测试。
