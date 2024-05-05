import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'
import tw from '../../../utils/config/tailwindRN'
import { NOTES as chromaticScale, intervalNamesSingle } from '../../../utils/formating/track-formating'
import { CustomButton } from '../Common/CustomButtom'
import { scaleNotesAndIntervals } from '../../../utils/consts/scales-consts-types'
import { useSounds } from '../../../utils/Context/SoundPlayer'
import { StringNames, FretNumber, NoteType, soundFiles } from '../../../utils/consts/soundFilesTypes'
import { GestureHandlerRootView, LongPressGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler'

const getNoteAtFret = (openStringNote: string, fret: number, key: string, noteType: 'interval' | 'note'): string => {
  // we are passing a lowercase 'e' which returned duplicated notes from the b string
  const openNoteIndex = chromaticScale.findIndex(note => note === openStringNote.toUpperCase())
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

const Fretboard: React.FC<FretboardProps> = ({ scaleNotes }) => {
  const strings: StringNames[] = ['e', 'B', 'G', 'D', 'A', 'E'].reverse() as StringNames[] // Standard tuning
  const frets = Array.from({ length: 17 }, (_, i) => i) as FretNumber[]
  const [noteType, setNoteType] = useState<NoteType>('note')

  const { loadSounds } = useSounds()

  useEffect(() => {
    loadSounds(soundFiles)
  }, [])

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
    <>
      {/* flex-row for portait */}
      <View style={tw.style('flex-row justify-center gap-2 flex-wrap')}>
        <CustomButton
          title={`${noteType === 'note' ? 'Intervals' : 'Notes'}`}
          onPress={() => toggleNoteType()}
        ></CustomButton>
        <CustomButton disabled={false} onPress={rotateNotes} title={'Rotate'}></CustomButton>
      </View>
      {/*  flex-col for portait  */}
      {/* String Names */}

      <View style={tw.style(`flex-col`)}>
        <View style={tw.style(`h-11`)}>
          <View style={tw.style(`flex-row ml-11`)}>
            {strings.map((string, stringIndex) => (
              <Text key={stringIndex} style={tw.style(`w-11 h-11 p-1 m-0.5 text-xl text-center text-white`)}>
                {string}
              </Text>
            ))}
          </View>
        </View>
        {/* Frets and Fret Numbers */}
        {/* flex-row for portait */}
        <GestureHandlerRootView style={tw.style('justify-center items-center')}>
          {frets.map((fret, fretIndex) => (
            <View key={fretIndex} style={tw.style('flex-row')}>
              {/* Fret Number */}
              <Text
                style={tw.style(`w-11 h-11 mt-1 pt-2 text-xl text-center text-white`, {
                  transform: [{ rotate: `${noteRotation}deg` }],
                })}
              >
                {fret}
              </Text>

              {/* Frets for each string */}
              {strings.map((string, stringIndex) => (
                <Fret
                  key={`${string}-${stringIndex}`}
                  string={string}
                  fret={fret}
                  scaleNotes={scaleNotes}
                  noteType={noteType}
                  noteRotation={noteRotation}
                />
              ))}
            </View>
          ))}
        </GestureHandlerRootView>
      </View>
    </>
  )
}

interface FretProps {
  string: StringNames
  fret: FretNumber
  scaleNotes: scaleNotesAndIntervals
  noteType: NoteType
  noteRotation: number
}

const Fret: React.FC<FretProps> = ({ string, fret, scaleNotes, noteType, noteRotation }) => {
  const scaleKey = scaleNotes.notes[0]
  const note = useMemo(() => getNoteAtFret(string, fret, scaleKey, noteType), [string, fret, scaleKey, noteType])
  const { playSound, stopSound } = useSounds()

  const opacity = new Animated.Value(1)

  let isNoteInScale = false
  if (noteType === 'note') {
    isNoteInScale = scaleNotes.notes.includes(note)
  } else if (noteType === 'interval') {
    isNoteInScale = scaleNotes.intervals.includes(note)
  }

  const isRootNote = note === 'P1' || note === scaleKey

  const handlePressIn = () => {
    stopPreviousSound()
    playSound(string, fret)
    // Update the opacity to 0.5 when pressed
    Animated.timing(opacity, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    // Update the opacity back to 1 when released
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  useEffect(() => {
    return () => {
      stopPreviousSound()
    }
  }, [string, fret])

  const stopPreviousSound = () => {
    stopSound(string, fret)
  }

  return (
    <LongPressGestureHandler
      onHandlerStateChange={({ nativeEvent }) => {
        if (
          nativeEvent.state === State.END ||
          nativeEvent.state === State.CANCELLED ||
          nativeEvent.state === State.FAILED
        ) {
          handlePressOut()
        }
      }}
    >
      <TapGestureHandler
        numberOfTaps={1}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.BEGAN) {
            handlePressIn()
          } else if (
            nativeEvent.state === State.END ||
            nativeEvent.state === State.CANCELLED ||
            nativeEvent.state === State.FAILED
          ) {
            handlePressOut()
          }
        }}
      >
        <Animated.View
          style={tw.style(
            [
              'p-1 w-11  h-11 justify-center items-center shadow-lg shadow-slate-200 rounded-md m-0.5',
              isNoteInScale ? 'border border-gray-400' : '',
              isNoteInScale ? (isRootNote ? 'bg-beigeCustom border border-zinc-600' : 'bg-creamLight') : 'bg-slate-200',
            ],
            { transform: [{ rotate: `${noteRotation}deg` }] },
            { opacity },
          )}
        >
          {isNoteInScale && (
            <Text style={tw.style([` ${isRootNote ? 'text-xl' : 'text-lg'}`], { fontFamily: 'figtree-bold' })}>
              {note}
            </Text>
          )}
        </Animated.View>
      </TapGestureHandler>
    </LongPressGestureHandler>
  )
}

export default Fretboard
