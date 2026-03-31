# macOS 配置智谱 GLM Coding Plan + CC Switch 接入 Claude Code 指南

Claude Code 是 Anthropic 官方推出的 AI 编码命令行工具，而智谱 GLM Coding Plan 是国内高性价比的 AI 编码订阅套餐，支持直接接入 Claude Code。搭配 CC Switch 这个开源桌面工具，可以实现一键切换不同的 API 供应商，在智谱 GLM 和其他模型之间自由切换。

本文记录在 macOS 上从零配置的完整过程。

## 环境信息

- 系统：macOS（Apple Silicon）
- 终端：zsh
- 编码工具：Claude Code
- API 供应商：智谱 BigModel GLM Coding Plan
- 管理工具：[CC Switch](https://github.com/farion1231/cc-switch)

## 第一部分：配置智谱 GLM Coding Plan

### 1. 注册智谱开放平台账号

访问 [智谱开放平台](https://open.bigmodel.cn/)，点击右上角「注册/登录」，完成账号注册。

### 2. 订阅 Coding Plan 套餐

登录后进入 Coding Plan 页面，选择适合的套餐：

| 套餐 | 每 5 小时限额 | 每周限额 | 适合场景 |
|------|-------------|---------|---------|
| Lite | ~80 次 prompts | ~400 次 prompts | 轻度使用、体验 |
| Pro | ~400 次 prompts | ~2000 次 prompts | 日常开发 |
| Max | ~1600 次 prompts | ~8000 次 prompts | 高频复杂项目 |

套餐支持 GLM-5.1、GLM-5-Turbo、GLM-4.7、GLM-4.6、GLM-4.5、GLM-4.5-Air 等模型。Pro 和 Max 套餐还支持 GLM-5。

### 3. 获取 API Key

进入个人中心 → **API Keys**，创建一个新的 API Key。

> 请妥善保管 API Key，不要泄露或硬编码在代码中。

### 4. 安装 Claude Code

前提条件：已安装 Node.js 18+（推荐使用 nvm 或 Homebrew 安装，避免权限问题）。

```bash
# 安装 Claude Code
npm install -g @anthropic-ai/claude-code

# 验证安装
claude --version
```

> 安装成功后，先不要直接运行 `claude` 命令，需先完成下方配置。

### 5. 配置环境变量（三种方式任选其一）

#### 方式一：自动化助手（推荐）

```bash
npx @z_ai/coding-helper
```

按照界面提示操作，自动完成工具安装、套餐配置和 MCP 服务器管理。

#### 方式二：自动化脚本

```bash
curl -O "https://cdn.bigmodel.cn/install/claude_code_env.sh" && bash ./claude_code_env.sh
```

脚本会自动修改 `~/.claude/settings.json` 完成配置。

#### 方式三：手动配置

编辑 `~/.claude/settings.json`，添加以下内容（替换 `your_zhipu_api_key` 为你的 API Key）：

```json
{
    "env": {
        "ANTHROPIC_AUTH_TOKEN": "your_zhipu_api_key",
        "ANTHROPIC_BASE_URL": "https://open.bigmodel.cn/api/anthropic",
        "API_TIMEOUT_MS": "3000000",
        "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
    }
}
```

同时编辑 `~/.claude.json`，添加：

```json
{
    "hasCompletedOnboarding": true
}
```

配置完成后，**重新打开一个新的终端窗口**使配置生效。

### 6. 启动并验证

```bash
cd your-project
claude
```

启动后在 Claude Code 中输入 `/status` 确认模型状态。

## 第二部分：使用 CC Switch 管理 API 供应商

当你在多个 API 供应商之间切换时（比如智谱 GLM、Anthropic 官方、其他中转服务等），手动编辑配置文件很不方便。[CC Switch](https://github.com/farion1231/cc-switch) 是一个跨平台桌面工具，可以一键切换 API 供应商。

### 1. 安装 CC Switch

在 macOS 上推荐使用 Homebrew 安装：

```bash
brew tap farion1231/ccswitch
brew install --cask cc-switch
```

也可以从 [Releases 页面](https://github.com/farion1231/cc-switch/releases) 下载 `.dmg` 安装包手动安装。

> CC Switch for macOS 已通过 Apple 代码签名和公证，可以直接安装打开。

### 2. 初始化

首次启动时，CC Switch 会提示导入现有的 CLI 工具配置作为默认 Provider。如果你已经配置好了智谱 GLM，选择导入即可。

### 3. 添加 Provider

点击 **Add Provider** → 选择预设或自定义配置：

- 如果使用智谱 GLM，填写 Base URL 为 `https://open.bigmodel.cn/api/anthropic`，填入 API Key
- 如果使用其他服务（如 Anthropic 官方），填入对应的 Base URL 和 API Key

### 4. 一键切换

- **主界面**：选择目标 Provider → 点击 "Enable"
- **系统托盘**：直接点击 Provider 名称，即时生效

对于 Claude Code，切换后无需重启终端即可生效。

## 第三部分：模型映射与切换

配置 GLM Coding Plan 后，Claude Code 界面显示的是 Claude 模型名称，实际调用的是 GLM 模型。默认映射关系：

| Claude Code 环境变量 | 默认 GLM 模型 |
|---------------------|-------------|
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | GLM-4.7 |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | GLM-4.7 |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | GLM-4.5-Air |

### 切换到 GLM-5.1

如需使用 GLM-5.1，在 `~/.claude/settings.json` 中修改：

```json
{
    "env": {
        "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-4.5-air",
        "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-5-turbo",
        "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-5.1"
    }
}
```

> 注意：GLM-5.1/GLM-5-Turbo 作为高阶模型，高峰期（14:00-18:00 UTC+8）按 3 倍系数消耗额度，非高峰期按 2 倍。目前限时福利，非高峰期仅按 1 倍抵扣。

修改后重新打开终端窗口，运行 `claude` 并输入 `/status` 确认。

## 注意事项

1. **套餐额度**：Coding Plan 有每 5 小时和每周的使用限额，可在智谱控制台的「用量统计」中查看消耗进度。额度耗尽后需等待下一个周期恢复，不会消耗账户余额
2. **Node.js 安装**：macOS 用户推荐使用 nvm 安装 Node.js，避免后续权限问题
3. **配置不生效**：手动修改 `~/.claude/settings.json` 后，需关闭所有 Claude Code 窗口并重新打开终端。若仍不生效，检查 JSON 格式是否正确
4. **版本兼容**：建议使用最新版本的 Claude Code，通过 `claude update` 升级。Claude Code v2.1.69 有已知 BUG，需额外设置环境变量 `ENABLE_TOOL_SEARCH=0 CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1`
5. **Coding Plan 使用范围**：套餐额度仅在 Claude Code、Kilo Code、OpenCode 等指定编码工具中可用，直接调用 API 不享受套餐额度
6. **CC Switch 数据存储**：配置数据保存在 `~/.cc-switch/cc-switch.db`（SQLite），自动备份在 `~/.cc-switch/backups/`

## 参考链接

- [智谱 GLM Coding Plan 官方文档](https://docs.bigmodel.cn/cn/coding-plan/overview)
- [智谱 Claude Code 接入指南](https://docs.bigmodel.cn/cn/guide/develop/claude)
- [CC Switch GitHub 仓库](https://github.com/farion1231/cc-switch)
