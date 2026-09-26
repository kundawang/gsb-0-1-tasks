pip 在安装的包里 entry_points.txt 有非法内容时会直接吐 traceback：pkg_resources 抛的是裸的 ValueError，没有被转成安装错误，用户看到一大段堆栈。

请把这类错误转成清晰的 InstallationError（Python 3.15 的 importlib.metadata 也会在解析时校验 entry points，一并处理），补测试。
