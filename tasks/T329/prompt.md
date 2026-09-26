cachetools 的 `func` 装饰器在并发下会出现缓存击穿（cache stampede）：同一个 key 被多个线程同时算，全部穿透到被装饰函数。

请加上"同 key 只算一次"的机制（注意零容量缓存等边界），补测试。
