import React from 'react'
import { Image, Text, ScrollView, TouchableOpacity, View, StyleProp, TextStyle } from 'react-native'
import { TrackData } from '../../../utils/spotify-types'
import tw from '../../../utils/tailwindRN'
import { Dimensions } from 'react-native'
import { formatDuration, formatTimeSignature, getNoteName } from '../../../utils/track-formating'
import useTrackService from '../../../services/TrackService'

interface TrackProps {
  track: TrackData
}

type InfoColumnProps = {
  label: string
  value: string | number
  tailwindStyle?: string
  textStyle?: StyleProp<TextStyle>
}

const InfoColumn: React.FC<InfoColumnProps> = ({ label, value, tailwindStyle = '', textStyle = {} }) => (
  <View style={tw`flex flex-col items-center justify-center`}>
    <Text style={[tw`${tailwindStyle} text-beigeCustom text-2xl`, { fontFamily: 'figtree-bold' }, textStyle]}>
      {label}
    </Text>
    <Text style={[tw`${tailwindStyle} text-white text-xl`, { fontFamily: 'figtree-bold' }, textStyle]}>{value}</Text>
  </View>
)

const screen = Dimensions.get('window')
const imageSize = screen.width * 0.85

const TrackDetailed = ({ track }: TrackProps) => {
  const { addTrackMut, isAddingTrack } = useTrackService()

  const addToLib = async () => {
    addTrackMut({ trackId: track.track.id, source: 'library' })
  }
  return (
    <ScrollView contentContainerStyle={tw.style(`flex justify-center items-center gap-2 p-4`)}>
      <Text style={tw.style(`text-white text-2xl w-[90%] text-center`, { fontFamily: 'figtree-bold' })}>
        {track?.track.name}
      </Text>
      <Text style={tw.style(`text-artistGray text-2xl w-[90%] text-center`, { fontFamily: 'figtree-bold' })}>
        {track?.track.artists[0].name}
      </Text>
      <Image
        source={{ uri: track.track.album.images[0].url }}
        style={tw.style(`mb-4 w-[250px] max-w-[${imageSize}px] h-[250px] rounded-md border border-cream`, {
          objectFit: 'contain',
        })}
        alt={track.track.name}
      />
      <View style={tw.style(`flex flex-row justify-center items-center flex-wrap gap-2`)}>
        <InfoColumn
          label='Key'
          value={`${getNoteName(track.audioAnalysis?.track.key ?? -1)}${track.audioFeatures?.mode === 1 ? ' Major' : ' Minor'}`}
        />
        <InfoColumn label='BPM' value={track.audioAnalysis?.track.tempo as number} />
        <InfoColumn label='Year' value={new Date(track.track.album.release_date).getFullYear()} />
        <InfoColumn label='Length' value={formatDuration(track.track.duration_ms)} />
        <InfoColumn
          label='Time'
          value={`${formatTimeSignature(track.audioAnalysis?.track.time_signature as number)}/4`}
        />
      </View>
      <TouchableOpacity
        style={tw`px-4 py-3 border  border-black rounded-2xl bg-beigeCustom font-800 shadow-lg`}
        // Start the Play modes
      >
        <Text style={tw.style(`text-center text-2xl`, { fontFamily: 'figtree-bold' })}>Play</Text>
      </TouchableOpacity>
      <View style={tw.style(`flex flex-wrap items-center justify-center flex-row gap-2`)}>
        <TouchableOpacity
          style={tw`px-4 py-3 border  border-black rounded-xl text-2xl bg-cream font-800 shadow-lg`}
          onPress={() => addToLib()}
        >
          <Text style={tw.style(`text-center`, { fontFamily: 'figtree-bold' })}>
            {isAddingTrack ? 'Adding...' : 'Save'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`px-4 py-3 border  border-black rounded-xl text-2xl bg-cream font-800 shadow-lg`}
          // Start displaying suggested scales to plays
        >
          <Text style={tw.style(`text-center`, { fontFamily: 'figtree-bold' })}>Scales</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`px-4 py-3 border  border-black rounded-xl text-2xl bg-cream font-800 shadow-lg`}
          // Show the chords in song
        >
          <Text style={tw.style(`text-center`, { fontFamily: 'figtree-bold' })}>Chords</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`px-4 py-3 border  border-black rounded-xl text-2xl bg-cream font-800 shadow-lg`}
          // Show the triads from the key/chords in the song's key
        >
          <Text style={tw.style(`text-center`, { fontFamily: 'figtree-bold' })}>Triads</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`px-4 py-3 border  border-black rounded-xl text-2xl bg-cream font-800 shadow-lg`}
          // Chord Progressions
        >
          <Text style={tw.style(`text-center`, { fontFamily: 'figtree-bold' })}>Chord Progressions</Text>
        </TouchableOpacity>
        
      </View>
    </ScrollView>
  )
}
export default TrackDetailed
