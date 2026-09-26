coverage.py 在分析某些源码的 AST 时会撞到 Python 的递归上限：解析嵌套很深的表达式或者多行结构时直接 RecursionError，覆盖率跑不完。

请把 phystokens 和 regions 里这两处递归改成不会爆栈，补测试。
