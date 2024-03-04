import { View, Text, ScrollView, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { StudyScreenNavigationProp } from '../../utils/types/nav-types'
import React, { useMemo, useState } from 'react'
import { NOTES, getNoteName } from '../../utils/track-formating'
import { Picker } from '@react-native-picker/picker'
import { LinearGradient } from 'expo-linear-gradient'
import tw from '../../utils/config/tailwindRN'
import { ScaleName, allScaleNames, getScaleOrModeNotes, scaleNotesAndIntervals } from '../../utils/scales-and-modes'
import _ from 'lodash'
import Fretboard from '../../UiComponents/Reusable/Common/Fretboard'
import IntervalSymbolsLegend from '../../UiComponents/Reusable/TrackAdjacent/IntervalSymbolsLegend'

export const scaleOrModeOptions = ['Scales', 'Modes']

export default function StudyScreen({ navigation }: { navigation: StudyScreenNavigationProp }) {
  const [selectedKey, setSelectedKey] = useState(NOTES[0])
  const [scaleOrMode, setScaleOrMode] = useState('Scales')

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
    const scaleNotes = getScaleOrModeNotes(selectedKey, scale, 'scale')
    setSelectedScale(scaleNotes)
  }

  return (
    <LinearGradient
      colors={['#27272a', '#52525b']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`flex-grow w-full`)}
    >
      <ScrollView contentContainerStyle={tw.style(`flex justify-center gap-2 p-4`)}>
        <Text style={tw.style(`text-slate-200`)}>Select a Key:</Text>
        <Picker selectedValue={selectedKey} onValueChange={(itemValue, itemIndex) => setSelectedKey(itemValue)}>
          {NOTES.map(note => (
            <Picker.Item style={tw.style(`text-black`)} key={`${note}-key}`} label={note} value={note} />
          ))}
        </Picker>

        <Text style={tw.style(`text-slate-200`)}>Select Scale or Mode:</Text>
        <Picker selectedValue={scaleOrMode} onValueChange={(itemValue, itemIndex) => setScaleOrMode(itemValue)}>
          {scaleOrModeOptions.map(option => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>

        <Text style={tw.style(`text-slate-200`)}>Selected Key: {selectedKey}</Text>
        <Text style={tw.style(`text-slate-200`)}>Type: {scaleOrMode}</Text>
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
