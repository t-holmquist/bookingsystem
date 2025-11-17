import { createClient } from "@supabase/supabase-js"

// Create the client synchronously as a singleton so callers get an instance with .auth immediately
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string
)

export function SupabaseClient() {
  return supabase
}
