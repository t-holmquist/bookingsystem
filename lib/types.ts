// Data type for the user profile
export type profileDataType = {
    user_id: number,
    role: string,
    id: number,
    full_name: string,
    email: string,
    created_at: Date
}


// Data type for an array of room objects
export type roomType = Array<{
    id: number,
    starting_at: Date,
    ending_at: Date,
    user_id: number,
    created_at: Date,
    room_id: string
}>
