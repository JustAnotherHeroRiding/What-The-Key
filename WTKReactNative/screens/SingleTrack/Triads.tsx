import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { TriadsScreenNavigationProp } from '../../utils/types/nav-types'
import React, { useMemo, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import tw from '../../utils/config/tailwindRN'
import { useRoute } from '@react-navigation/native'
import { TrackData } from '../../utils/types/spotify-types'
import TrackMini from '../../UiComponents/Reusable/Track/TrackMini'
import { selectTriads } from '../../utils/scales-and-modes'
import _ from 'lodash'
import { Mode, getNoteName } from '../../utils/track-formating'
import IntervalSymbolsLegend from '../../UiComponents/Reusable/TrackAdjacent/IntervalSymbolsLegend'
import Fretboard from '../../UiComponents/Reusable/Common/Fretboard'
import { CustomButton } from '../../UiComponents/Reusable/Common/CustomButtom'
import { scaleNotesAndIntervals } from '../../utils/consts/scales-consts-types'
import ScalesList from '../../UiComponents/Reusable/Common/ScalesList'
import TriadModeSelector from '../../UiComponents/Reusable/Common/ModeSelector'

function TriadsScreen({ navigation }: { navigation: TriadsScreenNavigationProp }) {
  const route = useRoute()
  const { track } = route.params as { track: TrackData }
  const key = getNoteName(track.audioAnalysis?.track.key as number)
  const mode = track.audioAnalysis?.track.mode === 1 ? 'Major' : 'Minor'

  const [triadMode, setTriadMode] = useState<Mode | null>(null)

  const [selectedOption, setSelectedOption] = useState<scaleNotesAndIntervals | null>(null)

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
          <TriadModeSelector
            triadMode={triadMode}
            setTriadMode={setTriadMode}
            selectedKey={key}
            setSelectedOption={setSelectedOption}
          />
        </ScrollView>
        {/* Fretboard that will show up once a scale is selected */}
        {selectedOption?.notes && <Fretboard scaleNotes={selectedOption} />}
        <IntervalSymbolsLegend />
      </ScrollView>
    </LinearGradient>
  )
}

export default React.memo(TriadsScreen)
