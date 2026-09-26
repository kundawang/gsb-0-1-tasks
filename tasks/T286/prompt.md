IPython 解析显示后端（backend）名字时几处行为不一致：builtin 名字、entry point 注册的名字、以及未知名字的处理路径不一样，terminal/embed 里拿到 gui loop 的结果也不对。

请修好解析逻辑，补三种情况的测试（builtin / entry point / 未知）。
