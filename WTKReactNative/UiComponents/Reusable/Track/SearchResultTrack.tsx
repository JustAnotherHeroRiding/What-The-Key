import { View, Image, Text, TouchableOpacity, Alert, Platform, UIManager } from 'react-native'
import { SpotifyItem } from '../../../utils/types/spotify-types'
import tw from '../../../utils/config/tailwindRN'
import { Entypo } from '@expo/vector-icons'
import React, { useContext, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { SessionContext } from '../../../utils/Context/Session/SessionContext'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../utils/types/nav-types'
import useTrackService from '../../../services/TrackService'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Sources } from '../../../utils/types/track-service-types'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { LayoutAnimation } from 'react-native'
import { LayoutAnimationConfig } from '../../../utils/config/animation-config'

interface SearchResultTrackProps {
  track: SpotifyItem
  location: Sources
}

const SearchResultTrack = ({ track, location }: SearchResultTrackProps) => {
  const [showcontextMenu, setShowContextMenu] = useState(false)

  const session = useContext(SessionContext)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const { addTrackMut, isAddingTrack } = useTrackService()

  const addToLib = async () => {
    addTrackMut(
      { trackId: track.id, source: 'library' },
      {
        onSuccess: () => {
          setShowContextMenu(false)
        },
      },
    )
  }

  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }

  const scale = useSharedValue(0)

  const grow = () => {
    scale.value = withTiming(1, { duration: 300 })
  }

  const shrink = () => {
    scale.value = withTiming(0, { duration: 300 })
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  const contextMenuClick = () => {
    if (!showcontextMenu) {
      setShowContextMenu(true)
      grow()
    } else {
      shrink()
      setTimeout(() => {
        LayoutAnimation.configureNext(LayoutAnimationConfig)
        setShowContextMenu(false)
      }, 300)
    }
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('SingleTrack', { trackId: track.id, src: location as Sources })}
        style={tw.style(`flex flex-row justify-between gap-2 items-center px-2 py-1 border-b border-slate-400`)}
      >
        <Image
          source={{ uri: track.album.images[0].url }}
          style={tw.style(`w-14 h-14 rounded-lg border-cream border`)}
        />
        <View style={tw.style(`flex-1 items-start ml-1 justify-center`)}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={tw.style(`text-white font-figtreeBold`)}>
            {track.name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode='tail' style={tw.style(`text-artistGray font-figtreeBold`)}>
            {' '}
            {track.artists[0].name}
          </Text>
        </View>

        <TouchableOpacity onPress={() => contextMenuClick()}>
          <Entypo name='dots-three-vertical' size={28} color='white' />
        </TouchableOpacity>
      </TouchableOpacity>
      {showcontextMenu && (
        <Animated.View style={animatedStyles}>
          <View
            style={tw.style(`flex flex-col gap-2 items-center  
        bg-beigeCustom p-2 rounded-lg z-10`)}
          >
            {session ? (
              <>
                <TouchableOpacity
                  onPress={() => addToLib()}
                  style={tw.style(`py-2 gap-1 w-full justify-between flex-row`)}
                >
                  <MaterialIcons name='library-add' size={24} color='black' />
                  <Text style={tw.style(`text-black`, { fontFamily: 'figtree-bold' })}>
                    {isAddingTrack ? 'Adding Track...' : 'Add to Library'}{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw.style(`py-2 w-full gap-1 justify-between flex-row`)}
                  onPress={() => {
                    setShowContextMenu(false)
                    navigation.navigate('SingleTrack', { trackId: track.id, src: 'home' })
                  }}
                >
                  <MaterialIcons name='audiotrack' size={24} color='black' />
                  <Text style={tw.style(`text-black`, { fontFamily: 'figtree-bold' })}>Open Details</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setShowContextMenu(false)
                  //@ts-ignore
                  navigation.navigate('Auth')
                }}
                style={tw.style(`py-2 gap-1 w-full justify-between flex-row`)}
              >
                <MaterialIcons name='login' size={24} color='black' />
                <Text style={tw.style(`text-black`, { fontFamily: 'figtree-bold' })}>Log in to interact</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      )}
    </>
  )
}

export default SearchResultTrack
