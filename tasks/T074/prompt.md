marshmallow 的 URL() 校验器把 https://example.com#frag 这种"空路径 + fragment"的合法 URL 判成非法，
前端注册页被卡住。请修好让它合法；同时确认 #frag 这种相对形式按你们文档的口径处理（别放宽其它非法用例），
并补上绝对/相对两边的用例。
