# GSB 0-1 出题库

专门放 **0-1 代码生成题**：每道题 = 一份题面 + 一个初始环境快照 + 一套验收清单，同一题跑 A / B 两轮。

口径、字段、GSB 理由写法沿用 `coding-agent-tasks` 里那套文档（本仓库 `docs/` 也放了副本），
差别只有一条：**本仓库的题目类型固定是 0-1 代码生成**，也就是"给一份 starter + 一段口语化需求，
让模型从零把功能做出来"，不是改 bug、也不是读代码问答。

## 仓库结构

```
main                        台账：题目信息、题面、验收清单、轨迹、索引
├── tasks/
│   ├── _TEMPLATE/          新建题目时复制的模板
│   └── T031/               每道题一个目录
│       ├── prompt.md       发给模型的题面原文（不改写）
│       ├── rubric.md       验收清单（人工/脚本判定用）
│       ├── meta.json       提交表字段（机器可读）
│       └── trajectories/   A/B 轨迹 jsonl
├── docs/                   出题规范、验收模板、提交字段、GSB 理由写法、原文、雷同题黑名单
└── tools/                  task.py（建题/记录/重置/出字段）、push.py、find_trajectory.py …

t031/base                   初始环境快照（这道题的 starter 代码）
├── t031/a                  A 跑完后的产物快照（parent = t031/base）
└── t031/b                  B 跑完后的产物快照（parent = t031/base）
```

代码放在按题命名的分支上（`t<编号>/base|a|b`），台账放在 `main`。
这样模型跑题时工作区里只有这一题的代码，不会被别的题目干扰。

## 一道 0-1 题怎么落地

1. **准备 starter**：一份能直接跑起来但没实现的工程骨架（数据文件、接口/页面骨架、README 写清楚要做什么、
   给 1~2 个能跑通的冒烟用例）。答案、参考实现、额外依赖都不要放进去。
2. **写题面**：按 `docs/0-1出题规范.md` 写，存成 `T031-题面.txt`。
3. **建题**：

   ```batch
   cd /d C:\Users\Administrator\Documents\Codex\gsb-0-1-tasks
   uv run python tools\task.py new T031 ^
     --workspace "C:\path\to\starter" ^
     --prompt-file "C:\path\to\T031-题面.txt" ^
     --title "xxx" --task-type "0-1代码生成" --difficulty "中等" ^
     --lang "JavaScript, HTML, CSS（原生 ES module，无构建）" ^
     --harness "Codex CLI" --os "Windows" --env-level "无外部依赖" ^
     --root "C:\Users\Administrator\Desktop\GSB出题\T031" --no-push
   ```

   这一步会把 starter 快照成 `t031/base`，并在题目目录下铺出 `A/`、`B/` 两份工作区。
4. **跑 A/B**：双击题目目录里的 `打开A窗口.cmd` / `打开B窗口.cmd`。脚本会先把这一轮的工作区重置回
   `t031/base`，再以 `-a never -s workspace-write` 全自动起 Codex CLI（同一题两轮用完全相同的题面，
   不追加澄清、不引导）。
5. **记账**：跑完把窗口打印的 SessionID 填回来

   ```batch
   t record T031 a --side a --session <A-SessionID>
   t record T031 b --side b --session <B-SessionID>
   ```

   会把 A/B 的产物快照分支（`t031/a`、`t031/b`）和轨迹 jsonl 一起收进台账。
6. **出字段**：`t report T031` 一次打印提交表要的所有字段（题目/类型/难度/语言/Harness/OS/环境等级/
   初始快照/A-SessionID/A-轨迹/A-产物快照/B-…/GSB 结论/理由/有效性/备注），照抄进飞书表即可。
7. **写结论**：GSB 结论（A 更好 / Same / B 更好）和理由由人写，参考 `docs/GSB理由写法与合格示例.md`，
   理由里要能对上轨迹里发生过的动作和产物快照里的文件。

## 目录外的两个约定

- 工作区只放这一题的代码；`node_modules`、`.venv`、构建产物、数据库文件都不进快照（`.gitignore` 已配）。
- 运行环境要能离线复现：0-1 题一律不联网、不依赖外部服务；随机必须走 seed，同一输入 + 同一串操作结果一致。

## 常用命令

```batch
t list                       :: 列出所有题目与状态
t new T032 --workspace ... --prompt-file ...
t reset T031 --side a --fresh   :: 某轮跑废了，清空重铺
t record T031 a --side a --session <id>
t report T031                :: 出提交表字段
t push T031                  :: 推这个题目的分支与台账
```

