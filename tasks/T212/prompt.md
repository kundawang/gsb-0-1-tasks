pydantic 的模型把私有属性泄漏到 __iter__ 里了：dict(model) 会带出这些私有字段，用 cached_property 声明的私有属性也一样，这在做序列化的时候会把内部状态漏出去。默认 repr 里也不该显示它们。

请修好让私有属性不出现在 __iter__/dict 和默认 repr 里。补测试：普通私有属性和 cached_property 两种都要覆盖 __iter__ 和默认 repr。
