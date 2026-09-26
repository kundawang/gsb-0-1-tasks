starlette 在没有 exceptiongroup 依赖的 Python 版本上导入就会失败：middleware/base 里直接用了那个包。

请改成兼容写法（没有该依赖时用内置的 ExceptionGroup），补测试。
