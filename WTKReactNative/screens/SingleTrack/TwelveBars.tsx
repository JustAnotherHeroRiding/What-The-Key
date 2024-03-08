import React from 'react'
import { TwelveBarsScreenNavigationProp } from '../../utils/types/nav-types'
import { View, Text, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import TrackMini from '../../UiComponents/Reusable/Track/TrackMini'
import { useRoute } from '@react-navigation/native'
import { TrackData } from '../../utils/types/spotify-types'
import tw from '../../utils/config/tailwindRN'
import { getTwelveBars } from '../../utils/scales-and-modes'
import { getNoteName } from '../../utils/track-formating'

function TwelveBarsScreen({ navigation }: { navigation: TwelveBarsScreenNavigationProp }) {
  const route = useRoute()

  const { track } = route.params as { track: TrackData }
  const mode = track.audioAnalysis?.track.mode === 1 ? 'Major' : 'Minor'

  console.log(getTwelveBars(getNoteName(track.audioAnalysis?.track.key as number)))

  return (
    <LinearGradient
      colors={['#27272a', '#52525b']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`flex-grow w-full opacity-100`)}
    >
      <ScrollView contentContainerStyle={tw.style(`flex justify-center items-center gap-2 p-4`)}>
        <TrackMini track={track} src='Intervals' mode={mode} />
      </ScrollView>
    </LinearGradient>
  )
}

export default React.memo(TwelveBarsScreen)
