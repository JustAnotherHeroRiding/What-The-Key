import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ModesScreenNavigationProp } from '../../utils/types/nav-types'
import React, { useMemo, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import tw from '../../utils/config/tailwindRN'
import { useRoute } from '@react-navigation/native'
import { TrackData } from '../../utils/types/spotify-types'
import TrackMini from '../../UiComponents/Reusable/Track/TrackMini'
import { allModeNames, getScaleOrModeNotes } from '../../utils/scales-and-modes'
import _ from 'lodash'

function ModesScreen({ navigation }: { navigation: ModesScreenNavigationProp }) {
  const route = useRoute()

  const [query, setQuery] = useState('')
  const [filteredModes, setFilteredModes] = useState<string[]>([])

  const handleSearch = () => {
    if (query.length > 0) {
      const filtered = allModeNames.filter(mode => mode.toLowerCase().includes(query.toLowerCase()))
      setFilteredModes(filtered)
    } else {
      setFilteredModes([])
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
    <TouchableOpacity style={tw.style(`py-3 px-3 bg-beigeCustom  rounded-md border-cream border `)}>
      <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>{item[0].toUpperCase() + item.slice(1)}</Text>
    </TouchableOpacity>
  )

  const renderSeparator = () => <View style={tw.style('h-2 w-4')} />
  return (
    <LinearGradient
      colors={['#27272a', '#52525b']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`flex-grow w-full opacity-100`)}
    >
      <ScrollView contentContainerStyle={tw.style(`flex justify-center items-center gap-2 p-4`)}>
        <TrackMini track={track} src='Modes' mode={mode} />
        <View style={tw.style('flex-grow w-full opacity-100')}>
          <Text
            style={tw.style('text-white border-slate-500 border-b-2 text-3xl py-4 text-center', {
              fontFamily: 'figtree-bold',
            })}
          >
            Select a mode
          </Text>

          <FlatList
            style={tw.style('flex flex-row')}
            data={filteredModes.length > 0 ? filteredModes : allModeNames}
            renderItem={renderRow}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={renderSeparator}
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
      </ScrollView>
    </LinearGradient>
  )
}

export default React.memo(ModesScreen)
