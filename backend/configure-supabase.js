#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Configure Supabase - Easy Setup');
console.log('==================================\n');

const configPath = path.join(__dirname, 'SUPABASE_CONFIG.txt');
const envPath = path.join(__dirname, '.env');

// Check if config file exists
if (!fs.existsSync(configPath)) {
  console.error('❌ SUPABASE_CONFIG.txt not found');
  process.exit(1);
}

// Read the config file
const configContent = fs.readFileSync(configPath, 'utf8');

// Check if config still has placeholders
const hasPlaceholders = configContent.includes('[YOUR-') || 
                       configContent.includes('[PROJECT-REF]') || 
                       configContent.includes('[SERVICE-ROLE-KEY]') ||
                       configContent.includes('[JWT-SECRET]');

if (hasPlaceholders) {
  console.log('⚠️  You need to edit SUPABASE_CONFIG.txt first');
  console.log('\n📝 Replace these placeholder values in SUPABASE_CONFIG.txt:');
  console.log('  - [YOUR-PASSWORD] → Your database password');
  console.log('  - [YOUR-PROJECT-REF] → Your project reference (e.g., abcdefghijklmnop)');
  console.log('  - [YOUR-SERVICE-ROLE-KEY] → Your service role key from Supabase');
  console.log('  - [YOUR-JWT-SECRET] → A secure random string');
  
  console.log('\n📖 How to get these values:');
  console.log('1. Go to https://supabase.com/dashboard');
  console.log('2. Select your project');
  console.log('3. Settings > API: Get URL and Service Role Key');
  console.log('4. Settings > Database: Get connection string');
  console.log('5. Edit SUPABASE_CONFIG.txt with your values');
  
  console.log('\n💡 Tip: Use a password generator for JWT_SECRET');
  
} else {
  // Copy config to .env
  fs.copyFileSync(configPath, envPath);
  console.log('✅ Configuration copied to .env');
  console.log('\n🚀 Now run these commands:');
  console.log('  npm run db:generate  # Generate Prisma client');
  console.log('  npm run db:push      # Push schema to Supabase');
  console.log('  npm run db:seed      # Create admin user');
}

console.log('\n📄 Edit this file: SUPABASE_CONFIG.txt');