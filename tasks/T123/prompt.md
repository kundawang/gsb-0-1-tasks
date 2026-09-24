tenacity：装饰后的函数在 enabled=False 时，迭代协议（__iter__ / __next__）仍然会执行重试逻辑。
请让关闭状态对这些协议也生效，补测试。
