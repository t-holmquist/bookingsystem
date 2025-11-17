import { Button } from "@mantine/core"
import { DateTimePicker } from '@mantine/dates';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-400 font-sans">
      <Button color="#5FCCDB" variant="filled">Button</Button>
      <DateTimePicker />
    </div>
  )
}