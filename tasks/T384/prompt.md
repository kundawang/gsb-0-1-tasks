sqlfluff 加载 dbt manifest 时会依赖当前工作目录（dbt 侧相对路径）：从别的目录调用时 manifest 里的路径解析错，找不到模型。

请改成加载期间临时切换工作目录（用完恢复），补测试。
