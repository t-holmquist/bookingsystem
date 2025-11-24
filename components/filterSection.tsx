"use client"

import { useState } from "react"
import DatePicker from "./ui/datePicker"
import FloorSelect from "./ui/floorselect"
import StartTimeSelect from "./ui/startTimeSelector"
import EndTimeSelect from "./ui/endTimeSelector"

const FilterSection = () => {
  // Filter state variables
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<string | null>(null)
  const [endTime, setEndTime] = useState<string | null>(null)

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-400 py-5 px-8">
      <h2 className="text-xl font-semibold">Filter</h2>
      {/* Filter section */}
      <section className="mt-8 flex justify-between items-center">
        {/* Floor */}
        <div className="space-y-2">
          <h3>Etage</h3>
          <p className="text-ek-text-grey text-sm">Vælg den ønskede etage</p>
          <FloorSelect
            selectedFloor={selectedFloor}
            setSelectedFloor={setSelectedFloor}
          />
        </div>
        {/* Date */}
        <div className="space-y-2">
          <h3>Dato</h3>
          <p className="text-ek-text-grey text-sm">Vælg den ønskede dato</p>
          <DatePicker date={selectedDate} setDate={setSelectedDate} />
        </div>
        {/* Start time */}
        <div className="space-y-2">
          <h3>Tidspunkt fra</h3>
          <p className="text-ek-text-grey text-sm">
            Vælg det ønskede tidspunkt
          </p>
          <StartTimeSelect startTime={startTime} setStartTime={setStartTime} />
        </div>
        {/* End time */}
        <div className="space-y-2">
          <h3>Tidspunkt til</h3>
          <p className="text-ek-text-grey text-sm">
            Vælg det ønskede tidspunkt
          </p>
          <EndTimeSelect endTime={endTime} setEndTime={setEndTime} />
        </div>
      </section>
    </div>
  )
}

export default FilterSection
