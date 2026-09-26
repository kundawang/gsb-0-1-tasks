openai-python 里 `client.with_options(...)` 会泄漏内存：每次派生一个新 client，父子之间互相持有，旧的回收不掉，长期跑的服务里很明显。

请修好派生逻辑，补测试（派生出来的 client 构造请求的行为要和原来一致）。
