pytest-cov 自己实现了一套 fail_under 判断，和 coverage 的行为对不上（阈值、精度、报错方式都有差异）。

请改用 coverage 提供的函数来判断 fail_under（同时放宽最低 coverage 版本要求），补测试。
