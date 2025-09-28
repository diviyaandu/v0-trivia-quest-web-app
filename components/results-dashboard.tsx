function getTitle(percent: number) {
  if (percent >= 95) return "Temporal Grandmaster"
  if (percent >= 85) return "History Sage"
  if (percent >= 75) return "Time Explorer"
  if (percent >= 65) return "Era Apprentice"
  if (percent >= 50) return "Time Tourist"
  return "Future Historian"
}
