import React, { useState } from 'react'
import { TwelveBarsScreenNavigationProp } from '../../utils/types/nav-types'
import { View, Text, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import TrackMini from '../../UiComponents/Reusable/Track/TrackMini'
import { useRoute } from '@react-navigation/native'
import { TrackData } from '../../utils/types/spotify-types'
import tw from '../../utils/config/tailwindRN'
import { Mode, getNoteName } from '../../utils/track-formating'
import { scaleNotesAndIntervals, scaleOrModeOptions } from '../../utils/consts/scales-consts-types'
import { capitalizeFirstLetter } from '../../utils/text-formatting'
import ScalesList from '../../UiComponents/Reusable/Common/ScalesList'
import Fretboard from '../../UiComponents/Reusable/Common/Fretboard'
import IntervalSymbolsLegend from '../../UiComponents/Reusable/TrackAdjacent/IntervalSymbolsLegend'
import ModeSelector from '../../UiComponents/Reusable/Common/ModeSelector'
import TwelveBarsSelector from '../../UiComponents/Reusable/Common/TwelveBarsSelector'
import { Picker } from '@react-native-picker/picker'

function TwelveBarsScreen({ navigation }: { navigation: TwelveBarsScreenNavigationProp }) {
  const route = useRoute()
  const { track } = route.params as { track: TrackData }

  const mode = track.audioAnalysis?.track.mode === 1 ? 'Major' : 'Minor'
  const key = getNoteName(track.audioAnalysis?.track.key as number)

  const [selectedOption, setSelectedOption] = useState<scaleNotesAndIntervals | null>(null)
  const [scaleType, setScaleType] = useState<scaleOrModeOptions | Mode>('scale')
  const [scaleMode, setScaleMode] = useState<Mode | null>(null)

  return (
    <LinearGradient
      colors={['#27272a', '#52525b']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`flex-grow w-full opacity-100`)}
    >
      <ScrollView contentContainerStyle={tw.style(`flex justify-center items-center gap-2 p-4`)}>
        <TrackMini track={track} src='Twelve Bars' mode={mode} />
        <View style={tw.style(`flex-col w-[40%] items-center gap-2`)}>
          <Text style={tw.style(`text-slate-200 text-center text-base`)}>Select Type:</Text>
          <Picker
            style={tw.style('bg-white w-full')}
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
            <Picker.Item key={'seventh'} label={`7th Chords`} value={'seventh'} />
          </Picker>
        </View>
        <TwelveBarsSelector selectedKey={key} />

        <Text style={tw.style(`text-slate-50 text-center text-2xl`, { fontFamily: 'figtree-bold' })}>
          {scaleType === 'triad'
            ? 'Choose the Triad mode'
            : scaleType === 'seventh'
              ? 'Seventh Chords'
              : `Suggested ${capitalizeFirstLetter(scaleType)}`}
        </Text>
        {(scaleType === 'triad' || scaleType === 'seventh') && (
          <ModeSelector
            scaleType={scaleType}
            scaleMode={scaleMode ?? 'Major'}
            setScaleMode={setScaleMode}
            selectedKey={key}
            setSelectedOption={setSelectedOption}
          />
        )}
        {scaleType !== 'triad' && (
          <ScalesList
            scaleType={scaleType}
            selectedOption={selectedOption ? selectedOption : null}
            setSelectedOption={setSelectedOption}
            selectedKey={key}
          />
        )}
        {/* Fretboard that will show up once a scale is selected */}
        {selectedOption?.notes && <Fretboard scaleNotes={selectedOption} />}
        <IntervalSymbolsLegend />
      </ScrollView>
    </LinearGradient>
  )
}

export default React.memo(TwelveBarsScreen)
