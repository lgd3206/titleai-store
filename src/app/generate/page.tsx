'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Copy, Sparkles, Upload, RefreshCw, ArrowLeft, Check } from 'lucide-react'

export default function GeneratePage() {
  const [samples, setSamples] = useState('')
  const [topic, setTopic] = useState('')
  const [titles, setTitles] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleGenerate = async () => {
    if (!samples.trim() || !topic.trim()) {
      alert('请填写样本标题和主题内容')
      return
    }

    setIsLoading(true)
    // TODO: 调用AI接口生成标题
    // 这里先用模拟数据
    setTimeout(() => {
      const mockTitles = [
        '🔥这个小红书运营技巧，让我涨粉10万+！真的太神了',
        '姐妹们！这样写标题，阅读量直接翻10倍！血泪经验分享',
        '小红书爆款标题公式曝光，用过的都说好！收藏不亏',
        '💡一个标题改变命运？我的真实经历，看完你就懂了',
        '不会写标题？这个AI工具帮你搞定！效果惊人',
        '从0到爆款，我的标题创作心得全分享，干货满满',
        '🚀标题党必看：这样写才有流量！实战验证有效',
        '小红书标题的秘密，90%的人不知道！赶紧学起来',
        'AI写标题vs人工写标题，结果惊呆了！对比测试',
        '这个标题模板，让我月入过万！新手也能用'
      ]
      setTitles(mockTitles)
      setIsLoading(false)
    }, 2000)
  }

  const copyToClipboard = async (title: string, index: number) => {
    try {
      await navigator.clipboard.writeText(title)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = title
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    }
  }

  const resetForm = () => {
    setSamples('')
    setTopic('')
    setTitles([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回首页
            </Link>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
              TitleAI.store
            </div>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI标题生成器</h1>
          <p className="text-lg text-gray-600">上传你的爆款标题样本，让AI学习你的写作风格</p>
        </div>
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* 输入区域 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <Upload className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">输入样本和主题</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  爆款标题样本 <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="请粘贴你的爆款标题样本，每行一个标题，建议提供5-10个样本效果更好..."
                  value={samples}
                  onChange={(e) => setSamples(e.target.value)}
                  rows={8}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {samples.split('\n').filter(line => line.trim()).length} 个样本标题
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  要创作的主题内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="请详细描述你要创作的内容主题，比如：分享护肤心得，推荐平价好物，旅行攻略等..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={4}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={handleGenerate} 
                  disabled={isLoading || !samples.trim() || !topic.trim()}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      AI正在学习中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      生成专属标题
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
            </div>
          </div>

          {/* 结果区域 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">生成结果</h2>
              {titles.length > 0 && (
                <span className="text-sm text-gray-500">{titles.length} 个标题</span>
              )}
            </div>
            
            {titles.length > 0 ? (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {titles.map((title, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="flex-1 text-sm leading-relaxed text-gray-800">{title}</span>
                    <button
                      onClick={() => copyToClipboard(title, index)}
                      className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                      title="复制标题"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">准备生成专属标题</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  填写你的样本标题和主题内容，点击生成按钮获得10个专属风格的标题
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 使用提示 */}
        <div className="max-w-4xl mx-auto mt-12 bg-blue-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 使用技巧</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <strong>样本标题建议：</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>提供5-10个你的爆款标题</li>
                <li>选择风格相似的标题</li>
                <li>包含不同类型的内容</li>
              </ul>
            </div>
            <div>
              <strong>主题描述建议：</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>详细描述内容要点</li>
                <li>提及目标受众</li>
                <li>说明内容形式</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}