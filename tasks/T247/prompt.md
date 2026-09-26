trio 里往一个已经退出的 task 上注册（parking lot 那条路径）时行为不对：本该抛 BrokenResourceError，现在要么不抛、要么把一个 RuntimeWarning 转成了 TrioInternalError。相关函数的 docstring 也和实际行为对不上。

请把语义修对、docstring 一并更正，补测试。
