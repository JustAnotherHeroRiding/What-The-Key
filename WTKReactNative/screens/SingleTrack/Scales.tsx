import { ScrollView, Text } from 'react-native'
import { ScalesScreenNavigationProp } from '../../utils/types/nav-types'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import tw from '../../utils/config/tailwindRN'
import { useRoute } from '@react-navigation/native'
import { TrackData } from '../../utils/types/spotify-types'
import TrackMini from '../../UiComponents/Reusable/Track/TrackMini'

function ScalesScreen({ navigation }: { navigation: ScalesScreenNavigationProp }) {
  const route = useRoute()

  const { track } = route.params as { track: TrackData }
  const mode = track.audioAnalysis?.track.mode === 1 ? 'Major' : 'Minor'
  return (
    <LinearGradient
      colors={['#27272a', '#52525b']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`flex-grow w-full opacity-100`)}
    >
      <ScrollView contentContainerStyle={tw.style(`flex justify-center items-center gap-2 p-4`)}>
        <TrackMini track={track} src='Scales' mode={mode} />
      </ScrollView>
    </LinearGradient>
  )
}

export default ScalesScreen
