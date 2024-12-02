import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_REACT_APP_API_URL;
const supabaseKey = import.meta.env.VITE_REACT_APP_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be provided!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
