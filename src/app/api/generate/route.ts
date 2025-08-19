// src/app/api/generate/route.ts - 完全优化版本
import { NextRequest, NextResponse } from 'next/server'

interface GenerateRequest {
  samples: string
  topic: string
}

// 优化后的模拟生成函数 - 用于测试模式
const generateOptimizedMockTitles = (samples: string, topic: string): string[] => {
  // 分析样本标题的特征
  const hasEmoji = /[😀-🙏💀-🙏🚀-]/.test(samples)
  const hasExclamation = samples.includes('！')
  const isPersonal = samples.includes('我的') || samples.includes('我')
  const isSharing = samples.includes('分享') || samples.includes('推荐')
  
  // 从主题中提取关键词
  const keywords = topic.match(/[一-龯]{2,}/g) || []
  const mainKeyword = keywords.find(word => 
    ['面膜', '护肤', '美妆', '好物', '品牌', '产品', '方法', '技巧', '早起', '时间', '管理'].includes(word)
  ) || keywords[0] || '好物'
  
  // 多样化的标题模板 - 避免重复结构
  const diverseTemplates = [
    // 发现式
    `真没想到，${mainKeyword}居然能有这么好的效果${hasEmoji ? '✨' : ''}`,
    
    // 对比式  
    `用了${mainKeyword}两周，前后对比太明显了${hasExclamation ? '！' : ''}`,
    
    // 惊喜式
    `${hasEmoji ? '💕 ' : ''}${mainKeyword}给了我太多惊喜，必须分享给大家`,
    
    // 实用式
    `关于${mainKeyword}的几个小心得，真的很实用${hasEmoji ? '🌟' : ''}`,
    
    // 推荐式
    `${isPersonal ? '我发现' : '发现'}一个超棒的${mainKeyword}，${isSharing ? '推荐给' : '分享给'}姐妹们${hasEmoji ? '💖' : ''}`
  ]
  
  return diverseTemplates
}

export async function POST(request: NextRequest) {
  console.log('====== API Generate Route Called (OPTIMIZED VERSION) ======')
  
  try {
    // 获取请求参数
    const { samples, topic }: GenerateRequest = await request.json()
    console.log('Request data:', { 
      samples: samples?.substring(0, 100), 
      topic: topic?.substring(0, 100) 
    })
    
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
      console.log('Using OPTIMIZED test mode - generating diverse mock titles')
      
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockTitles = generateOptimizedMockTitles(samples, topic)
      console.log('Generated optimized mock titles:', mockTitles)
      
      return NextResponse.json({
        success: true,
        titles: mockTitles,
        testMode: true,
        optimized: true,
        usage: {
          prompt_tokens: 200,
          completion_tokens: 120,
          total_tokens: 320
        }
      })
    }
    
    // 如果有真实API密钥，使用真实API
    console.log('API Key exists, using OPTIMIZED real DeepSeek API')
    
    // 全新的优化Prompt
    const optimizedSystemPrompt = `你是一个顶级的小红书内容创作专家，擅长分析文本风格并创作吸引人的标题。

## 你的任务：
1. **深度分析**用户提供的样本标题，学习其独特的语言风格、情感表达和写作习惯
2. **创造性生成**5个风格相似但表达方式完全不同的新标题

## 分析要点：
- 语言风格（正式/口语化、情感强度、表达习惯）
- 句式结构特点和长度偏好
- 常用词汇和修辞手法
- 表情符号使用规律
- 目标受众定位

## 创作原则：
✅ **多样性至上**：5个标题必须有不同的结构、角度和表达方式
✅ **自然表达**：确保语言流畅自然，符合中文习惯
✅ **情感共鸣**：保持与样本相似的情感强度和表达风格
✅ **避免套路**：绝不使用固定模板或重复句式
✅ **保持吸引力**：每个标题都要有点击欲望

## 严格禁止：
❌ 使用"这个XXX真的太好用了"等模板
❌ 所有标题开头或结构相同
❌ 简单的关键词替换
❌ 机械化的表达方式
❌ 标题间相似度过高

## 输出要求：
- 直接输出5个标题，每行一个
- 不要添加编号、序号或其他格式
- 标题长度15-25字最佳
- 如果样本有表情符号，适度使用但不要过量

记住：你的目标是创作出让人一看就想点击、想分享的优质标题！`

    const optimizedUserPrompt = `请仔细分析以下样本标题的写作风格和特点：

${samples}

新的主题内容：
${topic}

基于对样本风格的深度理解，为新主题创作5个高质量标题。每个标题都要有不同的表达角度和句式结构，确保多样性和创新性。`

    console.log('Calling DeepSeek API with OPTIMIZED prompt...')
    
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
            content: optimizedSystemPrompt
          },
          {
            role: 'user',
            content: optimizedUserPrompt
          }
        ],
        temperature: 0.9,        // 提高创造性
        max_tokens: 800,         // 增加token限制  
        top_p: 0.95,            // 提高多样性
        frequency_penalty: 0.8,  // 强烈减少重复
        presence_penalty: 0.6    // 鼓励新表达
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
    console.log('DeepSeek API success with optimized prompt')
    
    if (!data.choices || data.choices.length === 0) {
      return NextResponse.json(
        { error: '生成失败，请重试' },
        { status: 500 }
      )
    }
    
    const generatedContent = data.choices[0].message.content
    console.log('Generated content:', generatedContent)
    
    // 优化的结果处理
    const titles = generatedContent
      .split('\n')
      .map((title: string) => title.trim())
      .filter((title: string) => {
        // 过滤掉空行、编号、标点符号开头的行
        return title.length > 0 && 
               !title.startsWith('#') && 
               !title.match(/^\d+[.)、]/) &&
               !title.startsWith('-') &&
               !title.startsWith('*') &&
               title.length <= 50  // 避免过长的标题
      })
      .slice(0, 5)
    
    console.log('Processed titles:', titles)
    
    if (titles.length < 3) {
      return NextResponse.json(
        { error: '生成的标题数量不足，请重试' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      titles: titles,
      optimized: true,  // 标识使用了优化版本
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