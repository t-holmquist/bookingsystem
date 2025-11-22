import React from "react"
import ActiveIndicator from "./ui/activeIndicator"

const Header = ({ title }: { title: string }) => {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex gap-2 w-fit bg-[#ebfbee] items-center py-1 px-2 rounded-md">
        <ActiveIndicator />
        <p className="text-xs">Logget ind som studerende</p>
      </div>
    </div>
  )
}

export default Header
