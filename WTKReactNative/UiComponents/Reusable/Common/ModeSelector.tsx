import { ScrollView } from 'react-native'
import tw from '../../../utils/config/tailwindRN'
import React, { useEffect } from 'react'
import { CustomButton } from './CustomButtom'
import { selectSeventh, selectTriads } from '../../../utils/scales-and-modes'
import { scaleNotesAndIntervals } from '../../../utils/consts/scales-consts-types'
import { Mode } from '../../../utils/track-formating'

interface ModeSelectorProps {
  scaleMode: Mode
  setScaleMode: (mode: React.SetStateAction<Mode | null>) => void
  selectedKey: string
  setSelectedOption: (values: React.SetStateAction<scaleNotesAndIntervals | null>) => void
  scaleType: 'triad' | 'seventh'
}

function ModeSelector({ scaleMode, setScaleMode, selectedKey, setSelectedOption, scaleType }: ModeSelectorProps) {
  useEffect(() => {
    if (scaleType === 'triad') {
      selectTriads(scaleMode as Mode, setSelectedOption, selectedKey)
    } else if (scaleType === 'seventh') {
      selectSeventh(scaleMode as Mode, setSelectedOption, selectedKey)
    }
  }, [scaleMode, selectedKey, scaleType])
  return (
    <ScrollView
      horizontal={true}
      style={tw.style('flex-row')}
      contentContainerStyle={tw.style(`justify-between gap-2`)}
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
    </ScrollView>
  )
}

export default React.memo(ModeSelector)
