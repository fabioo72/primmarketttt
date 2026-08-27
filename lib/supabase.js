import { createClient } from '@supabase/supabase-js';

// Fallbacks: the URL and publishable key are safe to embed — Supabase's
// publishable/anon key is designed to be public, and RLS on `orders`
// is what actually gates access.
const FALLBACK_URL = 'https://lounglriuipdgphhsohn.supabase.co';
const FALLBACK_PUBLIC_KEY = 'sb_publishable_wfK-VGL0Rqcv5rdo3DfrfQ_KYc39f9N';

const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    FALLBACK_URL;

const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    FALLBACK_PUBLIC_KEY;

let cached = globalThis.__pm_supabase;
if (!cached) {
    cached = globalThis.__pm_supabase = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
    });
}

export const supabase = cached;
