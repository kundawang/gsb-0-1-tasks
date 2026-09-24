packaging 的 pylock 选择逻辑：显式传入空 environments 时会被当成未指定，于是选出了不该选的条目。
请尊重显式的空集合，补测试。
