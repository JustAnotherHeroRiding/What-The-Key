import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL, // Your Supabase project URL
  process.env.SUPABASE_SERVICE_ROLE_KEY, // Your service role key
);
