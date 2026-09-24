# 温室环境联动控制（starter）

starter 里只有数据和样例，入口文件与实现由你来建：

- `data/devices.json` — 设备参数（功率/延迟/最小运行/间隔）
- `samples/readings.json` — 一个下午的温湿度序列（1 分钟一个点）

约定：原生 ES module + HTML/CSS，不引构建、不装依赖、不联网；
纯逻辑放到单独模块里，能用 `node --test` 直接跑（冒烟用例放 `tests/`）。
怎么跑：打开你自己建的 `index.html`（README 里把启动方式写清楚）。
怎么测：`node --test`。
