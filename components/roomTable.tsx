"use client"

import { createBooking, getAvailableRooms } from "@/data/supabase"
import { doubleBookingType, isoTimeRange, roomType } from "@/lib/types"
import { Badge, Button, Loader, Modal, Paper, Table } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useEffect, useState } from "react"
import Toast from "./ui/toast"
import { useProfile } from "@/providers/profile-provider"

export function RoomTable({
  doubleBookings,
  startTime,
  endTime,
  timeRangeIso,
  selectedFloor,
  refreshKey,
}: {
  // Contains the doubleBookingType or undefined
  doubleBookings: doubleBookingType | undefined
  startTime?: string | null
  endTime?: string | null
  refreshKey: number
  timeRangeIso?: isoTimeRange
  selectedFloor?: string | null
}) {
  const [opened, { open, close }] = useDisclosure(false) // Modal state for booking details
  const [showToast, setShowToast] = useState(false) // Toast state for booking success
  const [isBooking, setIsBooking] = useState(false) // Loading state for booking
  const [availableRooms, setAvailableRooms] = useState<roomType>([]) // Available rooms
  const [isLoadingRooms, setIsLoadingRooms] = useState(false) // Loading state for rooms
  const [bookingInfo, setBookingInfo] = useState<{
    roomId: string
    capacity: string
    availability: string
  } | null>(null)
  // User data from context
  const { profileData } = useProfile()

  const handleOpenBooking = ({
    roomId,
    capacity,
    availability,
  }: {
    roomId: string
    capacity: string
    availability: string
  }) => {
    // Sets the booking info that the modal then displays
    setBookingInfo({ roomId, capacity, availability })
    // Opens the modal
    open()
  }

  // Fetch all the available rooms based on a filtration of the double bookings, which should not be included.
  // Called everytime double bookings change -> indicating that a user has booked a room
  useEffect(() => {
    let isMounted = true

    const fetchRooms = async () => {
      setIsLoadingRooms(true)
      try {
        const rooms = await getAvailableRooms(doubleBookings, selectedFloor)
        if (isMounted) {
          setAvailableRooms(rooms)
        }
      } catch (error) {
        console.error("Failed to fetch available rooms:", error)
      } finally {
        if (isMounted) {
          setIsLoadingRooms(false)
        }
      }
    }

    fetchRooms()

    return () => {
      isMounted = false
    }
  }, [doubleBookings, selectedFloor, refreshKey]) // Refresh key is used to force a re-render of the component when a user has booked a room

  // Create a booking
  const handleCreateBooking = async () => {
    if (!bookingInfo?.roomId || !timeRangeIso) {
      console.warn("Missing booking info or time range")
      return
    }

    try {
      setIsBooking(true)
      const { data, error } = await createBooking(
        timeRangeIso.start,
        timeRangeIso.end,
        bookingInfo.roomId
      )

      if (error) {
        console.error("Failed to create booking:", error)
        return
      }

      if (data) {
        // Filter out the availble room based on room_id to remove from the UI in addition to the db
        setAvailableRooms(
          availableRooms.filter((item) => item.room_id !== data.room_id)
        )
        setShowToast(true)
        close()
      }
    } catch (error) {
      console.error("Error creating booking:", error)
    } finally {
      setIsBooking(false)
    }
  }

  // Filter the rooms based on the user role
  // If the user is a student, only show the rooms that are meetingsrooms (including 'mødelokale')
  // Default to student filter when profileData is not yet loaded to prevent students from seeing all rooms
  const filteredRooms =
    !profileData || profileData?.role === "student"
      ? availableRooms.filter((room) => room.room_id?.includes("Mødelokale"))
      : availableRooms

  // Compute time range display string from startTime and endTime
  const timeRange = startTime && endTime ? `${startTime}-${endTime}` : undefined

  return (
    <Paper
      radius="lg"
      withBorder
      style={{ overflow: "hidden", minHeight: 350 }}
    >
      <Toast
        message="Lokalet er booket"
        showToast={showToast}
        setShowToast={setShowToast}
      />
      {/* Modal with currently clicked room/booking details */}
      <Modal
        radius="md"
        opened={opened}
        onClose={close}
        title="Overblik over booking"
        centered
        size="xs"
      >
        <div className="mb-4 space-y-1 text-sm">
          <div>
            <strong>Lokale:</strong> {bookingInfo?.roomId ?? "-"}
          </div>
          <div>
            <strong>Kapacitet:</strong> {bookingInfo?.capacity ?? "-"}
          </div>
          <div>
            <strong>Tidsrum:</strong> {bookingInfo?.availability ?? "-"}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            loading={isBooking}
            onClick={handleCreateBooking}
            disabled={!timeRangeIso} // Disable button if no time range is selected
          >
            Book
          </Button>
          <Button onClick={close} color="red">
            Annuller
          </Button>
        </div>
      </Modal>
      {/* Tabel that displays all the roomdata */}
      <Table.ScrollContainer
        minWidth={500}
        maxHeight={350}
        scrollAreaProps={{ offsetScrollbars: false }}
      >
        <Table stickyHeader>
          <Table.Thead>
            <Table.Tr>
              <Table.Th
                style={{ padding: "12px 16px", backgroundColor: "#f2f2f2" }}
              >
                Lokale
              </Table.Th>
              <Table.Th
                style={{ padding: "12px 16px", backgroundColor: "#f2f2f2" }}
              >
                Kapacitet
              </Table.Th>
              <Table.Th
                style={{ padding: "12px 16px", backgroundColor: "#f2f2f2" }}
              >
                Ledighed
              </Table.Th>
              <Table.Th
                style={{ padding: "12px 16px", backgroundColor: "#f2f2f2" }}
              >
                Status
              </Table.Th>
              <Table.Th
                style={{ padding: "12px 16px", backgroundColor: "#f2f2f2" }}
              >
                Booking
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {isLoadingRooms && (
              <Table.Tr>
                <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                  <Loader size="sm" />
                </Table.Td>
              </Table.Tr>
            )}
            {!isLoadingRooms && filteredRooms.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                  Ingen ledige lokaler matcher dine filtre.
                </Table.Td>
              </Table.Tr>
            )}
            {!isLoadingRooms &&
              // Render the rooms that are available based on the user role. If the user is a student, only show the rooms that are meetingsrooms (including 'mødelokale')
              filteredRooms.map(({ room_id, room_size }, index: number) => {
                const roomLabel = room_id ?? "-"
                const capacityLabel = room_size ? `${room_size} personer` : "-"
                const isBookable = Boolean(room_id)

                return (
                  <Table.Tr key={`${room_id ?? index}-${index}`}>
                    <Table.Td>{roomLabel}</Table.Td>
                    <Table.Td>{capacityLabel}</Table.Td>
                    <Table.Td>{timeRange}</Table.Td>
                    <Table.Td>
                      <Badge radius="xs" color="green" variant="light">
                        Ledig
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Button
                        onClick={() =>
                          room_id &&
                          handleOpenBooking({
                            roomId: room_id,
                            capacity: capacityLabel,
                            availability: timeRange ?? "",
                          })
                        }
                        size="sm"
                        disabled={!isBookable}
                      >
                        Book
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                )
              })}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  )
}
