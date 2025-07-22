"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface LockFormProps {
  onSubmit: (initials: string, message: string, color: string) => void
  onCancel: () => void
}

const LOCK_COLORS = [
  "#e74c3c", // Red
  "#3498db", // Blue
  "#2ecc71", // Green
  "#f1c40f", // Yellow
  "#9b59b6", // Purple
  "#e67e22", // Orange
  "#1abc9c", // Teal
]

export default function LockForm({ onSubmit, onCancel }: LockFormProps) {
  const [initials, setInitials] = useState("")
  const [message, setMessage] = useState("")
  const [selectedColor, setSelectedColor] = useState(LOCK_COLORS[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Format initials with heart
    let formattedInitials = initials
    if (!initials.includes("❤️")) {
      const parts = initials.split(/\s+/)
      if (parts.length >= 2) {
        formattedInitials = `${parts[0]} ❤️ ${parts[1]}`
      } else {
        formattedInitials = `${initials} ❤️`
      }
    }

    onSubmit(formattedInitials, message, selectedColor)
  }

  return (
    <motion.div
      className="bg-white rounded-lg p-6 w-full max-w-md relative"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <button onClick={onCancel} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <X size={20} />
      </button>

      <h2 className="text-2xl font-bold mb-4">Place Your Love Lock</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="initials">Initials (e.g. "J ❤️ M" or "John Mary")</Label>
          <Input
            id="initials"
            value={initials}
            onChange={(e) => setInitials(e.target.value)}
            placeholder="Enter your initials"
            required
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="message">Message (optional)</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a short message"
            className="mt-1"
            rows={3}
          />
        </div>

        <div className="mb-6">
          <Label>Lock Color</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {LOCK_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                className={`w-8 h-8 rounded-full transition-all ${
                  selectedColor === color ? "ring-2 ring-offset-2 ring-gray-400" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Place Lock
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
