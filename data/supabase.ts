import { doubleBookingType, profileDataType, roomType } from "@/lib/types"
import { SupabaseClient } from "../utils/supabaseClient"

// Get the role to display different ui in certain scenarios
export const getProfileData = async () => {
  const supabase = SupabaseClient()

  // Gets an single object with the profiledata of the currently authenticated user
  // We dont need to pass an id, since a policy is set up, so that the user can only read their own data
  // With their own authid. So they will always only get a single row back.
  const { data } = await supabase.from("profiles").select().single()

  return data as profileDataType
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
  const doubleBookings: doubleBookingType = []

  // Query the bookings table to find overlapping bookings
  // A booking overlaps if: booking.start <= our.end AND booking.end >= our.start
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    // Booking starts before or at our end time
    .lt("starting_at", endTime)
    // Booking ends at or after our start time
    .gt("ending_at", startTime)

  if (error) {
    console.error("Error checking bookings:", error)
    return doubleBookings
  }

  // Add the UNAVAILABLE room to the list
  if (data) {
    data.forEach((room) => {
      doubleBookings.push(room)
    })
  }

  return doubleBookings
}

// Fetch every room that is not part of the doubleBookings array
// I got an array of bookings with room_ids that i dont want the room_id for
// I want to get all rooms except the rooms with the room_ids in the doublebookings array
export const getAvailableRooms = async (
  doubleBookings?: doubleBookingType,
  selectedFloor?: string | null
): Promise<roomType> => {
  const supabase = SupabaseClient()

  // Extract unique room_ids from doubleBookings
  // Array.from() creates a new array from the doubleBookings array and converts it to a set to remove duplicates
  const doubleBookedRoomIds = doubleBookings
    ? Array.from(new Set(doubleBookings.map((booking) => booking.room_id)))
    : []

  // Fetch rooms from the meetingsroom table, optionally filtered by floor
  let query = supabase.from("meetingsrooms").select("*")
  if (selectedFloor) {
    query = query.eq("floor", selectedFloor)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching available rooms:", error)
    return []
  }

  // If there are no double-booked rooms, return all rooms
  if (doubleBookedRoomIds.length === 0) {
    return (data ?? []) as roomType
  }

  // Filter out rooms that have room_ids in the doubleBookedRoomIds array
  // If the room_id is not in the doubleBookedRoomIds array, then the room is available
  const availableRooms = (data ?? []).filter(
    (room) => !doubleBookedRoomIds.includes(room.room_id)
  )

  return availableRooms as roomType
}

// Fetches the bookings and inner joins the meetingsrooms
export const getUserBookings = async (user_id: string) => {
  if (!user_id) {
    console.error("getUserBookings called without a valid user_id")
    return []
  }

  const supabase = SupabaseClient()

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      id,
      starting_at,
      ending_at,
      room_id,
      meetingsrooms!inner (
        room_size,
        floor
      )
    `
    )
    .eq("user_id", user_id) // Only fetch bookings for the specific user
    .order("starting_at", { ascending: true })

  if (error) {
    console.error("Error fetching user bookings:", error)
    return
  }

  return data
}

// Deletes a booking
export const deleteBooking = async (booking_id: number) => {
  const supabase = SupabaseClient()

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", booking_id)
    .select()
    .single()

  return { error: error, data: data }
}

// Deletes a booking. Recieves ISOformatted start and end time and the room_id. The rest will be autofilled by supabase
export const createBooking = async (
  starting_at: string,
  ending_at: string,
  room_id: string
) => {
  const supabase = SupabaseClient()

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      starting_at,
      ending_at,
      room_id,
    })
    .select()
    .single()

  return { error, data }
}
