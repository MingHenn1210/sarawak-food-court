// Shared Supabase client initialization for the Sarawak Food Court web app.
// Ensures a single Supabase client instance and graceful handling when the CDN script fails to load.
(function (window) {
    const SUPABASE_URL = 'https://mtmkghuhhrerlcubhzot.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10bWtnaHVoaHJlcmxjdWJoem90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1Mzc5NzIsImV4cCI6MjA3NzExMzk3Mn0.kA-NUWidhSRNPotmVe3KIclk8LpizR26DzxIBn5C1rA';

    let cachedClient = null;

    function ensureSupabaseLibrary() {
        if (!window.supabase || typeof window.supabase.createClient !== 'function') {
            console.error('Supabase JS client library is not available. Include the CDN script before supabase-client.js.');
            return false;
        }
        return true;
    }

    window.getSupabaseClient = function getSupabaseClient() {
        if (cachedClient) {
            return cachedClient;
        }

        if (!ensureSupabaseLibrary()) {
            return null;
        }

        cachedClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase client initialized (shared instance).');
        return cachedClient;
    };

    window.resetSupabaseClient = function resetSupabaseClient() {
        cachedClient = null;
    };
})(window);
