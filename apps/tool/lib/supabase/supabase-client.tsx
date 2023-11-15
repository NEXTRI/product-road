import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.SUPABASE_URL || "";
const supabaseKey: string = process.env.SUPABASE_PUBLIC_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
