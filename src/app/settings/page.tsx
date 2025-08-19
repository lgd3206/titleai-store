'use client'

import { useState } from 'react'
import { Bell, Moon, Globe, Shield, Download, Trash2, User, Key, Settings } from 'lucide-react'

export default function SettingsPage() {
  // 本地状态管理
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    language: 'zh-CN',
    autoSave: true,
    publicProfile: false
  })

  const [userInfo] = useState({
    name: 'TitleAI用户',
    email: 'user@titleai.store',
    joinDate: '2025年8月19日',
    usage: {
      totalGenerations: 156,
      monthlyGenerations: 42,
      plan: '免费版'
    }
  })

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSaveSettings = () => {
    // TODO: 实际保存设置到后端
    alert('设置已保存！')
  }

  const handleExportData = () => {
    // TODO: 实现数据导出
    alert('数据导出功能开发中...')
  }

  const handleDeleteAccount = () => {
    if (confirm('确定要删除账户吗？此操作不可恢复！')) {
      // TODO: 实现账户删除
      alert('账户删除功能开发中...')
    }
  }

  // 自定义Toggle组件
  const Toggle = ({ checked, onChange, label, description }: { 
    checked: boolean, 
    onChange: (checked: boolean) => void,
    label: string,
    description: string
  }) => (
    <div className="flex items-center justify-between py-4">
      <div className="flex-1">
        <div className="font-medium text-gray-900">{label}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-6">
          {/* 页面标题 */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-2">
              <Settings className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">设置</h1>
            </div>
            <p className="text-gray-600">管理您的账户设置和偏好</p>
          </div>

          {/* 通用设置 */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">通用设置</h2>
              </div>
              <p className="text-gray-600">配置应用的基本行为和通知设置</p>
            </div>
            <div className="p-6 space-y-1 divide-y divide-gray-100">
              <Toggle
                checked={settings.notifications}
                onChange={(checked) => handleSettingChange('notifications', checked)}
                label="推送通知"
                description="接收应用内通知和提醒"
              />
              
              <Toggle
                checked={settings.emailUpdates}
                onChange={(checked) => handleSettingChange('emailUpdates', checked)}
                label="邮件更新"
                description="接收产品更新和营销邮件"
              />
              
              <Toggle
                checked={settings.darkMode}
                onChange={(checked) => handleSettingChange('darkMode', checked)}
                label="深色模式"
                description="切换应用主题外观"
              />
              
              <div className="flex items-center justify-between py-4">
                <div className="flex-1">
                  <div className="font-medium text-gray-900 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    语言
                  </div>
                  <div className="text-sm text-gray-500">选择界面显示语言</div>
                </div>
                <select 
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                  className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="zh-CN">简体中文</option>
                  <option value="en-US">English</option>
                </select>
              </div>
              
              <Toggle
                checked={settings.autoSave}
                onChange={(checked) => handleSettingChange('autoSave', checked)}
                label="自动保存"
                description="自动保存生成的标题历史"
              />
              
              <Toggle
                checked={settings.publicProfile}
                onChange={(checked) => handleSettingChange('publicProfile', checked)}
                label="公开资料"
                description="允许其他用户查看您的公开信息"
              />
            </div>
          </div>

          {/* 账户信息 */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">账户信息</h2>
              </div>
              <p className="text-gray-600">查看和管理您的账户详情</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">用户名</div>
                  <div className="font-medium text-gray-900">{userInfo.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">邮箱</div>
                  <div className="font-medium text-gray-900">{userInfo.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">注册时间</div>
                  <div className="font-medium text-gray-900">{userInfo.joinDate}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">当前计划</div>
                  <div className="font-medium text-gray-900">{userInfo.usage.plan}</div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="text-sm text-gray-500 mb-3">使用统计</div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">总生成次数</span>
                    <span className="font-medium text-gray-900">{userInfo.usage.totalGenerations}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">本月生成次数</span>
                    <span className="font-medium text-gray-900">{userInfo.usage.monthlyGenerations}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 安全设置 */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">安全设置</h2>
              </div>
              <p className="text-gray-600">管理密码和安全选项</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-2">
                  当前密码
                </label>
                <input
                  type="password"
                  id="current-password"
                  placeholder="输入当前密码"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                  新密码
                </label>
                <input
                  type="password"
                  id="new-password"
                  placeholder="输入新密码"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                  确认新密码
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="再次输入新密码"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2">
                <Key className="h-4 w-4" />
                更新密码
              </button>
            </div>
          </div>

          {/* 数据管理 */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">数据管理</h2>
              <p className="text-gray-600">导出您的数据或删除账户</p>
            </div>
            <div className="p-6 space-y-4">
              <button
                onClick={handleExportData}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2 border"
              >
                <Download className="h-4 w-4" />
                导出我的数据
              </button>
              
              <div className="border-t pt-4">
                <div className="mb-2">
                  <div className="font-medium text-red-600 mb-1">危险操作</div>
                  <p className="text-sm text-gray-600">
                    删除账户将永久移除您的所有数据，此操作无法撤销。
                  </p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  删除账户
                </button>
              </div>
            </div>
          </div>

          {/* 保存按钮 */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            >
              保存所有设置
            </button>
          </div>

          {/* 关于信息 */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">关于 TitleAI</h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p>版本: 1.0.0</p>
                <p>最后更新: 2025年8月19日</p>
                <p>© 2025 TitleAI.store - 专业的AI标题生成工具</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}