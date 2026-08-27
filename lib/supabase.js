import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) {
    throw new Error('SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) must be set');
}
if (!serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY must be set (server-only, not the publishable key)');
}

let cached = globalThis.__pm_supabase;
if (!cached) {
    cached = globalThis.__pm_supabase = createClient(url, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
    });
}

export const supabase = cached;
