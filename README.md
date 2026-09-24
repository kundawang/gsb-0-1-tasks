# 充电桩调度与峰谷计费（starter）

starter 里只有数据和样例，入口文件与实现由你来建：

- `data/chargers.json` — 桩与总功率、电价时段
- `samples/arrivals.json` — 到达/离开事件

约定：原生 ES module + HTML/CSS，不引构建、不装依赖、不联网；
纯逻辑放到单独模块里，能用 `node --test` 直接跑（冒烟用例放 `tests/`）。
怎么跑：打开你自己建的 `index.html`（README 里把启动方式写清楚）。
怎么测：`node --test`。
