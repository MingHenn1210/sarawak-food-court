// Supabase Food Courts Management
// Initialize Supabase client
const SUPABASE_URL = 'https://mtmkghuhhrerlcubhzot.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10bWtnaHVoaHJlcmxjdWJoem90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1Mzc5NzIsImV4cCI6MjA3NzExMzk3Mn0.kA-NUWidhSRNPotmVe3KIclk8LpizR26DzxIBn5C1rA';

let supabase;

// Initialize Supabase
function initializeSupabase() {
    try {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase connected successfully!');
        return true;
    } catch (error) {
        console.error('❌ Failed to initialize Supabase:', error);
        return false;
    }
}

// Fetch all food courts from Supabase
async function fetchFoodCourtsFromSupabase() {
    try {
        const { data, error } = await supabase
            .from('food_courts')
            .select(`
                *,
                hawker_stalls (
                    id,
                    stall_name,
                    cuisine_type,
                    status
                )
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return data.map(fc => ({
            id: fc.id,
            name: fc.name,
            address: fc.address,
            capacity: fc.capacity,
            operating_hours: {
                open: fc.opening_time,
                close: fc.closing_time
            },
            status: fc.status,
            hawker_stalls: fc.hawker_stalls.length,
            created_at: fc.created_at,
            updated_at: fc.updated_at
        }));
    } catch (error) {
        console.error('Error fetching food courts:', error);
        throw error;
    }
}

// Create new food court in Supabase
async function createFoodCourtInSupabase(foodCourtData) {
    try {
        const { data, error } = await supabase
            .from('food_courts')
            .insert([{
                name: foodCourtData.name,
                address: foodCourtData.address,
                capacity: parseInt(foodCourtData.capacity),
                opening_time: foodCourtData.operating_hours.open,
                closing_time: foodCourtData.operating_hours.close,
                status: foodCourtData.status || 'active'
            }])
            .select()
            .single();

        if (error) throw error;

        console.log('✅ Food court created:', data);
        return data;
    } catch (error) {
        console.error('Error creating food court:', error);
        throw error;
    }
}

// Update food court in Supabase
async function updateFoodCourtInSupabase(id, foodCourtData) {
    try {
        const { data, error } = await supabase
            .from('food_courts')
            .update({
                name: foodCourtData.name,
                address: foodCourtData.address,
                capacity: parseInt(foodCourtData.capacity),
                opening_time: foodCourtData.operating_hours.open,
                closing_time: foodCourtData.operating_hours.close,
                status: foodCourtData.status || 'active'
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        console.log('✅ Food court updated:', data);
        return data;
    } catch (error) {
        console.error('Error updating food court:', error);
        throw error;
    }
}

// Delete food court from Supabase
async function deleteFoodCourtFromSupabase(id) {
    try {
        const { error } = await supabase
            .from('food_courts')
            .delete()
            .eq('id', id);

        if (error) throw error;

        console.log('✅ Food court deleted:', id);
        return true;
    } catch (error) {
        console.error('Error deleting food court:', error);
        throw error;
    }
}

// Fetch hawker stalls for a specific food court
async function fetchHawkerStallsForFoodCourt(foodCourtId) {
    try {
        const { data, error } = await supabase
            .from('hawker_stalls')
            .select(`
                *,
                users:hawker_id (
                    full_name,
                    email,
                    phone
                )
            `)
            .eq('food_court_id', foodCourtId);

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error fetching hawker stalls:', error);
        throw error;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const initialized = initializeSupabase();
    if (initialized) {
        console.log('🚀 Supabase is ready for food court management');
    }
});
