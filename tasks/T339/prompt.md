joblib 的 MemorizedFunc.call 之前被改过 API，导致老用法不兼容（记忆化函数调用行为变了）。

请把 API 恢复回原样，补测试：记忆化/非记忆化调用、异步调用。
