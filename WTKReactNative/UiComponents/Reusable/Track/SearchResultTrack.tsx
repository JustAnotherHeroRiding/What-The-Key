import { View, Image, Text, TouchableOpacity, Alert } from 'react-native'
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

interface SearchResultTrackProps {
  track: SpotifyItem
}

const SearchResultTrack = ({ track }: SearchResultTrackProps) => {
  const [showcontextMenu, setShowContextMenu] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  return (
    <View style={tw.style(`flex flex-row justify-between gap-2 items-center px-2 py-1 border-b border-slate-400`)}>
      <Image source={{ uri: track.album.images[0].url }} style={tw.style(`w-14 h-14 rounded-lg border-cream border`)} />
      <View style={tw.style(`flex-1 items-start ml-1 justify-center`)}>
        <Text numberOfLines={1} ellipsizeMode='tail' style={tw.style(`text-white font-figtreeBold`)}>
          {track.name}
        </Text>
        <Text numberOfLines={1} ellipsizeMode='tail' style={tw.style(`text-artistGray font-figtreeBold`)}>
          {' '}
          {track.artists[0].name}
        </Text>
      </View>
      {showcontextMenu &&
        (session ? (
          <View
            style={tw.style(`flex flex-col gap-2 items-center absolute right-12 
                    -top-20 bg-beigeCustom p-2 rounded-lg z-5`)}
          >
            <TouchableOpacity onPress={() => addToLib()} style={tw.style(`py-2 gap-1 w-full justify-between flex-row`)}>
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
          </View>
        ) : (
          <View
            style={tw.style(`flex flex-col gap-2 items-center absolute right-12 
                -top-20 bg-beigeCustom p-2 rounded-lg z-5`)}
          >
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
          </View>
        ))}
      <TouchableOpacity onPress={() => setShowContextMenu(!showcontextMenu)}>
        <Entypo name='dots-three-vertical' size={28} color='white' />
      </TouchableOpacity>
    </View>
  )
}

export default SearchResultTrack
