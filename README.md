# 冷链温度合规判定（starter）

starter 里只有数据和样例，入口文件与实现由你来建：

- `samples/temp_log.csv` — 温度记录（5 分钟一个点）
- `data/config.json` — 合规阈值与采样间隔

约定：原生 ES module + HTML/CSS，不引构建、不装依赖、不联网；
纯逻辑放到单独模块里，能用 `node --test` 直接跑（冒烟用例放 `tests/`）。
怎么跑：打开你自己建的 `index.html`（README 里把启动方式写清楚）。
怎么测：`node --test`。

样例里有：一段 15 分钟的可容忍偏移、一个 -99 故障值、同一时间戳两条冲突记录、一个超出 0~20℃ 的点。
