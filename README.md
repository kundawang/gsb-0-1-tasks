# 快递驿站货架分配（starter）

starter 里只有数据和样例，入口文件与实现由你来建：

- `data/shelves.json` — 货架与格子尺寸（cm）
- `samples/parcels.json` — 入库/出库事件

约定：原生 ES module + HTML/CSS，不引构建、不装依赖、不联网；
纯逻辑放到单独模块里，能用 `node --test` 直接跑（冒烟用例放 `tests/`）。
怎么跑：打开你自己建的 `index.html`（README 里把启动方式写清楚）。
怎么测：`node --test`。
