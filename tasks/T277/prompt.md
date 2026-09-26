poetry 用 `installer.builtin-uninstall` 卸载包时会抛 TypeError：内部的环境接口签名和回退路径对不上（base_env / null_env / system_env 几处不一致）。

请修好并统一这些接口，补一个带回退路径的卸载测试。
