# 步进音序器（starter）

```
samples/project.json   4 轨样例工程（bpm/拍号/step 开关/力度/音符）
```

每轨结构：

```json
{"name": "kick", "channel": 0, "volume": 110, "note": 36,
 "steps": [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
 "velocity": [120,0,0,0,110,0,0,0,120,0,0,0,110,0,0,0],
 "notes": {"8": 38}}
```

`steps[i]` 为 1 表示该 step 发声，`notes` 可对个别 step 覆盖音高。
时间基准 PPQ=480（1 拍 = 480 tick，1 个 16 分音符 = 120 tick）。

怎么跑：双击 `index.html`（原生 ES module，不构建、不装依赖、不联网；播放用 WebAudio 振荡器）。
怎么测：`node --test`（编译成事件表是纯逻辑，能脱离 DOM 调）。

