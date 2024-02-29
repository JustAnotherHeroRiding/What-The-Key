import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ScalesScreenNavigationProp } from '../../utils/types/nav-types'
import React, { useMemo, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import tw from '../../utils/config/tailwindRN'
import { useRoute } from '@react-navigation/native'
import { TrackData } from '../../utils/types/spotify-types'
import TrackMini from '../../UiComponents/Reusable/Track/TrackMini'
import { ScaleName, allScaleNames, getScaleOrModeNotes, scaleNotesAndIntervals } from '../../utils/scales-and-modes'
import _ from 'lodash'
import { getNoteName } from '../../utils/track-formating'
import IntervalSymbolsLegend from '../../UiComponents/Reusable/TrackAdjacent/IntervalSymbolsLegend'
import Fretboard from '../../UiComponents/Reusable/Common/Fretboard'

function ScalesScreen({ navigation }: { navigation: ScalesScreenNavigationProp }) {
  const route = useRoute()

  const [query, setQuery] = useState('')
  const [filteredScales, setFilteredScales] = useState<string[]>([])
  const [selectedScale, setSelectedScale] = useState<scaleNotesAndIntervals | null>(null)

  const handleSearch = () => {
    if (query.length > 0) {
      const filtered = allScaleNames.filter(scale => scale.toLowerCase().includes(query.toLowerCase()))
      setFilteredScales(filtered)
    } else {
      setFilteredScales([])
    }
  }

  const handleChange = (text: string) => {
    setQuery(text)
    debouncedSearch()
  }
  const debouncedSearch = useMemo(() => _.debounce(handleSearch, 300), [query])

  const { track } = route.params as { track: TrackData }
  const mode = track.audioAnalysis?.track.mode === 1 ? 'Major' : 'Minor'

  const renderRow = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      onPress={() => selectScale(item as ScaleName)}
      style={tw.style(`py-3 px-3 bg-beigeCustom  rounded-md border-cream border `)}
    >
      <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>{item[0].toUpperCase() + item.slice(1)}</Text>
    </TouchableOpacity>
  )
  /* Enter a width to change the tailwind width class to apply */
  const renderSeparator = (width: number) => <View style={tw.style(`h-2 w-${width}`)} />

  const selectScale = (scale: ScaleName) => {
    const scaleNotes = getScaleOrModeNotes(getNoteName(track.audioAnalysis?.track.key ?? -1), scale, 'scale')
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
        <TrackMini track={track} src='Scales' mode={mode} />
        <View style={tw.style('flex-grow w-full opacity-100')}>
          <Text
            style={tw.style('text-white border-slate-500 border-b-2 text-3xl py-4 text-center', {
              fontFamily: 'figtree-bold',
            })}
          >
            Select a scale
          </Text>
          {/* List of scales in the key of the song */}
          <FlatList
            style={tw.style('flex flex-row')}
            data={filteredScales.length > 0 ? filteredScales : allScaleNames}
            renderItem={renderRow}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => renderSeparator(2)}
            horizontal={true}
            contentContainerStyle={tw.style(`py-4`)}
          />
          <TextInput
            style={tw.style(`bg-[#fff] w-full rounded-2xl p-3 mb-5 text-black`)}
            placeholder='Search for a scale or mode'
            placeholderTextColor='gray'
            value={query}
            onChangeText={handleChange}
          />
        </View>
        {/* Notes in the selected scale along with their intervals */}
        <FlatList
          horizontal={true}
          data={Object.values(selectedScale?.notes ?? {})}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => renderSeparator(2)}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={tw.style(`p-1 bg-beigeCustom  rounded-md border-cream border `)}>
              <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>{item}</Text>
              <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>
                {selectedScale?.intervals[index]}
              </Text>
            </TouchableOpacity>
          )}
        />
        {/* Fretboard that will show up once a scale is selected */}
        {selectedScale?.notes && <Fretboard scaleNotes={selectedScale} />}
        <IntervalSymbolsLegend />
      </ScrollView>
    </LinearGradient>
  )
}

export default React.memo(ScalesScreen)
