sqlalchemy 的 AsyncSession.close_all() 现在根本用不了：要么直接报错、要么什么也没关掉，跟同步那套 close_all_sessions 的行为完全对不上。

请修好它，并补上 async 版的 close_all_sessions；旧入口的 deprecation 行为也要保持一致。补测试：close_all 能把所有 session 都关掉、以及旧的调用方式仍然按 deprecation 走。
