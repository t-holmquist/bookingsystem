import { StartTimeSlots } from "@/data/data"
import { Select } from "@mantine/core"
import { Clock } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

export default function StartTimeSelect({
  startTime,
  setStartTime,
}: {
  startTime: string | null
  setStartTime: Dispatch<SetStateAction<string | null>>
}) {
  return (
    <Select
      leftSection={<Clock size={15} />}
      placeholder="Vælg tidspunkt"
      // Display no icon on the left
      rightSection={<></>}
      withCheckIcon={false}
      data={StartTimeSlots}
      comboboxProps={{ transitionProps: { transition: "pop", duration: 200 } }}
      onChange={(value) => setStartTime(value)}
      value={startTime}
    />
  )
}
