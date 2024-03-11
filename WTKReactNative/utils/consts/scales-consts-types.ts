import { Mode } from '../track-formating'

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

export type ScalesAndModesData = {
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
export const scaleOrModeOptionsConst = ['scale', 'mode'] as const
export type scaleOrModeOptions = (typeof scaleOrModeOptionsConst)[number]
export type extendedScaleType = scaleOrModeOptions | 'triad' | 'seventh'

export const majorTriadIntervals = [0, 4, 7] // Root, Major third, Perfect fifth
export const minorTriadIntervals = [0, 3, 7] // Root, Minor third, Perfect fifth

export interface TwelveBars {
  notes: string[]
  intervalNames: string[]
}

export type TwelveBarVariants = 'standard' | 'shuffle' | 'quickToFour'

export type TwelveBarsData = Record<TwelveBarVariants, number[]>
export type SeventhData = Record<Mode, number[]>

export const twelveBarIntervals = [0, 0, 0, 0, 5, 5, 0, 0, 7, 7, 0, 0]
export const shuffleBluesIntervals = [0, 0, 0, 0, 5, 5, 0, 0, 7, 5, 0, 0]
export const quickToFourIntervals = [0, 5, 0, 0, 5, 5, 0, 0, 7, 7, 0, 0]

export const twelveBarsLookup: TwelveBarsData = {
  standard: twelveBarIntervals,
  shuffle: shuffleBluesIntervals,
  quickToFour: quickToFourIntervals,
}

export const seventhLookup: SeventhData = {
  Major: [0, 4, 10],
  Minor: [0, 3, 10],
}
