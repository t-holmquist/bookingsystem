import FilterSection from "@/components/filterSection"
import Header from "@/components/header"

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-white p-8">
      <Header title="Book et lokale" />
      <section className="mt-14 gap-10 flex flex-col h-full justify-between">
        {/* Filter section */}
        <FilterSection />
        {/* Room result list section */}
        <p className="py-5 px-8 text-xl font-semibold border border-gray-400  rounded-3xl w-full h-full">Lokale visning</p>
      </section>
    </div>
  )
}
