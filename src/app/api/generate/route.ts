import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('API Generate Route Called');
  
  try {
    const body = await request.json();
    console.log('Request received:', { hasContent: !!body.content, hasData: !!body });
    
    // 提取内容
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
      console.log('Using test mode');
      
      // 模拟延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 生成测试标题
      const testTitles = [
        '分享一个超实用的小技巧，真的太好用了！',
        '用了这个方法一周，效果超出预期',
        '姐妹们快来看！发现了一个宝藏方法',
        '真没想到，这样做居然有这么好的效果',
        '必须分享给大家的好方法，亲测有效'
      ];
      
      console.log('Generated test titles');
      
      return NextResponse.json({
        success: true,
        titles: testTitles,
        testMode: true
      });
    }

    // 使用真实API
    console.log('Using real DeepSeek API');
    
    const prompt = `请为以下内容生成5个吸引人的标题：

${content}

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
      usage: data.usage
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}