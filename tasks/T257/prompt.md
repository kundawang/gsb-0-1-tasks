werkzeug 的 Cache-Control 解析有两处不符合 RFC：
no-transform 是无参数指令，现在不管有没有这个指令都返回 None，应该返回 True/False；
min-fresh 是必须带参数的，现在参数可以不写，类型标注也不对。

请按规范修好解析和类型标注，补测试。
