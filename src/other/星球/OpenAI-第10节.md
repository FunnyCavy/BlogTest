# OpenAI 项目学习笔记 - 第 10 节

- 感觉 `OkHttpClient` 之类的放在 Configuration 配置类里面有点怪怪的, 就建了一个上下文类

<img src="./img/OpenAI-第10节/image-20231217121245992.png" alt="image-20231217121245992" style="zoom:50%;" />

- 配置类就专门管配置

<img src="./img/OpenAI-第10节/image-20231217121302752.png" alt="image-20231217121302752" style="zoom:50%;" />

- 会话工厂实现

<img src="./img/OpenAI-第10节/image-20231217121446749.png" alt="image-20231217121446749" style="zoom:50%;" />

- 会话实现, 构造方法里的传参由 Configuration 改为 Context

<img src="./img/OpenAI-第10节/image-20231217121539026.png" alt="image-20231217121539026" style="zoom:50%;" />