playwright-python 的同步 API：`with sync_playwright() as p:` 在初始化还没完成时就被退出，偶发报错/泄漏。
请让 __enter__ 等到初始化完成，补测试。
