"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { eras, type EraKey } from "@/data/eras"
import { Button } from "@/components/ui/button"

export function TimeMap({ unlocked }: { unlocked: Set<EraKey> }) {
  // A playful winding path using an SVG with a moving time machine "orb"
  const path = "M 10 180 C 120 140, 60 60, 180 80 S 320 160, 420 120 S 540 60, 620 140"

  return (
    <div className="relative overflow-hidden rounded-lg border bg-card p-4 md:p-6">
      <div className="grid gap-3 md:grid-cols-[1fr_320px]">
        <div className="relative">
          <svg viewBox="0 0 640 200" className="h-56 w-full md:h-64" aria-hidden>
            <defs>
              <filter id="glow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path d={path} fill="none" stroke="currentColor" className="stroke-[3] text-muted-foreground/50" />
            <motion.circle
              r="8"
              filter="url(#glow)"
              className="fill-primary"
              initial={{ pathLength: 0, offsetDistance: "0%" }}
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ duration: 8, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
            >
              <animateMotion path={path} dur="8s" repeatCount="indefinite" />
            </motion.circle>

            {eras.map((era, idx) => {
              // Distribute stops roughly along path as fixed positions for simplicity
              const x = 40 + idx * 85
              const y = idx % 2 === 0 ? 60 : 140
              const isUnlocked = unlocked.has(era.key)
              return (
                <g key={era.key} transform={`translate(${x},${y})`}>
                  <circle r="12" className={isUnlocked ? "fill-accent" : "fill-muted"} aria-hidden />
                  <text
                    x="0"
                    y="32"
                    textAnchor="middle"
                    className="fill-foreground text-[10px]"
                    style={{ fontWeight: 600 }}
                    aria-hidden
                  >
                    {era.emoji}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <Card className="p-3 md:p-4">
          <div className="mb-2 text-sm font-medium text-muted-foreground">Choose an era:</div>
          <ul className="grid grid-cols-2 gap-2" role="list">
            {eras.map((era) => {
              const isUnlocked = unlocked.has(era.key)
              return (
                <li key={era.key}>
                  {isUnlocked ? (
                    <Button asChild className="w-full justify-start">
                      <Link href={`/quiz/${era.key}`} aria-label={`Enter ${era.label} quiz`}>
                        <span className="mr-2" aria-hidden>
                          {era.emoji}
                        </span>
                        {era.label}
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="secondary" className="w-full justify-start" disabled>
                      <span className="mr-2" aria-hidden>
                        {era.emoji}
                      </span>
                      {era.label} (Locked)
                    </Button>
                  )}
                </li>
              )
            })}
          </ul>
        </Card>
      </div>
    </div>
  )
}
