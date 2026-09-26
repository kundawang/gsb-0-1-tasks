sympy 的 ntheory 不是线程安全的：素数筛 `Sieve` 的数组和 partitions_ 里的全局变量在多线程下会被写坏，或者抛内部错误。

请把筛数组改成 copy-on-write、全局变量改成原子赋值，让这块基本可重入，补测试。
