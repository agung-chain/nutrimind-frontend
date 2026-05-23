import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dgqdxoiaxgzxzmfkzvdg.supabase.co";

const supabaseAnonKey = "sb_publishable_i2Qfg0n45QJoeM4OM7juBw_yfNzFoG2";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);