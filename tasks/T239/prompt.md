IPython 在 Python 3.12 上因为 tokenize 的行为变化出了问题：inputsplitter、inputtransformer、tokenutil 这几处解析出来的结果和以前不一样，有些输入会被判错（该完整的说不完整、该报错的又不报）。

请修好让 3.12 上和旧版本行为一致，补测试。
