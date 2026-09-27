dbt 的 `state:modified` 判断漏掉了宏：模型依赖的宏改了，`state:modified` 仍然认为模型没变，于是选择集不对（该跑的不跑）。从 manifest 里加载的宏节点还会被丢掉。

请把宏依赖纳入状态比较（记录项目内宏的依赖、保留从 manifest 加载的宏节点），补测试。
