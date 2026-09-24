flask：解析 Host/Server name 时用 partition(":") 处理地址，遇到 IPv6（带多个冒号）就截错。
请改成按 IPv6 规则解析（带方括号的写法），补 host 解析的测试。
