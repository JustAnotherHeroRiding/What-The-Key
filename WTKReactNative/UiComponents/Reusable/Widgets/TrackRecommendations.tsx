import { useContext, useState } from 'react'
import useSpotifyService from '../../../services/SpotifyService'
import { SessionContext } from '../../../utils/Context/Session/SessionContext'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FlatList, TouchableOpacity, View, Text, Image } from 'react-native'
import tw from '../../../utils/config/tailwindRN'
import { renderSeparator } from '../Common/FlatListHelpers'
import { CustomButton } from '../Common/CustomButtom'
import LoadingSpinner from '../Common/LoadingSpinner'
import NotFoundComponent from '../Common/NotFound'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../utils/types/nav-types'
import { RecentlyOpenedType } from '../../../services/TrackService'

function TrackRecommendations() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const session = useContext(SessionContext)
  const { getRecommendations } = useSpotifyService()
  const [recommendationType, setRecommendationType] = useState<RecentlyOpenedType>('latest')

  const {
    data: recommendedTracks,
    isFetching: areRecsLoading,
    error: recsError,
    refetch: refetchRecs,
  } = useQuery({
    queryKey: ['recs', recommendationType],
    queryFn: () => getRecommendations(recommendationType),
    enabled: !!session?.user.id,
  })

  if (areRecsLoading) return <LoadingSpinner />

  if (recsError || !recommendedTracks)
    return (
      <View>
        <CustomButton
          title='Refresh'
          onPress={() => {
            refetchRecs
          }}
        />
        <NotFoundComponent />
      </View>
    )

  return (
    <>
      <View style={tw.style(`flex-row gap-2 justify-center p-2`)}>
        <CustomButton
          title='Safe'
          btnStyle={tw.style(`${recommendationType === 'favorites' ? 'bg-beigeCustom' : ''}`)}
          onPress={() => setRecommendationType('favorites')}
        />
        <CustomButton
          title='New'
          btnStyle={tw.style(`${recommendationType === 'latest' ? 'bg-beigeCustom' : ''}`)}
          onPress={() => setRecommendationType('latest')}
        />
      </View>

      <FlatList
        horizontal={true}
        style={tw.style('flex-row')}
        contentContainerStyle={tw.style(``)}
        data={recommendedTracks.tracks}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => renderSeparator(2)}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SingleTrackNavigator', {
                /* @ts-ignore */
                screen: 'SingleTrackOverview',
                params: {
                  trackId: item.id,
                  src: 'home',
                },
              })
            }
            style={tw.style(
              `flex-col bg-zinc-900 rounded-md shadow-sm shadow-zinc-700 p-1 items-center justify-center gap-2 w-40`,
            )}
          >
            <Image
              source={{ uri: item.album.images[0].url }}
              style={tw.style(`mb-auto mt-2 w-36 h-36`, {
                objectFit: 'contain',
              })}
              alt={item.name ?? ''}
            />
            <Text style={tw.style(`text-sm text-white text-center font-bold`)}>{item.name}</Text>
            <Text style={tw.style(`text-xs text-artistGray text-center`)}>{item.artists[0].name}</Text>
          </TouchableOpacity>
        )}
      />
    </>
  )
}

export default TrackRecommendations
