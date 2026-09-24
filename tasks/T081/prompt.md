lark：InteractiveParser.copy() 出来的解析器和原对象共用同一个 lexer 线程状态，两个解析器一起用会互相干扰
（一个消费了 token，另一个就乱了）。请让 copy 之后的解析器状态独立，补一个"copy 后两边交替 feed"的测试。
