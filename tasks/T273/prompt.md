fastapi 的路径操作和依赖，一旦被 `functools.wraps`（或者 `functools.partial`）包过一层，参数识别就乱了：路径参数、查询参数、依赖注入都会认错；包过的 async 函数、同步函数和类都有问题。

请修好依赖模型这处识别（wraps 和 partial 的组合都要正确），不要破坏原有签名推断，补测试。
