astroid 和 pylint 对同一个文件算出来的模块搜索路径顺序不一致，于是两边对"这个 import 到底解析到哪个模块"的判断不一样（modutils 和 util 各有一套顺序）。

请统一成同一套顺序，补一个 `modpath_from_file` 顺序的测试。
