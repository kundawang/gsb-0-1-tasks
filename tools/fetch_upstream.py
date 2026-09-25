#!/usr/bin/env python3
"""把 upstream-tasks.json 里的题目拉成可跑的工作区。

用法（在 gsb-0-1-tasks 仓库根目录）：

    uv run python tools/fetch_upstream.py 1                 # 拉第 1 题
    uv run python tools/fetch_upstream.py 1-10              # 批量拉 1..10
    uv run python tools/fetch_upstream.py 1 --id T071       # 指定题号
    uv run python tools/fetch_upstream.py --list            # 只打印题单

做的事：下载上游仓库在 base_sha 的源码快照 → 作为工作区调用 task.py new 建题
（生成 t<id>/base 分支 + 桌面 A/B 工作区）→ 打印下一步命令。
"""

import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile
import urllib.request
import zipfile

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST = os.path.join(REPO, "upstream-tasks.json")
DEFAULT_ROOT = r"C:\Users\Administrator\Desktop\GSB出题"
PYTHON = r"C:\Users\Administrator\AppData\Local\Programs\Python\Python313\python.exe"


def load_manifest():
    with open(MANIFEST, encoding="utf-8") as fh:
        return json.load(fh)


def parse_range(text):
    if "-" in text:
        a, b = text.split("-", 1)
        return list(range(int(a), int(b) + 1))
    return [int(text)]


def download_workspace(item, dest):
    owner_repo = item["repo"]
    sha = item["base_sha"]
    url = f"https://codeload.github.com/{owner_repo}/zip/{sha}"
    zip_path = os.path.join(tempfile.gettempdir(), f"{owner_repo.replace('/', '_')}_{sha[:10]}.zip")
    if not os.path.exists(zip_path):
        print(f"    下载 {url}")
        with urllib.request.urlopen(url, timeout=180) as resp, open(zip_path, "wb") as out:
            shutil.copyfileobj(resp, out)
    with zipfile.ZipFile(zip_path) as zf:
        names = zf.namelist()
        prefix = names[0].split("/")[0] + "/"
        zf.extractall(dest)
    src = os.path.join(dest, prefix.rstrip("/"))
    return src


def build_one(item, task_id, root, dry=False, difficulty="中等"):
    print(f"[{item['index']:03d}] {item['repo']} @ {item['base_sha'][:10]} -> {task_id}")
    # 题面临时文件放系统临时目录，避免把台账仓库搞成 dirty 状态
    prompt_file = os.path.join(tempfile.gettempdir(), f"gsb_prompt_{task_id}.txt")
    if dry:
        return
    with tempfile.TemporaryDirectory(prefix=f"up_{task_id}_") as tmp:
        ws = download_workspace(item, tmp)
        with open(prompt_file, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(item["prompt"] + "\n")
        args = [
            PYTHON, os.path.join(REPO, "tools", "task.py"), "new", task_id,
            "--workspace", ws,
            "--prompt-file", prompt_file,
            "--title", f"{item['repo']} 缺陷修复：{item['subject'][:60]}",
            "--task-type", "缺陷修复",
            "--difficulty", difficulty,
            "--lang", "Python",
            "--harness", "Codex CLI",
            "--os", "Windows",
            "--env-level", f"上游仓库 {item['repo']} @ {item['base_sha'][:10]}",
            "--notes", f"upstream: {item['repo_url']} base={item['base_permalink']} fix={item['fix_sha']}",
            "--root", os.path.join(root, task_id),
            "--no-push",
        ]
        proc = subprocess.run(args, cwd=REPO, capture_output=True, text=True,
                              encoding="utf-8", errors="replace")
        if proc.returncode != 0:
            print("    task.py new 失败，输出如下：")
            print("    " + (proc.stdout or "").strip().replace("\n", "\n    "))
            print("    " + (proc.stderr or "").strip().replace("\n", "\n    "))
            raise SystemExit(1)
        os.remove(prompt_file)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("range", nargs="?", help="题单序号，如 1 或 1-10")
    ap.add_argument("--id", help="指定题号（默认 T071 起递增）")
    ap.add_argument("--root", default=DEFAULT_ROOT)
    ap.add_argument("--difficulty", default="中等", help="任务难度（默认 中等）")
    ap.add_argument("--list", action="store_true")
    args = ap.parse_args()

    items = load_manifest()
    if args.list or not args.range:
        for it in items:
            print(f"{it['index']:>3}  {it['suggested_id']}  {it['repo']:<32} {it['base_sha'][:10]}  {it['subject'][:56]}")
        return 0

    failed = []
    for idx in parse_range(args.range):
        item = next((x for x in items if x["index"] == idx), None)
        if not item:
            print(f"!! 没有序号 {idx}")
            continue
        task_id = args.id or item["suggested_id"]
        try:
            build_one(item, task_id, args.root, difficulty=args.difficulty)
        except SystemExit:
            print(f"    !! 第 {idx} 题（{task_id}）失败，跳过继续")
            failed.append(idx)
        except Exception as exc:  # 网络/解压等偶发问题
            print(f"    !! 第 {idx} 题（{task_id}）异常：{type(exc).__name__}: {exc}")
            failed.append(idx)
    if failed:
        print(f"\n失败的序号：{failed}（可重跑：fetch_upstream.py {','.join(str(x) for x in failed)}）")
    print("\n提示：拉完用 `t list` 看状态；桌面对应题目目录里已有 打开A窗口.cmd / 打开B窗口.cmd。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
