requests：prepare_body 判断请求体是不是"流"时，对 __getattr__ 代理对象判断错误（把流当成普通体）。
请修好检测逻辑，补测试（别依赖真实网络）。
