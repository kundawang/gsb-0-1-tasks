做个小步进音序器，给我们乐队排练用：多轨、每轨一串 step，能导出成"事件表"给合成器脚本吃。

模型（samples/project.json 是一个 4 轨样例）：

- 工程：bpm、拍号（比如 4/4）、总 step 数 steps（默认 16）、swing（0~0.75）
- 轨：name、乐器通道 channel、音量 volume（0~127）、音符映射 notes（step 索引 → 音高/MIDI 号）、
  每轨自己的 step 开关（on/off）与力度 velocity（1~127）
- 时间：一个 step = 一个 16 分音符；tick 精度按 PPQ=480（也就是 1 拍 = 480 tick，1 个 16 分 = 120 tick）

要做的：

1. 把工程编译成事件表：每条事件 {tick, channel, note, velocity, duration_ticks}，按 tick 升序，
   同一 tick 内按 channel 升序；输出还要给总 tick 数和每个轨的发声音符数。
2. swing：偶数 step（第 2、4、6…个）延后 `swing × 120` tick（取整到 tick，四舍五入规则写清楚），
   奇数 step 不动；带动画的 UI 要能看出这个偏移。
3. 循环：`loop_rounds` 参数决定事件表重复几遍，第二遍起 tick 整体偏移总长度。
4. 导出：`events.csv`（tick,channel,note,velocity,duration）与 `project.json`（原工程 + 编译后的统计），
   下载用 Blob，不引第三方库。

硬指标：

1. 编译是纯函数（工程对象 → 事件表），`node --test` 里直接测，不依赖 DOM。
2. 确定性：同一工程编两遍，事件表逐字段一致（包括排序）；测试里断言事件数量与首尾事件。
3. 边界：空轨、steps 不是 16 也可以是任意正整数、bpm 极值（20 和 300）、swing=0 与 swing=0.75、
   note 超出 MIDI 范围（0~127，越界要报错并给轨名和 step 号）。
4. 时间换算全整数：不允许出现 `12.0000000001` 这种 tick；测试里断言 `Number.isInteger(tick)`。

界面：网格（行=轨、列=step），点击开关音符，右键或面板调音高/力度；顶部 bpm/swing/循环次数；
播放用 WebAudio 的振荡器即可（不采样、不引资源），播放位置跟着网格高亮。
约束：原生 ES module + HTML/CSS，不引依赖、不联网。README 写事件表格式与导出文件含义。

