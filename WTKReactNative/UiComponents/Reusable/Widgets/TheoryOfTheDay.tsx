import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-elements'
import {
  SCALES_DATA,
  MODES_DATA,
  TRIAD_SEVENTH,
  scaleNotesAndIntervals,
  scaleNotesAndIntervalsExpanded,
  ScaleName,
  ModeNames,
  allScaleNames,
} from '../../../utils/consts/scales-consts-types'
import tw from '../../../utils/config/tailwindRN'
import { getScaleOrModeNotes, getSeventhNotes, getTriadNotes } from '../../../utils/scales-and-modes'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../utils/types/nav-types'
import { capitalizeFirstLetter } from '../../../utils/text-formatting'

const allTheoryElements = [...Object.values(SCALES_DATA), ...Object.values(MODES_DATA), ...Object.values(TRIAD_SEVENTH)]

function TheoryOfTheDay() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList['MainTab']>>()
  const [theory, setTheory] = useState<scaleNotesAndIntervalsExpanded | null>(null)

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
      scaleNotes = getSeventhNotes('C', 'Major', true)
    } else if (theoryOfTheDay?.name.toLowerCase() === 'triad') {
      scaleNotes = getTriadNotes('C', 'Major')
    } else {
      const scaleType = allScaleNames.includes(theoryOfTheDay.name as ScaleName) ? 'scale' : 'mode'
      scaleNotes = getScaleOrModeNotes(
        'C',
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
    setTheory(theoryNew)
  }

  useEffect(() => {
    getTheoryOfTheDay()
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
              : capitalizeFirstLetter(theory?.name ?? '')}
        </Text>
      </View>
      <Text style={tw.style(`text-slate-200 text-xl text-center`, { fontFamily: 'figtree-bold' })}>
        {theory?.description}
      </Text>
      <View style={tw.style(`flex-row gap-2 justify-center flex-wrap my-2`)}>
        {theory?.notes.map((note, index) => (
          <View
            key={`${note}-${index}`}
            style={tw.style(`p-1 bg-beigeCustom  justify-center items-center rounded-md border-cream border `)}
          >
            <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>{note}</Text>
            <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>{theory?.intervals[index]}</Text>
          </View>
        ))}
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
          style={tw.style(`text-black p-1 rounded-lg text-2xl text-center bg-cream ml-auto`, {
            fontFamily: 'figtree-bold',
          })}
        >
          Learn it
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default TheoryOfTheDay
