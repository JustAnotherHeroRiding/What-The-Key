import React, { useContext } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import tw from '../../utils/tailwindRN'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { SessionContext } from '../../utils/Context/Session/SessionContext'

interface ContextMenuProps {
  location: string
  scale: SharedValue<number>
  AddToBinOrRestore: () => Promise<void>
  deleteTrackPermamently: () => Promise<void>
  isAddingTrack: boolean
  handleTabClick: () => void
}

const ContextMenu = ({
  location,
  scale,
  AddToBinOrRestore,
  deleteTrackPermamently,
  isAddingTrack,
  handleTabClick,
}: ContextMenuProps) => {
  const session = useContext(SessionContext)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  return (
    <Animated.View style={animatedStyles}>
      <View
        style={tw.style(`flex flex-col gap-2 items-center  
 bg-beigeCustom p-2 rounded-lg z-10`)}
      >
        <TouchableOpacity
          onPress={() => AddToBinOrRestore()}
          style={tw.style(`py-2 gap-1 w-full justify-between flex-row`)}
        >
          <MaterialIcons name='library-add' size={24} color='black' />
          <Text style={tw.style(`text-black`, { fontFamily: 'figtree-bold' })}>
            {location === 'library'
              ? isAddingTrack
                ? 'Deleting..'
                : 'Delete Track'
              : isAddingTrack
                ? 'Restoring...'
                : 'Restore Track'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw.style(`py-2 w-full gap-1 justify-between flex-row`)}>
          <MaterialIcons name='audiotrack' size={24} color='black' />
          <Text style={tw.style(`text-black`, { fontFamily: 'figtree-bold' })}>Open Details</Text>
        </TouchableOpacity>
        {session && (
          <TouchableOpacity
            onPress={() => handleTabClick()}
            style={tw.style(`py-2 w-full gap-1 justify-between flex-row`)}
          >
            <MaterialCommunityIcons name='guitar-pick-outline' size={24} color='black' />
            <Text style={tw.style(`text-black`, { fontFamily: 'figtree-bold' })}>Add Tabs</Text>
          </TouchableOpacity>
        )}
        {location === 'recycleBin' && (
          <TouchableOpacity
            onPress={() => deleteTrackPermamently()}
            style={tw.style(`py-2 w-full gap-1 justify-between flex-row`)}
          >
            <MaterialIcons name='delete' size={24} color='black' />
            <Text style={tw.style(`text-black`, { fontFamily: 'figtree-bold' })}>Permanenty Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  )
}

export default ContextMenu
