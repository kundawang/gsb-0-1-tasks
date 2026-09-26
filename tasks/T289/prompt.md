django 的 GIS 后端在 `spatial_index` 改变时（MySQL / PostgreSQL / Oracle）不会正确地加/删索引：把一个字段的 spatial_index 从 True 改成 False（或反过来）之后，表结构没有跟着变。

请修好这三个后端的 schema 编辑逻辑，补测试：加索引、删索引、以及带 nullable 的情况。
