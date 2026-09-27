strawberry 缺少可选依赖（比如某些集成需要的包）时，报的是 ImportError 或者含义不明的 AttributeError，用户不知道是缺包。

请补一个明确的 MissingOptionalDependenciesError 并在缺包时抛出，补测试。
