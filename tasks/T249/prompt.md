uvicorn 处理 HTTP pipelining（同一个连接上连着发多个请求）时会冒出莫名其妙的 LocalProtocolError：第二个请求在第一个还没处理完的时候就被喂进 h11，keep-alive 超时那条路径上特别容易触发。

请修好，补一个 pipelining + keepalive 超时的测试。
