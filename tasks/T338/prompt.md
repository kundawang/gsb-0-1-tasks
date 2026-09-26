croniter 在 32 位系统上会抛 OverflowError：内部用的是 time_t 范围之外的时间戳。

请修好溢出（别依赖 time_t 的位宽），补测试。
