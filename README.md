# 俄罗斯方块下落与计分（starter）

starter 里只有数据和样例，入口文件与实现由你来建：

- `data/rules.json` — 计分规则与场地尺寸
- `samples/pieces.json` — 几段方块序列

约定：原生 ES module + HTML/CSS，不引构建、不装依赖、不联网；
纯逻辑放到单独模块里，能用 `node --test` 直接跑（冒烟用例放 `tests/`）。
怎么跑：打开你自己建的 `index.html`（README 里把启动方式写清楚）。
怎么测：`node --test`。
