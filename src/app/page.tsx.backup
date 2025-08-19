import Link from 'next/link'
import { Sparkles, Zap, Target, TrendingUp, Users, Award } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
              TitleAI.store
            </div>
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">Beta</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/generate" className="text-gray-600 hover:text-gray-900 transition-colors">
              开始生成
            </Link>
            <Link href="/generate" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              立即体验
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            专业的
            <span className="bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
              AI标题生成
            </span>
            工具
          </h1>
          
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            上传你的爆款标题样本，AI深度学习你的写作风格
          </p>
          <p className="text-lg text-gray-500 mb-12">
            10秒生成专属智能体，让每个标题都成为爆款
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link href="/generate" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              🚀 立即开始生成
            </Link>
            <Link href="#features" className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
              查看功能特色
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10秒</div>
              <div className="text-gray-600">生成专属智能体</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">95%</div>
              <div className="text-gray-600">用户满意度</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">3倍</div>
              <div className="text-gray-600">平均点击率提升</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            为什么选择 TitleAI.store？
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">智能学习风格</h3>
              <p className="text-gray-600 leading-relaxed">
                上传你的爆款标题样本，AI深度分析你的写作风格、用词习惯和表达方式，生成完全符合你个人特色的标题
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">极速生成</h3>
              <p className="text-gray-600 leading-relaxed">
                只需10秒钟，即可生成10个高质量标题选项，每个都带有你的专属风格印记，告别标题创作困难症
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">平台优化</h3>
              <p className="text-gray-600 leading-relaxed">
                专为小红书、微博、抖音等平台算法优化，提升标题的吸引力和点击率，让你的内容获得更多曝光
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-900">数据驱动优化</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                基于千万级标题数据训练，持续学习热门趋势和用户偏好，确保生成的标题始终跟上时代潮流
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-pink-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-900">多场景适配</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                支持美妆、穿搭、美食、旅行、职场等多个垂直领域，无论你是什么类型的创作者都能找到合适的风格
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-pink-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            准备好创造爆款标题了吗？
          </h2>
          <p className="text-xl mb-8 opacity-90">
            加入数千位成功创作者，让AI助力你的内容创作之路
          </p>
          <Link href="/generate" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg inline-block">
            立即开始免费体验 →
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 TitleAI.store. 专业的AI标题生成工具.</p>
            <p className="mt-2 text-sm">让每个标题都成为爆款</p>
          </div>
        </div>
      </footer>
    </div>
  )
}