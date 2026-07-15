import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nrbkbklntuhknagiqlvx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_22B0rDRkn4yV_ZShbwqI4Q_NVlcYKXQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
