import { View, Text, ScrollView } from 'react-native'
import { StudyScreenNavigationProp } from '../../utils/types/nav-types'
import React, { useEffect, useMemo, useState } from 'react'
import { Mode, NOTES } from '../../utils/track-formating'
import { Picker } from '@react-native-picker/picker'
import { LinearGradient } from 'expo-linear-gradient'
import tw from '../../utils/config/tailwindRN'
import { getScaleOrModeNotes, getTriadNotes, selectTriads } from '../../utils/scales-and-modes'
import _ from 'lodash'
import Fretboard from '../../UiComponents/Reusable/Common/Fretboard'
import IntervalSymbolsLegend from '../../UiComponents/Reusable/TrackAdjacent/IntervalSymbolsLegend'
import { capitalizeFirstLetter } from '../../utils/text-formatting'
import { useOrientation } from '../../utils/Context/OrientationProvider'
import { CustomButton } from '../../UiComponents/Reusable/Common/CustomButtom'
import {
  ModeNames,
  ScaleName,
  scaleNotesAndIntervals,
  scaleOrModeOptions,
} from '../../utils/consts/scales-consts-types'
import ScalesList from '../../UiComponents/Reusable/Common/ScalesList'

export default function StudyScreen({ navigation }: { navigation: StudyScreenNavigationProp }) {
  const [selectedKey, setSelectedKey] = useState(NOTES[0])
  const [scaleType, setScaleType] = useState('scale')
  const [selectedOption, setSelectedOption] = useState<scaleNotesAndIntervals | null>(null)
  const [triadMode, setTriadMode] = useState<Mode>('Major')

  const { isLandscape } = useOrientation()

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

        {scaleType === 'triad' && (
          <ScrollView
            horizontal={true}
            style={tw.style('flex-row')}
            contentContainerStyle={tw.style(`justify-between gap-2`)}
          >
            <CustomButton
              title={`Major`}
              btnStyle={tw.style(`${triadMode === 'Major' ? 'bg-beigeCustom' : ''}`)}
              onPress={() => {
                selectTriads('Major', setSelectedOption, selectedKey)
                setTriadMode('Major')
              }}
            ></CustomButton>
            <CustomButton
              title={`Minor`}
              btnStyle={tw.style(`${triadMode === 'Minor' ? 'bg-beigeCustom' : ''}`)}
              txtStyle={tw.style({ fontFamily: 'figtree-bold' })}
              onPress={() => {
                selectTriads('Minor', setSelectedOption, selectedKey)
                setTriadMode('Minor')
              }}
            ></CustomButton>
          </ScrollView>
        )}
        {scaleType !== 'triad' && (
          <ScalesList
            scaleType={scaleType}
            selectedOption={selectedOption ? selectedOption : null}
            setSelectedOption={setSelectedOption}
            selectedKey={selectedKey}
          />
        )}

        {/* Fretboard that will show up once a scale is selected */}
        {selectedOption?.notes && <Fretboard scaleNotes={selectedOption} />}
        <IntervalSymbolsLegend />
      </ScrollView>
    </LinearGradient>
  )
}
