import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native'
import tw from '../../../utils/config/tailwindRN'
import { renderRow, renderSeparator } from './FlatListHelpers'
import {
  ModeNames,
  ScaleName,
  allModeNames,
  allScaleNames,
  scaleNotesAndIntervals,
  scaleOrModeOptions,
} from '../../../utils/consts/scales-consts-types'
import _ from 'lodash'
import { getIntervalToFretMapping, getScaleOrModeNotes, selectTriads } from '../../../utils/scales-and-modes'
import { IntervalNames, Mode } from '../../../utils/track-formating'
import { useSounds } from '../../../utils/Context/SoundPlayer'

interface ScalesListProps {
  scaleType: scaleOrModeOptions | 'triad'
  selectedKey: string
  selectedOption: scaleNotesAndIntervals | null
  setSelectedOption: (values: React.SetStateAction<scaleNotesAndIntervals | null>) => void
}

function ScalesList({ scaleType, selectedKey, selectedOption, setSelectedOption }: ScalesListProps) {
  const [query, setQuery] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<string[]>(allScaleNames)
  const [intervalToFret, setIntervalToFret] = useState(getIntervalToFretMapping(selectedKey, 'B'))

  const { playSound } = useSounds()

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
    if (selectedOption && selectedOption.name && selectedOption.name !== undefined) {
      if (scaleType === 'triad') {
        selectTriads(selectedOption.name as Mode, setSelectedOption, selectedKey)
      } else {
        selectScale(selectedOption.name as ScaleName | ModeNames)
      }
    }
    setIntervalToFret(getIntervalToFretMapping(selectedKey, 'B'))
  }, [selectedKey, scaleType])

  const selectScale = (scale: ScaleName | ModeNames | null | Mode) => {
    if (scale === null) {
      return
    }
    const scaleNotes: scaleNotesAndIntervals = getScaleOrModeNotes(
      selectedKey,
      scale as ScaleName | ModeNames,
      scaleType as scaleOrModeOptions,
    ) as scaleNotesAndIntervals
    setSelectedOption(scaleNotes)
  }

  return (
    <View style={tw.style(`flex-grow w-full`)}>
      {/* List of scales in the key of the song */}
      <FlatList
        style={tw.style('flex-row')}
        data={filteredOptions}
        renderItem={({ item, index }) =>
          renderRow({ item, index, selectScale, selectedScale: selectedOption?.name ?? '' })
        }
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

      {/* Notes in the selected scale along with their intervals */}
      <FlatList
        horizontal={true}
        style={tw.style('flex-row')}
        contentContainerStyle={tw.style(``)}
        data={Object.values(selectedOption?.notes ?? {})}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => renderSeparator(2)}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => playSound('B', intervalToFret[selectedOption?.intervals[index] as IntervalNames])}
            style={tw.style(`p-1 bg-beigeCustom  justify-center items-center rounded-md border-cream border `)}
          >
            <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>{item}</Text>
            <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>{selectedOption?.intervals[index]}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default React.memo(ScalesList)
