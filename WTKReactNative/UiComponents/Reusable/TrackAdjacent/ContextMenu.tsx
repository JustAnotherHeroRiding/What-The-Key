import React, { useContext } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import tw from '../../../utils/config/tailwindRN'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { SessionContext } from '../../../utils/Context/Session/SessionContext'
import { Link, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../utils/types/nav-types'
import { Sources } from '../../../utils/types/track-service-types'

interface ContextMenuProps {
  location: Sources
  scale: SharedValue<number>
  AddToBinOrRestore: () => Promise<void>
  deleteTrackPermamently: () => Promise<void>
  isAddingTrack: boolean
  handleTabClick: () => void
  trackId: string
  setShowContextMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const ContextMenu = ({
  location,
  scale,
  AddToBinOrRestore,
  deleteTrackPermamently,
  isAddingTrack,
  handleTabClick,
  trackId,
  setShowContextMenu,
}: ContextMenuProps) => {
  const session = useContext(SessionContext)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

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
        <TouchableOpacity
          onPress={() => {
            setShowContextMenu(false)
            navigation.navigate('SingleTrackNavigator', {
              /* @ts-ignore */
              screen: 'SingleTrackOverview',
              params: {
                trackId: trackId,
                src: 'home',
              },
            })
          }}
          style={tw.style(`py-2 w-full gap-1 justify-between flex-row`)}
        >
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
