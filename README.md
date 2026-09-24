# 电力负荷峰谷分析（starter）

starter 里只有数据和样例，入口文件与实现由你来建：

- `samples/load_15min.csv` — 15 分钟粒度负荷（示例只给一天，实际按月）
- `data/tariff.json` — 分时电价与需量电价

约定：原生 ES module + HTML/CSS，不引构建、不装依赖、不联网；
纯逻辑放到单独模块里，能用 `node --test` 直接跑（冒烟用例放 `tests/`）。
怎么跑：打开你自己建的 `index.html`（README 里把启动方式写清楚）。
怎么测：`node --test`。

样例只给一天、并且中间故意缺行，用来验证补齐与缺测说明。
