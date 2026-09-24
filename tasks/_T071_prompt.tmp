我们服务升级到 Python 3.14 之后，用 cattrs 的 msgspec 预配置（cattrs.preconf.msgspec）做 structure/unstructure
直接报错，在 3.13 上同样的代码是好的。请定位并修掉，要求 3.14 上行为和 3.13 一致；
没装 msgspec 时仍然给出原来那句友好的报错；补一个能在当前版本复现的测试。
