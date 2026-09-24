# 气象数据清洗（starter）

starter 里只有数据和样例，入口文件与实现由你来建：

- `samples/raw_readings.csv` — 原始导出（含单位混杂/越界/重复时间戳）
- `data/config.json` — 站点与范围阈值

约定：原生 ES module + HTML/CSS，不引构建、不装依赖、不联网；
纯逻辑放到单独模块里，能用 `node --test` 直接跑（冒烟用例放 `tests/`）。
怎么跑：打开你自己建的 `index.html`（README 里把启动方式写清楚）。
怎么测：`node --test`。

CSV 里故意混了华氏度、越界湿度、重复时间戳、缺测与 km/h，用来验证清洗规则。
