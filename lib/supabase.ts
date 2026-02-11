import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = supabaseUrl && supabaseUrl.startsWith('http') && supabaseAnonKey && supabaseAnonKey !== 'your_supabase_anon_key';

if (!isConfigured) {
    console.warn('Supabase is not correctly configured. Database features will be simulated or disabled.');
}

export const supabase = createClient(
    isConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
    isConfigured ? supabaseAnonKey : 'placeholder'
);
