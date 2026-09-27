django 的认证后端与工具函数只有同步版本：在 async 视图里调用要么得用 sync_to_async 包，要么直接报错，而 ORM 那边已经有 async 接口了。

请补上 async 版本（`aauthenticate`、`alogin`、`alogout`、`aget_user` 等）并与同步版本行为一致，补测试。
