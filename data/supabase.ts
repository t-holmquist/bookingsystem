import { SupabaseClient } from "../utils/supabaseClient"

// Get the role to display different ui in certain scenarios
export const getProfileData = async () => {
  const supabase = SupabaseClient()

  // Gets an single object with the profiledata of the currently authenticated user
  // We dont need to pass an id, since a policy is set up, so that the user can only read their own data
  // With their own authid. So they will always only get a single row back.
  const { data } = await supabase.from("profiles").select().single()

  return data
}

// Get the role to display different ui in certain scenarios
export const checkBookings = async ({
  startTime,
  endTime,
}: {
  startTime: string
  endTime: string
}) => {
  const supabase = SupabaseClient()

  // If a booking is NOT available (it is a doublebooking) then the roomId of that booking should be added to this list and returned to the roomList so that the roomList can filter out these rooms and only show all other rooms that are available
  const unvailableRooms: Array<{ room_id?: string | number }> = []

  // Query the bookings table to find overlapping bookings
  // A booking overlaps if: booking.start <= our.end AND booking.end >= our.start
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    // Booking starts before or at our end time
    .lte("starting_at", endTime)
    // Booking ends at or after our start time
    .gte("ending_at", startTime)

  if (error) {
    console.error("Error checking bookings:", error)
    return unvailableRooms
  }

  // Add the UNAVAILABLE room to the list
  if (data) {
    data.forEach((room) => {
      unvailableRooms.push(room)
    })
  }

  return unvailableRooms
}
