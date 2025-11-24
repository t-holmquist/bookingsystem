"use client"

import { rooms } from "@/data/data"
import { Paper, Table } from "@mantine/core"

export function RoomTable() {
  const rows = rooms.map(
    ({ room, capacity, availability, status, booking }, index: number) => (
      <Table.Tr key={index}>
        <Table.Td>{room}</Table.Td>
        <Table.Td>{capacity}</Table.Td>
        <Table.Td>{availability}</Table.Td>
        <Table.Td>{status}</Table.Td>
        <Table.Td>{booking}</Table.Td>
      </Table.Tr>
    )
  )

  return (
    <Paper radius="lg" withBorder style={{ overflow: "hidden" }}>
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
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  )
}
