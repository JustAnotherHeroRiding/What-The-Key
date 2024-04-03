import {
  MODES_DATA,
  ModeNames,
  SCALES_DATA,
  ScaleName,
  TwelveBarVariants,
  TwelveBars,
  majorTriadIntervals,
  minorTriadIntervals,
  scaleNotesAndIntervals,
  scaleOrModeOptions,
  seventhLookup,
  twelveBarsLookup,
} from './consts/scales-consts-types'
import { FretNumber, StringNames } from './consts/soundFilesTypes'
import { IntervalNames, Mode, NOTES, intervalNamesSingle } from './track-formating'

const getIntervalName = (interval: number): string => {
  return interval >= 0 && interval < intervalNamesSingle.length ? intervalNamesSingle[interval] : ''
}

type StringNoteOrder = Record<StringNames, string[]>

const getStringNoteOrder: StringNoteOrder = {
  E: ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
  A: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
  D: ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#'],
  G: ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'],
  B: ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#'],
  e: ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#'],
}

export const getIntervalToFretMapping = (
  startingNote: string,
  string: StringNames,
): Record<IntervalNames, FretNumber> => {
  const notes = getStringNoteOrder[string]
  const startIndex = notes.indexOf(startingNote)

  if (startIndex === -1) {
    throw new Error(`Invalid starting note for string ${string}: ${startingNote}`)
  }

  const mapping: Record<IntervalNames, FretNumber> = {} as Record<IntervalNames, FretNumber>

  intervalNamesSingle.forEach((interval, index) => {
    const noteIndex = (startIndex + index) % notes.length
    const fretNumber = noteIndex === 0 ? 12 : (noteIndex as FretNumber) // Wrap around to 12 for the note B
    mapping[interval] = fretNumber
  })

  return mapping
}

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

// Here we do not cumulatively calculate the interval as we always know the exact location of
// each interval needed to construct the triad
const calculateNoteFromIntervalSimple = (key: string, interval: number): string => {
  const startIndex = NOTES.findIndex(note => note === key)
  const noteIndex = (startIndex + interval) % NOTES.length
  return NOTES[noteIndex]
}

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

export const getTwelveBars = (key: string, type: TwelveBarVariants = 'standard'): TwelveBars => {
  const notes = twelveBarsLookup[type].map(interval => calculateNoteFromIntervalSimple(key, interval))

  const intervalNames = twelveBarsLookup[type].map(interval => getIntervalName(interval))

  return {
    notes,
    intervalNames: intervalNames,
  }
}

export const getSeventhNotes = (key: string, mode: Mode = 'Major', addFifth: boolean): scaleNotesAndIntervals => {
  // Clone the array to avoid mutating the original lookup data
  let intervals = [...seventhLookup[mode]]

  // If addFifth is true, insert the perfect fifth (7 semitones) into the array
  // Assuming you want to insert it in the correct order for a chord (after the third but before the seventh)
  if (addFifth) {
    // Find the correct position based on existing intervals
    // Since the array is already sorted, the fifth (7 semitones) should come after the third but before the seventh
    const fifthPos = intervals.findIndex(interval => interval > 7)
    if (fifthPos === -1) {
      // If the fifth is larger than any interval present, add it to the end
      intervals.push(7)
    } else {
      intervals.splice(fifthPos, 0, 7) // Otherwise, insert it at the correct position
    }
  }

  const notes = intervals.map(interval => calculateNoteFromIntervalSimple(key, interval))
  const intervalNames = intervals.map(interval => getIntervalName(interval))

  return {
    name: mode,
    notes,
    intervals: intervalNames,
  }
}

export const selectSeventh = (
  mode: Mode,
  setSelectedOption: (values: React.SetStateAction<scaleNotesAndIntervals | null>) => void,
  selectedKey: string,
  addFifth: boolean = false,
) => {
  const scaleNotes = getSeventhNotes(selectedKey, mode, addFifth)
  console.log(selectedKey, mode, addFifth)
  setSelectedOption(scaleNotes)
}

export const selectTriads = (
  mode: Mode,
  setSelectedOption: (values: React.SetStateAction<scaleNotesAndIntervals | null>) => void,
  selectedKey: string,
) => {
  const scaleNotes = getTriadNotes(selectedKey, mode)
  setSelectedOption(scaleNotes)
}

export const selectScale = (
  type: scaleOrModeOptions,
  setSelectedOption: (values: React.SetStateAction<scaleNotesAndIntervals | null>) => void,
  selectedKey: string,
  scaleName: ScaleName | ModeNames,
) => {
  const scaleNotes = getScaleOrModeNotes(selectedKey, scaleName, type)
  setSelectedOption(scaleNotes)
}
