coverage.py 在 Python 3.14 上循环的完成弧（loop completion arcs）记错了：循环里提前 return 的场景会漏掉/多算分支，和 3.13 的行为不一致。

请修好 pytracer / C tracer 两处，补一个"循环里提前 return"的测试。
