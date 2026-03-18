'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      alert('文件大小不能超过10MB')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setOriginalImage(reader.result as string)
    }
    reader.readAsDataURL(file)

    await processImage(file)
  }, [])

  const processImage = async (file: File) => {
    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/remove-bg', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || '处理失败')
      }

      setProcessedImage(`data:image/png;base64,${result.imageData}`)
    } catch (error) {
      console.error('Error:', error)
      alert(error instanceof Error ? error.message : '处理失败')
    } finally {
      setIsProcessing(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    multiple: false,
    disabled: isProcessing,
  })

  const handleDownload = () => {
    if (!processedImage) return

    const link = document.createElement('a')
    link.href = processedImage
    link.download = 'image_without_bg.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleReset = () => {
    setOriginalImage(null)
    setProcessedImage(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🖼️ 图像背景移除工具
          </h1>
          <p className="text-lg text-gray-600">
            快速、简单、免费 - 基于 Remove.bg API
          </p>
        </div>

        {!originalImage ? (
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer
              transition-all duration-300 bg-white shadow-lg
              ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}
              ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input {...getInputProps()} />
            <div className="space-y-4">
              <div className="text-6xl">📸</div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {isDragActive ? '松开上传' : '拖拽图片到这里'}
              </h2>
              <p className="text-gray-500">
                或者点击选择图片<br />
                <span className="text-sm">支持 JPG, PNG 格式，最大 10MB</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 border-b">
                  <h3 className="font-semibold text-gray-800">📸 原始图片</h3>
                </div>
                <div className="p-6">
                  <img src={originalImage} alt="原始图片" className="w-full h-auto rounded-lg" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 border-b">
                  <h3 className="font-semibold text-gray-800">✨ 处理后</h3>
                </div>
                <div className="p-6">
                  {!processedImage ? (
                    <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
                      {isProcessing ? (
                        <div className="text-center">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                          <p className="mt-2 text-gray-600">正在移除背景...</p>
                        </div>
                      ) : (
                        <p className="text-gray-400">等待处理...</p>
                      )}
                    </div>
                  ) : (
                    <img src={processedImage} alt="处理后图片" className="w-full h-auto rounded-lg" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleDownload}
                disabled={!processedImage || isProcessing}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                📥 下载结果
              </button>

              <button
                onClick={handleReset}
                disabled={isProcessing}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                🔄 处理新图片
              </button>
            </div>

            {isProcessing && (
              <div className="text-center text-gray-600">
                <p>正在调用 Remove.bg API 处理图片，这可能需要几秒钟...</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">💡 使用提示</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 处理后的图片为 PNG 格式，背景透明</li>
                <li>• 每天免费处理额度有限，请合理使用</li>
                <li>• 如需更高清效果，请访问 remove.bg 官网</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}