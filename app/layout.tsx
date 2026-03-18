import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '图像背景移除工具',
  description: '快速、简单、免费的在线图像背景移除工具，基于 Remove.bg API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head />
      <body>{children}</body>
    </html>
  )
}
