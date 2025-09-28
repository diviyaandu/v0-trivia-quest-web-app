export type EraKey = "prehistoric" | "egypt" | "medieval" | "renaissance" | "wild-west" | "victorian" | "space-age"

export const eras: { key: EraKey; label: string; emoji: string }[] = [
  { key: "prehistoric", label: "Prehistoric", emoji: "🦕" },
  { key: "egypt", label: "Ancient Egypt", emoji: "🏺" },
  { key: "medieval", label: "Medieval", emoji: "⚔️" },
  { key: "renaissance", label: "Renaissance", emoji: "🎨" },
  { key: "wild-west", label: "Wild West", emoji: "🤠" },
  { key: "victorian", label: "Victorian", emoji: "🎩" },
  { key: "space-age", label: "Space Age", emoji: "🚀" },
]

export function isEraKey(x: string): x is EraKey {
  return eras.some((e) => e.key === x)
}

export function getEraLabel(k: EraKey) {
  return eras.find((e) => e.key === k)?.label ?? k
}

export function nextEraKey(k: EraKey): EraKey | null {
  const idx = eras.findIndex((e) => e.key === k)
  if (idx < 0) return null
  return eras[idx + 1]?.key ?? null
}
