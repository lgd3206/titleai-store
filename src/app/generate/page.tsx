'use client'

import React, { useState } from 'react'
import { Copy, Sparkles, RefreshCw, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react'

interface GeneratedTitle {
  id: string
  text: string
  copied: boolean
}

export default function GeneratePage() {
  const [samples, setSamples] = useState('')
  const [topic, setTopic] = useState('')
  const [titles, setTitles] = useState<GeneratedTitle[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // 计算样本数量
  const sampleCount = samples.trim() ? samples.trim().split('\n').filter(line => line.trim()).length : 0

  // 生成标题
  const generateTitles = async () => {
    if (!samples.trim() || !topic.trim()) {
      setError('请填写样本标题和主题内容')
      return
    }

    if (sampleCount < 3) {
      setError('至少需要提供3个样本标题')
      return
    }

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          samples: samples.trim(),
          topic: topic.trim()
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '生成失败')
      }

      if (data.success && data.titles) {
        const generatedTitles: GeneratedTitle[] = data.titles.map((title: string, index: number) => ({
          id: `title-${Date.now()}-${index}`,
          text: title,
          copied: false
        }))

        setTitles(generatedTitles)
        setSuccess(`成功生成 ${generatedTitles.length} 个标题！`)
      } else {
        throw new Error('生成结果格式错误')
      }

    } catch (err) {
      console.error('Generation error:', err)
      setError(err instanceof Error ? err.message : '生成失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  // 复制标题
  const copyTitle = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      
      setTitles(prev => prev.map(title => 
        title.id === id 
          ? { ...title, copied: true }
          : { ...title, copied: false }
      ))

      // 3秒后重置复制状态
      setTimeout(() => {
        setTitles(prev => prev.map(title => 
          title.id === id 
            ? { ...title, copied: false }
            : title
        ))
      }, 3000)

    } catch (err) {
      console.error('Copy failed:', err)
      setError('复制失败，请手动复制')
    }
  }

  // 重置表单
  const resetForm = () => {
    setSamples('')
    setTopic('')
    setTitles([])
    setError('')
    setSuccess('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI标题生成器
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            上传您的样本标题，让AI学习您的写作风格，生成专属的高质量标题
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 输入区域 */}
            <div className="space-y-6">
              {/* 样本标题输入 */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-purple-600" />
                  <label className="text-lg font-semibold text-gray-900">
                    样本标题 ({sampleCount}/10)
                  </label>
                </div>
                <textarea
                  value={samples}
                  onChange={(e) => setSamples(e.target.value)}
                  placeholder="请输入3-10个您之前写过的标题，每行一个：&#10;&#10;例如：&#10;这样护肤真的有效！我的肌肤变化太明显了✨&#10;分享一个超好用的护肤小技巧💕&#10;姐妹们快来看！这个方法让我皮肤好到发光🌟"
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    每行一个标题，至少需要3个样本
                  </span>
                  <span className="text-sm text-gray-400">
                    {samples.length}/1000
                  </span>
                </div>
              </div>

              {/* 主题内容输入 */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  <label className="text-lg font-semibold text-gray-900">
                    主题内容
                  </label>
                </div>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="请描述您想要创作标题的主题内容：&#10;&#10;例如：&#10;分享一个新发现的面膜品牌，用了两周后皮肤明显变得更加水润有光泽，想推荐给大家"
                  className="w-full h-24 p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    详细描述您的内容主题
                  </span>
                  <span className="text-sm text-gray-400">
                    {topic.length}/500
                  </span>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-3">
                <button
                  onClick={generateTitles}
                  disabled={isLoading || !samples.trim() || !topic.trim() || sampleCount < 3}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      生成标题
                    </>
                  )}
                </button>

                <button
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  重置
                </button>
              </div>

              {/* 使用技巧 */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-900 mb-3">💡 使用技巧</h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• 提供3-10个您最满意的标题作为样本</li>
                  <li>• 样本标题风格越一致，生成效果越好</li>
                  <li>• 主题描述要详细具体，包含关键信息</li>
                  <li>• 可以多次生成，选择最喜欢的标题</li>
                </ul>
              </div>
            </div>

            {/* 生成结果区域 */}
            <div className="space-y-6">
              {/* 状态消息 */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <span className="text-red-800">{error}</span>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-green-800">{success}</span>
                </div>
              )}

              {/* 生成结果 */}
              {titles.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    🎉 生成的标题
                  </h3>
                  <div className="space-y-3">
                    {titles.map((title, index) => (
                      <div
                        key={title.id}
                        className="group bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="text-sm text-gray-500 mb-1">
                              标题 {index + 1}
                            </div>
                            <div className="text-gray-900 leading-relaxed">
                              {title.text}
                            </div>
                          </div>
                          <button
                            onClick={() => copyTitle(title.id, title.text)}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                              title.copied
                                ? 'bg-green-100 text-green-800'
                                : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                            }`}
                          >
                            {title.copied ? (
                              <>
                                <CheckCircle className="h-4 w-4" />
                                已复制
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4" />
                                复制
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 空状态 */}
              {titles.length === 0 && !isLoading && (
                <div className="bg-white rounded-xl p-12 shadow-lg text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    准备生成专属标题
                  </h3>
                  <p className="text-gray-500">
                    填写样本标题和主题内容，开始AI创作之旅
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}