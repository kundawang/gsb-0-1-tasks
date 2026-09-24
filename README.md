# 质检抽样判定（AQL）（starter）

starter 里只有数据和样例，入口文件与实现由你来建：

- `data/aql_table.json` — 简化抽样表：批量区间 × AQL → 样本量/Ac/Re

约定：原生 ES module + HTML/CSS，不引构建、不装依赖、不联网；
纯逻辑放到单独模块里，能用 `node --test` 直接跑（冒烟用例放 `tests/`）。
怎么跑：打开你自己建的 `index.html`（README 里把启动方式写清楚）。
怎么测：`node --test`。

plans 里每个值都是 [样本量, 接收数 Ac, 拒收数 Re]，表是简化过的，够用即可。
