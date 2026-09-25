pytest 加 --maxfail=1 的时候，如果 teardown 阶段又出错，这个错误会被吞掉、或者报的位置不对。
看着是早先那次失败把 maxfail 的状态置上了，teardown 的失败就没法正确上报；session 级的 teardown 失败/停止两种情况也不对。
请修好这块的状态处理，让 teardown 的错误该报就报。补测试覆盖：session teardown 失败、session teardown 停止、以及 shouldfail / shouldstop 的状态是不是该"粘住"。
