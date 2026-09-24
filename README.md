# 数字电路仿真器（starter）

```
samples/majority.json    三输入多数表决电路
samples/counter4.json    时钟驱动的两位计数电路
```

电路 JSON 结构：

```json
{
  "devices": [{"id": "a", "type": "IN", "init": 1}, {"id": "g1", "type": "AND"}],
  "links":   [{"from": "a", "to": "g1", "port": 0}]
}
```

- `type` 取值：`IN` / `AND` / `OR` / `NOT` / `XOR` / `DFF` / `OUT`
- `DFF` 的端口：`port 0 = D`，`port 1 = CLK`；`NOT` / `OUT` 只有 `port 0`
- 每个 `tick` 所有器件用上一 tick 的输出一起结算；DFF 在 CLK 上升沿锁存

怎么跑：直接双击 `index.html`（原生 ES module，无需构建、无需安装依赖、不联网）。
怎么测：`node --test`（纯逻辑模块要能脱离 DOM 直接调）。冒烟用例可以放 `tests/`。

