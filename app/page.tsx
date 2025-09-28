"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TimeMap } from "@/components/time-map"
import { eras, type EraKey } from "@/data/eras"
import { cn } from "@/lib/utils"

type Progress = {
  unlocked: EraKey[]
  completed: EraKey[]
  bestScores: Record<EraKey, number>
}

const DEFAULT_PROGRESS: Progress = {
  unlocked: ["prehistoric"],
  completed: [],
  bestScores: {
    prehistoric: 0,
    egypt: 0,
    medieval: 0,
    renaissance: 0,
    "wild-west": 0,
    victorian: 0,
    "space-age": 0,
  },
}

export default function HomePage() {
  const [progress, setProgress] = useState<Progress>(DEFAULT_PROGRESS)

  useEffect(() => {
    const raw = localStorage.getItem("tq_progress")
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        setProgress((p) => ({ ...p, ...parsed }))
      } catch {}
    }
  }, [])

  const handleReset = () => {
    localStorage.removeItem("tq_progress")
    setProgress(DEFAULT_PROGRESS)
  }

  const unlockedSet = useMemo(() => new Set(progress.unlocked), [progress.unlocked])

  return (
    <main className="min-h-dvh bg-background">
      <section className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        <header className="mb-6 md:mb-10">
          <h1 className="text-pretty text-3xl font-semibold md:text-5xl">Journey Through Time: Trivia Quest</h1>
          <p className="mt-2 text-muted-foreground md:text-lg">
            Travel across eras, answer themed questions, earn badges, and become a Temporal Grandmaster!
          </p>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Your Time Map</CardTitle>
          </CardHeader>
          <CardContent>
            <TimeMap unlocked={unlockedSet} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {eras.map((era) => {
            const isUnlocked = unlockedSet.has(era.key)
            const score = progress.bestScores[era.key] ?? 0
            return (
              <Card
                key={era.key}
                className={cn("transition-transform", isUnlocked ? "hover:scale-[1.01]" : "opacity-60")}
                aria-disabled={!isUnlocked}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span aria-hidden>{era.emoji}</span>
                    <span>{era.label}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-3">
                  <div className="text-sm text-muted-foreground">
                    Best score: <span className="font-medium text-foreground">{score}%</span>
                  </div>
                  {isUnlocked ? (
                    <Button asChild>
                      <Link href={`/quiz/${era.key}`}>Enter Era</Link>
                    </Button>
                  ) : (
                    <Button variant="secondary" disabled aria-disabled>
                      Locked
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button variant="secondary" onClick={handleReset}>
            Reset Progress
          </Button>
          <div className="text-sm text-muted-foreground">Tip: You can replay any unlocked era anytime.</div>
        </div>
      </section>
    </main>
  )
}
