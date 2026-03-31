# 网站构建说明

本文档说明本站当前使用的技术栈、目录结构与部署方式。

## 技术栈

- 生成器: MkDocs 1.6+
- 主题: Material for MkDocs
- 数学公式: KaTeX 自动渲染
- 部署平台: GitHub Pages

## 目录结构

```text
my-blog/
├── mkdocs.yml
├── docs/
│   ├── index.md
│   ├── 我/
│   ├── 博客/
│   ├── 开发/
│   ├── 研究/
│   ├── 二次元/
│   ├── 随笔/
│   ├── 读书/
│   ├── 转载/
│   └── 网站/
├── requirements.txt
└── .github/workflows/deploy.yml
```

## 本地预览

```bash
cd ~/my-blog
python3 -m pip install -r requirements.txt
mkdocs serve
```

默认访问地址: `http://127.0.0.1:8000`

## 构建命令

```bash
cd ~/my-blog
mkdocs build --strict
```

构建输出目录: `site/`

## 自动部署

- 配置文件: `.github/workflows/deploy.yml`
- 触发条件: push 到 `main` 分支
- 发布目标: GitHub Pages
