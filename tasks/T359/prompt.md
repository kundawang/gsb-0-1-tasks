dbt 的 databricks 适配在 `view_update_via_alter` 下检测不到视图定义变化：视图的 query 配置改了，却被判定为没变，于是不会执行 ALTER。

请把视图定义纳入变化检测，补测试。
