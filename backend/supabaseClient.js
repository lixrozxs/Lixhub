// Import Supabase client
const { createClient } = require('@supabase/supabase-js');

// Get environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Test connection function
const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('_test_connection')
      .select('*')
      .limit(1);
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = relation does not exist, which is ok
      console.error('❌ Supabase connection test failed:', error.message);
      return false;
    }
    
    console.log('✅ Supabase connection established successfully');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection error:', error.message);
    return false;
  }
};

// Export client and test function
module.exports = {
  supabase,
  testConnection
};