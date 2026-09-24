# 工单查询语言（starter）

```
samples/tickets.json          8 条工单，用来验证查询
samples/queries.txt           10 条合法查询（每行一条）
samples/queries_invalid.txt   5 条非法查询，行尾注释写了原因和期望的出错位置
```

工单字段：`id` / `title` / `status` / `priority` / `tag[]` / `assignee` / `created`（YYYY-MM-DD）/ `estimate`（数字）。

怎么跑：双击 `index.html`（原生 ES module，不构建、不装依赖、不联网）。
怎么测：`node --test`（词法/语法/求值都是纯逻辑，能脱离 DOM 调）。

