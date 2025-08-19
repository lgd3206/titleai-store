const { PrismaClient } = require('@prisma/client');

async function verify() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 开始验证...');
    
    const userCount = await prisma.user.count();
    console.log('✅ 用户数:', userCount);
    
    const titleCount = await prisma.title.count();
    console.log('✅ 标题数:', titleCount);
    
    try {
      const collectionCount = await prisma.collection.count();
      console.log('✅ Collection表:', collectionCount, '条记录');
    } catch (e) {
      console.log('❌ Collection表不存在');
    }
    
    try {
      const bookmarkCount = await prisma.bookmark.count();
      console.log('✅ Bookmark表:', bookmarkCount, '条记录');
    } catch (e) {
      console.log('❌ Bookmark表不存在');
    }
    
    console.log('🎉 验证完成!');
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
