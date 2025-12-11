"use client"

import FilterSection from "@/components/filterSection"
import Header from "@/components/header"
import { RoomTable } from "@/components/roomTable"
import { doubleBookingType, isoTimeRange } from "@/lib/types"
import { Button } from "@mantine/core"
import { RefreshCcw } from "lucide-react"
import { useState } from "react"

export default function Home() {
  // Array of double bookings which we get from supabase through the double booking checking function.
  const [doubleBookings, setDoubleBookings] = useState<
    doubleBookingType | undefined
  >()
  const [selectedIsoRange, setSelectedIsoRange] = useState<
    isoTimeRange | undefined
  >(undefined)
  const [selectedFloor, setSelectedFloor] = useState<string | null>("Sal. 3")
  const [startTime, setStartTime] = useState<string | null>("8:00")
  const [endTime, setEndTime] = useState<string | null>("16:00")

  const [refreshKey, setRefreshKey] = useState(0) // Loading state for refreshing the rooms. Better than a boolean because it will force a re-render of the component.

  return (
    <div className="flex flex-col min-h-screen bg-ek-bg p-3 lg:p-8">
      <Header title="Book et lokale" />
      <section className="mt-10 gap-10 flex flex-col h-full justify-between">
        {/* Filter section */}
        <FilterSection
          setDoubleBookings={setDoubleBookings}
          setSelectedIsoRange={setSelectedIsoRange}
          selectedFloor={selectedFloor}
          setSelectedFloor={setSelectedFloor}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />
        {/* Room result list section */}
        <section className="p-3 lg:py-5 lg:px-8 space-y-8 bg-white border border-gray-300 rounded-3xl w-full h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Ledige lokaler</h2>
            <Button
              variant="light"
              size="xs"
              onClick={() => setRefreshKey((prev) => prev + 1)}
            >
              <RefreshCcw size={20} />
            </Button>
          </div>
          {/* Roomtable gets the double bookings so that it can filter out those rooms with those room_ids and only show every other room */}
          <RoomTable
            doubleBookings={doubleBookings}
            startTime={startTime}
            endTime={endTime}
            timeRangeIso={selectedIsoRange}
            selectedFloor={selectedFloor}
            refreshKey={refreshKey}
          />
        </section>
      </section>
    </div>
  )
}
