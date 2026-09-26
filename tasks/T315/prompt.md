tortoise 的迁移 `_alter_field` 只比较了 nullable / index / unique / description / default / rename，没比较 SQL 类型，于是把 max_length 从 32 改成 64 这种改动不会生成 ALTER。

请把类型比较补上（各后端一起），补测试：MySQL / PostgreSQL / MSSQL 的 max_length 变更。
