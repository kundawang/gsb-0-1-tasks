sentry-python 的 gRPC 集成用集成级别的标志位判断"是否已经插过 ClientInterceptor"，同一个 channel 被多个客户端复用时判断失效，拦截器会被重复插入。

请改成通过检查 grpc.Channel 上的字段来判断（提供个 helper），补测试。
