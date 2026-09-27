temporalio 的工作流在 debug 模式（debug_mode=True 或 TEMPORAL_DEBUG=1）下遇到 `breakpoint()` 会卡死：pdb 的交互提示出不来，工作流就挂在那儿。

请让 debug 模式下断点能正常进入交互、退出后工作流继续跑，补测试（含从子工作流/异步上下文进入断点的情况）。
