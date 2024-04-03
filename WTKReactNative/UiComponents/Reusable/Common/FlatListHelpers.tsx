import { TouchableOpacity, View, Text } from 'react-native'
import tw from '../../../utils/config/tailwindRN'
import { ModeNames, ScaleName } from '../../../utils/consts/scales-consts-types'
import React from 'react'
import { capitalizeFirstLetter } from '../../../utils/text-formatting'
import { Mode } from '../../../utils/track-formating'
import { splitJoinAndCapitalizeFirstLetter } from '../../../utils/split-camel-case'

export type SelectScaleFunction = (scale: ScaleName | ModeNames | null | Mode) => void

type RenderRowProps = {
  item: string
  index: number
  selectScale: SelectScaleFunction
  selectedScale: string
}

export const renderRow = ({ item, index, selectScale, selectedScale }: RenderRowProps) => (
  <TouchableOpacity
    onPress={() => selectScale(item as ScaleName)}
    style={tw.style(
      `py-3 px-3  ${item === selectedScale ? 'bg-beigeCustom' : 'bg-cream'} rounded-md border-cream border`,
    )}
  >
    <Text style={tw.style('text-xl', { fontFamily: 'figtree-bold' })}>{splitJoinAndCapitalizeFirstLetter(item)}</Text>
  </TouchableOpacity>
)

/**
 * Renders a separator with a dynamic width.
 * The width of the separator is a numeric value that will be used to dynamically generate the Tailwind CSS class for the width.
 * This allows the separator's width to be customized according to the needs of the layout.
 *
 * @param width - The width of the separator as a numeric value.
 * @returns A React element representing the separator view.
 */
export const renderSeparator = (width: number): React.ReactElement => <View style={tw.style(`h-2 w-${width}`)} />
