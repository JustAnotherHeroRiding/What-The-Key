import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import tw from '../../../utils/config/tailwindRN'
import { NOTES as chromaticScale } from '../../../utils/track-formating'

// Helper function to get note name from fret number
const getNoteAtFret = (openStringNote: string, fret: number): string => {
  const openNoteIndex = chromaticScale.findIndex(note => note === openStringNote)
  const noteIndex = (openNoteIndex + fret) % chromaticScale.length
  return chromaticScale[noteIndex]
}

interface FretboardProps {
  scaleNotes: string[]
}

const Fretboard: React.FC<FretboardProps> = ({ scaleNotes }) => {
  const strings = ['E', 'B', 'G', 'D', 'A', 'E'].reverse() // Standard tuning
  const frets = Array.from({ length: 15 }, (_, i) => i)

  return (
    <View style={tw`flex-1 flex-col`}>
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
            <Fret key={`${stringIndex}-${fretIndex}`} string={string} fret={fret} scaleNotes={scaleNotes} />
          ))}
        </View>
      ))}
    </View>
  )
}

interface FretProps {
  string: string
  fret: number
  scaleNotes: string[]
}

const Fret: React.FC<FretProps> = ({ string, fret, scaleNotes }) => {
  const note = getNoteAtFret(string, fret)
  const isNoteInScale = scaleNotes.includes(note)

  return (
    <View
      style={tw`p-1 w-10 h-10 justify-center items-center ${isNoteInScale ? 'bg-blue-500' : 'bg-gray-200'} rounded-md border border-gray-400 m-0.5`}
    >
      {isNoteInScale && <Text style={tw`text-xs font-bold`}>{note}</Text>}
    </View>
  )
}

export default Fretboard
