import React from 'react'
import { View, Text, Image } from 'react-native'
import tw from '../../../utils/config/tailwindRN'
import { Mode, getNoteName } from '../../../utils/formating/track-formating'
import { TrackData } from '../../../utils/types/spotify-types'
import { Dimensions } from 'react-native'

interface TrackMiniProps {
  track: TrackData
  src: string
  mode: Mode
}

const screen = Dimensions.get('window')
const imageSize = screen.width * 0.1

const TrackMini = ({ track, src, mode }: TrackMiniProps) => {
  return (
    <View style={tw.style(`flex flex-col items-center justify-center gap-4`)}>
      <Text style={tw.style(`text-2xl text-white text-center font-semibold`)}>
        {src} in: {getNoteName(track.audioAnalysis?.track.key ?? -1)} {mode}
      </Text>
      <Text style={tw.style(`text-xl text-white text-center font-medium`)}>{track.track.name}</Text>
      <Text style={tw.style(`text-xl text-artistGray text-center`)}>{track.track.artists[0].name}</Text>
      <Image
        source={{ uri: track.track.album.images[0].url }}
        style={tw.style(`mb-4 w-[${imageSize}] h-[${imageSize}] rounded-md border border-cream`, {
          objectFit: 'contain',
        })}
        alt={track.track.name}
      />
    </View>
  )
}

export default React.memo(TrackMini)
