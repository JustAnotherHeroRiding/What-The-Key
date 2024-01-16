import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { LibraryOrDeletedScreenNavigationProp, RootStackParamList } from '../utils/nav-types'
import tw from '../utils/tailwindRN'
import Toast from 'react-native-root-toast'
import { TrackData } from '../utils/spotify-types'
import { LinearGradient } from 'expo-linear-gradient'
import Track from '../UiComponents/Reusable/Track/Track'
import LoadingSpinner from '../UiComponents/Reusable/Common/LoadingSpinner'
import useTrackService from '../services/TrackService'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { isApiErrorResponse } from '../utils/typeGuards'
import TrackTabModal from '../UiComponents/Reusable/TrackAdjacent/TrackTabModal'
import { RouteProp, useRoute } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import colors from '../assets/colors'
import NotFoundComponent from '../UiComponents/Reusable/Common/NotFound'

const TitleCaseMap: { [key: string]: 'Library' | 'Deleted' } = {
  library: 'Library',
  recycleBin: 'Deleted',
}

function LibraryOrDeletedScreen({ navigation }: { navigation: LibraryOrDeletedScreenNavigationProp }) {
  const router = useRoute<RouteProp<RootStackParamList, 'LibraryOrDeleted'>>()

  const type = router.params?.type ?? ''

  const isValidType = type === 'library' || type === 'recycleBin'

  const [isTabsModalVisible, setIsTabsModalVisible] = useState(false)
  const [currentTrackForModal, setCurrentTrackForModal] = useState<TrackData | null>(null)

  const { getTracks, isAddingTab } = useTrackService()

  const openTabsModal = (trackData: TrackData) => {
    setCurrentTrackForModal(trackData)
    setIsTabsModalVisible(true)
  }

  const closeTabsModal = () => {
    setIsTabsModalVisible(false)
  }

  const {
    data: tracks,
    isFetching,
    error,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [type],
    queryFn: () => getTracks({ location: type }),
    staleTime: 500,
    placeholderData: keepPreviousData,
  })

  if (error) {
    Toast.show(error instanceof Error ? error.message : 'An Unknown error occured.', {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: 'red',
    })
  }

  return (
    <LinearGradient
      colors={['#27272a', '#52525b']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`flex-grow w-full`)}
    >
      {isValidType ? (
        isLoading ? (
          <View style={tw.style(`flex items-center justify-center my-auto`)}>
            <Text
              style={tw.style(`text-white text-center`, {
                fontFamily: 'figtree-bold',
              })}
            >
              Building your {TitleCaseMap[type] === 'Library' ? 'Library' : 'recycleBin'}...
            </Text>
            <LoadingSpinner />
          </View>
        ) : isApiErrorResponse(tracks) ? (
          <View>
            <Text
              style={tw.style(`text-white border-slate-500 border-b-2 text-3xl py-4 text-center`, {
                fontFamily: 'figtree-bold',
              })}
            >
              {TitleCaseMap[type]}
            </Text>
            <Text style={tw.style(`text-white font-figtreeBold text-3xl py-4 text-center`)}>
              Your {TitleCaseMap[type]} is empty
            </Text>
            <TouchableOpacity
              disabled={isFetching || isLoading}
              style={tw.style(`py-3 px-3 rounded-md gap-1 border-cream border flex items-center flex-row mx-auto`)}
            >
              <MaterialIcons name='refresh' size={24} color={colors.beigeCustom} />
              <Text
                style={tw.style(`text-white text-xl`, {
                  fontFamily: 'figtree-bold',
                })}
              >
                Refresh
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            style={tw.style(`flex-grow`)}
            contentContainerStyle={tw.style(`pb-20`)}
            data={tracks as TrackData[]}
            renderItem={({ item }) => <Track track={item} location={type} openTabsModal={() => openTabsModal(item)} />}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => (
              <Text
                style={tw.style(`text-white border-slate-500 border-b-2 text-3xl py-4 text-center`, {
                  fontFamily: 'figtree-bold',
                })}
              >
                {TitleCaseMap[type]}
              </Text>
            )}
            refreshing={isFetching}
            onRefresh={() => refetch()}
          />
        )
      ) : (
        <NotFoundComponent />
      )}
      {isTabsModalVisible && currentTrackForModal && (
        <TrackTabModal currentTrack={currentTrackForModal} closeTabsModal={closeTabsModal} isAddingTab={isAddingTab} />
      )}
    </LinearGradient>
  )
}

export default LibraryOrDeletedScreen
