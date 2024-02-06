import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import colors from '../../../assets/colors'
import tw from '../../../utils/config/tailwindRN'

interface LoadingSpinnerProps {
  size?: number | 'small' | 'large' | undefined
  bgColor?: string
  color?: string
}

const LoadingSpinner = ({ size = 'large', bgColor = 'bg-cream', color = colors.amber600 }: LoadingSpinnerProps) => {
  return (
    <View style={tw.style(`flex mx-auto justify-center items-center ${bgColor} p-3 rounded-full mt-[3%]`)}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default LoadingSpinner
