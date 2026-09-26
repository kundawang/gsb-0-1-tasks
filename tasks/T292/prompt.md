django 的模型每次取父类列表（`_meta.get_parent_list` / all_parents）都要重新走一遍 meta 查找，继承链多的地方开销明显；admin helpers、删除、表达式构造这些调用点还在反复取。

请把父类列表缓存起来（注意不能改变删除、表达式和 admin 那几处的行为），补测试。
