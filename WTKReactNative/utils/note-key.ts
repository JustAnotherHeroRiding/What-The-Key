export function getNoteName(key: number): string {
  const notes = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']
  if (key >= 0 && key <= 11) {
    return notes[key]
  } else {
    return 'Key not found'
  }
}
