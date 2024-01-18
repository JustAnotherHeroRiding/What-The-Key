import { useRoute } from '@react-navigation/native'
import { SingleTrackScreenNavigationProp } from '../utils/nav-types'
import { View, Text, Image, Dimensions } from 'react-native'
import useSpotifyService from '../services/SpotifyService'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import tw from '../utils/tailwindRN'
import LoadingSpinner from '../UiComponents/Reusable/Common/LoadingSpinner'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect } from 'react'
import BottomNav from '../UiComponents/BottomNav'
import NotFoundComponent from '../UiComponents/Reusable/Common/NotFound'

const screen = Dimensions.get('window')
const imageSize = screen.width * 0.85

function SingleTrackScreen({ navigation }: { navigation: SingleTrackScreenNavigationProp }) {
  const queryClient = useQueryClient()

  const route = useRoute()
  const { trackId } = route.params as { trackId: string }

  const { getTrackAnalysis } = useSpotifyService()

  const {
    data: track,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['SingleTrack', trackId],
    queryFn: () => getTrackAnalysis(trackId),
    enabled: !!trackId,
  })

  useEffect(() => {
    return () => {
      queryClient.removeQueries(['SingleTrack', trackId])
    }
  }, [trackId, queryClient])
  return (
    <LinearGradient
      colors={['#27272a', '#52525b']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`flex-grow w-full`)}
    >
      {isFetching ? (
        <LoadingSpinner />
      ) : track ? (
        <View style={tw.style(`flex justify-center items-center gap-2 p-4`)}>
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
        </View>
      ) : (
        <NotFoundComponent />
      )}
    </LinearGradient>
  )
}

export default SingleTrackScreen
