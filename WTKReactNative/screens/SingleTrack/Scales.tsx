import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ScalesScreenNavigationProp } from '../../utils/types/nav-types'
import React, { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import tw from '../../utils/config/tailwindRN'
import { useRoute } from '@react-navigation/native'
import { TrackData } from '../../utils/types/spotify-types'
import TrackMini from '../../UiComponents/Reusable/Track/TrackMini'
import { ScaleName, allScaleNames, getScaleNotes } from '../../utils/scales-and-modes'
import { getNoteName } from '../../utils/track-formating'
import colors from '../../assets/colors'
import { MaterialIcons } from '@expo/vector-icons'

function ScalesScreen({ navigation }: { navigation: ScalesScreenNavigationProp }) {
  const route = useRoute()

  const { track } = route.params as { track: TrackData }
  const mode = track.audioAnalysis?.track.mode === 1 ? 'Major' : 'Minor'

  const majorScale = getScaleNotes(getNoteName(track.audioAnalysis?.track.key ?? -1), 'harmonicMinor')
  useEffect(() => {
    console.log(majorScale)
  }, [])
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
            Selected Scale
          </Text>

          <FlatList
            style={tw.style('flex flex-row ')}
            contentContainerStyle={tw.style('pb-20')}
            data={allScaleNames}
            horizontal={true}
            renderItem={({ item }) => (
              <TouchableOpacity style={tw.style('py-3 px-3 rounded-md gap-1 border-cream border')}>
                <Text style={tw.style('text-white text-xl', { fontFamily: 'figtree-bold' })}>
                  {item[0].toUpperCase() + item.slice(1)}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default React.memo(ScalesScreen)
