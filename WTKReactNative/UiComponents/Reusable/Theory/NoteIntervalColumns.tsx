import React from 'react'
import { FlatList, TouchableOpacity, Text, View } from 'react-native'
import tw from '../../../utils/config/tailwindRN'
import { IntervalNames } from '../../../utils/formating/track-formating'
import { renderSeparator } from '../Common/FlatListHelpers'
import { useSounds } from '../../../utils/Context/SoundPlayer'
import { scaleNotesAndIntervals } from '../../../utils/consts/scales-consts-types'
import { FretNumber } from '../../../utils/consts/soundFilesTypes'

interface NoteIntervalColumnsProps {
  selectedOption: scaleNotesAndIntervals | null
  intervalToFret: Record<IntervalNames, FretNumber>
}

function NoteIntervalColumns({ selectedOption, intervalToFret }: NoteIntervalColumnsProps) {
  const { playSound } = useSounds()

  return (
    <View style={tw.style(`flex justify-center items-center`)}>
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

export default NoteIntervalColumns
