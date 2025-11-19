
import { User } from "@supabase/supabase-js";
import { SupabaseClient } from "./supabaseClient";

// Add role either student or teacher after sign up
export const addNewUser = async (role: string, fullName: string) => {

    const supabase = SupabaseClient()

    // Check if role is student or teacher else return error to the client
    if (role === 'teacher' || role === 'student') {
        
        // Automatically gets the authorised user and sets the id through supabase
        const { error } = await supabase.from('profiles').insert({
            role: role,
            full_name: fullName
        })
    
        return error;
    } else {
        return 'Error creating user. Role not valid'
    }

}

// Get the role to display different ui in certain scenarios
export const getUserRole = async () => {

    const supabase = SupabaseClient()

    // Gets an single object with the role of the currently authenticated user
    // We dont need to pass an id, since a policy is set up, so that the user can only read their own data
    // With their own authid. So they will always only get a single row back.
    const { data } = await supabase.from('profiles').select('role').single()

    return data;
}