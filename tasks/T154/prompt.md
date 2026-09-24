python-dotenv：.env 文件开头有 UTF-8 BOM 时，第一个变量名会被污染，读不到。
请剥离 BOM，补一个带 BOM 的解析测试。
