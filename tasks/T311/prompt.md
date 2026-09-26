strawberry 的 graphql-ws 在收到非 JSON / 非文本消息时会崩，而不是按协议忽略掉（各种后端——aiohttp / asgi / channels 都一样）。

请改成忽略这类消息（必要时关连接），补测试覆盖协议各阶段。
