# 图书馆取书柜调度（starter）

starter 里只有数据和样例，入口文件与实现由你来建：

- `data/lockers.json` — 柜子清单（格号 + 尺寸）
- `samples/requests.json` — 预约/取书事件

约定：原生 ES module + HTML/CSS，不引构建、不装依赖、不联网；
纯逻辑放到单独模块里，能用 `node --test` 直接跑（冒烟用例放 `tests/`）。
怎么跑：打开你自己建的 `index.html`（README 里把启动方式写清楚）。
怎么测：`node --test`。
