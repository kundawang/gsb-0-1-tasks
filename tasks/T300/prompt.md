psycopg 的 wait 函数会把等待超时挡在生成器外面：生成器感知不到超时，于是没法被中断；我们希望超时作为 generators / wait 之间约定的一部分传进去，让等待可以被打断。

请把这套约定改好（同步和异步路径、wait_c 也一起考虑），补测试：wait_ready、异步 wait_ready、以及超时路径。
