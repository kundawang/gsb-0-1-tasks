dask.array 的 asarray(..., like=xxx) 碰到 scipy.sparse 对象会直接崩；meta 推导那条路径也不认 scipy 的稀疏矩阵，拿它当 ndarray 处理。

请把这两处修好（meta 推导要认稀疏矩阵，asarray 的 like= 分支不要崩），补测试。
