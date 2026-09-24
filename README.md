# 排班生成（starter）

```
data/shift-rules.json   班次定义、每日需求、约束参数
samples/staff.json      6 名员工（可上班次 / 每周上限 / 偏好）
```

一周从周一开始，日期用 `2026-06-01` 这种 ISO 格式；班次代码固定 `morning` / `middle` / `night`。

怎么跑：双击 `index.html`（原生 ES module，不构建、不装依赖、不联网）。
怎么测：`node --test`（生成与校验都是纯逻辑，能脱离 DOM 调）。

