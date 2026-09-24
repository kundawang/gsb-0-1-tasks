# 订单结算（starter）

```
data/pricing.json    运费与优惠券规则
samples/carts.json   3 个购物车样例（含券与地区）
```

所有金额都是**分**（整数）；券的适用范围、作用顺序、尾差分摊规则见题面。

怎么跑：双击 `index.html`（原生 ES module，不构建、不装依赖、不联网）。
怎么测：`node --test`（`settle()` 是纯函数，能脱离 DOM 调）。

