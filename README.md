# 库存盘点差异对账（starter）

starter 里只有数据和样例，入口文件与实现由你来建：

- `samples/stock_book.csv` — 账面库存
- `samples/stock_count.csv` — 实盘结果

约定：原生 ES module + HTML/CSS，不引构建、不装依赖、不联网；
纯逻辑放到单独模块里，能用 `node --test` 直接跑（冒烟用例放 `tests/`）。
怎么跑：打开你自己建的 `index.html`（README 里把启动方式写清楚）。
怎么测：`node --test`。

实盘里故意有：数量差异、货位差异、账面少了的 S004、多出来的 S006、带单位写法「150 个」。
