我们内部工单想加个简单的查询框，输入一行条件就能筛列表，语法人写起来顺手点，别让人学 SQL。

语法大致这样（samples/queries.txt 里有十几条样例，正例反例都有）：

```
status:open and tag:bug
(priority:high or priority:urgent) and not assignee:none
title:"登录 超时" and created:>=2026-01-01
estimate:>3 order:-created limit:50
```

要做的：

1. 解析器：把这一行解析成 AST（`and`/`or`/`not`、括号、字段比较、引号字符串、比较符 `: > >= < <=`、
   `order:±field`、`limit:N`），解析失败要给出**出错位置（第几个字符）**和原因。
2. 求值器：拿 AST 去筛一批工单对象（字段：id/title/status/priority/tag/assignee/created/estimate，
   tag 可能是数组），返回命中的工单列表。
3. 语义要定死：
   - 字段名不认识 → 解析期报错（不是过滤掉）
   - `field:value` 对字符串是"包含"（不区分大小写）还是"相等"，你定，但要统一写进 README 并用测试锁住
   - 日期比较按 `YYYY-MM-DD`，`created:>=2026-01-01` 等价于当天 00:00 起
   - 数字比较支持 `>`、`>=` 等；`estimate:3` 表示相等
   - `not` 只作用于紧跟其后的一项（不是整个表达式），括号改变优先级
   - `order:` 多个字段按顺序生效，`-` 表示降序；排序必须稳定（同值保持原顺序）
   - `limit:0` 表示不限制；负数报错

硬指标：

1. 解析 + 求值都是纯逻辑，`node --test` 里能直接调；样例文件里的每条都要有断言（至少 10 条）。
2. 幂等/确定性：同一批工单 + 同一查询，跑两次结果完全一致（顺序也一样）。
3. 空输入、只有 `order:`、只有 `limit:`、全括号嵌套、超过 100 字符的字段值 —— 都要有明确行为。
4. 错误信息里带上位置，测试里断言位置数字（比如第 13 个字符处）。

界面：上面一个输入框 + 一个"解析结果"面板（把 AST 以缩进文本展示，方便调试），下面是被筛出来的工单列表。
约束：原生 ES module + HTML/CSS，不引依赖、不联网、不构建。README 写语法 EBNF 和语义表。

