sqlite-utils：_decode_default_value 处理建表语句里的默认值时，把成对的单引号反转义错了，
读到默认值会和实际不符。请修好转义解析，补测试。
