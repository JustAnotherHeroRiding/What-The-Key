import React from 'react'
import { View, Text } from 'react-native'
import tw from '../../../utils/config/tailwindRN'

const IntervalSymbolsLegend = () => {
  return (
    <>
      <Text style={tw.style(`text-slate-100 text-xl font-semibold`)}>Legend:</Text>
      <View style={tw.style(`flex flex-wrap flex-row items-center justify-between gap-2`)}>
        <View style={tw.style(`flex flex-col items-center justify-center`)}>
          <Text style={tw.style(`text-slate-50 text-center`)}>M</Text>
          <Text style={tw.style(`text-slate-50 text-center`)}>Major</Text>
        </View>
        <View style={tw.style(`flex flex-col items-center justify-center`)}>
          <Text style={tw.style(`text-slate-50 text-center`)}>m</Text>
          <Text style={tw.style(`text-slate-50 text-center`)}>Minor</Text>
        </View>
        <View style={tw.style(`flex flex-col items-center justify-center`)}>
          <Text style={tw.style(`text-slate-50 text-center`)}>P</Text>
          <Text style={tw.style(`text-slate-50 text-center`)}>Perfect</Text>
        </View>
        <View style={tw.style(`flex flex-col items-center justify-center`)}>
          <Text style={tw.style(`text-slate-50 text-center`)}>A</Text>
          <Text style={tw.style(`text-slate-50 text-center`)}>Augmented</Text>
        </View>
        <View style={tw.style(`flex flex-col items-center justify-center`)}>
          <Text style={tw.style(`text-slate-50 text-center`)}>♭</Text>
          <Text style={tw.style(`text-slate-50 text-center`)}>Flat</Text>
        </View>
      </View>
    </>
  )
}
export default IntervalSymbolsLegend
