virtualenv 重建环境时，如果旧的符号链接已经失效（dangling），现在会顺着链接往里写，导致新环境建出来是坏的。

请改成先把失效链接替换掉再写，补测试：重建带 dangling alias 的环境、替换 dangling symlink。
