"use client"

import useSWR from "swr"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { QuestionCard } from "./question-card"
import { HourglassTimer } from "./timer"
import { type EraKey, getEraLabel, nextEraKey } from "@/data/eras"
import Link from "next/link"

type APIQuestion = {
  id: string
  text: string
  options: string[]
  correctIndex: number
  funFact?: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const QUESTION_COUNT = 10
const TIMER_SECONDS = 18

type Achievements = {
  streak5: boolean
  streak10: boolean
  eraBadge: boolean
}

export function QuizEngine({ era }: { era: EraKey }) {
  const [difficulty, setDifficulty] = useState(1) // 1 = base, grows with correct
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [hintsLeft, setHintsLeft] = useState(3)
  const [muted, setMuted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const { toast } = useToast()

  const { data, isLoading, error, mutate } = useSWR<{ questions: APIQuestion[] }>(
    `/api/questions?era=${era}&count=${QUESTION_COUNT}&difficulty=${difficulty.toFixed(2)}`,
    fetcher,
    { revalidateOnFocus: false },
  )

  const correctAudio = useRef<HTMLAudioElement | null>(null)
  const wrongAudio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    correctAudio.current = typeof Audio !== "undefined" ? new Audio("/sounds/correct.mp3") : null
    wrongAudio.current = typeof Audio !== "undefined" ? new Audio("/sounds/wrong.mp3") : null
  }, [])

  const questions = data?.questions ?? []
  const current = questions[index]

  const [achievements, setAchievements] = useState<Achievements>({
    streak5: false,
    streak10: false,
    eraBadge: false,
  })

  const onAnswer = useCallback(
    (choice: number) => {
      if (!current) return
      const isCorrect = choice === current.correctIndex

      if (isCorrect) {
        setScore((s) => s + 1)
        setStreak((s) => s + 1)
        setDifficulty((d) => Math.max(0.5, d * 1.1)) // +10%
        if (!muted) correctAudio.current?.play().catch(() => {})
      } else {
        setStreak(0)
        setDifficulty((d) => Math.max(0.5, d * 0.95)) // -5%
        if (!muted) wrongAudio.current?.play().catch(() => {})
      }

      // Achievements toasts
      setTimeout(() => {
        const st = isCorrect ? streak + 1 : 0
        if (st === 5 && !achievements.streak5) {
          setAchievements((a) => ({ ...a, streak5: true }))
          toast({ title: "Achievement Unlocked!", description: "Time Master (5 correct streak)" })
        } else if (st === 10 && !achievements.streak10) {
          setAchievements((a) => ({ ...a, streak10: true }))
          toast({
            title: "Achievement Unlocked!",
            description: "Temporal Scholar (10 correct streak)",
          })
        }
      }, 10)
    },
    [achievements.streak10, achievements.streak5, current, muted, streak, toast],
  )

  const onNext = useCallback(() => {
    if (index + 1 >= QUESTION_COUNT) {
      setShowResults(true)
      // Save best score and unlock next era
      const percent = Math.round((score / QUESTION_COUNT) * 100)
      const raw = localStorage.getItem("tq_progress")
      const progress = raw
        ? JSON.parse(raw)
        : {
            unlocked: ["prehistoric"],
            completed: [],
            bestScores: {},
          }
      progress.completed = Array.from(new Set([...(progress.completed ?? []), era]))
      progress.bestScores = {
        ...(progress.bestScores ?? {}),
        [era]: Math.max(percent, progress.bestScores?.[era] ?? 0),
      }
      const next = nextEraKey(era)
      if (next) {
        progress.unlocked = Array.from(new Set([...(progress.unlocked ?? ["prehistoric"]), next]))
      }
      localStorage.setItem("tq_progress", JSON.stringify(progress))
      setAchievements((a) => ({ ...a, eraBadge: true }))
      toast({ title: "Era Complete!", description: "You earned an era badge." })
      return
    }
    setIndex((i) => i + 1)
  }, [era, index, score, toast])

  const useHint = useCallback(() => {
    if (!current || hintsLeft <= 0) return
    setHintsLeft((h) => h - 1)
    toast({
      title: "Time Traveler's Guide",
      description: "Two options dimmed to help you focus.",
    })
  }, [current, hintsLeft, toast])

  const percent = Math.round((score / QUESTION_COUNT) * 100)

  const title = useMemo(() => {
    if (percent >= 95) return "Temporal Grandmaster"
    if (percent >= 85) return "History Sage"
    if (percent >= 75) return "Time Explorer"
    if (percent >= 65) return "Era Apprentice"
    if (percent >= 50) return "Time Tourist"
    return "Future Historian"
  }, [percent])

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error loading questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => mutate()}>Retry</Button>
        </CardContent>
      </Card>
    )
  }

  if (isLoading || !current) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading questions…</CardTitle>
        </CardHeader>
        <CardContent className="py-8">
          <Progress value={((index + 1) / QUESTION_COUNT) * 100} aria-label="Loading" />
        </CardContent>
      </Card>
    )
  }

  if (showResults) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Results — {getEraLabel(era)}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-lg font-semibold">
            Score: {score}/{QUESTION_COUNT} ({percent}%)
          </div>
          <div className="text-muted-foreground">Title Earned: {title}</div>
          <div className="text-sm">Replay this era or continue your journey to the next time period.</div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button asChild>
              <Link href={`/quiz/${era}`}>Replay Era</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/">Back to Map</Link>
            </Button>
            {nextEraKey(era) ? (
              <Button asChild>
                <Link href={`/quiz/${nextEraKey(era)}`}>Next Era</Link>
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">
          Question {index + 1} of {QUESTION_COUNT}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => setMuted((m) => !m)} aria-pressed={muted}>
            {muted ? "Unmute" : "Mute"}
          </Button>
          <Button variant="secondary" size="sm" onClick={useHint} disabled={hintsLeft <= 0}>
            Hint ({hintsLeft})
          </Button>
        </div>
      </div>

      <HourglassTimer key={index} seconds={TIMER_SECONDS} onExpire={() => onAnswer(-1)} era={era} />

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <QuestionCard question={current} onAnswered={onAnswer} hintsUsed={3 - hintsLeft} />
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Streak: {streak}</div>
        <Button onClick={onNext} aria-label="Next question">
          Next
        </Button>
      </div>

      <audio src="/sounds/correct.mp3" className="sr-only" />
      <audio src="/sounds/wrong.mp3" className="sr-only" />
    </div>
  )
}
