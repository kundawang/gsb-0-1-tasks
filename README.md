# 仓库波次拣货路径排程小工具

给一张货位图和一批订单，按容量把订单拆成波次，对每个波次分别用
**字典序** 和 **最近邻** 两种策略算拣货路径（从出入口 (0,0) 出发、遍历波次全部货位、回到 (0,0)，
距离用曼哈顿距离），并汇总两种策略的差距。

纯原生 ES module + HTML/CSS/JS，无依赖、不联网、无构建步骤。

## 怎么跑

页面用了 `fetch` 加载 JSON，需要通过本地 HTTP 服务打开（不能直接双击 html）：

```bash
cd <本目录>
python3 -m http.server 8000        # 或任意静态文件服务
# 浏览器打开 http://localhost:8000
```

打开后自动加载内置样例 `data/warehouse.json` + `samples/orders.json`。
界面上也可以分别上传自己的货位图 / 订单 JSON 文件。

## 怎么测

纯逻辑（拆波次、两种路径、汇总）在 `src/logic.js`，不依赖界面，用 Node 内置测试 runner：

```bash
node --test          # 或 npm test
```

覆盖：一个订单刚好装满、跨波次边界（件数 / 货位数两种溢出）、最近邻并列打破、
unfulfillable 标记、未知 SKU、空订单、空货位、汇总数值、输出确定性。

## 参数含义

- **max_items**：一个波次最多装的商品件数（qty 之和）。
- **pick_list_size**：一个波次最多涉及的不同货位个数。
- **地图路径策略**：只影响左侧地图画哪条路径和明细表的"访问顺序"列；两种策略的长度始终都算。

## 数据格式

`data/warehouse.json`：`{ "width": w, "height": h, "locations": [{ "id", "x", "y", "sku" }] }`，
出入口固定在 (0,0)，一个货位放一种 SKU。

`samples/orders.json`：`[{ "order_id", "lines": [{ "sku", "qty" }] }]`。

## 规则与边界行为

- **拆波次**：按订单给定顺序装箱，订单不可拆；当前波次放不下（件数或货位数超限）就开新波次。
- **路径**：a) 按货位 id 字典序；b) 最近邻，距离并列时取坐标 (x,y) 更小者（先比 x 再比 y）。
- **汇总**：波次数、总距离、平均每件距离、最近邻相比字典序节省百分比（保留 1 位小数）。
- **空订单列表**：0 个波次，汇总全为 0。
- **空货位 / 未知 SKU**：该行跳过并记 warning（结果 `warnings` 字段 + 界面黄色提示），
  订单和波次不丢，其余 SKU 照常拣。
- **单个订单自身超容量**（件数 > max_items 或货位数 > pick_list_size）：单独成一个波次，
  标记 `unfulfillable` 并给出原因，路径仍照常计算展示，不静默丢弃。
- **确定性**：同一输入 + 同一参数输出完全一致（无随机数，所有输出顺序显式排序）。

## 目录结构

```
index.html          页面骨架（左 SVG 地图 + 右明细/汇总表 + 参数面板）
src/logic.js        纯逻辑：拆波次、两种路径策略、汇总（node --test 与浏览器共用）
src/app.js          界面渲染与交互
src/style.css       样式
test/logic.test.js  node --test 单测
data/warehouse.json 样例货位图
samples/orders.json 样例订单
```
