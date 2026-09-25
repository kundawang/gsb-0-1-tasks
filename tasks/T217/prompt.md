coverage.py 用上 sys.monitoring 之后，如果同一个进程里还有别的工具也在用 sysmon（比如同时挂着别的 profiler 或者调试器），coverage 会直接抛错崩掉，而不是退让。

请让这种 sysmon 冲突变成可容忍的情况：能继续采集就继续、不能让整个测量崩掉，并且给出明确的说明。补测试覆盖冲突和不冲突两种场景。
