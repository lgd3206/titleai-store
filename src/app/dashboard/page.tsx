'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  User,
  Settings,
  LogOut,
  Crown,
  Zap,
  Star,
  TrendingUp,
  FileText,
  Calendar
} from 'lucide-react'

interface UserStats {
  totalTitles: number
  todayUsage: number
  maxDailyUsage: number
  favoriteTitles: number
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userStats, setUserStats] = useState<UserStats>({
    totalTitles: 0,
    todayUsage: 0,
    maxDailyUsage: 3,
    favoriteTitles: 0
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, router])

  useEffect(() => {
    // 模拟获取用户统计数据
    if (session?.user) {
      setUserStats({
        totalTitles: 28,
        todayUsage: 2,
        maxDailyUsage: session.user.planType === 'free' ? 3 : 999,
        favoriteTitles: 5
      })
    }
  }, [session])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const getPlanBadge = (planType: string) => {
    switch (planType) {
      case 'pro':
        return (
          <div className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            <Crown className="h-4 w-4" />
            专业版
          </div>
        )
      case 'enterprise':
        return (
          <div className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            <Star className="h-4 w-4" />
            企业版
          </div>
        )
      default:
        return (
          <div className="inline-flex items-center gap-1 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            免费版
          </div>
        )
    }
  }

  const getUsagePercentage = () => {
    return (userStats.todayUsage / userStats.maxDailyUsage) * 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* 顶部导航 */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">TitleAI.store</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                <p className="text-xs text-gray-500">{session.user.email}</p>
              </div>
              <div className="flex items-center gap-2">
                {getPlanBadge(session.user.planType)}
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                  title="退出登录"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 欢迎信息 */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            欢迎回来，{session.user.name}！
          </h2>
          <p className="text-gray-600">
            继续您的AI标题创作之旅，让内容更加出色
          </p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* 今日使用情况 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">今日使用</span>
            </div>
            <div className="mb-2">
              <div className="text-2xl font-bold text-gray-900">
                {userStats.todayUsage}/{userStats.maxDailyUsage}
              </div>
              <div className="text-sm text-gray-500">次生成</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(getUsagePercentage(), 100)}%` }}
              ></div>
            </div>
          </div>

          {/* 总标题数 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">总计</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {userStats.totalTitles}
            </div>
            <div className="text-sm text-gray-500">生成标题</div>
          </div>

          {/* 收藏标题 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-500">收藏</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {userStats.favoriteTitles}
            </div>
            <div className="text-sm text-gray-500">精选标题</div>
          </div>

          {/* 会员状态 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">会员</span>
            </div>
            <div className="text-lg font-bold text-gray-900 mb-1">
              {session.user.planType === 'free' ? '免费版' :
               session.user.planType === 'pro' ? '专业版' : '企业版'}
            </div>
            <div className="text-sm text-gray-500">当前套餐</div>
          </div>
        </div>

        {/* 快速操作 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 快速生成 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">快速操作</h3>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/generate')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Zap className="h-5 w-5" />
                生成新标题
              </button>
              <button
                onClick={() => {/* TODO: 实现标题历史页面 */}}
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="h-5 w-5" />
                查看历史标题
              </button>
            </div>
          </div>

          {/* 套餐信息 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">套餐信息</h3>
            <div className="space-y-4">
              {session.user.planType === 'free' ? (
                <>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      您正在使用免费版，每日限制 3 次生成
                    </p>
                  </div>
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <Crown className="h-5 w-5" />
                    升级到专业版
                  </button>
                </>
              ) : (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    您正在使用 {session.user.planType === 'pro' ? '专业版' : '企业版'}，享受无限制生成
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