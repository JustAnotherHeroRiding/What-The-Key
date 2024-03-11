import { ScrollView, Text, View } from 'react-native'
import { ScalesScreenNavigationProp } from '../../utils/types/nav-types'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import tw from '../../utils/config/tailwindRN'
import { useRoute } from '@react-navigation/native'
import { TrackData } from '../../utils/types/spotify-types'
import TrackMini from '../../UiComponents/Reusable/Track/TrackMini'
import _ from 'lodash'
import { getNoteName } from '../../utils/track-formating'
import IntervalSymbolsLegend from '../../UiComponents/Reusable/TrackAdjacent/IntervalSymbolsLegend'
import Fretboard from '../../UiComponents/Reusable/Common/Fretboard'
import { scaleNotesAndIntervals } from '../../utils/consts/scales-consts-types'
import ScalesList from '../../UiComponents/Reusable/Common/ScalesList'

function ScalesScreen({ navigation }: { navigation: ScalesScreenNavigationProp }) {
  const route = useRoute()

  const [selectedScale, setSelectedScale] = useState<scaleNotesAndIntervals | null>(null)

  const { track } = route.params as { track: TrackData }
  const mode = track.audioAnalysis?.track.mode === 1 ? 'Major' : 'Minor'
  const key = getNoteName(track.audioAnalysis?.track.key as number)

  return (
    <LinearGradient
      colors={['#27272a', '#52525b']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`flex-grow w-full opacity-100`)}
    >
      <ScrollView contentContainerStyle={tw.style(`flex justify-center items-center gap-2 p-4`)}>
        <TrackMini track={track} src='Scales' mode={mode} />
        <View style={tw.style('flex-grow w-full opacity-100')}>
          <Text
            style={tw.style('text-white border-slate-500 border-b-2 text-3xl py-4 text-center', {
              fontFamily: 'figtree-bold',
            })}
          >
            Select a scale
          </Text>
          <ScalesList
            scaleType={'scale'}
            selectedOption={selectedScale ? selectedScale : null}
            setSelectedOption={setSelectedScale}
            selectedKey={key}
          />
        </View>
        {/* Fretboard that will show up once a scale is selected */}
        {selectedScale?.notes && <Fretboard scaleNotes={selectedScale} />}
        <IntervalSymbolsLegend />
      </ScrollView>
    </LinearGradient>
  )
}

export default React.memo(ScalesScreen)
