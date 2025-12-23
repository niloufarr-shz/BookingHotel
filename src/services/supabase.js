import { createClient } from "@supabase/supabase-js";
export  const supabaseUrl = "https://obdkggrjpiprsbhrqsrx.supabase.co";
const supabaseKey = "sb_publishable_n4tVj7injZ982dVvbgfTbQ_SXrLvO1y";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
