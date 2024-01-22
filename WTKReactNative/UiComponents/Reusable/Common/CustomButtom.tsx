import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'
import React from 'react'
import colors from '../../../assets/colors'
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

interface CustomButtonProps {
  onPress?: (event: GestureResponderEvent) => void
  title?: string
  loading?: boolean
  disabled?: boolean
  btnStyle?: StyleProp<ViewStyle> // Add this line for custom styles
  txtStyle?: StyleProp<TextStyle> // Add this line for custom styles
  iconName?: 'github' | 'spotify'
}

const btnIconMap: {
  spotify: React.JSX.Element
  github: React.JSX.Element
} = {
  spotify: <Entypo name='spotify' size={24} color='green' />,
  github: <AntDesign name='github' size={24} color='black' />,
}

// Custom Button Component
export const CustomButton = ({
  onPress,
  title,
  loading,
  disabled,
  btnStyle,
  txtStyle,
  iconName,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, btnStyle]} onPress={onPress} disabled={loading || disabled}>
      {iconName && btnIconMap[iconName]}
      <Text style={[styles.buttonText, txtStyle]}>{loading ? 'Loading ...' : title}</Text>
    </TouchableOpacity>
  )
}

// Styles
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: colors.cream, // Default color, can be overridden
    flexDirection: 'row',
    gap: 4,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
})
