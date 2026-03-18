# Cloudflare Pages 手动部署指南

## 步骤 1：准备环境变量

你的 Remove.bg API Key：
```
bFVeKo9s5TH61gs2AMofDwZE
```

## 步骤 2：登录 Cloudflare Dashboard

访问：https://dash.cloudflare.com/

## 步骤 3：部署到 Pages

1. Workers & Pages → Create a project → Pages
2. Connect to Git → 选择 `nguyentuan2013hp-sketch/image-bg-remover-v2`
3. Configure build:
   - Build command: `npm run build`
   - Build output: `out`
   - Root directory: `./`

4. Environment variables:
   - `REMOVE_BG_API_KEY`: `bFVeKo9s5TH61gs2AMofDwZE`

5. Save and Deploy

## 步骤 4：访问网站

部署完成后，访问：
```
https://image-bg-remover-v2.pages.dev
```

预计时间：5-10分钟