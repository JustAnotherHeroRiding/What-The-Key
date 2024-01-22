import { useRoute } from '@react-navigation/native'
import { SingleTrackScreenNavigationProp } from '../utils/types/nav-types'
import { View, Text, Image, Dimensions, BackHandler, ScrollView } from 'react-native'
import useSpotifyService from '../services/SpotifyService'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import tw from '../utils/config/tailwindRN'
import LoadingSpinner from '../UiComponents/Reusable/Common/LoadingSpinner'
import { LinearGradient } from 'expo-linear-gradient'
import NotFoundComponent from '../UiComponents/Reusable/Common/NotFound'
import React, { useEffect } from 'react'
import TrackDetailed from '../UiComponents/Reusable/Track/TrackDetailed'
import { Sources } from '../utils/types/track-service-types'

function SingleTrackScreen({ navigation }: { navigation: SingleTrackScreenNavigationProp }) {
  const route = useRoute()
  const { trackId, src } = route.params as { trackId: string; src: Sources }

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
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

    return () => backHandler.remove()
  }, [navigation])

  const handleBackPress = () => {
    navigation.goBack()
    return true
  }

  return (
    <LinearGradient
      colors={['#27272a', '#52525b']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`flex-grow w-full opacity-100`)}
    >
      {isFetching ? <LoadingSpinner /> : track ? <TrackDetailed track={track} src={src} /> : <NotFoundComponent />}
    </LinearGradient>
  )
}

export default SingleTrackScreen
