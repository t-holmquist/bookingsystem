import { BookingTable } from '@/components/bookingTable'
import Header from '@/components/header'
import React from 'react'

const Bookinger = () => {
  return (
    <div className="flex flex-col h-screen gap-10 bg-ek-bg p-3 lg:p-8">
      <Header title="Dine bookinger"/>
      {/* Room result list section */}
      <section className="p-3 lg:py-5 lg:px-8 space-y-8 bg-white border border-gray-300 rounded-3xl w-full">
          <h2 className="text-xl font-semibold">
            Lokale visning
          </h2>
          <BookingTable />
        </section>
  </div>
  )
}

export default Bookinger