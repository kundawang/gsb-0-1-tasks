# 混凝土配比成本优化（starter）

starter 里只有数据和样例，入口文件与实现由你来建：

- `data/materials.json` — 原料单价与强度/取代系数
- `data/recipes.json` — 候选配方（用量/实测强度/塌落度/单价）
- `samples/orders.json` — 订单要求

约定：原生 ES module + HTML/CSS，不引构建、不装依赖、不联网；
纯逻辑放到单独模块里，能用 `node --test` 直接跑（冒烟用例放 `tests/`）。
怎么跑：打开你自己建的 `index.html`（README 里把启动方式写清楚）。
怎么测：`node --test`。

unit_price_cent 是元/m³ 换算成分（41500 = 415.00 元/m³）。
