# 图像背景移除工具

快速、简单、免费的在线图像背景移除工具，基于 Next.js 14 + TailwindCSS + Remove.bg API。

## 🚀 功能特性

- ✅ **拖拽上传** - 支持拖拽和点击选择
- ✅ **批量处理** - 一次上传多张图片
- ✅ **实时预览** - 原图vs处理后对比
- ✅ **一键下载** - PNG格式，透明背景
- ✅ **响应式设计** - 支持移动端、平板、桌面
- ✅ **错误处理** - 友好的错误提示

## 🛠 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: TailwindCSS
- **语言**: TypeScript
- **API**: Remove.bg
- **部署**: Vercel / 任何 Node.js 服务器

## 📦 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/nguyentuan2013hp-sketch/image-bg-remover-v2.git
cd image-bg-remover-v2
```

### 2. 配置环境变量

创建 `.env.local` 文件：

```env
# 从 https://www.remove.bg/api 获取
REMOVE_BG_API_KEY=your_remove_bg_api_key_here

# Next.js 配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. 安装依赖

```bash
npm install
```

### 4. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 📝 API 接口

### POST /api/remove-bg

移除图片背景。

**请求:**
```bash
curl -X POST \
  -F 'image=@/path/to/image.jpg' \
  http://localhost:3000/api/remove-bg
```

**响应:**
```json
{
  "success": true,
  "imageData": "base64_encoded_image_data"
}
```

## 🎯 使用说明

1. **上传图片**
   - 拖拽图片到上传区域
   - 或点击选择图片文件
   - 支持 JPG, PNG 格式，最大 10MB

2. **等待处理**
   - 自动调用 Remove.bg API
   - 处理时间取决于图片大小（通常 1-3 秒）

3. **预览结果**
   - 左侧显示原始图片
   - 右侧显示处理后图片（透明背景）

4. **下载结果**
   - 点击"下载结果"按钮
   - 图片将以 PNG 格式保存

## 🌍 部署

### 部署到 Vercel（推荐）

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 部署
vercel
```

按提示操作：
- 链接到项目？Y
- 覆盖设置？N
- 框架预设？Next.js
- 根目录？./
- 构建命令？npm run build
- 输出目录？out
- 安装命令？npm install
- 开发命令？next dev --port $PORT

在 Vercel Dashboard 添加环境变量：
- `REMOVE_BG_API_KEY`: your_api_key

### 部署到其他平台

支持任何 Node.js 服务器：

```bash
# 构建
npm run build

# 启动生产服务器
npm start
```

## 💡 注意事项

1. **API 限制**
   - Remove.bg 免费版：50张图片/月
   - 超出限制需要升级付费版

2. **文件大小**
   - 单张图片最大 10MB
   - 建议压缩图片以提高速度

3. **隐私保护**
   - 图片上传到 Remove.bg 服务器处理
   - 请参考 Remove.bg 隐私政策

## 🐛 故障排除

**问题：API 调用失败**
- 检查 `REMOVE_BG_API_KEY` 是否正确
- 检查是否超出免费额度
- 检查网络连接

**问题：构建失败**
- 删除 `node_modules` 和 `package-lock.json`
- 重新运行 `npm install`
- 确保 Node.js 版本 >= 18

**问题：样式不生效**
- 确保 TailwindCSS 已正确配置
- 检查 `globals.css` 是否已导入
- 重启开发服务器

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 🙏 致谢

- [Remove.bg](https://www.remove.bg/) - 提供优秀的 AI 背景移除 API
- [Next.js](https://nextjs.org/) - 优秀的 React 框架
- [TailwindCSS](https://tailwindcss.com/) - 实用的 CSS 框架