"use client"

import { Badge, Button, Loader, Modal, Paper, Table } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useContext, useEffect, useState } from "react"
import Toast from "./ui/toast"
import { getUserBookings } from "@/data/supabase"
import { formatDate, formatTime } from "@/utils/timeAndDateFormat"
import { AuthContext } from "@/providers/auth-provider"

export function BookingTable() {
  const [opened, { open, close }] = useDisclosure(false)
  const [showToast, setShowToast] = useState(false)
  const [isLoadingBookings, setIsLoadingBookings] = useState(false)
  const [cancelInfo, setCancelInfo] = useState<{
    room: string
    date: string
    time: string
  } | null>(null)
  const [userBookings, setUserBookings] = useState<Array<{
    id: number
    starting_at: string
    ending_at: string
    room_id: string
    meetingsrooms: {
      floor: number
      room_size: number
    }
  }> | null>(null)

  // Gets the user session to pass the user id it to getUserBookings
  const user = useContext(AuthContext)

  const handleOpenBooking = ({
    room,
    date,
    time,
  }: {
    room: string
    date: string
    time: string
  }) => {
    // Sets the booking info that the modal then displays
    setCancelInfo({ room, date, time })
    // Opens the modal
    open()
  }

  useEffect(() => {
    // Wait until we actually have a user before trying to fetch bookings. This useEffects runs each time auth "User" updates. 
    if (!user || !user.id) return

    const getBookings = async () => {
      // create an inner join on the bookings table and meetingsrooms table and gets all the booking/room info back
      // ONLY for the authorized user auth_id()
      try {
        setIsLoadingBookings(true)
        const bookings = await getUserBookings(user.id)

        if (bookings) {
          setUserBookings(bookings)
        }
      } catch (error) {
        console.log("Error fetching bookings", error)
      } finally {
        setIsLoadingBookings(false)
      }
    }

    getBookings()
  }, [user])

  return (
    <Paper radius="lg" withBorder style={{ overflow: "hidden" }}>
      <Toast showToast={showToast} setShowToast={setShowToast} />
      {/* Modal with currently clicked room/booking details */}
      <Modal
        radius="md"
        opened={opened}
        onClose={close}
        title="Er du sikker på at du vil annullere denne tid?"
        centered
      >
        <div className="mb-4 space-y-1 text-sm">
          <div>
            <strong>Lokale:</strong> {cancelInfo?.room}
          </div>
          <div>
            <strong>Dato:</strong> {cancelInfo?.date}
          </div>
          <div>
            <strong>Tidspunkt</strong> {cancelInfo?.time}
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
                Tidspunkt
              </Table.Th>
              <Table.Th
                style={{ padding: "12px 16px", backgroundColor: "#f2f2f2" }}
              >
                Dato
              </Table.Th>
              <Table.Th
                style={{ padding: "12px 16px", backgroundColor: "#f2f2f2" }}
              >
                Annullering
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {isLoadingBookings && (
              <Table.Tr>
                <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                  <Loader />
                </Table.Td>
              </Table.Tr>
            )}
            {!isLoadingBookings &&
              userBookings &&
              userBookings.length === 0 && (
                <Table.Tr>
                  <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                    Du har ingen bookinger endnu...
                  </Table.Td>
                </Table.Tr>
              )}
            {!isLoadingBookings &&
              userBookings &&
              userBookings.map(
                ({ id, room_id, meetingsrooms, starting_at, ending_at }) => {
                  // Format the time range as H:MM-H:MM
                  const startTime = formatTime(starting_at)
                  const endTime = formatTime(ending_at)
                  const timeRange = `${startTime}-${endTime}`

                  // Format the date as DD:MM:YYYY
                  const bookingDate = formatDate(starting_at)

                  return (
                    <Table.Tr key={id}>
                      <Table.Td>{room_id}</Table.Td>
                      <Table.Td>{`${meetingsrooms.room_size} personer`}</Table.Td>
                      <Table.Td>{timeRange}</Table.Td>
                      <Table.Td>{bookingDate}</Table.Td>
                      <Table.Td>
                        <Button
                          onClick={() =>
                            handleOpenBooking({
                              room: room_id,
                              date: bookingDate,
                              time: timeRange,
                            })
                          }
                          color="red"
                          size="sm"
                        >
                          Annuller
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  )
                }
              )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  )
}
