import FilterSection from "@/components/filterSection"
import Header from "@/components/header"
import { RoomTable } from "@/components/roomTable"

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-ek-bg p-8">
      <Header title="Book et lokale" />
      <section className="mt-10 gap-10 flex flex-col h-full justify-between">
        {/* Filter section */}
        <FilterSection />
        {/* Room result list section */}
        <section className="py-5 px-8 space-y-8 bg-white border border-gray-400 rounded-3xl w-full h-full">
          <h2 className="text-xl font-semibold">
            Lokale visning
          </h2>
          <RoomTable />
        </section>
      </section>
    </div>
  )
}
