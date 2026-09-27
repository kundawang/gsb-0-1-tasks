dbt 的 run-cache 里，缓存的 `state_auth.json` 没有优先于平台自身的认证链：缓存命中时仍然走了平台认证，导致本可离线/免认证的场景失败。

请让缓存的 state_auth 优先生效，补测试。
