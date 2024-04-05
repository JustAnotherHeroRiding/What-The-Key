import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-elements'
import {
  scaleNotesAndIntervals,
  scaleNotesAndIntervalsExpanded,
  ScaleName,
  ModeNames,
  allScaleNames,
  allTheoryElements,
} from '../../../utils/consts/scales-consts-types'
import tw from '../../../utils/config/tailwindRN'
import {
  getIntervalToFretMapping,
  getScaleOrModeNotes,
  getSeventhNotes,
  getTriadNotes,
} from '../../../utils/scales-and-modes'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../utils/types/nav-types'
import { useSounds } from '../../../utils/Context/SoundPlayer'
import { soundFiles } from '../../../utils/consts/soundFilesTypes'
import { splitAndJoinAndCapitalizeFirstLetter } from '../../../utils/formating/split-camel-case'
import NoteIntervalColumns from '../Theory/NoteIntervalColumns'

function TheoryOfTheDay() {
  const STRING = 'B'
  const KEY = 'C'
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList['MainTab']>>()
  const [theory, setTheory] = useState<scaleNotesAndIntervalsExpanded | null>(null)

  const { playSound, loadSounds } = useSounds()
  // Hardcoded the B string as it seems to sound the best, the function allows to pick any key or string
  const intervalToFret = getIntervalToFretMapping(KEY, STRING)

  function getTheoryOfTheDay() {
    // Calculate a unique index for each day
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now.getTime() - start.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const dayOfYear = Math.floor(diff / oneDay)

    // Use the day of the year to select a theory element
    const index = dayOfYear % allTheoryElements.length
    const theoryOfTheDay = allTheoryElements[index]
    let scaleNotes: scaleNotesAndIntervals
    if (theoryOfTheDay?.name.toLowerCase() === 'seventh') {
      scaleNotes = getSeventhNotes(KEY, 'Major', true)
    } else if (theoryOfTheDay?.name.toLowerCase() === 'triad') {
      scaleNotes = getTriadNotes(KEY, 'Major')
    } else {
      const scaleType = allScaleNames.includes(theoryOfTheDay.name as ScaleName) ? 'scale' : 'mode'
      scaleNotes = getScaleOrModeNotes(
        KEY,
        theoryOfTheDay.name as ScaleName | ModeNames,
        scaleType,
      ) as scaleNotesAndIntervals
    }
    const theoryNew: scaleNotesAndIntervalsExpanded = {
      name: theoryOfTheDay.name as ScaleName | ModeNames | 'triad' | 'seventh',
      description: theoryOfTheDay.description,
      notes: scaleNotes?.notes ?? [],
      intervals: scaleNotes?.intervals ?? [],
    }
    //setTheory(theoryNew)
    setTheory(theoryNew)
  }

  useEffect(() => {
    getTheoryOfTheDay()
    loadSounds(soundFiles)
  }, [])

  return (
    <View style={tw.style(`p-2`)}>
      <View style={tw.style(`gap-2`)}>
        <Text style={tw.style(`text-beigeCustom text-2xl font-bold`)}>Theory of the Day</Text>

        <Text style={tw.style(`text-slate-50 text-2xl text-center`, { fontFamily: 'figtree-bold' })}>
          {theory?.name === 'seventh'
            ? 'Seventh Chords'
            : theory?.name === 'triad'
              ? 'Triads'
              : splitAndJoinAndCapitalizeFirstLetter(theory?.name ?? '')}
        </Text>
      </View>
      <Text style={tw.style(`text-slate-200 text-xl text-center`, { fontFamily: 'figtree-bold' })}>
        {theory?.description}
      </Text>
      <View style={tw.style(`flex-row gap-2 justify-center flex-wrap my-2`)}>
        <NoteIntervalColumns selectedOption={theory} intervalToFret={intervalToFret} />
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Study', {
            // I need a better way to find the scale type of the theory
            preselectedType:
              theory?.name === 'triad' || theory?.name === 'seventh'
                ? theory.name
                : allScaleNames.includes(theory?.name as ScaleName)
                  ? 'scale'
                  : 'mode',
            preselectedScale: theory?.name as ScaleName | ModeNames | 'seventh' | 'triad',
          })
        }
      >
        <Text
          style={tw.style(`text-black p-2 rounded-lg text-xl text-center bg-cream ml-auto`, {
            fontFamily: 'figtree-bold',
          })}
        >
          Learn
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default TheoryOfTheDay
