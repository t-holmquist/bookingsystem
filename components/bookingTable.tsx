"use client"

import { bookings } from "@/data/data"
import { Paper, Table } from "@mantine/core"

export function BookingTable() {
  const rows = bookings.map(
    ({ room, capacity, time, date, cancel }, index: number) => (
      <Table.Tr key={index}>
        <Table.Td>{room}</Table.Td>
        <Table.Td>{capacity}</Table.Td>
        <Table.Td>{time}</Table.Td>
        <Table.Td>{date}</Table.Td>
        <Table.Td>{cancel}</Table.Td>
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
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  )
}
