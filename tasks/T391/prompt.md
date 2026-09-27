tortoise-orm 有两个问题：Python 3.11 下测试用例失败（生成的 schema SQL 与预期不一致），以及 `ForeignKeyField(on_delete=NO_ACTION)` 不可用。

请修好这两处（schema 生成与 NO_ACTION 支持），补测试。
