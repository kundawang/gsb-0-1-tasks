pymongo 的客户端加密（KMS）在异步模式下碰到 socket 错误处理得不对：异常不会传到调用方，连接状态也不对；同步那一侧是正常的。

请把 asynchronous/encryption.py 这块对齐同步实现，补测试。
