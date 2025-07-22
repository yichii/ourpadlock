"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LockForm from "./lock-form"
import Lock from "./lock"

// Sample initial locks
const initialLocks = [
  { id: "1", initials: "J ❤️ M", message: "Forever and always", color: "#e74c3c", position: { x: 120, y: 50 } },
  { id: "2", initials: "A ❤️ B", message: "Since 2010", color: "#3498db", position: { x: 220, y: 80 } },
  { id: "3", initials: "T ❤️ S", message: "Eternally yours", color: "#2ecc71", position: { x: 350, y: 60 } },
  { id: "4", initials: "R ❤️ L", message: "Our love is locked", color: "#f1c40f", position: { x: 480, y: 90 } },
  { id: "5", initials: "C ❤️ D", message: "Together forever", color: "#9b59b6", position: { x: 600, y: 70 } },
]

export default function BridgeWithLocks() {
  const [locks, setLocks] = useState(initialLocks)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState({ x: 0, y: 0 })
  const bridgeRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Handle bridge click to place a new lock
  const handleBridgeClick = (e: React.MouseEvent) => {
    if (!isDragging && bridgeRef.current) {
      const rect = bridgeRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left + bridgeRef.current.scrollLeft
      const y = e.clientY - rect.top

      // Check if we're clicking on an empty spot (simple collision detection)
      const isEmptySpot = !locks.some((lock) => {
        const lockX = lock.position.x
        const lockY = lock.position.y
        return Math.abs(lockX - x) < 30 && Math.abs(lockY - y) < 30
      })

      if (isEmptySpot) {
        setSelectedPosition({ x, y })
        setIsFormOpen(true)
      }
    }
  }

  // Add a new lock
  const addLock = (initials: string, message: string, color: string) => {
    const newLock = {
      id: Date.now().toString(),
      initials,
      message,
      color,
      position: selectedPosition,
    }

    setLocks([...locks, newLock])
    setIsFormOpen(false)
  }

  // Handle horizontal scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (bridgeRef.current) {
      setIsDragging(true)
      setStartX(e.pageX - bridgeRef.current.offsetLeft)
      setScrollLeft(bridgeRef.current.scrollLeft)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !bridgeRef.current) return
    e.preventDefault()
    const x = e.pageX - bridgeRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    bridgeRef.current.scrollLeft = scrollLeft - walk
  }

  // Reset dragging state when mouse leaves the component
  useEffect(() => {
    const handleMouseLeave = () => setIsDragging(false)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div
        ref={bridgeRef}
        className="bridge-container w-full h-64 overflow-x-auto overflow-y-hidden cursor-grab"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onClick={handleBridgeClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="bridge relative w-[3000px] h-full">
          {/* Bridge railing */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-800 to-gray-700"></div>
          <div className="absolute bottom-16 left-0 right-0 h-4 bg-gray-600"></div>

          {/* Bridge grid pattern */}
          <div className="absolute bottom-20 left-0 right-0 h-40 flex">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="bridge-section w-[30px] h-full border-l-2 border-r-2 border-gray-600 flex flex-col justify-between"
              >
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="h-[2px] bg-gray-600"></div>
                ))}
              </div>
            ))}
          </div>

          {/* Locks */}
          <AnimatePresence>
            {locks.map((lock) => (
              <Lock key={lock.id} lock={lock} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lock form modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <LockForm onSubmit={addLock} onCancel={() => setIsFormOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
