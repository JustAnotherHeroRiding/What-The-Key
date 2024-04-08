import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, TextInput, ListRenderItemInfo } from 'react-native'
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
import { useInfiniteQuery } from '@tanstack/react-query'
import { isApiErrorResponse } from '../../utils/types/typeGuards'
import TrackTabModal from '../../UiComponents/Reusable/TrackAdjacent/TrackTabModal'
import { RouteProp, useRoute } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import colors from '../../assets/colors'
import NotFoundComponent from '../../UiComponents/Reusable/Common/NotFound'
import { ApiErrorResponse, dataSource, TracksPage } from '../../utils/types/track-service-types'
import { displayToast } from '../../utils/toasts'

const PAGE_SIZE = '20'
const TitleCaseMap: { [key: string]: 'Library' | 'Deleted' } = {
  library: 'Library',
  recycleBin: 'Deleted',
}

type FlatListItem = TrackData | ApiErrorResponse

function InfiniteLibraryOrDeleted({
  navigation,
}: {
  navigation: LibraryScreenNavigationProp | DeletedScreenNavigationProp
}) {
  const router = useRoute<RouteProp<RootStackParamList['MainTab']>>()
  const params = router.params as { type: dataSource }
  const type = params.type ?? ''

  const [query, setQuery] = useState('')

  const isValidType = type === 'library' || type === 'recycleBin'

  const [isTabsModalVisible, setIsTabsModalVisible] = useState(false)
  const [currentTrackForModal, setCurrentTrackForModal] = useState<TrackData | null>(null)

  const { isAddingTab, getTracksCursor } = useTrackService()

  const openTabsModal = (trackData: TrackData) => {
    setCurrentTrackForModal(trackData)
    setIsTabsModalVisible(true)
  }

  const closeTabsModal = () => {
    setIsTabsModalVisible(false)
  }

  const {
    data: tracks,
    fetchNextPage,
    isLoading,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery<TracksPage>({
    queryKey: [type],
    queryFn: ({ pageParam }) =>
      getTracksCursor({ location: type as dataSource, cursor: pageParam as string, pageSize: PAGE_SIZE }),
    initialPageParam: new Date().toISOString(),
    getNextPageParam: lastPage => lastPage.nextCursor,
    getPreviousPageParam: firstPage => firstPage.prevCursor,
  })

  useEffect(() => {
    if (tracks && !hasNextPage) {
      displayToast({
        message: 'No more tracks to load',
        backgroundColor: 'default',
      })
    }
  }, [hasNextPage])

  const flattenedTracks: TrackData[] | undefined = tracks?.pages.flatMap(group => group.data)

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
              data={flattenedTracks as TrackData[]}
              renderItem={({ item }: ListRenderItemInfo<FlatListItem>) =>
                // If we try to fetch a track that is out of bounds, we get an api error
                // I cast the item as an error and I check the status code
                (item as ApiErrorResponse).statusCode !== 500 ? (
                  <Track
                    track={item as TrackData}
                    location={type}
                    openTabsModal={() => openTabsModal(item as TrackData)}
                  />
                ) : null
              }
              keyExtractor={(item, index) => index.toString()}
              refreshing={isFetching}
              onRefresh={() => hasNextPage && fetchNextPage()}
              onEndReached={() => {
                if (hasNextPage) {
                  fetchNextPage()
                }
              }}
              onEndReachedThreshold={0.1}
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

export default InfiniteLibraryOrDeleted
