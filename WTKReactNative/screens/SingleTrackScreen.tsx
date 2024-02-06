import { useRoute } from '@react-navigation/native'
import { SingleTrackScreenNavigationProp } from '../utils/types/nav-types'
import { BackHandler } from 'react-native'
import useSpotifyService from '../services/SpotifyService'
import { useQuery } from '@tanstack/react-query'
import tw from '../utils/config/tailwindRN'
import LoadingSpinner from '../UiComponents/Reusable/Common/LoadingSpinner'
import { LinearGradient } from 'expo-linear-gradient'
import NotFoundComponent from '../UiComponents/Reusable/Common/NotFound'
import React, { useEffect, useState } from 'react'
import TrackDetailed from '../UiComponents/Reusable/Track/TrackDetailed'
import { Sources } from '../utils/types/track-service-types'
import { TrackData } from '../utils/types/spotify-types'
import TrackTabModal from '../UiComponents/Reusable/TrackAdjacent/TrackTabModal'
import useTrackService from '../services/TrackService'

function SingleTrackScreen({ navigation }: { navigation: SingleTrackScreenNavigationProp }) {
  const route = useRoute()
  const { trackId, src } = route.params as { trackId: string; src: Sources }

  const { getTrackAnalysis } = useSpotifyService()
  const { isAddingTab, isTrackAdded } = useTrackService()

  const [isTabsModalVisible, setIsTabsModalVisible] = useState(false)
  const [currentTrackForModal, setCurrentTrackForModal] = useState<TrackData | null>(null)

  const openTabsModal = (trackData: TrackData) => {
    setCurrentTrackForModal(trackData)
    setIsTabsModalVisible(true)
  }

  const closeTabsModal = () => {
    setIsTabsModalVisible(false)
  }

  const {
    data: track,
    error: trackError,
    isFetching: isFetchingTrack,
  } = useQuery({
    queryKey: ['SingleTrack', trackId],
    queryFn: () => getTrackAnalysis(trackId),
    enabled: !!trackId,
  })

  const {
    data: trackAddedStatus,
    error: trackStatusError,
    isFetching: isFetchingTrackStatus,
  } = useQuery({ queryKey: ['SingleTrackStatus', trackId], queryFn: () => isTrackAdded(trackId), enabled: !!trackId })

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

    return () => backHandler.remove()
  }, [navigation])

  if (trackError || trackStatusError) {
    console.error(trackError)
  }

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
      {isFetchingTrack || isFetchingTrackStatus ? (
        <LoadingSpinner />
      ) : track && trackAddedStatus ? (
        <TrackDetailed track={track} src={src} openTabsModal={openTabsModal} trackAddedStatus={trackAddedStatus} />
      ) : (
        <NotFoundComponent />
      )}
      {isTabsModalVisible && currentTrackForModal && (
        <TrackTabModal currentTrack={currentTrackForModal} closeTabsModal={closeTabsModal} isAddingTab={isAddingTab} />
      )}
    </LinearGradient>
  )
}

export default SingleTrackScreen
