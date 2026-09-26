pymongo 的 `MongoClient.bulk_write` 在某一批失败时（比如服务端回了 InvalidBSON）会抛 AttributeError，把真正的错误盖掉，调用方拿不到原始原因，排查很痛苦。

请修好同步和异步两套 client_bulk，让非 pymongo 自身的异常也能正常往上抛（保留原始错误信息），补一个 batch 里出现非 pymongo 异常的测试。
