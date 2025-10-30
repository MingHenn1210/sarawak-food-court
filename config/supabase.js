// Supabase Configuration
const SUPABASE_CONFIG = {
    url: 'https://mtmkghuhhrerlcubhzot.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10bWtnaHVoaHJlcmxjdWJoem90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1Mzc5NzIsImV4cCI6MjA3NzExMzk3Mn0.kA-NUWidhSRNPotmVe3KIclk8LpizR26DzxIBn5C1rA'
};

// Initialize Supabase client
let supabaseClient = null;

function initSupabase() {
    if (typeof supabase === 'undefined') {
        console.error('Supabase library not loaded. Please include the Supabase CDN script.');
        return null;
    }
    
    if (!supabaseClient) {
        supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        console.log('✅ Supabase connected successfully!');
    }
    
    return supabaseClient;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SUPABASE_CONFIG, initSupabase };
}
