import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // 修改这一行

export async function POST(request: NextRequest) {
  console.log('API Generate Route Called');
  
  try {
    // 1. 首先检查用户认证
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      );
    }

    // 2. 获取用户信息
    const userId = session.user?.id || session.user?.email;
    console.log('Request from user:', userId);

    const body = await request.json();
    console.log('Request received:', { 
      hasContent: !!body.content, 
      hasData: !!body,
      userId: userId 
    });
    
    // 其余代码保持不变...
    const content = body.content || body.topic || '';
    const samples = body.samples || [];
    
    if (!content) {
      return NextResponse.json(
        { error: '请提供主题内容' },
        { status: 400 }
      );
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    
    if (!apiKey || apiKey.includes('your_')) {
      console.log('Using test mode for user:', userId);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const baseTestTitles = [
        '分享一个超实用的小技巧，真的太好用了！',
        '用了这个方法一周，效果超出预期',
        '姐妹们快来看！发现了一个宝藏方法',
        '真没想到，这样做居然有这么好的效果',
        '必须分享给大家的好方法，亲测有效',
        '这个方法我用了半年，效果惊人',
        '终于找到了完美的解决方案',
        '推荐一个改变我生活的小技巧',
        '不看后悔系列：超好用的方法',
        '亲测有效的实用技巧分享'
      ];
      
      const userHash = userId ? userId.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0) : 0;
      
      const startIndex = Math.abs(userHash) % 6;
      const testTitles = baseTestTitles.slice(startIndex, startIndex + 5);
      
      console.log('Generated test titles for user:', userId);
      
      return NextResponse.json({
        success: true,
        titles: testTitles,
        testMode: true,
        userId: userId
      });
    }

    // 真实API逻辑
    console.log('Using real DeepSeek API for user:', userId);
    
    let prompt = `请为以下内容生成5个吸引人的标题：
${content}`;

    if (samples && samples.trim()) {
      prompt = `参考以下样本标题的风格：
${samples}

请为以下内容生成5个风格相似的吸引人标题：
${content}`;
    }

    prompt += `
要求：
1. 标题要吸引人
2. 长度15-25个字
3. 符合社交媒体风格
4. 每行一个标题，不要编号
直接返回5个标题：`;

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      console.error('API Error:', response.status);
      return NextResponse.json(
        { error: 'API调用失败' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;
    
    const titles = generatedText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 5);

    return NextResponse.json({
      success: true,
      titles: titles,
      usage: data.usage,
      userId: userId
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}
