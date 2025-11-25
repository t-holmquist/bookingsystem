"use client"

import FilterSection from "@/components/filterSection"
import Header from "@/components/header"
import { RoomTable } from "@/components/roomTable"
import { roomType } from "@/lib/types"
import { useState } from "react"

export default function Home() {
  // Array of UNAVAILABLE rooms which we get from supabase through the double booking checking function. This
  const [unavailableRooms, setUnavailableRooms] =
    useState<roomType | undefined>()

  return (
    <div className="flex flex-col h-screen bg-ek-bg p-8">
      <Header title="Book et lokale" />
      <section className="mt-10 gap-10 flex flex-col h-full justify-between">
        {/* Filter section */}
        <FilterSection
          setUnavailableRooms={setUnavailableRooms}
        />
        {/* Room result list section */}
        <section className="py-5 px-8 space-y-8 bg-white border border-gray-400 rounded-3xl w-full h-full">
          <h2 className="text-xl font-semibold">Lokale visning</h2>
          <RoomTable />
        </section>
      </section>
    </div>
  )
}
