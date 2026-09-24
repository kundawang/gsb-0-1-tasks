attrs：把 ClassVar 判定为"前向引用的普通字段"了，导致用字符串前向引用声明 ClassVar 的类被错误处理。
请修好 ClassVar 的前向引用检测，补一个用字符串前向引用 ClassVar 的测试。
