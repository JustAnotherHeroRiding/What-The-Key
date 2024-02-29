import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import tw from '../../../utils/config/tailwindRN'
import { NOTES as chromaticScale, intervalNamesSingle } from '../../../utils/track-formating'
import { CustomButton } from './CustomButtom'
import { scaleNotesAndIntervals } from '../../../utils/scales-and-modes'

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

  return (
    <View style={tw`flex-1 flex-col`}>
      <CustomButton
        title={`Show ${noteType === 'note' ? 'Intervals' : 'Notes'}`}
        onPress={() => setNoteType(noteType === 'note' ? 'interval' : 'note')}
      ></CustomButton>
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
              scaleKey={scaleNotes.notes[0]}
              noteType={noteType}
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
  scaleKey: string
  noteType: NoteType
}

const Fret: React.FC<FretProps> = ({ string, fret, scaleNotes, scaleKey, noteType }) => {
  const [isNoteInScale, setIsNoteInScale] = useState(false)
  const note = getNoteAtFret(string, fret, scaleKey, noteType)

  useEffect(() => {
    let inScale = false
    if (noteType === 'note') {
      inScale = scaleNotes.notes.includes(note)
    } else if (noteType === 'interval') {
      inScale = scaleNotes.intervals.includes(note)
      console.log(inScale, note)
    }
    setIsNoteInScale(inScale)
  }, [string, fret, scaleNotes, scaleKey, noteType])
  return (
    <View
      style={tw`p-1 w-10 h-10 justify-center items-center ${isNoteInScale ? (note === 'P1' || note === scaleKey ? 'bg-beigeCustom' : 'bg-creamLight') : 'bg-slate-200'} rounded-md border border-gray-400 m-0.5`}
    >
      {isNoteInScale && (
        <Text
          style={tw.style(` ${note === 'P1' || note === scaleKey ? 'text-xl' : 'text-lg'} `, {
            fontFamily: 'figtree-bold',
          })}
        >
          {note}
        </Text>
      )}
    </View>
  )
}

export default Fretboard
