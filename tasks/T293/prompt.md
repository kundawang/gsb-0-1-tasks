astroid 在推断被 `functools.partial` 包住的描述符（比如 partial 一个方法或属性访问器）时会崩，抛的是内部推断异常。

请修好 brain_functools / objectmodel / objects 这几处，补一个 partial 描述符绑定的测试。
