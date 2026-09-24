cattrs 里那个给 namedtuple 生成 dict 反序列化工厂的入口（namedtuple_dict_structure_factory），
按文档传参调用会报参数名不对 —— 签名里的形参名和文档/调用方对不上。请把参数名对齐到文档写法，
不要改其它行为，并补一个 namedtuple 的 round-trip 测试。
