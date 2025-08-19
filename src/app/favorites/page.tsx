'use client'

import { useState } from 'react'
import { Heart, Search, Copy, Trash2, Edit3, Calendar, Tag, Filter, Star, BookOpen } from 'lucide-react'

interface FavoriteTitle {
  id: string
  title: string
  topic: string
  createdAt: string
  tags: string[]
  rating: number
}

export default function FavoritesPage() {
  // 模拟收藏的标题数据
  const [favorites, setFavorites] = useState<FavoriteTitle[]>([
    {
      id: '1',
      title: '🌟 3分钟学会小红书爆款标题写作技巧！新手必看💯',
      topic: '小红书运营',
      createdAt: '2025-08-19',
      tags: ['教程', '新手', '爆款'],
      rating: 5
    },
    {
      id: '2',
      title: '💄 平价好物推荐！学生党也能买得起的神仙彩妆✨',
      topic: '美妆推荐',
      createdAt: '2025-08-18',
      tags: ['平价', '学生党', '彩妆'],
      rating: 4
    },
    {
      id: '3',
      title: '🏠 租房避雷指南！这些坑千万别踩（经验分享）',
      topic: '生活分享',
      createdAt: '2025-08-17',
      tags: ['租房', '避雷', '经验'],
      rating: 5
    },
    {
      id: '4',
      title: '📚 考研上岸经验分享：从二本到985的逆袭之路🎓',
      topic: '学习经验',
      createdAt: '2025-08-16',
      tags: ['考研', '经验', '逆袭'],
      rating: 4
    },
    {
      id: '5',
      title: '🍳 10分钟快手早餐！上班族的救星来了👩‍🍳',
      topic: '美食制作',
      createdAt: '2025-08-15',
      tags: ['早餐', '快手', '上班族'],
      rating: 3
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [sortBy, setSortBy] = useState('latest') // latest, rating, topic

  // 获取所有标签
  const allTags = Array.from(new Set(favorites.flatMap(item => item.tags)))

  // 过滤和排序
  const filteredFavorites = favorites
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item => selectedTag ? item.tags.includes(selectedTag) : true)
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'topic':
          return a.topic.localeCompare(b.topic)
        default: // latest
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  const handleCopy = (title: string) => {
    navigator.clipboard.writeText(title)
    alert('标题已复制到剪贴板！')
  }

  const handleDelete = (id: string) => {
    if (confirm('确定要从收藏夹中移除这个标题吗？')) {
      setFavorites(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleEdit = (id: string) => {
    alert('编辑功能开发中...')
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star 
            key={star}
            className={`h-4 w-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-6xl mx-auto py-8 px-4">
        {/* 页面头部 */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-red-500 fill-current" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">我的收藏夹</h1>
              <p className="text-gray-600">管理您收藏的标题和灵感</p>
            </div>
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-blue-600 font-medium">总收藏</span>
              </div>
              <div className="text-2xl font-bold text-blue-700 mt-1">{favorites.length}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-600 font-medium">五星标题</span>
              </div>
              <div className="text-2xl font-bold text-green-700 mt-1">
                {favorites.filter(item => item.rating === 5).length}
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-purple-600 font-medium">标签数量</span>
              </div>
              <div className="text-2xl font-bold text-purple-700 mt-1">{allTags.length}</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                <span className="text-sm text-orange-600 font-medium">本周新增</span>
              </div>
              <div className="text-2xl font-bold text-orange-700 mt-1">3</div>
            </div>
          </div>
        </div>

        {/* 搜索和过滤 */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索收藏的标题..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* 标签过滤 */}
            <div className="min-w-48">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">所有标签</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            {/* 排序 */}
            <div className="min-w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="latest">最新收藏</option>
                <option value="rating">评分排序</option>
                <option value="topic">主题排序</option>
              </select>
            </div>
          </div>
        </div>

        {/* 收藏列表 */}
        <div className="space-y-4">
          {filteredFavorites.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">暂无收藏</h3>
              <p className="text-gray-600 mb-6">开始收藏您喜欢的标题吧！</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                去生成标题
              </button>
            </div>
          ) : (
            filteredFavorites.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* 标题 */}
                    <h3 className="text-lg font-medium text-gray-900 mb-2 leading-relaxed">
                      {item.title}
                    </h3>

                    {/* 元信息 */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Tag className="h-4 w-4" />
                        {item.topic}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {item.createdAt}
                      </span>
                      <div className="flex items-center gap-1">
                        {renderStars(item.rating)}
                      </div>
                    </div>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleCopy(item.title)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="复制标题"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                      title="编辑标题"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="删除收藏"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 底部操作区 */}
        {filteredFavorites.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                显示 {filteredFavorites.length} 个收藏标题
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                  批量导出
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  批量复制
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}