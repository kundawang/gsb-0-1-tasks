locust 的 Web UI 好几处还在用总 RPS / 总失败数（totalRps），但接口现在返回的是当前值（currentRps / currentFailPerSec），只有最终统计表该用总数，其它地方用错了，界面数字对不上。

请改好前端这几处（Navbar 的 SwarmMonitor、useFetchStats、ui.slice），补测试。
