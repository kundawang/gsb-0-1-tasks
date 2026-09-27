kubernetes 的 Python 客户端在 asyncio 版本的资源删除上同样只认一种响应：返回 Status 时判错，导致删除其实成功但调用方拿到异常。

请修好 asyncio 生成的删除响应处理，补测试。
