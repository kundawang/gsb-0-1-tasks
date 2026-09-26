nox 的 `--verbose` 全局选项没有传到会话安装命令的 `silent` 参数上：加了 -v 之后安装命令还是静默的，日志看不到。

请把 verbose 传递到安装（含 conda）那条路径，补测试。
