import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  planWaves,
  routeByLexOrder,
  routeByNearestNeighbor,
  tourLength,
  manhattan,
} from '../src/logic.js';

const here = path.dirname(fileURLToPath(import.meta.url));

// 固定小仓库：L1/L2 到出入口等距，用于验证最近邻并列打破规则。
const WH = {
  width: 6,
  height: 6,
  locations: [
    { id: 'L1', x: 2, y: 0, sku: 'S1' },
    { id: 'L2', x: 0, y: 2, sku: 'S2' },
    { id: 'L3', x: 4, y: 1, sku: 'S3' },
    { id: 'L4', x: 1, y: 4, sku: 'S4' },
  ],
};

const order = (id, lines) => ({
  order_id: id,
  lines: lines.map(([sku, qty]) => ({ sku, qty })),
});

test('曼哈顿距离', () => {
  assert.equal(manhattan({ x: 0, y: 0 }, { x: 2, y: 3 }), 5);
  assert.equal(manhattan({ x: 4, y: 1 }, { x: 0, y: 0 }), 5);
});

test('字典序策略：按货位 id 排序，路径长度正确', () => {
  const route = routeByLexOrder(WH.locations);
  assert.deepEqual(route.map((l) => l.id), ['L1', 'L2', 'L3', 'L4']);
  // (0,0)->L1=2 ->L2=4 ->L3=5 ->L4=6 ->(0,0)=5
  assert.equal(tourLength(route), 22);
});

test('最近邻策略：距离并列时取坐标 (x,y) 更小者', () => {
  const route = routeByNearestNeighbor(WH.locations);
  // 起点处 L1(2,0) 与 L2(0,2) 距离都是 2，(0,2) 更小 => 先走 L2
  assert.deepEqual(route.map((l) => l.id), ['L2', 'L4', 'L1', 'L3']);
  // 2 + 3 + 5 + 3 + 5
  assert.equal(tourLength(route), 18);
});

test('一个订单刚好装满：不新开波次', () => {
  const orders = [order('O1', [['S1', 2], ['S2', 1]]), order('O2', [['S1', 1]])];
  const result = planWaves(WH, orders, { maxItems: 4, pickListSize: 2 });
  assert.equal(result.summary.waveCount, 1);
  assert.deepEqual(result.waves[0].orderIds, ['O1', 'O2']);
  assert.equal(result.waves[0].items, 4);
  assert.deepEqual(result.waves[0].routes.lex.visitOrder, ['L1', 'L2']);
});

test('跨波次边界：放不下的订单整体进入下一波次', () => {
  const orders = [order('O1', [['S1', 2], ['S2', 1]]), order('O2', [['S3', 1]])];
  const result = planWaves(WH, orders, { maxItems: 3, pickListSize: 2 });
  assert.equal(result.summary.waveCount, 2);
  assert.deepEqual(result.waves[0].orderIds, ['O1']);
  assert.deepEqual(result.waves[1].orderIds, ['O2']);
  assert.equal(result.waves[0].items, 3);
  assert.equal(result.waves[1].items, 1);
});

test('跨波次边界：货位数超 pick_list_size 同样开新波次', () => {
  const orders = [order('O1', [['S1', 1], ['S2', 1]]), order('O2', [['S3', 1]])];
  const result = planWaves(WH, orders, { maxItems: 10, pickListSize: 2 });
  assert.equal(result.summary.waveCount, 2);
  assert.deepEqual(result.waves[1].orderIds, ['O2']);
});

test('单个订单所需货位数超过 pick_list_size：标 unfulfillable 且不丢单', () => {
  const orders = [order('O1', [['S1', 1], ['S2', 1]]), order('O2', [['S3', 1]])];
  const result = planWaves(WH, orders, { maxItems: 10, pickListSize: 1 });
  assert.equal(result.summary.waveCount, 2);
  assert.match(result.waves[0].unfulfillable, /pick_list_size=1/);
  assert.deepEqual(result.waves[0].orderIds, ['O1']);
  assert.equal(result.waves[1].unfulfillable, null);
});

test('单个订单件数超过 max_items：标 unfulfillable', () => {
  const orders = [order('O1', [['S1', 5]])];
  const result = planWaves(WH, orders, { maxItems: 2, pickListSize: 4 });
  assert.match(result.waves[0].unfulfillable, /max_items=2/);
  assert.equal(result.waves[0].items, 5);
});

test('订单引用不存在的 SKU：记 warning、跳过该行，其余照常拣', () => {
  const orders = [order('O1', [['S1', 2], ['S9', 3]])];
  const result = planWaves(WH, orders, { maxItems: 10, pickListSize: 4 });
  assert.equal(result.waves[0].items, 2);
  assert.deepEqual(result.waves[0].routes.lex.visitOrder, ['L1']);
  assert.equal(result.warnings.length, 1);
  assert.match(result.warnings[0], /S9/);
  assert.match(result.warnings[0], /O1/);
});

test('空订单列表：0 个波次，汇总全为 0', () => {
  const result = planWaves(WH, [], { maxItems: 4, pickListSize: 2 });
  assert.equal(result.summary.waveCount, 0);
  assert.equal(result.summary.lex.totalDistance, 0);
  assert.equal(result.summary.nearest.totalDistance, 0);
  assert.equal(result.summary.nearest.savedPercent, 0);
});

test('空货位仓库：所有 SKU 记 warning，波次距离为 0，不丢单', () => {
  const emptyWh = { width: 4, height: 4, locations: [] };
  const orders = [order('O1', [['S1', 2]])];
  const result = planWaves(emptyWh, orders, { maxItems: 4, pickListSize: 2 });
  assert.equal(result.summary.waveCount, 1);
  assert.deepEqual(result.waves[0].orderIds, ['O1']);
  assert.equal(result.waves[0].items, 0);
  assert.equal(result.waves[0].routes.lex.length, 0);
  assert.equal(result.warnings.length, 1);
});

test('汇总数值：总距离、平均每件距离、节省百分比', () => {
  const orders = [order('O1', [['S1', 1], ['S2', 1], ['S3', 1], ['S4', 1]])];
  const result = planWaves(WH, orders, { maxItems: 10, pickListSize: 10 });
  const { summary } = result;
  assert.equal(summary.totalItems, 4);
  assert.equal(summary.lex.totalDistance, 22);
  assert.equal(summary.nearest.totalDistance, 18);
  assert.equal(summary.lex.avgPerItem, 5.5);
  assert.equal(summary.nearest.avgPerItem, 4.5);
  assert.equal(summary.nearest.savedPercent, 18.2); // (22-18)/22 保留 1 位小数
});

test('确定性：同一输入 + 同一参数，两次输出完全一致', () => {
  const orders = [
    order('O1', [['S1', 2], ['S2', 1]]),
    order('O2', [['S3', 1], ['S4', 2]]),
    order('O3', [['S2', 1], ['S9', 1]]),
  ];
  const params = { maxItems: 4, pickListSize: 3 };
  assert.deepEqual(planWaves(WH, orders, params), planWaves(WH, orders, params));
});

test('非法参数直接报错', () => {
  assert.throws(() => planWaves(WH, [], { maxItems: 0, pickListSize: 2 }), /max_items/);
  assert.throws(() => planWaves(WH, [], { maxItems: 4, pickListSize: 1.5 }), /pick_list_size/);
});

test('样例数据可跑通且确定', () => {
  const warehouse = JSON.parse(readFileSync(path.join(here, '../data/warehouse.json'), 'utf8'));
  const orders = JSON.parse(readFileSync(path.join(here, '../samples/orders.json'), 'utf8'));
  const params = { maxItems: 10, pickListSize: 6 };
  const a = planWaves(warehouse, orders, params);
  const b = planWaves(warehouse, orders, params);
  assert.deepEqual(a, b);
  assert.ok(a.summary.waveCount >= 1);
  assert.ok(a.summary.nearest.totalDistance <= a.summary.lex.totalDistance);
});
