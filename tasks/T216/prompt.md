tenacity 的 Retrying 对象和各类重试策略没法 pickle（里面用了 threading.local 和 lambda），所以我们想把重试逻辑丢给 multiprocessing / 进程池的时候直接失败。

请让它们能正常序列化，往返之后行为要一致。补测试：策略可 pickle、Retrying 可 pickle、跑过之后再 pickle、pickle 往返之后还能正常重试。
