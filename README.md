# 三路文本合并（starter）

```
samples/base.txt     基线版
samples/local.txt    我方改动
samples/remote.txt   对方改动
```

三份文件都是同一个烧烤购物清单，两边各有改动（有纯新增、有冲突、有"一边删一边改"）。
冲突判定与行号口径见题面。

怎么跑：双击 `index.html`（原生 ES module，不构建、不装依赖、不联网）。
怎么测：`node --test`（合并算法是纯函数，能脱离 DOM 调）。

