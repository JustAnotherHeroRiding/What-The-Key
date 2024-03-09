import React, { useEffect, useState } from 'react'
import { TwelveBarsScreenNavigationProp } from '../../utils/types/nav-types'
import { View, Text, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import TrackMini from '../../UiComponents/Reusable/Track/TrackMini'
import { useRoute } from '@react-navigation/native'
import { TrackData } from '../../utils/types/spotify-types'
import tw from '../../utils/config/tailwindRN'
import { getTwelveBars } from '../../utils/scales-and-modes'
import { IntervalNames, getNoteName, intervalToRomanChord } from '../../utils/track-formating'
import {
  TwelveBarVariants,
  TwelveBars,
  scaleNotesAndIntervals,
  scaleOrModeOptions,
  twelveBarsLookup,
} from '../../utils/consts/scales-consts-types'
import { Picker } from '@react-native-picker/picker'
import { capitalizeFirstLetter } from '../../utils/text-formatting'
import { CustomButton } from '../../UiComponents/Reusable/Common/CustomButtom'
import ScalesList from '../../UiComponents/Reusable/Common/ScalesList'
import Fretboard from '../../UiComponents/Reusable/Common/Fretboard'
import IntervalSymbolsLegend from '../../UiComponents/Reusable/TrackAdjacent/IntervalSymbolsLegend'

type DisplayType = 'roman' | 'note'

function TwelveBarsScreen({ navigation }: { navigation: TwelveBarsScreenNavigationProp }) {
  const route = useRoute()
  const { track } = route.params as { track: TrackData }

  const mode = track.audioAnalysis?.track.mode === 1 ? 'Major' : 'Minor'
  const key = getNoteName(track.audioAnalysis?.track.key as number)

  const [twelveBars, setTwelveBars] = useState<TwelveBars | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<TwelveBarVariants>('standard')
  const [displayType, setDisplayType] = useState<DisplayType>('note')
  const [selectedOption, setSelectedOption] = useState<scaleNotesAndIntervals | null>(null)
  const [scaleType, setScaleType] = useState<scaleOrModeOptions>('scale')

  useEffect(() => {
    setTwelveBars(getTwelveBars(key, selectedVariant))
  }, [selectedVariant])

  return (
    <LinearGradient
      colors={['#27272a', '#52525b']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`flex-grow w-full opacity-100`)}
    >
      <ScrollView contentContainerStyle={tw.style(`flex justify-center items-center gap-2 p-4`)}>
        <TrackMini track={track} src='Twelve Bars' mode={mode} />
        <View style={tw.style(`flex-row items-center gap-2 mb-4`)}>
          <View style={tw.style(`flex-col gap-2 w-3/4`)}>
            <Text style={tw.style(`text-slate-200 text-center text-base`)}>Select the variant</Text>

            <Picker
              style={tw.style('bg-white')}
              selectedValue={selectedVariant}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedVariant(itemValue)
              }}
            >
              {Object.keys(twelveBarsLookup).map(key => {
                return <Picker.Item key={key} label={capitalizeFirstLetter(key)} value={key} />
              })}
            </Picker>
          </View>
          <View style={tw.style(`flex-col items-center gap-2`)}>
            <CustomButton
              onPress={() => (displayType === 'note' ? setDisplayType('roman') : setDisplayType('note'))}
              title={displayType === 'note' ? 'Roman' : 'Note'}
              btnStyle={tw`mt-auto`}
            ></CustomButton>
            <CustomButton
              onPress={() => (scaleType === 'scale' ? setScaleType('mode') : setScaleType('scale'))}
              title={scaleType === 'scale' ? 'Modes' : 'Scales'}
              btnStyle={tw`mt-auto`}
            ></CustomButton>
          </View>
        </View>
        <View style={tw.style(`flex-row gap-2 flex-wrap justify-center`)}>
          {displayType === 'note'
            ? twelveBars?.notes.map((chord, index) => {
                return <ChordBlock key={`${index}-${chord}`} chord={chord} />
              })
            : twelveBars?.intervalNames.map((chord, index) => {
                return <ChordBlock key={`${index}-${chord}`} chord={intervalToRomanChord[chord as IntervalNames]} />
              })}
        </View>
        <Text style={tw.style(`text-slate-50 text-center text-2xl`, { fontFamily: 'figtree-bold' })}>
          Suggested {capitalizeFirstLetter(scaleType)}s
        </Text>
        <ScalesList
          scaleType={scaleType}
          selectedKey={key}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        {/* Fretboard that will show up once a scale is selected */}
        {selectedOption?.notes && <Fretboard scaleNotes={selectedOption} />}
        <IntervalSymbolsLegend />
      </ScrollView>
    </LinearGradient>
  )
}

function ChordBlock({ chord }: { chord: string }) {
  return (
    <Text
      style={tw.style(` bg-beigeCustom p-2 text-2xl text-black rounded-lg text-center min-w-[20%]`, {
        fontFamily: 'figtree-bold',
      })}
    >
      {chord}
    </Text>
  )
}

export default React.memo(TwelveBarsScreen)
