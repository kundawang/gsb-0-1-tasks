hypothesis 内部那个 LRU 缓存（internal/cache.py）的 pin 语义不安全：被 pin 住的条目在某些淘汰顺序下还是会被换掉，于是 conjecture 引擎拿着一个已经失效的条目继续用，行为就变得不可预期。

请把 pin / 淘汰的语义修正确。补测试把"pin 住之后不能被淘汰、unpin 之后正常淘汰"钉住。
