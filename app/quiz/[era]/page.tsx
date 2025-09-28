import { notFound } from "next/navigation"
import { QuizEngine } from "@/components/quiz/quiz-engine"
import { getEraLabel, isEraKey, type EraKey } from "@/data/eras"

export default function EraQuizPage({ params }: { params: { era: string } }) {
  const eraParam = params.era
  if (!isEraKey(eraParam)) return notFound()

  return (
    <main className="min-h-dvh bg-background">
      <section className="mx-auto max-w-4xl px-4 py-6 md:py-8">
        <header className="mb-4 md:mb-6">
          <h1 className="text-2xl font-semibold md:text-3xl">{getEraLabel(eraParam as EraKey)} Quiz</h1>
          <p className="mt-1 text-muted-foreground">Answer the questions before the sand runs out. Use hints wisely!</p>
        </header>
        <QuizEngine era={eraParam as EraKey} />
      </section>
    </main>
  )
}
