import { View, Text, ScrollView, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { StudyScreenNavigationProp } from '../../utils/types/nav-types'
import React, { useEffect, useMemo, useState } from 'react'
import { Mode, NOTES, getNoteName } from '../../utils/track-formating'
import { Picker } from '@react-native-picker/picker'
import { LinearGradient } from 'expo-linear-gradient'
import tw from '../../utils/config/tailwindRN'
import { getScaleOrModeNotes, getTriadNotes } from '../../utils/scales-and-modes'
import _ from 'lodash'
import Fretboard from '../../UiComponents/Reusable/Common/Fretboard'
import IntervalSymbolsLegend from '../../UiComponents/Reusable/TrackAdjacent/IntervalSymbolsLegend'
import { capitalizeFirstLetter } from '../../utils/text-formatting'
import { useOrientation } from '../../utils/Context/OrientationProvider'
import { CustomButton } from '../../UiComponents/Reusable/Common/CustomButtom'
import {
  ModeNames,
  ScaleName,
  allModeNames,
  allScaleNames,
  scaleNotesAndIntervals,
  scaleOrModeOptions,
} from '../../utils/consts/scales-consts-types'

interface SelectedOption {
  scale: scaleNotesAndIntervals
}

export default function StudyScreen({ navigation }: { navigation: StudyScreenNavigationProp }) {
  const [selectedKey, setSelectedKey] = useState(NOTES[0])
  const [scaleType, setScaleType] = useState('scale')

  const [query, setQuery] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<string[]>(allScaleNames)
  const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(null)

  const { isLandscape } = useOrientation()

  useEffect(() => {
    handleSearch()
  }, [scaleType, query])

  const handleSearch = () => {
    const scalesToFilter = scaleType === 'scale' ? allScaleNames : allModeNames
    if (query.length > 0) {
      const filtered = scalesToFilter.filter(scale => scale.toLowerCase().includes(query.toLowerCase()))
      setFilteredOptions(filtered)
    } else {
      setFilteredOptions(scaleType === 'scale' ? allScaleNames : allModeNames)
    }
  }

  const debouncedSearch = useMemo(() => _.debounce(handleSearch, 300), [query])

  useEffect(() => {
    debouncedSearch()
    return debouncedSearch.cancel
  }, [query, debouncedSearch])

  useEffect(() => {
    if (selectedOption?.scale.name && selectedOption?.scale.name !== undefined) {
      if (scaleType === 'triad') {
        selectTriads(selectedOption?.scale.name as Mode)
      } else {
        selectScale(selectedOption?.scale.name as ScaleName | ModeNames)
      }
    }
  }, [selectedKey, scaleType])

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

  const selectScale = (scale: ScaleName | ModeNames | null | Mode) => {
    if (scale === null) {
      return
    }
    const scaleNotes: scaleNotesAndIntervals = getScaleOrModeNotes(
      selectedKey,
      scale as ScaleName | ModeNames,
      scaleType,
    ) as scaleNotesAndIntervals
    //console.log(scale, scaleNotes)
    setSelectedOption({ scale: scaleNotes })
  }

  const selectTriads = (mode: Mode) => {
    const scaleNotes = getTriadNotes(selectedKey, mode)
    setSelectedOption({ scale: scaleNotes })
  }

  return (
    <LinearGradient
      colors={['#27272a', '#52525b']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`flex-grow w-full pb-16`)}
    >
      <ScrollView contentContainerStyle={tw.style(`flex justify-center items-center gap-2 p-4`)}>
        <View style={tw.style(`justify-between gap-4 flex-row`)}>
          <View style={tw.style(`flex-col w-1/3 gap-2`)}>
            <Text style={tw.style(`text-slate-200 text-center`)}>Select a Key:</Text>
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
          <View style={tw.style(`flex-col w-1/2 gap-2`)}>
            <Text style={tw.style(`text-slate-200 text-center`)}>Select Type:</Text>
            <Picker
              style={tw.style('bg-white')}
              selectedValue={scaleType}
              onValueChange={(itemValue, itemIndex) => {
                setScaleType(itemValue)
                setSelectedOption(null)
              }}
            >
              {scaleOrModeOptions.map(option => (
                <Picker.Item key={option} label={`${capitalizeFirstLetter(option)}s`} value={option} />
              ))}
              <Picker.Item key={'triad'} label={`Triads`} value={'triad'} />
            </Picker>
          </View>
        </View>

        <View style={tw.style(`flex-row justify-between gap-4 `)}>
          <Text style={tw.style(`text-slate-200`)}>
            Selected Key:{' '}
            <Text style={tw.style(`text-beigeCustom text-xl`, { fontFamily: 'figtree-bold' })}>
              {capitalizeFirstLetter(selectedKey)}
            </Text>
          </Text>
          <Text style={tw.style(`text-slate-200`)}>
            Type:{' '}
            <Text style={tw.style(`text-beigeCustom text-xl`, { fontFamily: 'figtree-bold' })}>
              {capitalizeFirstLetter(scaleType)}
            </Text>
          </Text>
        </View>

        {scaleType === 'triad' ? (
          <ScrollView
            horizontal={true}
            style={tw.style('flex-row')}
            contentContainerStyle={tw.style(`justify-between gap-2`)}
          >
            <CustomButton title={`Major`} onPress={() => selectTriads('Major')}></CustomButton>
            <CustomButton title={`Minor`} onPress={() => selectTriads('Minor')}></CustomButton>
          </ScrollView>
        ) : (
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
              style={tw.style('flex-row')}
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
        )}
        {/* Notes in the selected scale along with their intervals */}
        <FlatList
          horizontal={true}
          style={tw.style('flex-row')}
          contentContainerStyle={tw.style(`items-center justify-center`)}
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
