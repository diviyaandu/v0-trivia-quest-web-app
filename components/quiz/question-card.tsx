"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  question: {
    id: string
    text: string
    options: string[]
    correctIndex: number
    funFact?: string
  }
  onAnswered: (choiceIndex: number) => void
  hintsUsed: number
}

export function QuestionCard({ question, onAnswered, hintsUsed }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const isAnswered = selected !== null

  const dimmed = useMemo(() => {
    if (hintsUsed <= 0) return new Set<number>()
    // Dim two incorrect options deterministically based on id
    const incorrect = question.options.map((_, i) => i).filter((i) => i !== question.correctIndex)
    return new Set(incorrect.slice(0, Math.min(2, hintsUsed)))
  }, [hintsUsed, question.correctIndex, question.options])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-pretty text-xl">{question.text}</CardTitle>
        {isAnswered && question.funFact ? <p className="text-sm text-muted-foreground">{question.funFact}</p> : null}
      </CardHeader>
      <CardContent className="grid gap-2">
        {question.options.map((opt, idx) => {
          const isCorrect = idx === question.correctIndex
          const isSelected = selected === idx
          return (
            <Button
              key={idx}
              variant="secondary"
              className={cn(
                "justify-start text-left",
                isSelected && isCorrect && "bg-green-600 text-white",
                isSelected && !isCorrect && "bg-destructive text-destructive-foreground",
                !isSelected && dimmed.has(idx) && "opacity-60",
              )}
              onClick={() => {
                if (isAnswered) return
                setSelected(idx)
                onAnswered(idx)
              }}
              aria-pressed={isSelected}
            >
              <span className="mr-2 font-mono text-sm">{String.fromCharCode(65 + idx)})</span>
              {opt}
            </Button>
          )
        })}
        <div aria-live="polite" className="sr-only">
          {isAnswered
            ? selected === question.correctIndex
              ? "Correct"
              : `Wrong. The correct answer is option ${String.fromCharCode(65 + question.correctIndex)}`
            : ""}
        </div>
      </CardContent>
    </Card>
  )
}
