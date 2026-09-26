coverage.py 用 sys.monitoring（3.14 起是默认）时，多行的 `for` 和 `match/case` 被报成"分支缺失"，其实是漏记了，覆盖率数字因此虚低。

请修好 bytecode / sysmon 这两处的分支拆分，补 for 和 match/case 的测试。
