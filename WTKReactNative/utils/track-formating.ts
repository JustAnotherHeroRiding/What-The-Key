export interface Interval {
  note: string
  interval: string
}

export type Mode = 'Major' | 'Minor'

export const NOTES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']
export const intervalNamesSingle = [
  'P1', // Root or Unison
  'm2', // Minor 2nd
  'M2', // Major 2nd
  'm3', // Minor 3rd
  'M3', // Major 3rd
  'P4', // Perfect 4th
  'd5', // Diminished 5th
  'P5', // Perfect 5th
  'm6', // Minor 6th
  'M6', // Major 6th
  'm7', // Minor 7th
  'M7', // Major 7th
]

// Unused for now, used the short names instead to display more information
const intervalNames: Record<Mode, string[]> = {
  Major: ['Unison', 'Major 2nd', 'Major 3rd', 'Perfect 4th', 'Perfect 5th', 'Major 6th', 'Major 7th', 'Octave'],
  Minor: ['Unison', 'Major 2nd', 'Minor 3rd', 'Perfect 4th', 'Perfect 5th', 'Minor 6th', 'Minor 7th', 'Octave'],
}

export const intervalSymbols: Record<Mode, string[]> = {
  Major: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7', 'P8'],
  Minor: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7', 'P8'],
}

const intervalPatterns: Record<Mode, number[]> = {
  Major: [2, 2, 1, 2, 2, 2, 1], // Major scale: W-W-H-W-W-W-H
  Minor: [2, 1, 2, 2, 1, 2, 2], // Natural Minor scale: W-H-W-W-H-W-W
}

type ScaleIntervals = Partial<Record<Mode, Interval[]>>

export function getNoteName(key: number): string {
  if (key >= 0 && key <= 11) {
    return NOTES[key]
  } else {
    return 'Key not found'
  }
}
export function getIntervals(key: number, mode: Mode | 'Both'): ScaleIntervals {
  let result: Record<Mode, Interval[]> = {
    Major: [],
    Minor: [],
  }

  // Always calculate both Major and Minor for simplicity, and choose what to return later
  Object.entries(intervalPatterns).forEach(([currentMode, scalePattern]) => {
    let currentIndex = key
    let currentIntervals: Interval[] = []
    scalePattern.forEach((step, index) => {
      currentIndex = (currentIndex + step) % NOTES.length
      const intervalName = intervalSymbols[currentMode as Mode][index]
      currentIntervals.push({ note: NOTES[currentIndex], interval: intervalName })
    })
    result[currentMode as Mode] = currentIntervals
  })

  // If mode is not 'Both', filter the result to only include the requested mode
  if (mode !== 'Both') {
    return { [mode]: result[mode] }
  }

  return result
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
