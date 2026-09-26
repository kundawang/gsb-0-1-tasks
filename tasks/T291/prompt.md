django 在 Python 3.14+（延迟注解，PEP 649）下检查用户函数和可调用对象时会抛 NameError：好几处直接对函数签名求值，碰到前向引用就炸。

请提供一个安全的 introspection 包装并把这些调用点换过去，补测试：带延迟注解的 backend、callable、装饰器拒绝可变位置参数、表达式签名、错误视图。
