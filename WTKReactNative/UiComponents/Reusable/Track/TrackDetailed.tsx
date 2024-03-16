import React, { useContext } from 'react'
import { Image, Text, ScrollView, TouchableOpacity, View, StyleProp, TextStyle } from 'react-native'
import { TrackData } from '../../../utils/types/spotify-types'
import tw from '../../../utils/config/tailwindRN'
import { Dimensions } from 'react-native'
import { formatDuration, formatTimeSignature, getNoteName } from '../../../utils/track-formating'
import useTrackService from '../../../services/TrackService'
import { Sources, isTrackAdded } from '../../../utils/types/track-service-types'
import { SessionContext } from '../../../utils/Context/Session/SessionContext'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../utils/types/nav-types'
import * as Progress from 'react-native-progress'
import colors from '../../../assets/colors'

interface TrackProps {
  track: TrackData
  src: Sources
  openTabsModal: (trackData: TrackData) => void
  trackAddedStatus: isTrackAdded
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

const TrackDetailed = ({ track, src, openTabsModal, trackAddedStatus }: TrackProps) => {
  const session = useContext(SessionContext)
  const { addTrackMut, isAddingTrack } = useTrackService()

  const addToLib = async () => {
    addTrackMut({ trackId: track.track.id, source: 'library' })
  }

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList['SingleTrackNavigator']>>()

  console.log(track)

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
      <View style={tw`flex flex-col gap-2 items-center justify-center`}>
        <Text style={[tw` text-beigeCustom mb-3 text-2xl`, { fontFamily: 'figtree-bold' }]}>Key Confidence</Text>
        <Progress.Bar
          style={tw.style(``)}
          color={colors.beigeCustom}
          progress={track.audioAnalysis?.track.key_confidence}
        />
      </View>
      <View style={tw.style(`flex flex-row justify-center items-center flex-wrap gap-2`)}>
        <InfoColumn
          label='Key'
          value={`${getNoteName(track.audioAnalysis?.track.key ?? -1)}${track.audioAnalysis?.track.mode === 1 ? ' Major' : ' Minor'}`}
        />
        <InfoColumn label='BPM' value={track.audioAnalysis?.track.tempo as number} />
        <InfoColumn label='Year' value={new Date(track.track.album.release_date).getFullYear()} />
        <InfoColumn label='Length' value={formatDuration(track.track.duration_ms)} />
        <InfoColumn
          label='Time'
          value={`${formatTimeSignature(track.audioAnalysis?.track.time_signature as number)}/4`}
        />
      </View>
      <View style={tw.style(`flex flex-wrap items-center justify-center flex-row gap-2`)}>
        <TouchableOpacity
          disabled={true}
          style={tw`px-4 py-3 border opacity-70  border-black rounded-2xl bg-beigeCustom font-800 shadow-lg`}
          // Start the Play mode
        >
          <Text style={tw.style(`text-center text-2xl`, { fontFamily: 'figtree-bold' })}>Play</Text>
        </TouchableOpacity>
        {session &&
          (trackAddedStatus.isInLibrary || trackAddedStatus.isInRecycleBin ? (
            <TouchableOpacity
              onPress={() => openTabsModal(track)}
              style={tw`px-4 py-3 border  border-black rounded-2xl bg-beigeCustom font-800 shadow-lg`}
            >
              <Text style={tw.style(`text-center text-2xl`, { fontFamily: 'figtree-bold' })}>Open Tab</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={tw`px-4 py-3 border  border-black rounded-2xl bg-beigeCustom font-800 shadow-lg`}
              onPress={() => addToLib()}
            >
              <Text style={tw.style(`text-center text-2xl`, { fontFamily: 'figtree-bold' })}>
                {isAddingTrack ? 'Adding...' : 'Save'}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
      <View style={tw.style(`flex flex-wrap items-center justify-center flex-row gap-2`)}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Scales', { track: track })}
          style={tw`px-4 py-3 border border-black rounded-xl text-2xl bg-cream font-800 shadow-lg`}
        >
          <Text style={tw.style(`text-center`, { fontFamily: 'figtree-bold' })}>Scales</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Modes', { track: track })}
          style={tw`px-4 py-3  border border-black rounded-xl text-2xl bg-cream font-800 shadow-lg`}
        >
          <Text style={tw.style(`text-center`, { fontFamily: 'figtree-bold' })}>Modes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Intervals', { track: track })}
          style={tw`px-4 py-3 border  border-black rounded-xl text-2xl bg-cream font-800 shadow-lg`}
        >
          <Text style={tw.style(`text-center`, { fontFamily: 'figtree-bold' })}>Intervals</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Triads', { track: track })}
          style={tw`px-4 py-3 border border-black rounded-xl text-2xl bg-cream font-800 shadow-lg`}
        >
          <Text style={tw.style(`text-center`, { fontFamily: 'figtree-bold' })}>Triads</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TwelveBars', { track: track })}
          style={tw`px-4 py-3 border  border-black rounded-xl text-2xl bg-cream font-800 shadow-lg`}
        >
          <Text style={tw.style(`text-center`, { fontFamily: 'figtree-bold' })}>Twelve Bars</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
export default React.memo(TrackDetailed)
