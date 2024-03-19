import React, { useState } from 'react'
import { FlatList, Touchable, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-elements'
import {
  SCALES_DATA,
  MODES_DATA,
  TRIAD_SEVENTH,
  ScaleData,
  scaleNotesAndIntervals,
  scaleNotesAndIntervalsExpanded,
  ScaleName,
  ModeNames,
} from '../../../utils/consts/scales-consts-types'
import { CustomButton } from '../Common/CustomButtom'
import tw from '../../../utils/config/tailwindRN'
import {
  getScaleOrModeNotes,
  getSeventhNotes,
  getTriadNotes,
  selectSeventh,
  selectTriads,
} from '../../../utils/scales-and-modes'
import { renderSeparator } from '../Common/FlatListHelpers'

const allTheoryElements = [
  ...Object.values(SCALES_DATA),
  ...Object.values(MODES_DATA),
  ...Object.values(TRIAD_SEVENTH),
  // You can add arrays for triads, seventh chords, etc., in a similar manner
]

function TheoryOfTheDay() {
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
    console.log(theory?.name)
    if (theory?.name.toLowerCase() === 'seventh') {
      scaleNotes = getSeventhNotes('C', 'Major', false)
    } else if (theory?.name.toLowerCase() === 'triad') {
      scaleNotes = getTriadNotes('C', 'Major')
    } else {
      // This will have to worked on as we need to know if we are working with a scale or not
      scaleNotes = getScaleOrModeNotes(
        'C',
        theoryOfTheDay.name as ScaleName | ModeNames,
        'scale',
      ) as scaleNotesAndIntervals
    }
    console.log(scaleNotes)
    const theoryNew: scaleNotesAndIntervalsExpanded = {
      name: theoryOfTheDay.name as ScaleName | ModeNames | 'triad' | 'seventh',
      description: theoryOfTheDay.description,
      notes: scaleNotes?.notes ?? [],
      intervals: scaleNotes?.intervals ?? [],
    }
    setTheory(theoryNew)
  }

  return (
    <>
      <CustomButton
        title='Get Theory'
        onPress={() => {
          getTheoryOfTheDay()
        }}
      />
      <TouchableOpacity>
        <View style={tw.style(`p-2`)}>
          <Text style={tw.style(`text-slate-50 text-xl text-center`, { fontFamily: 'figtree-bold' })}>
            {theory?.name}
          </Text>
          <Text style={tw.style(`text-slate-50 text-xl text-center`, { fontFamily: 'figtree-bold' })}>
            {theory?.description}
          </Text>
          <FlatList
            horizontal={true}
            style={tw.style('flex-row')}
            contentContainerStyle={tw.style(``)}
            data={Object.values(theory?.notes ?? {})}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => renderSeparator(2)}
            renderItem={({ item, index }) => (
              <View style={tw.style(`p-1 bg-beigeCustom  justify-center items-center rounded-md border-cream border `)}>
                <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>{item}</Text>
                <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>{theory?.intervals[index]}</Text>
              </View>
            )}
          />
        </View>
      </TouchableOpacity>
    </>
  )
}

export default React.memo(TheoryOfTheDay)
