# 迷宫生成 / 校验 / 求解（starter）

```
samples/config.json   三组样例配置（小/中/大 + 不同 seed）
```

配置项：`width` / `height` / `extra_links` / `openness` / `start` / `end` / `seed`。
生成必须只依赖 `seed`（同 seed 同配置 → 同一份地图），随机数自己写，不许用 `Math.random()`。

怎么跑：双击 `index.html`（原生 ES module，不构建、不装依赖、不联网）。
怎么测：`node --test`（生成、校验、求解都是纯逻辑，能脱离 DOM 调）。

