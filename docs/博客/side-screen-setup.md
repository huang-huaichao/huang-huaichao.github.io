# Side Screen 配置指南：Mac 端投屏 Android 平板设备作为副屏

Side Screen 是一款开源的 Android 投屏工具，可以将 Android 设备的画面实时投射到电脑上，当作副屏使用。本文记录在 MacBook 上配置 Side Screen 的完整过程及遇到的问题和解决方案。

## 环境信息

- 电脑：macOS（Apple Silicon）
- 设备：Android 平板
- 工具：[Side Screen](https://github.com/nicehash/SideScreen)
- 连接方式：USB 有线连接

## 前置条件

1. Mac 上安装 [ADB（Android Debug Bridge）](https://developer.android.com/tools/releases/platform-tools)
2. Android 设备开启 **开发者选项** 和 **USB 调试**
3. 一根质量可靠的 USB 数据线

## 配置步骤

### 1. 安装 ADB

从 [Android Platform Tools](https://developer.android.com/tools/releases/platform-tools) 下载 macOS 版本，解压后将路径加入系统 PATH：

```bash
# 例如解压到 ~/platform-tools
echo 'export PATH="$HOME/platform-tools:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

验证安装：

```bash
adb version
```

### 2. 开启 Android 设备的 USB 调试

1. 进入 **设置 → 关于设备**，连续点击 **版本号** 7 次开启开发者选项
2. 进入 **设置 → 开发者选项**，打开 **USB 调试**
3. 用 USB 线连接设备与 Mac
4. 设备上弹出授权弹窗时，勾选 **始终允许** 并确认

### 3. 验证 ADB 连接

```bash
adb devices
```

正常输出应类似：

```
List of devices attached
XXXXXXXX    device
```

如果显示 `unauthorized`，说明设备端未授权，检查平板上是否有授权弹窗。

### 4. 启动 Side Screen

在 Mac 上启动 Side Screen 应用，同时在终端运行 `sserver`（如果需要）。Side Screen 会自动检测 ADB 连接的设备并建立投屏。

### 5. 调整分辨率与显示设置

投屏连接成功后，还需要调整以下设置才能获得良好的使用体验：

1. **查看 Mac 主屏分辨率**，然后根据平板屏幕大小在 Side Screen 中设置合适的分辨率
2. **在 Mac 系统设置中配置显示器排列**（系统设置 → 显示器 → 排列），调整副屏位置
3. **将 Side Screen 分辨率质量设为 "High"**（默认是 "Ultra Low"，会导致平板上文字模糊不清晰）

## 常见问题与解决方案

### 问题一：Mac Server Running 显示红色

**现象：** Side Screen 界面上 "Mac Server Running" 状态显示为红色（未通过）。

**排查步骤：**

1. 确认 ADB 服务是否正常运行：

```bash
adb devices
```

2. 如果无法检测到设备，重启 ADB 服务：

```bash
adb kill-server
adb start-server
adb devices
```

3. 尝试更换 USB 接口或数据线

**根因：** 通常与 ADB 连接异常有关，重启 ADB 服务后一般可恢复。

### 问题二：USB Debugging Enabled 显示红色 / ADB 无法识别设备

**现象：** Side Screen 界面上 "USB Debugging Enabled" 状态显示为红色，且 `adb devices` 看不到设备或显示 `unauthorized`。

**排查步骤（按优先级依次尝试）：**

1. **检查 USB 调试开关**：进入开发者选项确认 USB 调试是否已开启（Android 设备有时会自动关闭，尤其是重启后）
2. **检查 USB 连接模式**：下拉通知栏确认模式为 **文件传输（MTP）**，而非仅充电
3. **重新授权**：在开发者选项中 **撤销 USB 调试授权**，重新插线，设备上会再次弹出授权窗口
4. **重启 ADB 服务**：

```bash
adb kill-server
adb start-server
```

5. **最后手段**：重启 Android 设备

**根因：** Android 设备有时会自动关闭 USB 调试或授权失效。重新开启并授权即可恢复。

## 常用排查命令速查

| 命令 | 用途 |
|------|------|
| `adb devices` | 查看已连接设备 |
| `adb kill-server` | 停止 ADB 服务 |
| `adb start-server` | 启动 ADB 服务 |
| `adb reconnect` | 重新连接设备 |

## 小结

Side Screen 的配置核心在于 **ADB 连接正常** 和 **USB 调试开启**。遇到问题时，优先执行 `adb kill-server && adb start-server`，其次检查设备端 USB 调试状态和 USB 连接模式，基本都能解决。首次使用时记得将分辨率质量从默认的 "Ultra Low" 调整为 "High"，以获得清晰的显示效果。
