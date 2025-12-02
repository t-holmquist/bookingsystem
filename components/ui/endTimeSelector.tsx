"use client"

import { Select } from "@mantine/core"
import { Clock } from "lucide-react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

// Default end time slots - reset to these values before filtering
const DEFAULT_END_TIME_SLOTS = [
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
]

// Helper function to compare time strings (format: "HH:MM")
// Returns: -1 if time1 < time2, 0 if equal, 1 if time1 > time2
const compareTimes = (time1: string, time2: string): number => {
  const [hours1, minutes1] = time1.split(":").map(Number)
  const [hours2, minutes2] = time2.split(":").map(Number)
  const totalMinutes1 = hours1 * 60 + minutes1
  const totalMinutes2 = hours2 * 60 + minutes2

  if (totalMinutes1 < totalMinutes2) return -1
  if (totalMinutes1 > totalMinutes2) return 1
  return 0
}

export default function EndTimeSelect({
  startTime,
  endTime,
  setEndTime,
}: {
  startTime: string | null
  endTime: string | null
  setEndTime: Dispatch<SetStateAction<string | null>>
}) {
  const [endTimeSlots, setEndTimeSlots] = useState(DEFAULT_END_TIME_SLOTS)

  useEffect(() => {
    // Reset the timeslots to default values before filtering
    // This fixes a case where the user changes the starttime to an earlier time
    // and we want the timeslots to update correctly again
    const defaultSlots = [...DEFAULT_END_TIME_SLOTS]

    if (!startTime) {
      setEndTimeSlots(defaultSlots)
      return
    }

    // Gets the startTime e.g 10:00
    // Find the startTime in the default endTimeSlots (returns the index)
    // Update the endtimeslots to only show the indexes from that value and up
    const matchIndexInEndTimeSlots = defaultSlots.findIndex(
      (timeslot) => timeslot === startTime
    )

    // If the startTime is not found in the default slots, show all slots. FindIndex returns -1 if not found.
    if (matchIndexInEndTimeSlots === -1) {
      setEndTimeSlots(defaultSlots)
      return
    }

    // Filter the endTimeSlots to only show the indexes from that value and up
    const filteredSlots = defaultSlots.filter(
      (timeslot, index) => index > matchIndexInEndTimeSlots
    )
    setEndTimeSlots(filteredSlots)

    // Validate endTime: reset if it's invalid (equal to or earlier than startTime)
    // or if it's not in the filtered slots
    if (endTime) {
      const isEndTimeInvalid =
        compareTimes(endTime, startTime) <= 0 ||
        !filteredSlots.includes(endTime)

      if (isEndTimeInvalid) {
        setEndTime(null)
      }
    }

  }, [startTime])

  return (
    <Select
      leftSection={<Clock size={15} />}
      placeholder="Vælg tidspunkt"
      // Display no icon on the left
      rightSection={<></>}
      withCheckIcon={false}
      data={endTimeSlots}
      comboboxProps={{ transitionProps: { transition: "pop", duration: 200 } }}
      onChange={(value) => setEndTime(value)}
      value={endTime}
    />
  )
}
