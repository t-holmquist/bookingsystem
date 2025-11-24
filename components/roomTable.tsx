"use client"

import { rooms } from "@/data/data"
import { Button, Modal, Paper, Table } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useState } from "react"
import Toast from "./ui/toast"

export function RoomTable() {
  const [opened, { open, close }] = useDisclosure(false)
  const [showToast, setShowToast] = useState(false)
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
        <Table stickyHeader withTableBorder>
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
            {rooms.map(
              ({ room, capacity, availability, status }, index: number) => (
                <Table.Tr key={index}>
                  <Table.Td>{room}</Table.Td>
                  <Table.Td>{capacity}</Table.Td>
                  <Table.Td>{availability}</Table.Td>
                  <Table.Td>{status}</Table.Td>
                  <Table.Td>
                    <Button
                      onClick={() =>
                        handleOpenBooking({ room, capacity, availability })
                      }
                      size="sm"
                    >
                      Book
                    </Button>
                  </Table.Td>
                </Table.Tr>
              )
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  )
}
