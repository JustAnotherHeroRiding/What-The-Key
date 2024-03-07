import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import tw from '../../../utils/config/tailwindRN'
import { NOTES as chromaticScale, intervalNamesSingle } from '../../../utils/track-formating'
import { CustomButton } from './CustomButtom'
import { scaleNotesAndIntervals } from '../../../utils/scales-and-modes'
import * as ScreenOrientation from 'expo-screen-orientation'
import { transform } from 'lodash'
import { useOrientation } from '../../../utils/Context/OrientationProvider'

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
  const { isLandscape, toggleOrientation } = useOrientation()

  const toggleNoteType = useCallback(() => {
    setNoteType(prevType => (prevType === 'note' ? 'interval' : 'note'))
  }, [])

  const [noteRotation, setNoteRotation] = useState(0)

  const rotateNotes = useCallback(() => {
    // Add 90 degrees to the current rotation, and use modulus to ensure it doesn't exceed 360
    const newRotation = (noteRotation + 90) % 360
    setNoteRotation(newRotation)
  }, [noteRotation])

  return (
    <ScrollView>
      {/* flex-row for portait */}
      <ScrollView
        horizontal={true}
        style={tw.style('flex-row')}
        contentContainerStyle={tw.style(`justify-between gap-2`)}
      >
        <CustomButton
          title={`Show ${noteType === 'note' ? 'Intervals' : 'Notes'}`}
          onPress={() => toggleNoteType()}
        ></CustomButton>
        <CustomButton onPress={toggleOrientation} title={isLandscape ? 'Portrait' : 'Landscape'}></CustomButton>
        <CustomButton
          disabled={isLandscape}
          btnStyle={{ opacity: isLandscape ? 0.7 : 1 }}
          onPress={rotateNotes}
          title={'Rotate'}
        ></CustomButton>
      </ScrollView>
      {/*  flex-col for portait  */}
      <View style={tw.style('flex-1', isLandscape ? 'flex-row' : 'flex-col')}>
        {/* String Names */}
        {/* flex-row for portait */}

        <View style={tw`${isLandscape ? 'flex-col' : 'flex-row'} justify-center ml-10 items-center`}>
          {strings.map((string, stringIndex) => (
            <Text
              key={stringIndex}
              style={tw.style(
                `w-10 h-10 p-1 m-0.5 text-xl text-center text-white`,
                !isLandscape && { transform: [{ rotate: `${noteRotation}deg` }] },
              )}
            >
              {string}
            </Text>
          ))}
        </View>

        {/* Frets and Fret Numbers */}
        {/* flex-row for portait */}
        <ScrollView horizontal={isLandscape}>
          {frets.map((fret, fretIndex) => (
            <View
              key={fretIndex}
              style={tw.style('items-center justify-center', isLandscape ? 'flex-col' : 'flex-row')}
            >
              {/* Fret Number */}
              <Text
                style={tw.style(
                  `w-10 h-10 text-xl text-center text-white`,
                  !isLandscape && { transform: [{ rotate: `${noteRotation}deg` }] },
                )}
              >
                {fret}
              </Text>

              {/* Frets for each string */}
              {strings.map((string, stringIndex) => (
                <Fret
                  key={`${stringIndex}-${fretIndex}`}
                  string={string}
                  fret={fret}
                  scaleNotes={scaleNotes}
                  noteType={noteType}
                  isLandscape={isLandscape}
                  noteRotation={noteRotation}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  )
}

interface FretProps {
  string: string
  fret: number
  scaleNotes: scaleNotesAndIntervals
  noteType: NoteType
  isLandscape: boolean
  noteRotation: number
}

const Fret: React.FC<FretProps> = React.memo(({ string, fret, scaleNotes, noteType, isLandscape, noteRotation }) => {
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
      style={tw.style(
        [
          'p-1 w-10  h-10 justify-center items-center shadow-lg shadow-slate-200 rounded-md m-0.5',
          isNoteInScale ? 'border border-gray-400' : '',
          isNoteInScale ? (isRootNote ? 'bg-beigeCustom border-2 border-slate-800' : 'bg-creamLight') : 'bg-slate-200',
        ],
        isLandscape
          ? {
              transform: [{ rotate: '360deg' }],
            }
          : { transform: [{ rotate: `${noteRotation}deg` }] },
      )}
    >
      {isNoteInScale && (
        <Text style={tw.style([` ${isRootNote ? 'text-xl' : 'text-lg'}`], { fontFamily: 'figtree-bold' })}>{note}</Text>
      )}
    </View>
  )
})

export default Fretboard
