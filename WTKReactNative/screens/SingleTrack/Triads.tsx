import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { TriadsScreenNavigationProp } from '../../utils/types/nav-types'
import React, { useMemo, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import tw from '../../utils/config/tailwindRN'
import { useRoute } from '@react-navigation/native'
import { TrackData } from '../../utils/types/spotify-types'
import TrackMini from '../../UiComponents/Reusable/Track/TrackMini'
import {
  ScaleName,
  allScaleNames,
  getScaleOrModeNotes,
  getTriadNotes,
  scaleNotesAndIntervals,
} from '../../utils/scales-and-modes'
import _ from 'lodash'
import { Mode, getNoteName } from '../../utils/track-formating'
import IntervalSymbolsLegend from '../../UiComponents/Reusable/TrackAdjacent/IntervalSymbolsLegend'
import Fretboard from '../../UiComponents/Reusable/Common/Fretboard'
import { CustomButton } from '../../UiComponents/Reusable/Common/CustomButtom'

function TriadsScreen({ navigation }: { navigation: TriadsScreenNavigationProp }) {
  const route = useRoute()
  const { track } = route.params as { track: TrackData }

  const [mode, setMode] = useState<Mode>(track.audioAnalysis?.track.mode === 1 ? 'Major' : 'Minor')

  const [selectedScale, setSelectedScale] = useState<scaleNotesAndIntervals | null>(
    getTriadNotes(getNoteName(track.audioAnalysis?.track.key as number), mode),
  )
  /* Enter a width to change the tailwind width class to apply */
  const renderSeparator = (width: number) => <View style={tw.style(`h-2 w-${width}`)} />

  const selectScale = (mode: Mode) => {
    const scaleNotes = getTriadNotes(getNoteName(track.audioAnalysis?.track.key as number), mode)
    setSelectedScale(scaleNotes)
  }

  return (
    <LinearGradient
      colors={['#27272a', '#52525b']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`flex-grow w-full opacity-100`)}
    >
      <ScrollView contentContainerStyle={tw.style(`flex justify-center items-center gap-2 p-4`)}>
        <TrackMini track={track} src='Triads' mode={mode} />
        <ScrollView
          horizontal={true}
          style={tw.style('flex-row')}
          contentContainerStyle={tw.style(`justify-between gap-2`)}
        >
          <CustomButton title={`Major`} onPress={() => selectScale('Major')}></CustomButton>
          <CustomButton title={`Minor`} onPress={() => selectScale('Minor')}></CustomButton>
        </ScrollView>

        {/* Notes in the selected scale along with their intervals */}
        <FlatList
          horizontal={true}
          data={Object.values(selectedScale?.notes ?? {})}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => renderSeparator(2)}
          renderItem={({ item, index }) => (
            <View style={tw.style(`p-1 bg-beigeCustom  justify-center items-center rounded-md border-cream border `)}>
              <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>{item}</Text>
              <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>
                {selectedScale?.intervals[index]}
              </Text>
            </View>
          )}
        />
        {/* Fretboard that will show up once a scale is selected */}
        {selectedScale?.notes && <Fretboard scaleNotes={selectedScale} />}
        <IntervalSymbolsLegend />
      </ScrollView>
    </LinearGradient>
  )
}

export default React.memo(TriadsScreen)
