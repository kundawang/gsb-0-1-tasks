tox 有三个小地方不对：
`tox c -o <文件>` 的输出文件没被遵守，内容还是打到 stdout 了；
`tox devenv -e ALL` 的报错信息不对（不是该有的那条）；
provision 那块 tox 的版本 pin 不对，不重建环境的时候会 pin 成错的版本。

请逐个修好，各补一个测试。
