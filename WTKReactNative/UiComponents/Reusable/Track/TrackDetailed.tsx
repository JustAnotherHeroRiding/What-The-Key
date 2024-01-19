import React from 'react'
import { Image, Text, ScrollView } from 'react-native'
import { TrackData } from '../../../utils/spotify-types'
import tw from '../../../utils/tailwindRN'
import { Dimensions } from 'react-native'

interface TrackProps {
  track: TrackData
}

const screen = Dimensions.get('window')
const imageSize = screen.width * 0.85

const TrackDetailed = ({ track }: TrackProps) => {
  return (
    <ScrollView contentContainerStyle={tw.style(`flex justify-center items-center gap-2 p-4`)}>
      <Text style={tw.style(`text-white text-2xl`, { fontFamily: 'figtree-bold' })}>{track?.track.name}</Text>
      <Text style={tw.style(`text-white text-2xl`, { fontFamily: 'figtree-bold' })}>
        {track?.track.artists[0].name}
      </Text>
      <Image
        source={{ uri: track.track.album.images[0].url }}
        style={tw.style(`mb-4 w-[300px] max-w-[${imageSize}px] h-[300px] rounded-md border border-cream`, {
          objectFit: 'contain',
        })}
        alt={track.track.name}
      />
    </ScrollView>
  )
}
export default TrackDetailed
