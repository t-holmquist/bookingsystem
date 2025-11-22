import React from "react"

const Header = ({ title }: { title: string }) => {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex gap-2 w-fit bg-[#ebfbee] items-center py-1 px-2 rounded-md">
        <div className="bg-black rounded-full w-2 h-2"></div>
        <p className="text-xs">Logged ind som student</p>
      </div>
    </div>
  )
}

export default Header
