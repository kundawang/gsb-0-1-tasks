redis-py 的 PubSub.listen() 本该一直阻塞等消息，但我们给连接设了 socket_timeout 之后，listen() 到了这个超时就返回了，而且这个设置还把连接上的 socket timeout 状态改坏了，后面的读也跟着受影响。

请让 listen() 不受 socket_timeout 影响（该阻塞就一直阻塞），并且不要改动连接上的 timeout 状态。补测试：block=True 时能超过 socket_timeout 继续阻塞、之后继续读不受污染、以及传 timeout 的获取路径行为正确。
