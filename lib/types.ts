// Data type for the user profile
export type profileDataType = {
  user_id: number
  role: string
  id: number
  full_name: string
  email: string
  created_at: Date
}

// Data type for an array of booking objects that cause double bookings
export type doubleBookingType = Array<{
  id: number
  starting_at: Date
  ending_at: Date
  user_id: number
  created_at: Date
  room_id: string
}>

// Data type for an array of available room objects fetched from Supabase
export type roomType = Array<{
  id: number,
  created_at: Date,
  room_id: string
  room_size: string
  floor: string
}>
