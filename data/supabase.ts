import { SupabaseClient } from "../utils/supabaseClient";

// Get the role to display different ui in certain scenarios
export const getProfileData = async () => {

    const supabase = SupabaseClient()

    // Gets an single object with the profiledata of the currently authenticated user
    // We dont need to pass an id, since a policy is set up, so that the user can only read their own data
    // With their own authid. So they will always only get a single row back.
    const { data } = await supabase.from('profiles').select().single()

    return data;
}