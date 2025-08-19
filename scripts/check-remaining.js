const { PrismaClient } = require('@prisma/client');

async function checkRemaining() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 检查剩余表...');
    
    try {
      const analyticsCount = await prisma.analytics.count();
      console.log('✅ Analytics表:', analyticsCount, '条记录');
    } catch (e) {
      console.log('❌ Analytics表不存在');
    }
    
    try {
      const configCount = await prisma.systemConfig.count();
      console.log('✅ SystemConfig表:', configCount, '条记录');
    } catch (e) {
      console.log('❌ SystemConfig表不存在');
    }
    
    console.log('🎉 检查完成!');
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkRemaining();
