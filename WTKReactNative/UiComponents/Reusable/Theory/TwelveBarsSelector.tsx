import { Picker } from '@react-native-picker/picker'
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import tw from '../../../utils/config/tailwindRN'
import {
  twelveBarsLookup,
  scaleOrModeOptions,
  TwelveBarVariants,
  scaleNotesAndIntervals,
  TwelveBars,
} from '../../../utils/consts/scales-consts-types'
import { capitalizeFirstLetter } from '../../../utils/formating/text-formatting'
import { IntervalNames, Mode, intervalToRomanChord } from '../../../utils/formating/track-formating'
import { CustomButton } from '../Common/CustomButtom'
import { getTwelveBars } from '../../../utils/scales-and-modes'

export type DisplayType = 'roman' | 'note'

interface TwelveBarsSelectorProps {
  selectedKey: string
}

function TwelveBarsSelector({ selectedKey }: TwelveBarsSelectorProps) {
  const [twelveBars, setTwelveBars] = useState<TwelveBars | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<TwelveBarVariants>('standard')
  const [displayType, setDisplayType] = useState<DisplayType>('note')

  useEffect(() => {
    setTwelveBars(getTwelveBars(selectedKey, selectedVariant))
  }, [selectedVariant, selectedKey])

  return (
    <>
      <View style={tw.style(`flex-row items-center gap-2 mb-4 `)}>
        <View style={tw.style(`flex-col gap-2 w-1/2`)}>
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
        <CustomButton
          btnStyle={tw.style(`mt-auto`)}
          onPress={() => setDisplayType(displayType === 'note' ? 'roman' : 'note')}
          title={displayType === 'note' ? 'roman' : 'note'}
        ></CustomButton>
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
    </>
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

export default TwelveBarsSelector
