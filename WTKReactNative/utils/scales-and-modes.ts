import { NOTES } from './track-formating'

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
  intervals?: number[] // Add the intervals property
}
export const allScaleNames = [
  'major',
  'naturalMinor',
  'harmonicMinor',
  'ionian',
  'dorian',
  'phrygian',
  'lydian',
  'mixolydian',
  'aeolian',
  'locrian',
  'majorPentatonic',
  'minorPentatonic',
  'majorBlues',
  'minorBlues',
  'diminishedWholeHalf',
  'diminishedHalfWhole',
  'wholeTone',
  'chromatic',
]
export type ScaleName =
  | 'major'
  | 'naturalMinor'
  | 'harmonicMinor'
  | 'ionian'
  | 'dorian'
  | 'phrygian'
  | 'lydian'
  | 'mixolydian'
  | 'aeolian'
  | 'locrian'
  | 'majorPentatonic'
  | 'minorPentatonic'
  | 'majorBlues'
  | 'minorBlues'
  | 'diminishedWholeHalf'
  | 'diminishedHalfWhole'
  | 'wholeTone'
  | 'chromatic'

type ScalesAndModesData = {
  [key in ScaleName]?: ScaleData
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

export const PENTATONIC_DATA: ScalesAndModesData = {
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
}

export const BLUES_DATA: ScalesAndModesData = {
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
}

export const DIMINISHED_DATA: ScalesAndModesData = {
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
}

export const WHOLETONE_DATA: ScalesAndModesData = {
  wholeTone: {
    name: 'Whole Tone',
    description: 'A six-note scale where each note is a whole step apart.',
    intervals: [2, 2, 2, 2, 2, 2],
  },
}

export const CHROMATIC_DATA: ScalesAndModesData = {
  chromatic: {
    name: 'Chromatic',
    description: 'All twelve pitches in an octave played in succession.',
    intervals: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
}

export const getScaleNotes = (key: string, scaleName: ScaleName): string[] | null => {
  const scaleData = SCALES_DATA[scaleName]

  if (scaleData) {
    const keyIndex = NOTES.indexOf(key)
    if (keyIndex !== -1) {
      const scaleIntervals = scaleData.intervals ?? []

      // Exclude the last interval
      const intervalsWithoutLast = scaleIntervals.slice(0, -1)

      const scaleNotes = [key]
      let currentNoteIndex = keyIndex

      for (const interval of intervalsWithoutLast) {
        currentNoteIndex = (currentNoteIndex + interval) % NOTES.length
        scaleNotes.push(NOTES[currentNoteIndex])
      }

      console.log(scaleNotes)

      return scaleNotes
    }
  }
  return null
}
