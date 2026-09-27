redis-py 的 Pipeline 在被取消时不会把池化连接还回去：连接泄漏，池子很快耗尽。

请修好 Pipeline.reset 的释放路径，补一个取消后连接被归还的测试。
