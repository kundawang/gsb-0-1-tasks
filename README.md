# 仓库拣货波次规划（starter）

```
data/warehouse.json   仓库网格 + 货位（id/坐标/SKU）
samples/orders.json   订单样例（order_id + sku/qty 行）
```

参数（界面上可调）：`max_items`（单波次最多件数，默认 24）、`pick_list_size`（单波次最多不同货位数，默认 8）。
距离用曼哈顿距离，出入口固定为 `(0,0)`。

怎么跑：双击 `index.html`（原生 ES module，无构建、无依赖、不联网）。
怎么测：`node --test`（拆波次、路径、汇总都要是纯逻辑，能脱离 DOM 调）。

