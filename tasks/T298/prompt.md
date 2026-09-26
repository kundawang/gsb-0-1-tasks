alembic 的 `Operations.add_column` 在较新版本里会自动把 `primary_key=True` 渲染成内联的 `PRIMARY KEY`，这会让"只加一列"的迁移顺带改掉表的主键约束，对已有主键的表是破坏性的。

请把默认行为改回不内联，同时提供显式的内联方式（`inline_primary_key`），并保持 add_column 既有入口兼容；补测试：内联主键、普通主键、默认不内联、以及删掉主键列再加回来的场景。
