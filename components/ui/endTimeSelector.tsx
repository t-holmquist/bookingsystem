import { EndTimeSlots } from "@/data/data"
import { Select } from "@mantine/core"
import { Clock } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

export default function EndTimeSelect({
  endTime,
  setEndTime,
}: {
  endTime: string | null
  setEndTime: Dispatch<SetStateAction<string | null>>
}) {
  return (
    <Select
      leftSection={<Clock size={15} />}
      placeholder="Vælg tidspunkt"
      // Display no icon on the left
      rightSection={<></>}
      withCheckIcon={false}
      data={EndTimeSlots}
      comboboxProps={{ transitionProps: { transition: "pop", duration: 200 } }}
      onChange={(value) => setEndTime(value)}
      value={endTime}
    />
  )
}
