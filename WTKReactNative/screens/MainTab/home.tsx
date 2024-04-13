import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { HomeScreenNavigationProp } from '../../utils/types/nav-types'
import { SpotifyTracksSearchResult, TrackData } from '../../utils/types/spotify-types'
import LoadingSpinner from '../../UiComponents/Reusable/Common/LoadingSpinner'
import tw from '../../utils/config/tailwindRN'
import _ from 'lodash'
import { LinearGradient } from 'expo-linear-gradient'
import SearchResults from '../../UiComponents/Reusable/SearchResults'
import { SessionContext } from '../../utils/Context/Session/SessionContext'
import RandomTrack from '../../UiComponents/Reusable/Track/RandomTrack'
import useSpotifyService from '../../services/SpotifyService'
import { useQueryClient, useQuery, keepPreviousData } from '@tanstack/react-query'
import {
  ModeNames,
  ScaleName,
  allModeNames,
  allScaleNames,
  scaleOrModeOptions,
  scaleOrModeOptionsConst,
} from '../../utils/consts/scales-consts-types'
import TrackRecommendations from '../../UiComponents/Reusable/Widgets/TrackRecommendations'
import TrackHistory from '../../UiComponents/Reusable/Widgets/TrackHistory'
import TheoryOfTheDay from '../../UiComponents/Reusable/Widgets/TheoryOfTheDay'

function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
  const session = useContext(SessionContext)

  const [query, setQuery] = useState('')

  const { searchTracks, fetchRandomTrack } = useSpotifyService()
  const queryClient = useQueryClient()

  const {
    data: randomTrack,
    isFetching: isRandomTrackLoading,
    error: randomTrackError,
    refetch: GetRandomTrack,
  } = useQuery({
    queryKey: ['randomTrack'],
    queryFn: () => fetchRandomTrack(),
    enabled: false,
  })

  const getRandomScale = () => {
    const scaleType: scaleOrModeOptions = _.sample(scaleOrModeOptionsConst)
    const randomScale = scaleType === 'mode' ? _.sample(allModeNames) : _.sample(allScaleNames)

    navigation.navigate('Study', {
      preselectedType: scaleType,
      preselectedScale: randomScale as ScaleName | ModeNames,
    })
  }

  const {
    data: searchResults,
    isFetching: isSearchLoading,
    error: searchError,
    refetch: getSearchResults,
  } = useQuery({
    queryKey: ['searchTracks', query],
    queryFn: () => searchTracks({ queryString: query }),
    enabled: false,
    staleTime: 1000,
    placeholderData: keepPreviousData,
  })

  const debouncedSearch = useCallback(
    _.debounce(() => {
      getSearchResults()
    }, 500),
    [queryClient],
  )

  useEffect(() => {
    if (query) {
      debouncedSearch()
    } else {
      queryClient.setQueryData(['searchTracks', query], null)
    }
    return () => debouncedSearch.cancel()
  }, [query, debouncedSearch])

  if (randomTrackError || searchError) {
    return (
      <View style={tw.style(`bg-zinc-800 p-4`)}>
        <Text style={tw.style(`text-slate-50 text-2xl text-center`)}>
          Error: {(randomTrackError || searchError)?.message}
        </Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={tw.style(`justify-center items-center pb-16`)}>
      <StatusBar style='auto' />

      <View style={tw.style(`border border-cream p-5 rounded-lg items-center w-[90%] mt-[3%] bg-stone-800`)}>
        <TextInput
          style={tw.style(`bg-[#fff] w-full rounded-2xl p-3 mb-5 text-black`)}
          placeholder='Search'
          placeholderTextColor='gray'
          value={query}
          onChangeText={text => setQuery(text)}
        />
        <View style={tw.style(`flex-row justify-between w-full gap-2`)}>
          <TouchableOpacity style={tw.style(`bg-beigeCustom p-2 rounded-lg`)} onPress={() => GetRandomTrack()}>
            <Text style={tw.style(`text-black text-base font-bold`)}>Random Track</Text>
          </TouchableOpacity>

          <TouchableOpacity style={tw.style(`bg-beigeCustom p-2 rounded-lg`)} onPress={() => getRandomScale()}>
            <Text style={tw.style(`text-black text-base font-bold`)}>Random Scale</Text>
          </TouchableOpacity>
        </View>
      </View>
      {(isRandomTrackLoading || isSearchLoading) && <LoadingSpinner />}

      {searchResults && <SearchResults results={searchResults as SpotifyTracksSearchResult} />}
      {randomTrack && (
        <RandomTrack
          trackData={randomTrack}
          setRandomTrack={() => queryClient.setQueryData<TrackData | null>(['randomTrack'], null)}
          userId={session?.user.id}
        />
      )}
      <View style={tw.style(`border border-cream rounded-lg min-h-[15%] w-[95%] mt-[3%] bg-stone-800`)}>
        <TheoryOfTheDay />
      </View>
      {session && (
        <>
          <View style={tw.style(`border border-cream rounded-lg min-h-[15%] w-[95%] mt-[3%] bg-stone-800 px-3 py-2`)}>
            <Text style={tw.style(`text-beigeCustom text-2xl font-bold`)}>Songs to Learn</Text>

            <TrackRecommendations />
          </View>
          <View style={tw.style(`border border-cream rounded-lg min-h-[15%] w-[95%] mt-[3%] bg-stone-800 px-3 py-2`)}>
            <View style={tw.style(`gap-2`)}>
              <Text style={tw.style(`text-beigeCustom text-2xl font-bold`)}>Recently Opened</Text>
              <TrackHistory type='latest' />
            </View>
          </View>
          <View style={tw.style(`border border-cream rounded-lg min-h-[15%] w-[95%] mt-[3%] bg-stone-800 px-3 py-2`)}>
            <View style={tw.style(`gap-2`)}>
              <Text style={tw.style(`text-beigeCustom text-2xl font-bold`)}>Favorites</Text>
              <TrackHistory type='favorites' />
            </View>
          </View>
        </>
      )}
    </ScrollView>
  )
}

export default HomeScreen
