import { ScrollView } from 'react-native'
import tw from '../../../utils/config/tailwindRN'
import React from 'react'
import { CustomButton } from './CustomButtom'
import { selectTriads } from '../../../utils/scales-and-modes'
import { scaleNotesAndIntervals } from '../../../utils/consts/scales-consts-types'
import { Mode } from '../../../utils/track-formating'

interface TriadModeSelectorProps {
  triadMode: Mode | null
  setTriadMode: (mode: React.SetStateAction<Mode | null>) => void
  selectedKey: string
  setSelectedOption: (values: React.SetStateAction<scaleNotesAndIntervals | null>) => void
}

function TriadModeSelector({ triadMode, setTriadMode, selectedKey, setSelectedOption }: TriadModeSelectorProps) {
  return (
    <ScrollView
      horizontal={true}
      style={tw.style('flex-row')}
      contentContainerStyle={tw.style(`justify-between gap-2`)}
    >
      <CustomButton
        title={`Major`}
        btnStyle={tw.style(`${triadMode === 'Major' ? 'bg-beigeCustom' : ''}`)}
        txtStyle={tw.style(`${triadMode === 'Major' ? 'font-black' : ''}`)}
        onPress={() => {
          selectTriads('Major', setSelectedOption, selectedKey)
          setTriadMode('Major')
        }}
      ></CustomButton>
      <CustomButton
        title={`Minor`}
        btnStyle={tw.style(`${triadMode === 'Minor' ? 'bg-beigeCustom' : ''}`)}
        txtStyle={tw.style(`${triadMode === 'Minor' ? 'font-black' : ''}`)}
        onPress={() => {
          selectTriads('Minor', setSelectedOption, selectedKey)
          setTriadMode('Minor')
        }}
      ></CustomButton>
    </ScrollView>
  )
}

export default React.memo(TriadModeSelector)
