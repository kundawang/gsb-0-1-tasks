# 电梯群控调度模拟（starter）

```
data/config.json     楼高/梯数/载重等默认参数
samples/calls.json   一条呼叫序列（tick + from/to + count）
```

呼叫格式：`{"tick": 12, "from": 3, "to": 9, "count": 2}`。
每个 tick：电梯先移动/开关门，再处理本 tick 的新呼叫。策略要比较 `nearest` / `least_load` / `zone` 三种。

怎么跑：双击 `index.html`（原生 ES module，不构建、不装依赖、不联网）。
怎么测：`node --test`（调度与统计都是纯逻辑，能脱离 DOM 调）。

