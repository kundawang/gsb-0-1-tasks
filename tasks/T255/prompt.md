sqlalchemy 里对不是 SELECT 的语句（比如 insert().returning()）用顶层的 joinedload / subqueryload，现在行为很乱：SQL 里既没有 JOIN 也没有子查询可放，结果错误或者直接崩，用户完全不知道为什么。

请改成明确报 ORM 异常并说清原因，把相关的 deprecation 处理一起补齐。补测试覆盖 insert 支持/不支持、隐含场景、以及二次选项。
