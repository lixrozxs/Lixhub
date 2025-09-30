const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('🔧 Creating admin user...');

    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists:', existingAdmin.username);
      return;
    }

    // Create admin user
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash('admin123', saltRounds);

    const admin = await prisma.user.create({
      data: {
        username: 'admin',
        email: 'admin@animecommunity.com',
        password: hashedPassword,
        name: 'System Administrator',
        role: 'ADMIN'
      }
    });

    console.log('✅ Admin user created successfully!');
    console.log('📝 Login credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('   Email: admin@animecommunity.com');
    console.log('\n⚠️  Please change the password after first login!');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();