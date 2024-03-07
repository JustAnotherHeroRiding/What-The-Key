import { capitalizeFirstLetter } from './text-formatting'
import { Mode, NOTES, intervalNamesSingle } from './track-formating'

export const SCALES = ['major', 'naturalMinor', 'harmonicMinor']
export const MODES = ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian']
export const PENTATONIC = ['majorPentatonic', 'minorPentatonic']
export const BLUES = ['majorBlues', 'minorBlues']
export const DIMINISHED = ['diminishedWholeHalf', 'diminishedHalfWhole']
export const WHOLETONE = ['wholeTone']
export const CHROMATIC = ['chromatic']

interface ScaleData {
  name: string
  description: string
  intervals?: number[]
}

export const allScaleNames = [
  'major',
  'naturalMinor',
  'harmonicMinor',
  'majorPentatonic',
  'minorPentatonic',
  'majorBlues',
  'minorBlues',
  'diminishedWholeHalf',
  'diminishedHalfWhole',
  'wholeTone',
  'chromatic',
]

export const allModeNames = ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian']
export type ModeNames = 'ionian' | 'dorian' | 'phrygian' | 'lydian' | 'mixolydian' | 'aeolian' | 'locrian'
export type ScaleName =
  | 'major'
  | 'naturalMinor'
  | 'harmonicMinor'
  | 'majorPentatonic'
  | 'minorPentatonic'
  | 'majorBlues'
  | 'minorBlues'
  | 'diminishedWholeHalf'
  | 'diminishedHalfWhole'
  | 'wholeTone'
  | 'chromatic'

type ScalesAndModesData = {
  [key in ScaleName | ModeNames]?: ScaleData
}

export interface scaleNotesAndIntervals {
  name: ScaleName | ModeNames | Mode
  notes: string[]
  intervals: string[]
}

export const SCALES_DATA: ScalesAndModesData = {
  major: {
    name: 'Major',
    description: 'Ionian mode, a happy and bright sound.',
    intervals: [2, 2, 1, 2, 2, 2, 1],
  },
  naturalMinor: {
    name: 'Natural Minor',
    description: 'Aeolian mode, a sad and dark sound.',
    intervals: [2, 1, 2, 2, 1, 2, 2],
  },
  harmonicMinor: {
    name: 'Harmonic Minor',
    description: 'A minor scale with a raised seventh degree.',
    intervals: [2, 1, 2, 2, 1, 3, 1],
  },
  majorPentatonic: {
    name: 'Major Pentatonic',
    description: 'A five-note scale derived from the major scale.',
    intervals: [2, 2, 3, 2, 3],
  },
  minorPentatonic: {
    name: 'Minor Pentatonic',
    description: 'A five-note scale derived from the natural minor scale.',
    intervals: [3, 2, 2, 3, 2],
  },
  majorBlues: {
    name: 'Major Blues',
    description: 'A variation of the major pentatonic with an added blues note.',
    intervals: [2, 1, 1, 3, 2, 3],
  },
  minorBlues: {
    name: 'Minor Blues',
    description: 'A variation of the minor pentatonic with an added blues note.',
    intervals: [3, 2, 1, 1, 3, 2],
  },
  diminishedWholeHalf: {
    name: 'Diminished Whole-Half',
    description: 'An eight-note scale with alternating whole and half steps.',
    intervals: [2, 1, 2, 1, 2, 1, 2, 1],
  },
  diminishedHalfWhole: {
    name: 'Diminished Half-Whole',
    description: 'An eight-note scale with alternating half and whole steps.',
    intervals: [1, 2, 1, 2, 1, 2, 1, 2],
  },
  wholeTone: {
    name: 'Whole Tone',
    description: 'A six-note scale where each note is a whole step apart.',
    intervals: [2, 2, 2, 2, 2, 2],
  },
  chromatic: {
    name: 'Chromatic',
    description: 'All twelve pitches in an octave played in succession.',
    intervals: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
}

export const MODES_DATA: ScalesAndModesData = {
  ionian: {
    name: 'Ionian',
    description: 'Major scale, a happy and bright sound.',
    intervals: [2, 2, 1, 2, 2, 2, 1],
  },
  dorian: {
    name: 'Dorian',
    description: 'Minor scale with a major sixth, a jazzy sound.',
    intervals: [2, 1, 2, 2, 2, 1, 2],
  },
  phrygian: {
    name: 'Phrygian',
    description: 'Minor scale with a lowered second, a Spanish sound.',
    intervals: [1, 2, 2, 2, 1, 2, 2],
  },
  lydian: {
    name: 'Lydian',
    description: 'Major scale with a raised fourth, a dreamy sound.',
    intervals: [2, 2, 2, 1, 2, 2, 1],
  },
  mixolydian: {
    name: 'Mixolydian',
    description: 'Major scale with a lowered seventh, a bluesy sound.',
    intervals: [2, 2, 1, 2, 2, 1, 2],
  },
  aeolian: {
    name: 'Aeolian',
    description: 'Natural minor scale, a sad and dark sound.',
    intervals: [2, 1, 2, 2, 1, 2, 2],
  },
  locrian: {
    name: 'Locrian',
    description: 'Diminished scale with a lowered second and fifth, a dissonant sound.',
    intervals: [1, 2, 2, 1, 2, 2, 2],
  },
}
const getIntervalName = (interval: number): string => {
  return interval >= 0 && interval < intervalNamesSingle.length ? intervalNamesSingle[interval] : ''
}
export const scaleOrModeOptions = ['scale', 'mode']
export type scaleOrModeOptions = (typeof scaleOrModeOptions)[number]

export const getScaleOrModeNotes = (
  key: string,
  scaleName: ScaleName | ModeNames,
  type: scaleOrModeOptions,
): scaleNotesAndIntervals | null => {
  let scaleData

  switch (type) {
    case 'scale':
      scaleData = SCALES_DATA[scaleName]
      break
    case 'mode':
      scaleData = MODES_DATA[scaleName]
      break
    default:
      return null
  }

  if (scaleData) {
    const keyIndex = NOTES.indexOf(key)
    if (keyIndex !== -1) {
      const scaleIntervals = scaleData.intervals ?? []
      let currentNoteIndex = keyIndex
      let cumulativeInterval = 0

      const scaleNotes: scaleNotesAndIntervals = {
        name: scaleName,
        notes: [key],
        intervals: [],
      }

      // Iterate over the intervals, calculating notes and cumulative intervals
      scaleIntervals.forEach((interval, index) => {
        if (index > 0) {
          cumulativeInterval += scaleIntervals[index - 1] // Add the previous interval to cumulative
        }

        // Calculate the next note
        currentNoteIndex = (currentNoteIndex + interval) % NOTES.length
        if (index < scaleIntervals.length - 1) {
          // Check if it's not the last iteration
          scaleNotes.notes.push(NOTES[currentNoteIndex])
        }

        // Add interval name for all but the last step (which goes back to root)
        const intervalName = getIntervalName(cumulativeInterval)
        scaleNotes.intervals.push(intervalName)
      })

      return scaleNotes
    }
  }
  return null
}

const calculateNoteFromIntervalSimple = (key: string, interval: number): string => {
  const startIndex = NOTES.findIndex(note => note === key)
  const noteIndex = (startIndex + interval) % NOTES.length
  return NOTES[noteIndex]
}

const majorTriadIntervals = [0, 4, 7] // Root, Major third, Perfect fifth
const minorTriadIntervals = [0, 3, 7] // Root, Minor third, Perfect fifth

export const getTriadNotes = (key: string, mode: Mode): scaleNotesAndIntervals => {
  const intervals = mode === 'Major' ? majorTriadIntervals : minorTriadIntervals
  const notes = intervals.map(interval => calculateNoteFromIntervalSimple(key, interval))

  const intervalNames = mode === 'Major' ? ['P1', 'M3', 'P5'] : ['P1', 'm3', 'P5']

  return {
    name: mode,
    notes,
    intervals: intervalNames,
  }
}
