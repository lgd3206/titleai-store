// src/app/api/generate/route.ts - 测试模式版本
import { NextRequest, NextResponse } from 'next/server'

interface GenerateRequest {
  samples: string
  topic: string
}

// 模拟AI生成的标题模板
const generateMockTitles = (samples: string, topic: string): string[] => {
  const templates = [
    "🔥 这个{topic}真的太好用了！效果超出预期",
    "✨ 分享一个关于{topic}的超实用小技巧",
    "💕 姐妹们快来看！{topic}让我收获满满",
    "🌟 不敢相信！{topic}竟然有这样的效果",
    "⚡ {topic}使用心得分享，真的太惊喜了"
  ]

  // 从主题中提取关键词
  const keywords = topic.split(/[，。！？\s]+/).filter(word => word.length > 1)
  const mainKeyword = keywords[0] || "好物"

  return templates.map(template => 
    template.replace('{topic}', mainKeyword)
  )
}

export async function POST(request: NextRequest) {
  console.log('=== API Generate Route Called (Test Mode) ===')
  
  try {
    // 获取请求参数
    const { samples, topic }: GenerateRequest = await request.json()
    console.log('Request data:', { samples: samples?.substring(0, 100), topic: topic?.substring(0, 100) })

    // 验证输入参数
    if (!samples || !topic) {
      console.log('Missing required parameters')
      return NextResponse.json(
        { error: '样本标题和主题内容都是必填项' },
        { status: 400 }
      )
    }

    // 检查API密钥
    const apiKey = process.env.DEEPSEEK_API_KEY
    
    if (!apiKey || apiKey === 'your_actual_deepseek_api_key_here') {
      console.log('Using test mode - generating mock titles')
      
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockTitles = generateMockTitles(samples, topic)
      
      console.log('Generated mock titles:', mockTitles)
      
      return NextResponse.json({
        success: true,
        titles: mockTitles,
        testMode: true,
        usage: {
          prompt_tokens: 150,
          completion_tokens: 80,
          total_tokens: 230
        }
      })
    }

    // 如果有真实API密钥，使用真实API
    console.log('API Key exists, using real DeepSeek API')
    
    const systemPrompt = `你是一个专业的小红书标题创作专家。你的任务是：

1. 深度分析用户提供的样本标题，学习其写作风格、用词习惯、情感表达方式
2. 基于学习到的风格，为新的主题内容生成5个高质量标题
3. 生成的标题必须：
   - 保持与样本标题相似的风格和语调
   - 适合小红书平台特点（吸引眼球、易于传播）
   - 包含相关关键词和话题标签
   - 长度控制在15-25字之间
   - 具有较强的点击欲望

请直接返回5个标题，每行一个，不需要其他说明文字。`

    const userPrompt = `样本标题（请学习这些标题的风格）：
${samples}

新的主题内容：
${topic}

请基于样本标题的风格，为新主题生成5个标题：`

    console.log('Calling DeepSeek API...')

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.8,
        max_tokens: 500,
        top_p: 0.9
      })
    })

    console.log('DeepSeek API response status:', response.status)

    if (!response.ok) {
      const errorData = await response.text()
      console.error('DeepSeek API Error:', errorData)
      
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'API密钥无效，请检查配置' },
          { status: 500 }
        )
      } else if (response.status === 429) {
        return NextResponse.json(
          { error: 'API调用频率超限，请稍后重试' },
          { status: 500 }
        )
      } else {
        return NextResponse.json(
          { error: `AI服务错误 (${response.status})，请稍后重试` },
          { status: 500 }
        )
      }
    }

    const data = await response.json()
    console.log('DeepSeek API success')
    
    if (!data.choices || data.choices.length === 0) {
      return NextResponse.json(
        { error: '生成失败，请重试' },
        { status: 500 }
      )
    }

    const generatedContent = data.choices[0].message.content
    const titles = generatedContent
      .split('\n')
      .map((title: string) => title.trim())
      .filter((title: string) => title.length > 0 && !title.startsWith('#'))
      .slice(0, 5)

    if (titles.length < 3) {
      return NextResponse.json(
        { error: '生成的标题数量不足，请重试' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      titles: titles,
      usage: data.usage || null
    })

  } catch (error) {
    console.error('Generate API Error:', error)
    return NextResponse.json(
      { error: `服务器内部错误: ${error instanceof Error ? error.message : '未知错误'}` },
      { status: 500 }
    )
  }
}