dask-expr 里 `axis=1` 相关的一批操作结果不对：dtype 跟 pandas 对不上，某些聚合和累积在 axis=1 上算错或者报错。

请修好 _collection / _expr / _reductions / _cumulative 这几处，补测试。
