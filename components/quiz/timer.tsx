"use client"

import { useEffect, useRef, useState } from "react"
import { Progress } from "@/components/ui/progress"
import type { EraKey } from "@/data/eras"

export function HourglassTimer({
  seconds,
  onExpire,
  era,
}: {
  seconds: number
  onExpire: () => void
  era: EraKey
}) {
  const [remain, setRemain] = useState(seconds)
  const idRef = useRef<number | null>(null)

  useEffect(() => {
    idRef.current = window.setInterval(() => {
      setRemain((r) => r - 1)
    }, 1000)
    return () => {
      if (idRef.current) window.clearInterval(idRef.current)
    }
  }, [])

  useEffect(() => {
    if (remain <= 0) {
      if (idRef.current) window.clearInterval(idRef.current)
      onExpire()
    }
  }, [onExpire, remain])

  const pct = Math.max(0, (remain / seconds) * 100)

  // Era-themed subtle description
  const label = `${era} timer`

  return (
    <div className="grid items-center gap-2 md:grid-cols-[1fr_auto]">
      <Progress value={pct} aria-label={label} />
      <div className="text-right font-mono text-sm text-muted-foreground">{remain}s</div>
    </div>
  )
}
