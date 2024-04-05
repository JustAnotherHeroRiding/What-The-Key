import { ScrollView, Switch, View, Text } from 'react-native'
import tw from '../../../utils/config/tailwindRN'
import React, { useEffect, useState } from 'react'
import { CustomButton } from '../Common/CustomButtom'
import { selectSeventh, selectTriads } from '../../../utils/scales-and-modes'
import { scaleNotesAndIntervals } from '../../../utils/consts/scales-consts-types'
import { Mode } from '../../../utils/formating/track-formating'
import colors from '../../../assets/colors'

interface ModeSelectorProps {
  scaleMode: Mode
  setScaleMode: (mode: React.SetStateAction<Mode | null>) => void
  selectedKey: string
  setSelectedOption: (values: React.SetStateAction<scaleNotesAndIntervals | null>) => void
  scaleType: 'triad' | 'seventh'
}

function ModeSelector({ scaleMode, setScaleMode, selectedKey, setSelectedOption, scaleType }: ModeSelectorProps) {
  const [addFifth, setAddFifth] = useState(false)

  useEffect(() => {
    if (scaleType === 'triad') {
      selectTriads(scaleMode as Mode, setSelectedOption, selectedKey)
    } else if (scaleType === 'seventh') {
      selectSeventh(scaleMode as Mode, setSelectedOption, selectedKey, addFifth)
    }
  }, [scaleMode, selectedKey, scaleType, addFifth])
  return (
    <ScrollView
      horizontal={true}
      style={tw.style('flex-row')}
      contentContainerStyle={tw.style(`justify-between items-center gap-2`)}
    >
      <CustomButton
        title={`Major`}
        btnStyle={tw.style(`${scaleMode === 'Major' ? 'bg-beigeCustom' : ''}`)}
        txtStyle={tw.style(`${scaleMode === 'Major' ? 'font-black' : ''}`)}
        onPress={() => {
          setScaleMode('Major')
        }}
      ></CustomButton>
      <CustomButton
        title={`Minor`}
        btnStyle={tw.style(`${scaleMode === 'Minor' ? 'bg-beigeCustom' : ''}`)}
        txtStyle={tw.style(`${scaleMode === 'Minor' ? 'font-black' : ''}`)}
        onPress={() => {
          setScaleMode('Minor')
        }}
      ></CustomButton>
      {scaleType === 'seventh' && (
        <View style={tw.style(`flex-col items-center justify-center`)}>
          <Text style={tw.style(`text-slate-200`)}>Add Fifth</Text>
          <Switch
            thumbColor={colors.beigeCustom}
            trackColor={{ false: colors.slate500, true: colors.cream }}
            value={addFifth}
            onValueChange={() => setAddFifth(!addFifth)}
          />
        </View>
      )}
    </ScrollView>
  )
}

export default React.memo(ModeSelector)
