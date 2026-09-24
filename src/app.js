import { planWaves, DEPOT } from './logic.js';

const WAVE_COLORS = [
  '#2563eb', '#dc2626', '#16a34a', '#d97706', '#7c3aed',
  '#0891b2', '#db2777', '#65a30d', '#9333ea', '#0d9488',
];

const CELL = 52;
const MARGIN = 36;

const state = {
  warehouse: null,
  orders: null,
  strategy: 'nearest',
  selectedWave: null,
};

const els = {
  map: document.getElementById('map'),
  legend: document.getElementById('legend'),
  waveTableBody: document.querySelector('#waveTable tbody'),
  summaryTable: document.getElementById('summaryTable'),
  warnings: document.getElementById('warnings'),
  maxItems: document.getElementById('maxItems'),
  pickListSize: document.getElementById('pickListSize'),
  dataStatus: document.getElementById('dataStatus'),
};

const svgNS = 'http://www.w3.org/2000/svg';

function svgEl(tag, attrs = {}, text = null) {
  const node = document.createElementNS(svgNS, tag);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  if (text !== null) node.textContent = text;
  return node;
}

function toPx(point) {
  return { cx: MARGIN + point.x * CELL + CELL / 2, cy: MARGIN + point.y * CELL + CELL / 2 };
}

function waveColor(index) {
  return WAVE_COLORS[index % WAVE_COLORS.length];
}

function currentParams() {
  return {
    maxItems: Number(els.maxItems.value),
    pickListSize: Number(els.pickListSize.value),
  };
}

function renderMap(result) {
  const { width, height, locations } = state.warehouse;
  const svgWidth = MARGIN * 2 + width * CELL;
  const svgHeight = MARGIN * 2 + height * CELL;
  els.map.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
  els.map.setAttribute('width', svgWidth);
  els.map.setAttribute('height', svgHeight);
  els.map.replaceChildren();

  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      els.map.append(svgEl('rect', {
        x: MARGIN + x * CELL, y: MARGIN + y * CELL,
        width: CELL, height: CELL, fill: '#fbfcfe', stroke: '#e2e8f0',
      }));
    }
  }

  const depot = toPx(DEPOT);
  els.map.append(svgEl('rect', {
    x: depot.cx - 9, y: depot.cy - 9, width: 18, height: 18,
    fill: '#111827', stroke: '#fff', 'stroke-width': 2,
  }));
  els.map.append(svgEl('text', {
    x: depot.cx, y: depot.cy - 14, 'text-anchor': 'middle',
    'font-size': 11, 'font-weight': 700, fill: '#111827',
  }, '出入口'));

  for (const wave of result.waves) {
    const routeIds = wave.routes[state.strategy].visitOrder;
    const byId = new Map(wave.locations.map((loc) => [loc.id, loc]));
    const points = [DEPOT, ...routeIds.map((id) => byId.get(id)), DEPOT]
      .map(toPx)
      .map((p) => `${p.cx},${p.cy}`)
      .join(' ');
    const dimmed = state.selectedWave !== null && state.selectedWave !== wave.index;
    els.map.append(svgEl('polyline', {
      points, fill: 'none', stroke: waveColor(wave.index),
      'stroke-width': dimmed ? 1.5 : 3,
      opacity: dimmed ? 0.15 : 0.75,
      'stroke-linejoin': 'round',
    }));
  }

  for (const loc of locations) {
    const { cx, cy } = toPx(loc);
    els.map.append(svgEl('circle', {
      cx, cy, r: 7, fill: '#fff', stroke: '#334155', 'stroke-width': 2,
    }));
    els.map.append(svgEl('text', {
      x: cx, y: cy + 22, 'text-anchor': 'middle', 'font-size': 10, fill: '#334155',
    }, loc.id));
  }
}

function renderLegend(result) {
  els.legend.replaceChildren();
  for (const wave of result.waves) {
    const item = document.createElement('span');
    const swatch = document.createElement('i');
    swatch.style.background = waveColor(wave.index);
    item.append(swatch, `波次 ${wave.index + 1}`);
    item.addEventListener('click', () => {
      state.selectedWave = state.selectedWave === wave.index ? null : wave.index;
      render();
    });
    els.legend.append(item);
  }
}

function renderSummary(result) {
  const { summary } = result;
  const rows = [
    ['波次数', summary.waveCount],
    ['总件数', summary.totalItems],
    ['字典序总距离', summary.lex.totalDistance],
    ['最近邻总距离', summary.nearest.totalDistance],
    ['字典序平均每件距离', summary.lex.avgPerItem],
    ['最近邻平均每件距离', summary.nearest.avgPerItem],
    ['最近邻相比字典序节省', `${summary.nearest.savedPercent.toFixed(1)}%`],
  ];
  els.summaryTable.replaceChildren();
  for (const [label, value] of rows) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = label;
    const td = document.createElement('td');
    td.className = 'num';
    td.textContent = value;
    tr.append(th, td);
    els.summaryTable.append(tr);
  }
}

function renderWaveTable(result) {
  els.waveTableBody.replaceChildren();
  for (const wave of result.waves) {
    const tr = document.createElement('tr');
    if (wave.unfulfillable) tr.classList.add('unfulfillable');
    if (state.selectedWave === wave.index) tr.classList.add('selected');
    tr.addEventListener('click', () => {
      state.selectedWave = state.selectedWave === wave.index ? null : wave.index;
      render();
    });
    const visit = wave.routes[state.strategy].visitOrder;
    const status = wave.unfulfillable
      ? `<span class="badge bad">unfulfillable</span> ${wave.unfulfillable}`
      : '<span class="badge">ok</span>';
    const cells = [
      `波次 ${wave.index + 1}`,
      wave.orderIds.join(', '),
      wave.items,
      wave.locations.length,
      wave.routes.lex.length,
      wave.routes.nearest.length,
      `<span class="visit-order">出入口 → ${visit.join(' → ')} → 出入口</span>`,
      status,
    ];
    for (const html of cells) {
      const td = document.createElement('td');
      td.innerHTML = html;
      tr.append(td);
    }
    els.waveTableBody.append(tr);
  }
}

function renderWarnings(result) {
  els.warnings.replaceChildren();
  for (const message of result.warnings) {
    const div = document.createElement('div');
    div.textContent = `⚠ ${message}`;
    els.warnings.append(div);
  }
}

function render() {
  if (!state.warehouse || !state.orders) return;
  let result;
  try {
    result = planWaves(state.warehouse, state.orders, currentParams());
    els.dataStatus.classList.remove('error');
  } catch (err) {
    els.dataStatus.textContent = `参数错误：${err.message}`;
    els.dataStatus.classList.add('error');
    return;
  }
  renderMap(result);
  renderLegend(result);
  renderSummary(result);
  renderWaveTable(result);
  renderWarnings(result);
}

async function loadDefaults() {
  const [warehouse, orders] = await Promise.all([
    fetch('data/warehouse.json').then((r) => r.json()),
    fetch('samples/orders.json').then((r) => r.json()),
  ]);
  state.warehouse = warehouse;
  state.orders = orders;
  els.dataStatus.textContent = '已加载内置样例：data/warehouse.json + samples/orders.json';
  render();
}

function bindFileInput(id, apply) {
  document.getElementById(id).addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      apply(JSON.parse(await file.text()));
      els.dataStatus.textContent = `已加载文件：${file.name}`;
      els.dataStatus.classList.remove('error');
      render();
    } catch (err) {
      els.dataStatus.textContent = `文件 ${file.name} 解析失败：${err.message}`;
      els.dataStatus.classList.add('error');
    }
  });
}

els.maxItems.addEventListener('change', render);
els.pickListSize.addEventListener('change', render);
for (const radio of document.querySelectorAll('input[name="strategy"]')) {
  radio.addEventListener('change', (event) => {
    state.strategy = event.target.value;
    render();
  });
}
bindFileInput('warehouseFile', (data) => { state.warehouse = data; });
bindFileInput('ordersFile', (data) => { state.orders = data; });

loadDefaults().catch((err) => {
  els.dataStatus.textContent = `内置样例加载失败（请通过本地 HTTP 服务打开页面）：${err.message}`;
  els.dataStatus.classList.add('error');
});
