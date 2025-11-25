"use client"

import { getAvailableRooms } from "@/data/supabase"
import { doubleBookingType, roomType } from "@/lib/types"
import { Badge, Button, Modal, Paper, Table } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Toast from "./ui/toast"

export function RoomTable({
  setDoubleBookings: _setDoubleBookings,
  doubleBookings,
  timeRange,
}: {
  // Contains the doubleBookingType or undefined
  setDoubleBookings: Dispatch<SetStateAction<doubleBookingType | undefined>>
  doubleBookings: doubleBookingType | undefined
  timeRange?: string
}) {
  const [opened, { open, close }] = useDisclosure(false)
  const [showToast, setShowToast] = useState(false)
  const [availableRooms, setAvailableRooms] = useState<roomType>([])
  const [isLoadingRooms, setIsLoadingRooms] = useState(false)
  const [bookingInfo, setBookingInfo] = useState<{
    room: string
    capacity: string
    availability: string
  } | null>(null)

  const handleOpenBooking = ({
    room,
    capacity,
    availability,
  }: {
    room: string
    capacity: string
    availability: string
  }) => {
    // Sets the booking info that the modal then displays
    setBookingInfo({ room, capacity, availability })
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
        const rooms = await getAvailableRooms(doubleBookings)
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
  }, [doubleBookings])

  const renderStatusBadge = () => (
    <Badge radius="xs" color="green" variant="light">
      Ledig
    </Badge>
  )

  const availabilityText = timeRange ?? "-"

  return (
    <Paper radius="lg" withBorder style={{ overflow: "hidden" }}>
      <Toast showToast={showToast} setShowToast={setShowToast} />
      {/* Modal with currently clicked room/booking details */}
      <Modal
        radius="md"
        opened={opened}
        onClose={close}
        title="Overblik over booking"
        centered
      >
        <div className="mb-4 space-y-1 text-sm">
          <div>
            <strong>Lokale:</strong> {bookingInfo?.room ?? "-"}
          </div>
          <div>
            <strong>Kapacitet:</strong> {bookingInfo?.capacity ?? "-"}
          </div>
          <div>
            <strong>Tidsrum:</strong> {bookingInfo?.availability ?? "-"}
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            onClick={() => {
              setShowToast(true)
              close()
            }}
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
                  Henter ledige lokaler...
                </Table.Td>
              </Table.Tr>
            )}
            {!isLoadingRooms && availableRooms.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                  Ingen ledige lokaler matcher dine filtre.
                </Table.Td>
              </Table.Tr>
            )}
            {!isLoadingRooms &&
              availableRooms.map(({ room_id, room_size }, index: number) => {
                const roomLabel = room_id ?? "-"
                const capacityLabel = room_size ? `${room_size} personer` : "-"

                return (
                  <Table.Tr key={`${room_id ?? index}-${index}`}>
                    <Table.Td>{roomLabel}</Table.Td>
                    <Table.Td>{capacityLabel}</Table.Td>
                    <Table.Td>{availabilityText}</Table.Td>
                    <Table.Td>{renderStatusBadge()}</Table.Td>
                    <Table.Td>
                      <Button
                        onClick={() =>
                          handleOpenBooking({
                            room: roomLabel,
                            capacity: capacityLabel,
                            availability: availabilityText,
                          })
                        }
                        size="sm"
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
