import { View, Text, ScrollView, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { StudyScreenNavigationProp } from '../../utils/types/nav-types'
import React, { useEffect, useMemo, useState } from 'react'
import { NOTES, getNoteName } from '../../utils/track-formating'
import { Picker } from '@react-native-picker/picker'
import { LinearGradient } from 'expo-linear-gradient'
import tw from '../../utils/config/tailwindRN'
import {
  ModeNames,
  ScaleName,
  allModeNames,
  allScaleNames,
  getScaleOrModeNotes,
  scaleNotesAndIntervals,
  scaleOrModeOptions,
} from '../../utils/scales-and-modes'
import _ from 'lodash'
import Fretboard from '../../UiComponents/Reusable/Common/Fretboard'
import IntervalSymbolsLegend from '../../UiComponents/Reusable/TrackAdjacent/IntervalSymbolsLegend'
import { capitalizeFirstLetter } from '../../utils/text-formatting'

interface SelectedOption {
  scale: scaleNotesAndIntervals
}

export default function StudyScreen({ navigation }: { navigation: StudyScreenNavigationProp }) {
  const [selectedKey, setSelectedKey] = useState(NOTES[0])
  const [scaleOrMode, setScaleOrMode] = useState('scale')

  const [query, setQuery] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<string[]>(allScaleNames)
  const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(null)

  const optionsToDisplay = scaleOrMode === 'scale' ? allScaleNames : allModeNames

  useEffect(() => {
    handleSearch()
  }, [scaleOrMode, query])

  const handleSearch = () => {
    const scalesToFilter = scaleOrMode === 'scale' ? allScaleNames : allModeNames
    if (query.length > 0) {
      const filtered = scalesToFilter.filter(scale => scale.toLowerCase().includes(query.toLowerCase()))
      setFilteredOptions(filtered)
    } else {
      setFilteredOptions(scaleOrMode === 'scale' ? allScaleNames : allModeNames)
    }
  }

  const debouncedSearch = useMemo(() => _.debounce(handleSearch, 300), [query, optionsToDisplay])

  useEffect(() => {
    debouncedSearch()
    return debouncedSearch.cancel
  }, [query, optionsToDisplay, debouncedSearch])

  useEffect(() => {
    if (selectedOption?.scale.name && selectedOption?.scale.name !== undefined) {
      selectScale(selectedOption?.scale.name)
    }
  }, [selectedKey, scaleOrMode])

  const renderRow = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      onPress={() => selectScale(item as ScaleName)}
      style={tw.style(`py-3 px-3 bg-beigeCustom rounded-md border-cream border`)}
    >
      <Text style={tw.style('text-xl', { fontFamily: 'figtree-bold' })}>{item[0].toUpperCase() + item.slice(1)}</Text>
    </TouchableOpacity>
  )

  /* Enter a width to change the tailwind width class to apply */
  const renderSeparator = (width: number) => <View style={tw.style(`h-2 w-${width}`)} />

  const selectScale = (scale: ScaleName | ModeNames | null) => {
    if (scale === null) {
      return
    }
    const scaleNotes: scaleNotesAndIntervals = getScaleOrModeNotes(
      selectedKey,
      scale,
      scaleOrMode,
    ) as scaleNotesAndIntervals
    //console.log(scale, scaleNotes)
    setSelectedOption({ scale: scaleNotes })
  }

  return (
    <LinearGradient
      colors={['#27272a', '#52525b']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`flex-grow w-full pb-16`)}
    >
      <ScrollView contentContainerStyle={tw.style(`flex justify-center gap-2 p-4`)}>
        <View style={tw.style(`justify-between flex-row`)}>
          <View style={tw.style(`flex-col w-1/3`)}>
            <Text style={tw.style(`text-slate-200`)}>Select a Key:</Text>
            <Picker
              style={tw.style('bg-white')}
              selectedValue={selectedKey}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedKey(itemValue)
              }}
            >
              {NOTES.map(note => (
                <Picker.Item key={`${note}-key}`} label={note} value={note} color='black' />
              ))}
            </Picker>
          </View>
          <View style={tw.style(`flex-col w-1/2`)}>
            <Text style={tw.style(`text-slate-200`)}>Select Scale or Mode:</Text>
            <Picker
              style={tw.style('bg-white')}
              selectedValue={scaleOrMode}
              onValueChange={(itemValue, itemIndex) => {
                setScaleOrMode(itemValue)
                setSelectedOption(null)
              }}
            >
              {scaleOrModeOptions.map(option => (
                <Picker.Item key={option} label={`${capitalizeFirstLetter(option)}s`} value={option} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={tw.style(`flex-row justify-between`)}>
          <Text style={tw.style(`text-slate-200`)}>Selected Key: {selectedKey}</Text>
          <Text style={tw.style(`text-slate-200`)}>Type: {scaleOrMode}</Text>
        </View>

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
            data={filteredOptions}
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
            onChangeText={setQuery}
          />
        </View>
        {/* Notes in the selected scale along with their intervals */}
        <FlatList
          horizontal={true}
          data={Object.values(selectedOption?.scale?.notes ?? {})}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => renderSeparator(2)}
          renderItem={({ item, index }) => (
            <View style={tw.style(`p-1 bg-beigeCustom  justify-center items-center rounded-md border-cream border `)}>
              <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>{item}</Text>
              <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>
                {selectedOption?.scale?.intervals[index]}
              </Text>
            </View>
          )}
        />
        {/* Fretboard that will show up once a scale is selected */}
        {selectedOption?.scale?.notes && <Fretboard scaleNotes={selectedOption.scale} />}
        <IntervalSymbolsLegend />
      </ScrollView>
    </LinearGradient>
  )
}
