click 的 Sentinel 哨兵对象：对实例做 copy/deepcopy/pickle 之后就不再是同一个对象了，
于是"是不是哨兵"的判断失效。请让复制和序列化之后仍然是同一个哨兵（单例语义），
copy/deepcopy/pickle 三种都要有用例。
