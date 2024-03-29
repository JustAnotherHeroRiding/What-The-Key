import { View, Text } from 'react-native'
import tw from '../../../utils/config/tailwindRN'
import React from 'react'

const NotFoundComponent = () => {
  return (
    <View style={tw.style(`border-cream border p-4 flex-1 justify-center items-center`)}>
      <Text style={tw.style(`text-xl text-white`)}>404: Page Not Found</Text>
      <Text style={tw.style(`text-xl text-white`)}>The content you were looking for could not be found :(</Text>
    </View>
  )
}

export default NotFoundComponent
