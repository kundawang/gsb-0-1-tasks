pluggy：同一个插件里有多个 hookimpl 用 specname 指定成同一个 hook 名时，subset_hook_caller 的过滤会乱套
—— 本来只该排除指定插件的实现，结果把别的插件的实现也排掉了（或反过来多算了）。
请修成"按插件对象判断归属"，specname 只影响匹配哪个 hookspec、不影响 subset 过滤；补测试覆盖这个组合。
