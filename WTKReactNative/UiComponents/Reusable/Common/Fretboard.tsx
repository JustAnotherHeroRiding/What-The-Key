import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View, Text } from 'react-native'
import tw from '../../../utils/config/tailwindRN'
import { NOTES as chromaticScale, intervalNamesSingle } from '../../../utils/track-formating'
import { CustomButton } from './CustomButtom'
import { scaleNotesAndIntervals } from '../../../utils/scales-and-modes'
import * as ScreenOrientation from 'expo-screen-orientation'

const getNoteAtFret = (openStringNote: string, fret: number, key: string, noteType: 'interval' | 'note'): string => {
  const openNoteIndex = chromaticScale.findIndex(note => note === openStringNote)
  const noteIndex = (openNoteIndex + fret) % chromaticScale.length
  const note = chromaticScale[noteIndex]

  if (noteType === 'note') {
    return note
  } else if (noteType === 'interval') {
    const keyIndex = chromaticScale.findIndex(note => note === key)
    // Calculate interval index, ensuring it wraps correctly at the octave
    let intervalIndex = (noteIndex - keyIndex + chromaticScale.length) % chromaticScale.length

    // Since there's no explicit 'Octave' in the array, wrap around to use 'P1' for octave
    return intervalNamesSingle[intervalIndex]
  }
  // Fallback to returning the note if something unexpected occurs
  return note
}

interface FretboardProps {
  scaleNotes: scaleNotesAndIntervals
}

type NoteType = 'note' | 'interval'

const Fretboard: React.FC<FretboardProps> = ({ scaleNotes }) => {
  const strings = ['E', 'B', 'G', 'D', 'A', 'E'].reverse() // Standard tuning
  const frets = Array.from({ length: 15 }, (_, i) => i)
  const [noteType, setNoteType] = useState<NoteType>('note')

  const toggleNoteType = useCallback(() => {
    setNoteType(prevType => (prevType === 'note' ? 'interval' : 'note'))
  }, [])

  const [isLandscape, setIsLandscape] = useState(false)

  const toggleOrientation = useCallback(async () => {
    const currentOrientation = await ScreenOrientation.getOrientationAsync()
    if (
      currentOrientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
      currentOrientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
    ) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
      setIsLandscape(false)
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
      setIsLandscape(true)
    }
  }, [])

  useEffect(() => {
    // Function to update state based on current orientation
    const updateOrientationState = async () => {
      const orientationInfo = await ScreenOrientation.getOrientationAsync()
      setIsLandscape(
        orientationInfo === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
          orientationInfo === ScreenOrientation.Orientation.LANDSCAPE_RIGHT,
      )
    }

    // Add orientation change listener
    const subscription = ScreenOrientation.addOrientationChangeListener(() => {
      updateOrientationState()
    })

    // Initial orientation check
    updateOrientationState()

    // Cleanup
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription)
    }
  }, [])

  useEffect(() => {
    console.log('isLandscape', isLandscape)
  }, [isLandscape])

  return (
    <View style={tw`flex-1 flex-col`}>
      <View style={tw.style('flex-row justify-between')}>
        <CustomButton
          title={`Show ${noteType === 'note' ? 'Intervals' : 'Notes'}`}
          onPress={() => toggleNoteType()}
        ></CustomButton>
        <CustomButton onPress={toggleOrientation} title={isLandscape ? 'Portrait' : 'Landscape'}></CustomButton>
      </View>
      {/* String Names */}
      <View style={tw`flex-row justify-center ml-10 items-center`}>
        {strings.map((string, stringIndex) => (
          <Text key={stringIndex} style={tw`w-10 h-10 p-1 m-0.5 text-xl text-center text-white`}>
            {string}
          </Text>
        ))}
      </View>

      {/* Frets and Fret Numbers */}
      {frets.map((fret, fretIndex) => (
        <View key={fretIndex} style={tw`flex-row items-center justify-center`}>
          {/* Fret Number */}
          <Text style={tw`w-10 h-10 text-xl text-center text-white`}>{fret}</Text>

          {/* Frets for each string */}
          {strings.map((string, stringIndex) => (
            <Fret
              key={`${stringIndex}-${fretIndex}`}
              string={string}
              fret={fret}
              scaleNotes={scaleNotes}
              noteType={noteType}
              isLandscape={isLandscape}
            />
          ))}
        </View>
      ))}
    </View>
  )
}

interface FretProps {
  string: string
  fret: number
  scaleNotes: scaleNotesAndIntervals
  noteType: NoteType
  isLandscape: boolean
}

const Fret: React.FC<FretProps> = React.memo(({ string, fret, scaleNotes, noteType, isLandscape }) => {
  const scaleKey = scaleNotes.notes[0]
  const note = useMemo(() => getNoteAtFret(string, fret, scaleKey, noteType), [string, fret, scaleKey, noteType])

  let isNoteInScale = false
  if (noteType === 'note') {
    isNoteInScale = scaleNotes.notes.includes(note)
  } else if (noteType === 'interval') {
    isNoteInScale = scaleNotes.intervals.includes(note)
  }

  const isRootNote = note === 'P1' || note === scaleKey

  return (
    <View
      style={tw.style([
        'p-1 w-10 h-10 justify-center items-center shadow-lg shadow-slate-200 rounded-md m-0.5',
        isNoteInScale ? 'border border-gray-400' : '',
        isNoteInScale ? (isRootNote ? 'bg-beigeCustom border-2 border-slate-800' : 'bg-creamLight') : 'bg-slate-200',
      ])}
    >
      {isNoteInScale && (
        <Text style={tw.style([isRootNote ? 'text-xl' : 'text-lg'], { fontFamily: 'figtree-bold' })}>{note}</Text>
      )}
    </View>
  )
})

export default Fretboard
