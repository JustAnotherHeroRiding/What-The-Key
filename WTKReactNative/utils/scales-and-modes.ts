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
  },
  dorian: {
    name: 'Dorian',
    description: 'Minor scale with a major sixth, a jazzy sound.',
  },
  phrygian: {
    name: 'Phrygian',
    description: 'Minor scale with a lowered second, a Spanish sound.',
  },
  lydian: {
    name: 'Lydian',
    description: 'Major scale with a raised fourth, a dreamy sound.',
  },
  mixolydian: {
    name: 'Mixolydian',
    description: 'Major scale with a lowered seventh, a bluesy sound.',
  },
  aeolian: {
    name: 'Aeolian',
    description: 'Natural minor scale, a sad and dark sound.',
  },
  locrian: {
    name: 'Locrian',
    description: 'Diminished scale with a lowered second and fifth, a dissonant sound.',
  },
}

export const PENTATONIC_DATA: ScalesAndModesData = {
  majorPentatonic: {
    name: 'Major Pentatonic',
    description: 'A five-note scale derived from the major scale.',
  },
  minorPentatonic: {
    name: 'Minor Pentatonic',
    description: 'A five-note scale derived from the natural minor scale.',
  },
}

export const BLUES_DATA: ScalesAndModesData = {
  majorBlues: {
    name: 'Major Blues',
    description: 'A variation of the major pentatonic with an added blues note.',
  },
  minorBlues: {
    name: 'Minor Blues',
    description: 'A variation of the minor pentatonic with an added blues note.',
  },
}

export const DIMINISHED_DATA: ScalesAndModesData = {
  diminishedWholeHalf: {
    name: 'Diminished Whole-Half',
    description: 'An eight-note scale with alternating whole and half steps.',
  },
  diminishedHalfWhole: {
    name: 'Diminished Half-Whole',
    description: 'An eight-note scale with alternating half and whole steps.',
  },
}

export const WHOLETONE_DATA: ScalesAndModesData = {
  wholeTone: {
    name: 'Whole Tone',
    description: 'A six-note scale where each note is a whole step apart.',
  },
}

export const CHROMATIC_DATA: ScalesAndModesData = {
  chromatic: {
    name: 'Chromatic',
    description: 'All twelve pitches in an octave played in succession.',
  },
}
export const getScaleNotes = (key: string, scaleName: ScaleName): string[] | null => {
  const scaleData = SCALES_DATA[scaleName]

  if (scaleData) {
    const keyIndex = NOTES.indexOf(key)
    if (keyIndex !== -1) {
      const scaleNotes = [key]
      let currentNoteIndex = keyIndex
      for (const interval of scaleData.intervals ?? []) {
        currentNoteIndex = (currentNoteIndex + interval) % NOTES.length
        scaleNotes.push(NOTES[currentNoteIndex])
      }
      console.log(scaleNotes)

      return scaleNotes
    }
  }
  return null
}
