fsspec 的 LocalFileSystem 处理根目录时 `_strip_protocol` 结果不对：`/` 这种根路径被剥成了空串，映射层跟着出错。

请修好根目录的处理，补测试。
