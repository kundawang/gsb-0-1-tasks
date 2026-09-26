sympy 的 Fp 群求逆会崩：`invert` 在某些元素上找不到逆就抛 KeyError，而不是给出正确结果；顺带 Fp 群和置换群的 image 成员判断也需要补上。

请修好 coset_table 和 homomorphisms 这两处，补一个 Fp 群同构的测试。
