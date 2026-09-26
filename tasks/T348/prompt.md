sqlalchemy 2.0.37 之后有个回归：在 `Mapped[...]` 里用不合适类型/对象时，本该抛出的 `ArgumentError` 消失了——错误被类型系统吞掉，用户拿到的是别的报错。

请把这条检查恢复（decl_base / properties / exc 三处一起看），补一个构造左侧类型不对的测试。
