tox 里只要创建 package 环境（.pkg）失败过一次，后面就连环崩：再跑别的 run 环境会报 `duplicate configuration definition for .pkg`，看起来跟我们把 work_dir 放到另一个文件系统上有关系，但那个报错只是连带反应。

真正的原因应该是失败的时候 `_get_package_env` 把半注册的配置留在缓存里了，之后共享 .pkg 的环境再注册就撞车。

请把这条失败回滚路径修好：失败要报第一个真实错误、不能把半成品留在缓存里、共享环境要被保住、被插件 hook 跳过的环境也要处理。补测试（含 depends 循环的场景）。
