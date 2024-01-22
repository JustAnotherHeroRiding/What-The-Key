import React from 'react'
import { View, TouchableOpacity, Image, Text, LayoutAnimation, Platform, UIManager } from 'react-native'
import { TrackData } from '../../../utils/types/spotify-types'
import tw from '../../../utils/config/tailwindRN'
import { useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import useTrackService from '../../../services/TrackService'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { LayoutAnimationConfig } from '../../../utils/config/animation-config'
import ContextMenu from '../TrackAdjacent/ContextMenu'

interface TrackProps {
  track: TrackData
  location: 'library' | 'recycleBin'
  openTabsModal: (trackData: TrackData) => void
}

const AddTrackTarget: { [key: string]: 'library' | 'recycleBin' } = {
  library: 'recycleBin',
  recycleBin: 'library',
}

const Track = ({ track, location, openTabsModal }: TrackProps) => {
  const [showcontextMenu, setShowContextMenu] = useState(false)

  const { addTrackMut, deleteTrackMut, isDeletingTrack, isAddingTrack } = useTrackService()

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

  const handleTabClick = () => {
    openTabsModal(track)
  }

  const AddToBinOrRestore = async () => {
    addTrackMut(
      { trackId: track.track.id, source: AddTrackTarget[location] },
      {
        onSuccess: () => {
          setShowContextMenu(false)
        },
      },
    )
  }

  const deleteTrackPermamently = async () => {
    deleteTrackMut(
      { trackId: track.track.id },
      {
        onSuccess: () => {
          setShowContextMenu(false)
        },
      },
    )
  }

  return (
    <>
      <View style={tw.style(`flex flex-row justify-between gap-2 items-center px-2 py-1 border-b border-slate-400`)}>
        <Image
          source={{ uri: track.track.album.images[0].url }}
          style={tw.style(`w-14 h-14 rounded-lg border-cream border`)}
        />
        <View style={tw.style(`flex-1 items-start ml-1 justify-center`)}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={tw.style('text-white font-figtreeBold')}>
            {track.track.name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode='tail' style={tw.style('font-figtreeBold text-artistGray')}>
            {track.track.artists[0].name}
          </Text>
        </View>

        <TouchableOpacity onPress={() => contextMenuClick()}>
          <Entypo name='dots-three-vertical' size={28} color='white' />
        </TouchableOpacity>
      </View>
      {showcontextMenu && (
        <ContextMenu
          location={location}
          scale={scale}
          AddToBinOrRestore={AddToBinOrRestore}
          deleteTrackPermamently={deleteTrackPermamently}
          isAddingTrack={isAddingTrack}
          handleTabClick={handleTabClick}
          trackId={track.track.id}
          setShowContextMenu={setShowContextMenu}
        />
      )}
    </>
  )
}
export default Track
