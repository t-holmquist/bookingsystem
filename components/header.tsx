"use client"

import ActiveIndicator from "./ui/activeIndicator"
import { useProfile } from "@/providers/profile-provider"
import { motion } from "motion/react"
import { Loader } from "@mantine/core"

const Header = ({ title }: { title: string }) => {
  const { profileData } = useProfile()

  return (
    <div className="space-y-2">
      <motion.h1
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold"
      >
        {title}
      </motion.h1>
      <div className="flex gap-2 w-fit bg-[#ebfbee] border border-gray-200 items-center py-1 px-2 rounded-md">
        {profileData ? (
          <>
            <ActiveIndicator />
            <p className="text-xs">
              Logget ind som{" "}
              {profileData?.role === "teacher" ? "lærer" : "studerende"}
            </p>
          </>
        ) : (
          <Loader size="xs" />
        )}
      </div>
    </div>
  )
}

export default Header
