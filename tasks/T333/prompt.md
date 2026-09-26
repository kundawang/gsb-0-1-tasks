virtualenv 在某些环境里创建/安装会报 'Too many open files'：内嵌 wheel 安装那条路径没有及时关闭文件句柄。

请修好句柄泄漏并改进错误信息，补测试。
