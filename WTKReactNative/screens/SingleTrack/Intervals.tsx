import React from 'react'
import { ChordsScreenNavigationProp } from '../../utils/types/nav-types'
import { Text, View, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { TrackData } from '../../utils/types/spotify-types'
import { LinearGradient } from 'expo-linear-gradient'
import tw from '../../utils/config/tailwindRN'
import { getIntervals } from '../../utils/track-formating'
import TrackMini from '../../UiComponents/Reusable/Track/TrackMini'
import IntervalSymbolsLegend from '../../UiComponents/Reusable/TrackAdjacent/IntervalSymbolsLegend'

function IntervalsScreen({ navigation }: { navigation: ChordsScreenNavigationProp }) {
  const route = useRoute()

  const { track } = route.params as { track: TrackData }
  const mode = track.audioAnalysis?.track.mode === 1 ? 'Major' : 'Minor'

  const { Major: majorIntervals, Minor: minorIntervals } = getIntervals(track.audioAnalysis?.track.key ?? -1, 'Both')

  return (
    <LinearGradient
      colors={['#27272a', '#52525b']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`flex-grow w-full opacity-100`)}
    >
      <ScrollView contentContainerStyle={tw.style(`flex justify-center items-center gap-2 p-4`)}>
        <TrackMini track={track} src='Intervals' mode={mode} />
        <IntervalSymbolsLegend />

        <Text style={tw.style('text-center text-2xl text-slate-100 font-semibold')}>Major Intervals</Text>
        <View style={tw.style(`flex flex-row flex-wrap p-2 items-center justify-center gap-2`)}>
          {majorIntervals?.map((interval, index) => (
            <View
              key={index}
              style={tw.style(`flex flex-row rounded-xl p-2 bg-zinc-800 items-center gap-2 shadow-sm shadow-zinc-200`)}
            >
              <Text style={tw.style(`text-lg font-medium text-beigeCustom`)}>{interval.interval}</Text>
              <Text style={tw.style(`text-xl font-bold text-slate-100`)}>{interval.note}</Text>
            </View>
          ))}
        </View>
        <Text style={tw.style('text-center text-2xl text-slate-100 font-semibold')}>Minor Intervals</Text>
        <View style={tw.style(`flex flex-row flex-wrap p-2 items-center justify-center gap-2 `)}>
          {minorIntervals?.map((interval, index) => (
            <View
              key={index}
              style={tw.style(`flex flex-row rounded-xl p-2 bg-zinc-800 items-center gap-2 shadow-sm shadow-zinc-200`)}
            >
              <Text style={tw.style(`text-lg font-medium text-beigeCustom`)}>{interval.interval}</Text>
              <Text style={tw.style(`text-xl font-bold text-slate-100`)}>{interval.note}</Text>
            </View>
          ))}
        </View>
        <Text style={tw.style(`text-slate-100 text-xl font-semibold text-center`)}>
          Understanding Intervals: Beyond Major and Minor
        </Text>
        <View style={tw.style(`p-4s`)}>
          <Text style={tw.style(`text-slate-100 text-lg font-medium`)}>
            {
              'In addition to the familiar major and minor intervals that build up our scales, music theory introduces us to perfect, augmented, and diminished intervals, each adding unique shades to our musical palette.'
            }
          </Text>
          <Text style={tw.style(`text-slate-100 text-lg font-medium`)}>
            {
              '\nPerfect intervals (Unison, Fourth, Fifth, Octave) are foundational, providing a stable and consonant sound in both major and minor contexts.'
            }
          </Text>
          <Text style={tw.style(`text-slate-100 text-lg font-medium`)}>
            {
              '\nAugmented intervals, achieved by raising a perfect or major interval by a half step, and diminished intervals, created by lowering a perfect or minor interval by a half step, introduce tension and color. These intervals are crucial for expressing emotion and tension in music, leading to resolutions that feel satisfying and complete.'
            }
          </Text>
          <Text style={tw.style(`text-slate-100 text-lg font-medium`)}>
            {
              "\nWhether you're playing simple melodies or complex harmonies, understanding these intervals can enhance your musical expression, making your journey through music theory both enlightening and enjoyable."
            }
          </Text>
          <Text style={tw.style(`text-slate-100 text-lg font-bold text-center`)}>Never stop exploring!</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default IntervalsScreen
