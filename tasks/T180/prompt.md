aiohttp 的 AsyncResolver 和 ThreadedResolver 结果对不上，切过去之后一堆毛病：
getaddrinfo 返回多条记录的时候只用了第一条；
主机名查不到的时候不是返回空结果，而是直接抛异常；
IPv6 的 link-local 地址（带 % 那种）处理不对；
hosts 文件里没有的条目行为也不一样。

请把 AsyncResolver 对齐成 ThreadedResolver 的语义，IPv4/IPv6、正查、负查都要一致。补测试覆盖多结果、查不到、link-local v6 这几种。
