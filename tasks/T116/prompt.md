anyio 的 asyncio 后端：SocketStream.send() 在一次被取消的发送之后，会往已经暂停的 transport 继续写，
导致数据错乱/告警。请修好取消后的状态处理，补一个模拟暂停 transport 的测试。
