import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ModesScreenNavigationProp } from '../../utils/types/nav-types'
import React, { useMemo, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import tw from '../../utils/config/tailwindRN'
import { useRoute } from '@react-navigation/native'
import { TrackData } from '../../utils/types/spotify-types'
import TrackMini from '../../UiComponents/Reusable/Track/TrackMini'
import { ModeNames, allModeNames, getScaleOrModeNotes, scaleNotesAndIntervals } from '../../utils/scales-and-modes'
import _ from 'lodash'
import IntervalSymbolsLegend from '../../UiComponents/Reusable/TrackAdjacent/IntervalSymbolsLegend'
import Fretboard from '../../UiComponents/Reusable/Common/Fretboard'
import { getNoteName } from '../../utils/track-formating'

function ModesScreen({ navigation }: { navigation: ModesScreenNavigationProp }) {
  const route = useRoute()

  const [query, setQuery] = useState('')
  const [filteredModes, setFilteredMode] = useState<string[]>([])
  const [selectedMode, setSelectedMode] = useState<scaleNotesAndIntervals | null>(null)

  const handleSearch = () => {
    if (query.length > 0) {
      const filtered = allModeNames.filter(mode => mode.toLowerCase().includes(query.toLowerCase()))
      setFilteredMode(filtered)
    } else {
      setFilteredMode([])
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
      onPress={() => selectMode(item as ModeNames)}
      style={tw.style(`py-3 px-3 bg-beigeCustom  rounded-md border-cream border `)}
    >
      <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>{item[0].toUpperCase() + item.slice(1)}</Text>
    </TouchableOpacity>
  )
  /* Enter a width to change the tailwind width class to apply */
  const renderSeparator = (width: number) => <View style={tw.style(`h-2 w-${width}`)} />

  const selectMode = (mode: ModeNames) => {
    const scaleNotes = getScaleOrModeNotes(getNoteName(track.audioAnalysis?.track.key ?? -1), mode, 'mode')
    setSelectedMode(scaleNotes)
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
            Select a Mode
          </Text>
          {/* List of Modes in the key of the song */}
          <FlatList
            style={tw.style('flex flex-row')}
            data={filteredModes.length > 0 && query ? filteredModes : allModeNames}
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
        {/* Notes in the selected mode along with their intervals */}
        <FlatList
          horizontal={true}
          data={Object.values(selectedMode?.notes ?? {})}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => renderSeparator(2)}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={tw.style(`p-1 bg-beigeCustom  rounded-md border-cream border `)}>
              <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>{item}</Text>
              <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>{selectedMode?.intervals[index]}</Text>
            </TouchableOpacity>
          )}
        />
        {/* Fretboard that will show up once a mode is selected */}
        {selectedMode?.notes && <Fretboard scaleNotes={selectedMode} />}
        <IntervalSymbolsLegend />
      </ScrollView>
    </LinearGradient>
  )
}

export default React.memo(ModesScreen)
