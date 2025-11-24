"use client"
import { Dispatch, SetStateAction, useEffect } from "react"
import { CircleCheck } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

const Toast = ({
  showToast,
  setShowToast,
}: {
  showToast: boolean
  setShowToast: Dispatch<SetStateAction<boolean>>
}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowToast(false)
    }, 4000)
    return () => clearTimeout(timeoutId)
  }, [showToast])

  return (
    // Toast notification — centered near bottom, pill with icon
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ y: 20, opacity: 0, }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="fixed right-8 bottom-4 z-50"
        >
          <div className="flex items-center gap-3 bg-popover rounded-lg px-5 py-3 border border-border">
            <CircleCheck color="green" />
            <span className="text-xs font-semibold text-popover-foreground">
              New session added successfully
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
