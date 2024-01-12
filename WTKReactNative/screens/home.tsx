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
import { HomeScreenNavigationProp } from "../utils/types";
import { SpotifyTracksSearchResult, TrackData } from "../utils/spotify-types";
import ResultCard from "../UiComponents/Reusable/RandomTrack";
import LoadingSpinner from "../UiComponents/Reusable/LoadingSpinner";
import tw from "../utils/tailwindRN";
import _ from 'lodash'
import { LinearGradient } from 'expo-linear-gradient';
import SearchResults from "../UiComponents/Reusable/SearchResults";
import { SessionContext } from "../utils/Context/Session/SessionContext";
import RandomTrack from "../UiComponents/Reusable/RandomTrack";


function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
  const session = useContext(SessionContext)
  const [randomTrack, setRandomTrack] = useState<TrackData | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const [query, setQuery] = useState("");
  const [searchResults, setSearchResuls] = useState<SpotifyTracksSearchResult | null>(null)




  const searchTracks = async (searchQuery: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://what-the-key.vercel.app/api/spotify/search?query=${searchQuery}`
      );

      const data = await response.json()

      setSearchResuls(data);


    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occured")
      }
    } finally {
      setIsLoading(false);
    }
  }
  const debouncedSearch = useCallback(_.debounce(searchTracks, 500), []);

  useEffect(() => {
    if (query) {
      debouncedSearch(query)
    }
    return () => debouncedSearch.cancel()
  }, [query, debouncedSearch])

  const fetchRandomTrack = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://what-the-key.vercel.app/api/spotify/random-guitar-track"
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error fetching track");
      }
      const responseExtended = await fetch(
        `https://what-the-key.vercel.app/api/spotify/track/${data.tracks[0].id}`
      );
      const dataExtended = await responseExtended.json();

      if (!responseExtended.ok) {
        throw new Error(dataExtended.message || "Error fetching track");
      }

      setRandomTrack(dataExtended);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occurred");
      }
    } finally {
      setIsLoading(false); // End loading
    }
  };



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
          <TouchableOpacity style={tw.style(`bg-beigeCustom p-3 rounded-lg`)} onPress={fetchRandomTrack}>
            <Text style={tw.style(`text-black text-base font-figtreeBold`)}>Random Track</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={!query} style={tw.style(`bg-beigeCustom p-3 rounded-lg ${!query ? "opacity-70" : ""}`)} onPress={() => searchTracks(query)}>
            <Text style={tw.style(`text-black text-base font-figtreeBold`)}>Search</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {isLoading && <LoadingSpinner />}

      {randomTrack && (
        <RandomTrack trackData={randomTrack} setRandomTrack={setRandomTrack} userId={session?.user.id} />
      )}
      {searchResults && (
        <SearchResults results={searchResults} />
      )}
    </ScrollView >
  );
}



export default HomeScreen;
