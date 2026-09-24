python-dotenv 的 set_key：值里带反斜杠时写出去再读回来内容变了（转义没有正确往返）。
请修好转义，保证 set_key 之后 get 回来的值和原始值一致，补测试。
