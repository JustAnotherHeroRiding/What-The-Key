import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import {
  DeletedScreenNavigationProp,
  LibraryScreenNavigationProp,
  RootStackParamList,
} from '../../utils/types/nav-types'
import tw from '../../utils/config/tailwindRN'
import { TrackData } from '../../utils/types/spotify-types'
import { LinearGradient } from 'expo-linear-gradient'
import Track from '../../UiComponents/Reusable/Track/Track'
import LoadingSpinner from '../../UiComponents/Reusable/Common/LoadingSpinner'
import useTrackService from '../../services/TrackService'
import { keepPreviousData, useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import { isApiErrorResponse } from '../../utils/types/typeGuards'
import TrackTabModal from '../../UiComponents/Reusable/TrackAdjacent/TrackTabModal'
import { RouteProp, useRoute } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import colors from '../../assets/colors'
import NotFoundComponent from '../../UiComponents/Reusable/Common/NotFound'
import { dataSource, TracksPage } from '../../utils/types/track-service-types'
import { displayToast } from '../../utils/toasts'
import _ from 'lodash'

const TitleCaseMap: { [key: string]: 'Library' | 'Deleted' } = {
  library: 'Library',
  recycleBin: 'Deleted',
}

function LibraryOrDeletedScreen({
  navigation,
}: {
  navigation: LibraryScreenNavigationProp | DeletedScreenNavigationProp
}) {
  const router = useRoute<RouteProp<RootStackParamList['MainTab']>>()
  const params = router.params as { type: dataSource }
  const type = params.type ?? ''
  const queryClient = useQueryClient()

  const [query, setQuery] = useState('')
  const [filteredTracks, setFilteredTracks] = useState<TrackData[]>([])

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
    queryFn: () => getTracks({ location: type as dataSource }),
    staleTime: 500,
    placeholderData: keepPreviousData,
  })

  if (error) {
    displayToast({
      message: error instanceof Error ? error.message : 'An Unknown error occured.',
      backgroundColor: 'error',
    })
  }

  const debouncedSearch = useCallback(
    _.debounce(() => {
      const lowerCaseQuery = query.toLowerCase()
      setFilteredTracks(
        (tracks as TrackData[])?.filter(
          track =>
            track.track.name.toLowerCase().includes(lowerCaseQuery) ||
            track.track.artists[0].name.toLowerCase().includes(lowerCaseQuery) ||
            track.track.album.name.toLowerCase().includes(lowerCaseQuery),
        ),
      )
    }, 500),
    [query],
  )

  useEffect(() => {
    if (query) {
      debouncedSearch()
    } else {
      setFilteredTracks([])
    }
    return () => debouncedSearch.cancel()
  }, [query, debouncedSearch])

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
              Building your {TitleCaseMap[type] === 'Library' ? 'Library' : 'Recycle Bin'}...
            </Text>
            <LoadingSpinner />
          </View>
        ) : isApiErrorResponse(tracks) ? (
          <View>
            <View style={tw.style(`border-slate-500 border-b-2 flex-row justify-between items-center`)}>
              <Text
                style={tw.style(` text-slate-50 text-3xl py-4 text-center px-2 `, {
                  fontFamily: 'figtree-bold',
                })}
              >
                {TitleCaseMap[type]}
              </Text>
            </View>
            <Text style={tw.style(`text-white font-figtreeBold text-3xl py-4 text-center`)}>
              {TitleCaseMap[type] === 'Library'
                ? 'Your library is empty :(, add some tracks!'
                : 'You have not deleted anything.'}
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
          <>
            <View style={tw.style(`border-slate-500 border-b-2 flex-row justify-between items-center`)}>
              <Text
                style={tw.style(` text-slate-50 text-3xl py-4 text-center px-2 `, {
                  fontFamily: 'figtree-bold',
                })}
              >
                {TitleCaseMap[type]}
              </Text>
              <TextInput
                style={tw.style(`bg-[#fff] flex-1 rounded-2xl p-3 text-black`)}
                placeholder='Search'
                placeholderTextColor='gray'
                value={query}
                onChangeText={text => setQuery(text)}
              />
            </View>
            <FlatList
              style={tw.style(`flex-grow mb-32`)}
              contentContainerStyle={tw.style(``)}
              data={filteredTracks.length > 0 ? filteredTracks : (tracks as TrackData[])}
              renderItem={({ item }) => (
                <Track track={item} location={type} openTabsModal={() => openTabsModal(item)} />
              )}
              keyExtractor={(item, index) => index.toString()}
              refreshing={isFetching}
              //@ts-ignore
              onRefresh={() => refetch()}
            />
          </>
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
