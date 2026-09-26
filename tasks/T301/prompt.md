psycopg_pool 开了 close_returns=True 之后关池会陷进死循环（池一直认为自己还有连接要关）。同步和异步的池都有这个问题。

请修好关闭逻辑，补测试：close_returns 不死循环、自定义 close() 的情况、以及子类覆盖 close 的场景。
