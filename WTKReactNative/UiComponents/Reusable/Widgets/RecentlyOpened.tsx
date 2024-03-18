import React, { useContext } from 'react'
import { View, Text, FlatList, Image, Dimensions } from 'react-native'
import { TrackData } from '../../../utils/types/spotify-types'
import { useQuery } from '@tanstack/react-query'
import useTrackService from '../../../services/TrackService'
import tw from '../../../utils/config/tailwindRN'
import { renderSeparator } from '../Common/FlatListHelpers'
import LoadingSpinner from '../Common/LoadingSpinner'
import NotFoundComponent from '../Common/NotFound'
import { CustomButton } from '../Common/CustomButtom'
import { SessionContext } from '../../../utils/Context/Session/SessionContext'

const screen = Dimensions.get('window')
const imageSize = screen.width * 0.1

function RecentlyOpened() {
  const { getHistoryTracks } = useTrackService()
  const session = useContext(SessionContext)
  const {
    data: trackHistory,
    isFetching: isHistoryLoading,
    error: historyError,
    refetch: refreshTrackHistory,
  } = useQuery({
    queryKey: ['trackHistory'],
    queryFn: () => getHistoryTracks(),
    enabled: !!session?.user.id,
  })

  /*   if (isHistoryLoading) return <LoadingSpinner />
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
    ) */

  //console.log(trackHistory)

  return (
    <FlatList
      horizontal={true}
      style={tw.style('flex-row')}
      contentContainerStyle={tw.style(``)}
      data={trackHistory as TrackData[]}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => renderSeparator(2)}
      renderItem={({ item, index }) => (
        <View style={tw.style(`flex flex-col items-center justify-center gap-4`)}>
          <Text style={tw.style(`text-xl text-white text-center font-medium`)}>{item.track.name}</Text>
          <Text style={tw.style(`text-xl text-artistGray text-center`)}>{item.track.artists[0].name}</Text>
          <Image
            source={{ uri: item.track.album.images[0].url }}
            style={tw.style(`mb-4 w-[${imageSize}] h-[${imageSize}] rounded-md border border-cream`, {
              objectFit: 'contain',
            })}
            alt={item.track.name}
          />
        </View>
      )}
    />
  )
}

export default RecentlyOpened
