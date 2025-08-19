// src/app/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronRight, Users, TrendingUp, Shield, Sparkles, Check } from 'lucide-react'

// 标题生成组件（已登录用户使用）
function TitleGenerator() {
  const [content, setContent] = useState('')
  const [samples, setSamples] = useState('')
  const [titles, setTitles] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!content.trim()) {
      setError('请输入主题内容')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, samples }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '生成失败')
      }

      setTitles(data.titles || [])
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI标题生成器
        </h1>
        <p className="text-xl text-gray-600">
          上传您的样本标题，让AI学习您的写作风格，生成专属的高质量标题
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 输入区域 */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              样本标题 (可选)
            </label>
            <textarea
              value={samples}
              onChange={(e) => setSamples(e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="分享一个护肤心得，&#10;关于如何选择适合敏感肌的面霜，&#10;让大家避免踩雷"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              主题内容 *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="分享一个护肤心得，关于如何选择适合敏感肌的面霜，让大家避免踩雷"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? '生成中...' : '🚀 生成标题'}
          </button>
        </div>

        {/* 结果区域 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🎯 生成的标题
          </h3>
          {titles.length > 0 ? (
            <div className="space-y-3">
              {titles.map((title, index) => (
                <div
                  key={index}
                  className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-gray-900">{title}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(title)}
                      className="ml-2 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      复制
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>准备生成专属标题</p>
              <p className="text-sm">填写样本标题和主题内容，开始AI创作之旅</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 主页面组件
export default function HomePage() {
  const { data: session, status } = useSession()

  // 如果已登录，显示标题生成器
  if (session) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <TitleGenerator />
      </div>
    )
  }

  // 如果未登录，显示营销页面
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              专业的
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI标题生成
              </span>
              工具
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              上传您的样本标题，让AI学习您的写作风格，生成专属的高质量标题。
              10秒生成爆款标题，让AI成为您的专属标题助手。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
              >
                立即开始免费体验
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/auth/login"
                className="bg-white text-gray-700 px-8 py-4 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                已有账号？登录
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">10秒</div>
              <div className="text-gray-600">生成智能标题</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">95%</div>
              <div className="text-gray-600">用户满意度</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">3倍</div>
              <div className="text-gray-600">平均点击率提升</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              为什么选择 TitleAI.store？
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">智能学习风格</h3>
              <p className="text-gray-600">
                上传样本标题，AI深度学习您的写作风格，生成符合您个人特色的标题
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">极速生成</h3>
              <p className="text-gray-600">
                只需10秒，即可生成5个高质量标题，让您的内容创作效率飞速提升
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">平台优化</h3>
              <p className="text-gray-600">
                专为社交媒体优化，生成更具吸引力和传播力的标题内容
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            准备好创造更棒的标题了吗？
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            加入数千位内容创作者，让AI为您的创作注入新的活力
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            立即开始免费体验
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}