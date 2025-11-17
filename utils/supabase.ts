// Add role either student or teacher after sign up

import { User } from "@supabase/supabase-js";
import { SupabaseClient } from "./supabaseClient";

export const addNewUser = async (user: User, role: string, fullName: string) => {

    const supabase = SupabaseClient()

    await supabase.from('profiles').insert({
        user_id: user.id,
        role: role,
        fullName: fullName
    })
}

// Get the role to display different ui in certain scenarios