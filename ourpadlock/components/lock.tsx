"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface LockProps {
  lock: {
    id: string
    initials: string
    message: string
    color: string
    position: {
      x: number
      y: number
    }
  }
}

export default function Lock({ lock }: LockProps) {
  const [showMessage, setShowMessage] = useState(false)

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute cursor-pointer"
      style={{
        left: `${lock.position.x - 15}px`,
        top: `${lock.position.y - 15}px`,
        zIndex: showMessage ? 10 : 1,
      }}
      onClick={() => setShowMessage(!showMessage)}
    >
      {/* Lock body */}
      <div className="w-[30px] h-[25px] rounded-t-lg relative" style={{ backgroundColor: lock.color }}>
        <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
          {lock.initials.split("❤️")[0]}
        </div>
      </div>

      {/* Lock shackle */}
      <div
        className="w-[20px] h-[15px] mx-auto border-t-[3px] border-l-[3px] border-r-[3px] rounded-t-lg"
        style={{ borderColor: lock.color }}
      ></div>

      {/* Message popup */}
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-[120px] bg-white p-2 rounded-lg shadow-lg text-center"
        >
          <div className="text-xs font-bold mb-1">{lock.initials}</div>
          <div className="text-xs">{lock.message}</div>
          <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
        </motion.div>
      )}
    </motion.div>
  )
}
