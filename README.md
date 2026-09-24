# 记账本（分类预算 + 导入）（starter）

starter 里只有数据和样例，入口文件与实现由你来建：

- `samples/transactions.csv` — 银行导出流水（金额与日期格式混杂）
- `data/budgets.json` — 分类预算与分类关键词规则

约定：原生 ES module + HTML/CSS，不引构建、不装依赖、不联网；
纯逻辑放到单独模块里，能用 `node --test` 直接跑（冒烟用例放 `tests/`）。
怎么跑：打开你自己建的 `index.html`（README 里把启动方式写清楚）。
怎么测：`node --test`。

流水里故意混了两种日期格式、括号负数、带千分位的正数、重复记录。
