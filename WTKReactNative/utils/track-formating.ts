export function getNoteName(key: number): string {
  const notes = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']
  if (key >= 0 && key <= 11) {
    return notes[key]
  } else {
    return 'Key not found'
  }
}

export function formatDuration(durationMs: number) {
  const totalSeconds = Math.floor(durationMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

  return `${minutes}:${formattedSeconds}`
}

export function formatTimeSignature(time: number) {
  if (time === 1) {
    return 4
  } else {
    return time
  }
}
