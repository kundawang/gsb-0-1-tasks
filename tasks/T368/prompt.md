streamlit 的 `st.components.v1.iframe` 和 `st.html` 在没显式指定宽度时，默认宽度变了（跟着容器布局走），嵌进去的组件被拉伸或压扁。

请把默认宽度行为修回原来的语义，补测试。
