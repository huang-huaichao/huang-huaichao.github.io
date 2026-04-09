# Mac 远程连接 Windows 开发环境 — 配置指南

---

## 一、为什么要这样做

作为 Mac 用户，日常开发体验很好，但有些事情 Mac 做不了或者不方便：

- **GPU 密集计算**：M 系列芯片的统一内存架构适合日常开发，但跑深度学习训练、CUDA 相关任务时，还是需要 Windows 游戏本的独立显卡
- **Windows 专属工具链**：某些开发工具、SDK 只有 Windows 版本
- **资源利用**：游戏本闲着也是闲着，把它变成远程计算节点，Mac 当前端，各取所长

简单说就是：**Mac 写代码，Windows 跑代码**，两台机器协同工作。

---

## 二、方案选择

VS Code 提供了两种远程连接方式：

| | Remote Tunnels | Remote SSH |
|---|---|---|
| 配置难度 | 低 | 中 |
| 网络要求 | 能上网即可 | 需局域网或公网可达 |
| 需要公网 IP | 否 | 是 |
| 需要额外配置 | 否 | Windows 需开启 OpenSSH Server |
| 延迟 | 略高（经微软服务器中转） | 更低（局域网直连） |
| 适合场景 | 跨网络、快速上手 | 同一局域网、追求低延迟 |

本文选择 **Remote Tunnels**，因为它配置最简单，不需要折腾网络和 SSH，两台电脑能上网就行。

---

## 三、Windows 端配置

### 1. 安装 VS Code

下载地址：https://code.visualstudio.com

验证安装：

```powershell
code --version
```

### 2. 开启 Tunnel 隧道

命令行方式创建隧道（推荐，可以看到详细进度）：

```powershell
code tunnel --accept-server-license-terms
```

执行后会提示：

```
To grant access to the server, please log into https://github.com/login/device and use code XXXX-XXXX
```

### 3. GitHub 授权

1. 浏览器打开 https://github.com/login/device
2. 输入终端显示的授权码
3. 点击 Authorize 确认

授权成功后会显示机器名，代表隧道已创建。

### 4. 开机自启（推荐）

```powershell
# 管理员 PowerShell 中运行
code tunnel service install
```

配置后 Windows 开机隧道自动运行，不需要手动启动 VS Code。

### 5. 防止 Windows 自动休眠

Windows 设置 → 系统 → 电源 → 屏幕和睡眠 → 全部改为 **从不**

Windows 休眠后隧道会断开，Mac 端无法连接，这步很重要。

---

## 四、Mac 端配置

### 1. 安装扩展

1. 打开 VS Code
2. `Cmd + Shift + X` 打开扩展面板
3. 搜索 **Remote - Tunnels**（Microsoft 官方发布）
4. 点击安装

### 2. 连接 Windows

1. `Cmd + Shift + P` 打开命令面板
2. 输入 **Remote Tunnels: Connect to Tunnel**
3. 用同一个 GitHub 账号登录
4. 选择你的 Windows 机器名

### 3. 验证连接成功

- 左下角出现绿色远程连接标识 → 已连接
- `File → Open Folder` → 浏览的是 Windows 的文件系统
- 打开终端 `` Ctrl+` `` → 运行的是 Windows 终端

---

## 五、连接 WSL 开发环境

如果 Windows 端已配置 WSL（Ubuntu 等），可以直接在 WSL 里开发，Linux 环境下的工具链和包管理体验比原生 Windows 更好。

### 1. 安装 WSL 扩展（⚠️ 踩坑重点）

扩展必须装在**远程 Windows 端**，不是 Mac 本地。

正确操作：

1. 确认已连接到 Windows 机器（左下角绿色标识）
2. `Cmd + Shift + X` 打开扩展面板
3. 搜索 **WSL**（Microsoft 官方）
4. **不要直接点 Install**——会装到 Mac 本地
5. 点击扩展旁的**下拉箭头**或 **"Install in Remote"**，安装到远程端

如果找不到 "Install in Remote" 按钮，可以在远程终端里手动安装：

```powershell
code --install-extension ms-vscode-remote.remote-wsl
```

安装完成后，命令面板搜索 `WSL: Connect to WSL` 即可使用。

### 2. 连接 WSL

1. `Cmd + Shift + P` → **WSL: Connect to WSL**
2. 选择 WSL 发行版（如 Ubuntu）
3. `File → Open Folder` → 打开 WSL 中的项目路径

### 3. 连接层级

```
Mac VS Code → Remote Tunnels → Windows → WSL (Ubuntu)
```

### 4. WSL 中检查 Python 环境

```bash
cat /etc/os-release        # 确认在 Linux 环境
python3 --version           # 检查 Python

# 如果没有 Python
sudo apt update && sudo apt install python3 python3-pip -y
```

---

## 六、日常使用

### 远程 / 本地切换

| 操作 | 命令面板 (`Cmd+Shift+P`) |
|------|-------------------------|
| 连接远程 | `Remote Tunnels: Connect to Tunnel` |
| 断开回本地 | `Remote: Close Remote Connection` |

点击左下角绿色标识也能快速切换。也可以同时开两个 VS Code 窗口，一个本地一个远程，互不干扰。

### 常用 Tunnel 命令

```powershell
code tunnel                                    # 启动隧道
code tunnel show                               # 查看隧道信息
code tunnel rename <新名称>                    # 重命名机器
code tunnel cleanup                            # 删除隧道
code tunnel user logout                        # 重新授权：登出
code tunnel user login --provider github       # 重新授权：登录
code tunnel --log trace                        # 查看详细日志（排查问题用）
```

---

## 七、踩坑记录

### 扩展装错位置

**现象**：搜索 WSL 扩展点击 Install，装到了 Mac 本地，远程端搜不到 `WSL: Connect to WSL`。

**原因**：VS Code 的扩展分本地和远程两个独立环境，直接点 Install 默认装在本地。

**解决**：注意扩展面板区分 LOCAL / REMOTE 区域，或用命令行在远程终端里装。

### Windows 休眠导致断连

**现象**：游戏本空闲一段时间后，Mac 端无法连接。

**原因**：Windows 默认会自动休眠，休眠后所有网络连接中断。

**解决**：关闭自动休眠 + 配置 Tunnel 为系统服务开机自启。

### 本地装的扩展远程端看不到

**现象**：Windows 本地 VS Code 安装了扩展，但通过 Tunnel 远程连过去看不到。

**原因**：本地 VS Code 和 Tunnel 服务是两个独立的扩展环境。

**解决**：需要在远程连接状态下重新安装所需扩展。

---

## 八、测试验证

### 创建测试文件

新建 `test.py`：

```python
import platform
import os

print(f"系统: {platform.system()} {platform.release()}")
print(f"机器名: {platform.node()}")
print(f"Python: {platform.python_version()}")
print(f"工作目录: {os.getcwd()}")
print("远程开发连接成功!")
```

### 运行

```powershell
# Windows 环境
python test.py

# WSL 环境
python3 test.py
```

看到 `远程开发连接成功!` 就说明整个链路通畅。

---

## 九、后续可优化

- [ ] 将机器名重命名为更好辨认的名称（`code tunnel rename`）
- [ ] 配置 SSH 作为局域网备用方案（低延迟场景）
- [ ] 安装 CUDA + PyTorch，测试 GPU 训练的远程运行
