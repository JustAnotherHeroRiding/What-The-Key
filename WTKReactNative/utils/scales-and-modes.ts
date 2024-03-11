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
import { Mode, NOTES, intervalNamesSingle } from './track-formating'

const getIntervalName = (interval: number): string => {
  return interval >= 0 && interval < intervalNamesSingle.length ? intervalNamesSingle[interval] : ''
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

const getSeventhNotes = (key: string, mode: Mode = 'Major'): scaleNotesAndIntervals => {
  const notes = seventhLookup[mode].map(interval => calculateNoteFromIntervalSimple(key, interval))
  const intervalNames = seventhLookup[mode].map(interval => getIntervalName(interval))
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
) => {
  const scaleNotes = getSeventhNotes(selectedKey, mode)
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
