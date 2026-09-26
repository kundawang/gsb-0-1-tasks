dask 的 annotations（以及 span 相关标注）会在线程之间串：一个线程里设的 annotation 会漏到另一个线程正在构造的图里，于是本该只在 A 线程生效的配置出现在了 B 线程的图上；另外出错的图还会把 annotation 留着不清理。

请把 annotation 的作用域按线程隔离好，异常路径也要清理。补测试：annotation 不跨线程泄漏、出错之后要被清掉。
