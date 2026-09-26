botocore 选择协议（protocol）的逻辑有 bug：模型的 protocols 列表没被正确解析/排序，导致选错协议（选了低优先级甚至不支持的），或者本该报错的情况安静通过。

请修好 args / endpoint / model 这几处的协议选择，补测试：正确选择、选最高优先级、缺 trait 的情况、不支持协议要报错。
