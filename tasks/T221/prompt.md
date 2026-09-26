pymongo 的 ConnectionPool._reset() 有竞态：重置刚好和别的操作撞上时状态会不一致，我们 CI 上表现为偶发失败，本地跑个几百次能撞到一次。

请把 _reset 这条路径的竞态修掉，synchronous 和 asynchronous 都要，补一个能稳定复现的测试。
