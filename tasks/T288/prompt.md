sqlite-utils 有几处报错很难用：往一个其实是 view 的名字里 insert/upsert 会直接吐 traceback；对其实是 table 的名字调 `db.view()` 也不说清楚；迁移名字重复时的提示同样不明确。

请把这些改成清晰的错误信息（相关 docstring 一并更正），补测试。
