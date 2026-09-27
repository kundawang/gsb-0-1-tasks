temporalio 的拦截器约定不一致：`start_update_with_start_workflow` 这条路径没有把顶层的 rpc_metadata / rpc_timeout 传给拦截器，其它调用路径都传了，于是自定义拦截器在这条路径上拿到的是空值。

请把约定统一（顶层字段要转发到拦截器），补测试。
