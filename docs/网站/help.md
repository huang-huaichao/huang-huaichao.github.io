# 文章编写帮助

本文档给出本站内容编写的最小规范，保证目录清晰、风格统一。

## 新建文章建议

1. 先确定栏目，再新建对应 `index.md` 或主题文档。
2. 文件名尽量使用中文语义名，例如 `量化回测入门.md`。
3. 标题层级从 `#` 开始，避免跳级。

## Markdown 示例

```md
# 标题

## 小节

这是正文。

- 要点 A
- 要点 B
```

## 代码块示例

```python
def hello(name: str) -> str:
    return f"Hello, {name}"
```

## 数学公式示例

行内公式: `$E = mc^2$`

块级公式:

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

## 图片与链接

- 图片: `![说明](../images/example.png)`
- 站内链接: `[返回网站栏目](index.md)`
- 外链: `[GitHub](https://github.com/Learnergalaxy)`
