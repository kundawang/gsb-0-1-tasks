virtualenv 用内嵌 wheel 建环境时，如果拿不到 PyPI 上的摘要（离线/镜像异常），它会继续装下去而不是停下来：装出来的环境可能被投毒或损坏。

请改成 digest 未知时 fail closed，补测试。
