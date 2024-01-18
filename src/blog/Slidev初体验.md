# Slidev 初体验

Slidev 的名字取自 `slide + dev`，是为开发者打造的演示文稿工具，相比 PowerPoint 等为人熟知的演示文稿工具，官网介绍了 Slidev 的很多优势：[为什么选择 Slidev](https://cn.sli.dev/guide/why.html)

截至撰文，其在 GitHub 上已经接近 **30K Star⭐**，足以可见其魅力

## 编辑幻灯片

首先创建 Slidev 项目

```sh
pnpm create slidev
```

幻灯片内容默认从 `slides.md` 中读取

## 展示幻灯片

Slidev 一共提供了三种模式，访问链接如下：

- 入口：`http://localhost:3030/entry`
- 演示模式：`http://localhost:3030`
- 演讲者模式：`http://localhost:3030/presenter`
- 备注模式：`http://localhost:3030/notes`

### 演示模式

将鼠标移动到屏幕左下角即可显示导航面板

![](https://image.dxmy.fun/md/240107_212241.webp)

1. 切换全屏
2. 切换上一张
3. 切换下一张
4. 切换到幻灯片总览页面
5. 切换暗黑模式
6. 开启摄像头视图
7. 开启录制模式
8. 开启标注工具栏
9. 切换到[演讲者模式](#演讲者模式)
10. 开启集成编辑器（可直接编辑当前页内容或备注）
11. 幻灯片信息（对应 `frontmatter` 中的 `info`）
12. 设置幻灯片缩放
13. 幻灯片页数

### 演讲者模式

该模式可控制演示模式下的内容，包括幻灯片、鼠标指针、标注

![](https://image.dxmy.fun/md/240107_211109.webp)

1. 预览当前幻灯片
2. 预览下张幻灯片
3. 幻灯片备注
4. 展示总耗时
5. 显示鼠标指针（将当前鼠标指针同步到演示模式中）
6. 开启标注工具栏
7. 切换到[演示模式](#演示模式)
8. 开启集成编辑器（可直接编辑当前页内容或备注）
9. 切换页面视图（以当前页幻灯片为主体或以备注为主体）

::: tip 启用远程控制

可通过监听公共主机实现远程控制的效果，为 `slidev` 命令添加 `--remote [password]` 参数即可：

```json
{
  "scripts": {
    "build": "slidev build",
    "dev": "slidev --open --remote", // [!code focus]
    "export": "slidev export"
  }
}
```

若设置密码，外部访问该模式需要手动输入密码，或在 URL 中携带 `password=xxx` 的参数

:::

### 备注模式

该模式只负责展示演示模式下对应页的注释
