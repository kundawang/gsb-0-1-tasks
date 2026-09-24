// 仓库波次拣货纯逻辑：拆波次、两种路径策略、汇总。
// 不依赖 DOM / 网络 / 随机数，node --test 与浏览器 ES module 共用。

export const DEPOT = Object.freeze({ x: 0, y: 0 });

export function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function roundTo(value, digits) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

// 参数归一化：同时接受 camelCase 与 snake_case，非法参数直接抛错。
export function normalizeParams(params = {}) {
  const maxItems = params.maxItems ?? params.max_items ?? 10;
  const pickListSize = params.pickListSize ?? params.pick_list_size ?? 6;
  if (!Number.isInteger(maxItems) || maxItems < 1) {
    throw new Error(`max_items 必须是 >= 1 的整数，收到：${maxItems}`);
  }
  if (!Number.isInteger(pickListSize) || pickListSize < 1) {
    throw new Error(`pick_list_size 必须是 >= 1 的整数，收到：${pickListSize}`);
  }
  return { maxItems, pickListSize };
}

function compareLocationId(a, b) {
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

function compareXY(a, b) {
  return a.x !== b.x ? a.x - b.x : a.y - b.y;
}

// 策略 a：按货位 id 字典序。
export function routeByLexOrder(locations) {
  return [...locations].sort(compareLocationId);
}

// 策略 b：最近邻，从 (0,0) 出发贪心；距离并列时取坐标 (x,y) 更小者。
export function routeByNearestNeighbor(locations) {
  const remaining = [...locations];
  const route = [];
  let current = DEPOT;
  while (remaining.length > 0) {
    let bestIndex = 0;
    let bestDistance = Infinity;
    for (let i = 0; i < remaining.length; i += 1) {
      const distance = manhattan(current, remaining[i]);
      if (
        distance < bestDistance ||
        (distance === bestDistance && compareXY(remaining[i], remaining[bestIndex]) < 0)
      ) {
        bestDistance = distance;
        bestIndex = i;
      }
    }
    const [next] = remaining.splice(bestIndex, 1);
    route.push(next);
    current = next;
  }
  return route;
}

// 从 (0,0) 出发、依次经过 route、回到 (0,0) 的曼哈顿总长度。
export function tourLength(route) {
  let total = 0;
  let current = DEPOT;
  for (const point of route) {
    total += manhattan(current, point);
    current = point;
  }
  return total + manhattan(current, DEPOT);
}

function buildSkuIndex(warehouse) {
  const skuToLocation = new Map();
  for (const location of warehouse.locations ?? []) {
    if (!skuToLocation.has(location.sku)) {
      skuToLocation.set(location.sku, location);
    }
  }
  return skuToLocation;
}

// 预处理一个订单：累计件数、按 SKU 出现顺序收集去重货位；未知 SKU 记入 warnings 并跳过。
function prepareOrder(order, skuToLocation) {
  const warnings = [];
  const locationIds = [];
  const seen = new Set();
  let items = 0;
  for (const line of order.lines ?? []) {
    const location = skuToLocation.get(line.sku);
    if (!location) {
      warnings.push(`订单 ${order.order_id} 引用了不存在的 SKU「${line.sku}」，该行已跳过`);
      continue;
    }
    items += line.qty;
    if (!seen.has(location.id)) {
      seen.add(location.id);
      locationIds.push(location.id);
    }
  }
  return { orderId: order.order_id, items, locationIds, warnings };
}

function emptyWave(index) {
  return { index, orderIds: [], items: 0, locationIdSet: new Set(), warnings: [], unfulfillable: null };
}

// 按给定顺序把订单装箱成波次：订单不可拆，放不下就开新波次；
// 单个订单自身就超容量的，单独成波次并标 unfulfillable（不静默丢弃）。
function splitWaves(preparedOrders, params) {
  const waves = [];
  let current = null;
  const pushCurrent = () => {
    if (current && current.orderIds.length > 0) waves.push(current);
    current = null;
  };
  for (const order of preparedOrders) {
    let aloneReason = null;
    if (order.items > params.maxItems) {
      aloneReason = `订单共 ${order.items} 件，超过波次容量 max_items=${params.maxItems}`;
    } else if (order.locationIds.length > params.pickListSize) {
      aloneReason = `订单需要 ${order.locationIds.length} 个不同货位，超过 pick_list_size=${params.pickListSize}`;
    }
    if (aloneReason) {
      pushCurrent();
      const wave = emptyWave(waves.length);
      wave.orderIds.push(order.orderId);
      wave.items = order.items;
      wave.locationIdSet = new Set(order.locationIds);
      wave.warnings.push(...order.warnings);
      wave.unfulfillable = aloneReason;
      waves.push(wave);
      continue;
    }
    if (!current) current = emptyWave(waves.length);
    const mergedSize = new Set([...current.locationIdSet, ...order.locationIds]).size;
    const overflows =
      current.orderIds.length > 0 &&
      (current.items + order.items > params.maxItems || mergedSize > params.pickListSize);
    if (overflows) {
      pushCurrent();
      current = emptyWave(waves.length);
    }
    current.orderIds.push(order.orderId);
    current.items += order.items;
    for (const id of order.locationIds) current.locationIdSet.add(id);
    current.warnings.push(...order.warnings);
  }
  pushCurrent();
  return waves;
}

/**
 * 主入口：同一输入 + 同一参数 => 输出完全一致。
 * @param {{width:number, height:number, locations:Array}} warehouse
 * @param {Array<{order_id:string, lines:Array<{sku:string, qty:number}>}>} orders
 * @param {{maxItems?:number, pickListSize?:number}} rawParams
 */
export function planWaves(warehouse, orders, rawParams = {}) {
  const params = normalizeParams(rawParams);
  const skuToLocation = buildSkuIndex(warehouse);
  const locationById = new Map((warehouse.locations ?? []).map((loc) => [loc.id, loc]));

  const prepared = (orders ?? []).map((order) => prepareOrder(order, skuToLocation));
  const rawWaves = splitWaves(prepared, params);

  const waves = rawWaves.map((wave, index) => {
    const locations = [...wave.locationIdSet]
      .map((id) => locationById.get(id))
      .sort(compareLocationId);
    const lexRoute = routeByLexOrder(locations);
    const nearestRoute = routeByNearestNeighbor(locations);
    return {
      index,
      orderIds: wave.orderIds,
      items: wave.items,
      unfulfillable: wave.unfulfillable,
      warnings: wave.warnings,
      locations,
      routes: {
        lex: { visitOrder: lexRoute.map((loc) => loc.id), length: tourLength(lexRoute) },
        nearest: {
          visitOrder: nearestRoute.map((loc) => loc.id),
          length: tourLength(nearestRoute),
        },
      },
    };
  });

  const totalItems = waves.reduce((sum, wave) => sum + wave.items, 0);
  const lexTotal = waves.reduce((sum, wave) => sum + wave.routes.lex.length, 0);
  const nearestTotal = waves.reduce((sum, wave) => sum + wave.routes.nearest.length, 0);
  const savedPercent = lexTotal > 0 ? roundTo(((lexTotal - nearestTotal) / lexTotal) * 100, 1) : 0;

  return {
    params,
    waves,
    warnings: waves.flatMap((wave) => wave.warnings),
    summary: {
      waveCount: waves.length,
      totalItems,
      lex: {
        totalDistance: lexTotal,
        avgPerItem: totalItems > 0 ? roundTo(lexTotal / totalItems, 2) : 0,
      },
      nearest: {
        totalDistance: nearestTotal,
        avgPerItem: totalItems > 0 ? roundTo(nearestTotal / totalItems, 2) : 0,
        savedPercent,
      },
    },
  };
}
