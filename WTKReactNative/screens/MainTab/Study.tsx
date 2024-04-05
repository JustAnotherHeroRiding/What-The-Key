import { View, Text, ScrollView, Switch } from 'react-native'
import { RootStackParamList, StudyScreenNavigationProp, StudyScreenProps } from '../../utils/types/nav-types'
import React, { useEffect, useState } from 'react'
import { Mode, NOTES } from '../../utils/formating/track-formating'
import { Picker } from '@react-native-picker/picker'
import { LinearGradient } from 'expo-linear-gradient'
import tw from '../../utils/config/tailwindRN'
import _ from 'lodash'
import Fretboard from '../../UiComponents/Reusable/Theory/Fretboard'
import IntervalSymbolsLegend from '../../UiComponents/Reusable/TrackAdjacent/IntervalSymbolsLegend'
import { capitalizeFirstLetter } from '../../utils/formating/text-formatting'
import {
  ModeNames,
  ScaleName,
  extendedScaleType,
  scaleNotesAndIntervals,
  scaleOrModeOptionsConst,
} from '../../utils/consts/scales-consts-types'
import ScalesList from '../../UiComponents/Reusable/Theory/ScalesList'
import ModeSelector from '../../UiComponents/Reusable/Theory/ModeSelector'
import TwelveBarsSelector from '../../UiComponents/Reusable/Theory/TwelveBarsSelector'
import colors from '../../assets/colors'
import { RouteProp, useRoute } from '@react-navigation/native'
import { selectScale, selectSeventh, selectTriads } from '../../utils/scales-and-modes'
import { splitAndJoinAndCapitalizeFirstLetter } from '../../utils/formating/split-camel-case'

export default function StudyScreen({ navigation }: { navigation: StudyScreenNavigationProp }) {
  const router = useRoute<RouteProp<RootStackParamList['MainTab']>>()
  const params = router.params as StudyScreenProps

  const [selectedKey, setSelectedKey] = useState(NOTES[0])
  const [scaleType, setScaleType] = useState<extendedScaleType>(params?.preselectedType ?? 'scale')
  const [selectedOption, setSelectedOption] = useState<scaleNotesAndIntervals | null>(null)
  const [scaleMode, setScaleMode] = useState<Mode | null>(null)
  const [twelveBarsActive, setTwelveBarsActive] = useState(false)

  useEffect(() => {
    if (params && params.preselectedType && params.preselectedScale) {
      if (params.preselectedType === 'scale' || params.preselectedType === 'mode') {
        selectScale(
          params.preselectedType,
          setSelectedOption,
          NOTES[0],
          params.preselectedScale as ScaleName | ModeNames,
        )
      } else if (params.preselectedScale === 'seventh') {
        selectSeventh('Major', setSelectedOption, selectedKey)
      } else if (params.preselectedScale === 'triad') {
        selectTriads('Major', setSelectedOption, selectedKey)
      }
      setScaleType(params.preselectedType)
    }
  }, [params])

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
              {scaleOrModeOptionsConst.map(option => (
                <Picker.Item key={option} label={`${capitalizeFirstLetter(option)}s`} value={option} />
              ))}
              <Picker.Item key={'triad'} label={`Triads`} value={'triad'} />
              <Picker.Item key={'seventh'} label={`7th Chords`} value={'seventh'} />
            </Picker>
          </View>
        </View>

        <ScrollView
          horizontal={true}
          contentContainerStyle={tw.style(`flex-grow items-stretch flex-row gap-4`)}
          style={tw.style(`flex-row`)}
        >
          <View style={tw.style(`flex-1 flex-col items-center justify-center`)}>
            <Text style={tw.style(`text-slate-200`)}>Selected Key</Text>
            <Text style={tw.style(`text-beigeCustom text-xl my-auto`, { fontFamily: 'figtree-bold' })}>
              {capitalizeFirstLetter(selectedKey)}
            </Text>
          </View>
          <View style={tw.style(`flex-1 flex-col items-center justify-center`)}>
            <Text style={tw.style(`text-slate-200`)}>Type</Text>
            <Text style={tw.style(`text-beigeCustom text-xl my-auto`, { fontFamily: 'figtree-bold' })}>
              {capitalizeFirstLetter(scaleType)}
            </Text>
          </View>
          <View style={tw.style(`flex-1 flex-col items-center justify-center `)}>
            <Text style={tw.style(`text-slate-200`)}>Twelve bars</Text>
            <Switch
              thumbColor={colors.beigeCustom}
              trackColor={{ false: colors.slate500, true: colors.cream }}
              value={twelveBarsActive}
              onValueChange={() => setTwelveBarsActive(!twelveBarsActive)}
            />
          </View>
        </ScrollView>
        <View style={tw.style(`flex-col items-center justify-center`)}>
          <Text style={tw.style(`text-slate-200`)}>Selected {capitalizeFirstLetter(scaleType)}</Text>
          <Text style={tw.style(`text-beigeCustom text-xl`, { fontFamily: 'figtree-bold' })}>
            {splitAndJoinAndCapitalizeFirstLetter(selectedOption?.name ?? '')}
          </Text>
          <Text style={tw.style(`text-slate-50`)}>{selectedOption?.description}</Text>
        </View>

        {(scaleType === 'triad' || scaleType === 'seventh') && (
          <ModeSelector
            scaleMode={scaleMode ?? 'Major'}
            setScaleMode={setScaleMode}
            selectedKey={selectedKey}
            setSelectedOption={setSelectedOption}
            scaleType={scaleType}
          />
        )}
        {scaleType !== 'triad' && scaleType !== 'seventh' && (
          <ScalesList
            scaleType={scaleType}
            selectedOption={selectedOption ? selectedOption : null}
            setSelectedOption={setSelectedOption}
            selectedKey={selectedKey}
          />
        )}
        {twelveBarsActive && <TwelveBarsSelector selectedKey={selectedKey} />}

        {/* Fretboard that will show up once a scale is selected */}
        {selectedOption?.notes && <Fretboard scaleNotes={selectedOption} />}
        <IntervalSymbolsLegend />
      </ScrollView>
    </LinearGradient>
  )
}
