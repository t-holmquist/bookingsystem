"use client"

import { Badge, Button, Loader, Modal, Paper, Table } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useContext, useEffect, useState } from "react"
import Toast from "./ui/toast"
import { deleteBooking, getUserBookings } from "@/data/supabase"
import { formatDate, formatTime } from "@/utils/timeAndDateFormat"
import { AuthContext } from "@/providers/auth-provider"
import { motion } from "motion/react"

export function BookingTable() {
  const [opened, { open, close }] = useDisclosure(false) // Modal state
  const [showToast, setShowToast] = useState(false) // Sets toast to visible, will auto-set to false after x seconds
  const [isDeleting, setIsDeleting] = useState(false) // Showning loader on delete booking
  const [isLoadingBookings, setIsLoadingBookings] = useState(false) // Loading booking state
  const [cancelInfo, setCancelInfo] = useState<{
    room: string
    date: string
    time: string
    id: number
  } | null>(null) // Modal booking cancellation info
  const [userBookings, setUserBookings] = useState<Array<{
    id: number
    starting_at: string
    ending_at: string
    room_id: string
    meetingsrooms: {
      floor: number
      room_size: number
    }
  }> | null>(null) // User specific bookings

  // Gets the user session to pass the user id it to getUserBookings
  const user = useContext(AuthContext)

  // Opens modal with cancellation info
  const handleOpenBooking = ({
    room,
    date,
    time,
    id,
  }: {
    room: string
    date: string
    time: string
    id: number
  }) => {
    // Sets the booking info that the modal then displays
    setCancelInfo({ room, date, time, id })
    // Opens the modal
    open()
  }

  // Fetch user specific bookings
  useEffect(() => {
    // If there is no authenticated user, make sure we clear the previous data
    if (!user || !user.id) {
      setUserBookings(null)
      return
    }

    let isCancelled = false

    const getBookings = async () => {
      // create an inner join on the bookings table and meetingsrooms table and gets all the booking/room info back
      // ONLY for the authorized user auth_id()
      try {
        setIsLoadingBookings(true)
        const bookings = await getUserBookings(user.id)

        if (!isCancelled && bookings) {
          // TODO: Should fix: Cannot read types from supabase.
          setUserBookings(bookings as any)
        }
      } catch (error) {
        console.log("Error fetching bookings", error)
      } finally {
        if (!isCancelled) {
          setIsLoadingBookings(false)
        }
      }
    }

    getBookings()
    // Cleanup function to cancel in-flight requests when user changes or component unmounts
    return () => {
      isCancelled = true
    }
  }, [user?.id])

  // Delete a booking
  const handleDeleteBooking = async () => {
    if (cancelInfo?.id) {
      try {
        setIsDeleting(true)
        const { data, error } = await deleteBooking(cancelInfo.id)

        // Update the UI and remove deleted booking from the userBookingslist
        if (!error && data && userBookings) {
          setUserBookings(userBookings.filter((item) => item.id !== data.id))
          setShowToast(true)
          close()
        }
      } catch (error) {
        console.log("Error deleting booking")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <Paper
      radius="lg"
      withBorder
      style={{ overflow: "hidden", minHeight: 350 }}
    >
      <Toast
        message="Booking deleted succesfully"
        showToast={showToast}
        setShowToast={setShowToast}
      />
      {/* Modal with currently clicked room/booking details */}
      <Modal
        radius="md"
        opened={opened}
        onClose={close}
        title="Er du sikker på at du vil annullere denne tid?"
        centered
        size="sm"
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
          <div className="flex gap-2">
          <Button
            loading={isDeleting}
            color="red"
            onClick={handleDeleteBooking}
          >
            Ja
          </Button>
          <Button onClick={close}>Nej</Button>
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

          {/* Table body with animations. Parent controls the stagger effect. Children are the individual rows. */}
          <motion.tbody
            key={userBookings?.length ?? 0}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            // This is a safe guard to ensure the rows are displayed in the correct order.
            style={{ display: "table-row-group" }}
          >
            {/* If loading data then show spinner */}
            {isLoadingBookings && (
              <Table.Tr>
                <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                  <Loader size="sm" />
                </Table.Td>
              </Table.Tr>
            )}
            {/* If not loading but there is no data -> show message */}
            {!isLoadingBookings &&
              userBookings &&
              userBookings.length === 0 && (
                <Table.Tr>
                  <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                    Du har ingen bookinger endnu...
                  </Table.Td>
                </Table.Tr>
              )}
            {/* If not loading and data is present (finished loading) -> render data */}
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
                    // Each row is an individual motion.tr component
                    <motion.tr
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      key={id}
                    >
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
                              id: id,
                            })
                          }
                          color="red"
                          size="sm"
                        >
                          Annuller
                        </Button>
                      </Table.Td>
                    </motion.tr>
                  )
                }
              )}
          </motion.tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  )
}
