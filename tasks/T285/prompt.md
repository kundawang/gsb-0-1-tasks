pytest 的终端报告在自定义 `pytest_report_teststatus` 返回元组形式的 verbose word 时会崩：`_get_verbose_word` 只接受字符串；带 markup 的词也没有被正确处理。

请修好 reports.py 和 terminal.py 这两处，补测试（用 hook 返回带 markup 的元组）。
