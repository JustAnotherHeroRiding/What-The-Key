import React, { useContext } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { TrackData } from '../../../utils/types/spotify-types'
import { useQuery } from '@tanstack/react-query'
import useTrackService from '../../../services/TrackService'
import tw from '../../../utils/config/tailwindRN'
import { renderSeparator } from '../Common/FlatListHelpers'
import LoadingSpinner from '../Common/LoadingSpinner'
import NotFoundComponent from '../Common/NotFound'
import { CustomButton } from '../Common/CustomButtom'
import { SessionContext } from '../../../utils/Context/Session/SessionContext'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../utils/types/nav-types'
import { RecentlyOpenedType } from '../../../services/TrackService'

function RecentlyOpened({ type }: { type: RecentlyOpenedType }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const { getHistoryTracks } = useTrackService()
  const session = useContext(SessionContext)
  const {
    data: trackHistory,
    isFetching: isHistoryLoading,
    error: historyError,
    refetch: refreshTrackHistory,
  } = useQuery({
    queryKey: ['trackHistory', type],
    queryFn: () => getHistoryTracks(type),
    enabled: !!session?.user.id,
  })

  if (isHistoryLoading) return <LoadingSpinner />
  if (historyError || !trackHistory)
    return (
      <View>
        <Text>{JSON.stringify(trackHistory)}</Text>
        <CustomButton
          title='Refresh'
          onPress={() => {
            refreshTrackHistory
          }}
        />
        <NotFoundComponent />
      </View>
    )

  return (
    <FlatList
      horizontal={true}
      style={tw.style('flex-row')}
      contentContainerStyle={tw.style(``)}
      data={trackHistory as TrackData[]}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => renderSeparator(2)}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SingleTrackNavigator', {
              /* @ts-ignore */
              screen: 'SingleTrackOverview',
              params: {
                trackId: item.track.id,
                src: 'home',
              },
            })
          }
          style={tw.style(
            `flex-col border border-cream rounded-md shadow-sm shadow-zinc-700 p-1 items-center justify-center gap-2 w-40`,
          )}
        >
          <Image
            source={{ uri: item.track.album.images[0].url }}
            style={tw.style(`mb-auto mt-2 w-36 h-36 rounded-md border border-cream`, {
              objectFit: 'contain',
            })}
            alt={item.track.name}
          />
          <Text style={tw.style(`text-sm text-white text-center font-bold`)}>{item.track.name}</Text>
          <Text style={tw.style(`text-xs text-artistGray text-center`)}>{item.track.artists[0].name}</Text>
        </TouchableOpacity>
      )}
    />
  )
}

export default RecentlyOpened
