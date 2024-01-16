import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import colors from "../assets/colors";
import { StatusBar } from "expo-status-bar";
import { HomeScreenNavigationProp } from "../utils/nav-types";
import { SpotifyTracksSearchResult, TrackData } from "../utils/spotify-types";
import LoadingSpinner from "../UiComponents/Reusable/LoadingSpinner";
import tw from "../utils/tailwindRN";
import _ from 'lodash'
import { LinearGradient } from 'expo-linear-gradient';
import SearchResults from "../UiComponents/Reusable/SearchResults";
import { SessionContext } from "../utils/Context/Session/SessionContext";
import RandomTrack from "../UiComponents/Reusable/Track/RandomTrack";
import useSpotifyService from "../services/SpotifyService";
import { useQueryClient, useQuery, keepPreviousData } from "@tanstack/react-query";



function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
  const session = useContext(SessionContext)


  const [query, setQuery] = useState("");

  const { searchTracks, fetchRandomTrack } = useSpotifyService();
  const queryClient = useQueryClient();

  const { data: randomTrack, isFetching: isRandomTrackLoading, error: randomTrackError, refetch: GetRandomTrack } = useQuery(
    {
      queryKey: ['randomTrack'],
      queryFn: () => fetchRandomTrack(),
      enabled: false,
    }
  );

  const { data: searchResults, isFetching: isSearchLoading, error: searchError, refetch: getSearchResults } = useQuery({
    queryKey: ['searchTracks', query],
    queryFn: () => searchTracks({ queryString: query }),
    enabled: false,
    staleTime: 1000,
    placeholderData: keepPreviousData

  },
  );

  const debouncedSearch = useCallback(_.debounce(() => {
    getSearchResults()
  }, 500), [queryClient]);

  useEffect(() => {
    if (query) {
      debouncedSearch();
    } else {
      queryClient.setQueryData(['searchTracks', query], null);
    }
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);


  if (randomTrackError || searchError) {
    return <View>Error: {(randomTrackError || searchError)?.message}</View>;
  }


  return (

    <ScrollView
      contentContainerStyle={tw.style(`flex justify-center items-center pb-16`)}
    >
      <StatusBar style="auto" />


      <LinearGradient
        colors={["#27272a", "#52525b"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={tw.style(`border border-cream p-5 rounded-lg items-center w-[80%] mt-[3%]`)}>
        <TextInput
          style={tw.style(`bg-[#fff] w-full rounded-2xl p-3 mb-5 text-black`)}
          placeholder="Search"
          placeholderTextColor="gray"
          value={query}
          onChangeText={(text) => setQuery(text)
          }
        />
        <View style={tw.style(`flex flex-row justify-between w-full content-center`)}>
          <TouchableOpacity style={tw.style(`bg-beigeCustom p-3 rounded-lg`)} onPress={() => GetRandomTrack()}>
            <Text style={tw.style(`text-black text-base font-figtreeBold`)}>Random Track</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={!query}
            style={tw.style(`bg-beigeCustom p-3 rounded-lg ${!query ? "opacity-70" : ""}`)} onPress={() => getSearchResults()}>
            <Text style={tw.style(`text-black text-base font-figtreeBold`)}>Search</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {(isRandomTrackLoading || isSearchLoading) && <LoadingSpinner />}

      {randomTrack && (
        <RandomTrack trackData={randomTrack}
          setRandomTrack={() => queryClient.setQueryData<TrackData | null>(['randomTrack'], null)}

          userId={session?.user.id} />
      )}
      {searchResults && (
        <SearchResults results={searchResults as SpotifyTracksSearchResult} />
      )}
    </ScrollView >
  );
}



export default HomeScreen;
