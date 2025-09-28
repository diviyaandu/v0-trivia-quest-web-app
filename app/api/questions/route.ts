// Route Handler returning randomized questions for an era
import { NextResponse } from "next/server"
import { getQuestionsForEra } from "@/data/questions"
import { isEraKey, type EraKey } from "@/data/eras"

function shuffle<T>(arr: T[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const eraParam = searchParams.get("era") || ""
  const count = Math.max(1, Math.min(20, Number(searchParams.get("count") || "10")))
  // difficulty is not used heavily yet, but can influence selection in future
  const difficulty = Number(searchParams.get("difficulty") || "1")

  if (!isEraKey(eraParam)) {
    return NextResponse.json({ error: "Invalid era" }, { status: 400 })
  }
  const era = eraParam as EraKey
  const pool = getQuestionsForEra(era)

  // Simple adaptive selection: at higher difficulty, prefer later questions (pretend harder)
  const sorted = [...pool]
  if (difficulty > 1.2) {
    sorted.reverse()
  }
  const selected = shuffle(sorted).slice(0, Math.min(count, pool.length))
  const payload = {
    questions: selected.map((q) => ({
      id: q.id,
      text: q.text,
      options: q.options,
      correctIndex: q.correctIndex,
      funFact: q.funFact,
    })),
  }
  return NextResponse.json(payload)
}
