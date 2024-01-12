import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, Image, ScrollView, Alert, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LibraryScreenNavigationProp } from "../utils/types";
import tw from "../utils/tailwindRN";
import { SessionContext } from "../utils/Context/Session/SessionContext";
import Toast from "react-native-root-toast";
import { TrackData } from "../utils/spotify-types";
import { LinearGradient } from "expo-linear-gradient";
import Track from "../UiComponents/Reusable/Track";
import LoadingSpinner from "../UiComponents/Reusable/LoadingSpinner";


function LibraryScreen({
  navigation,
}: {
  navigation: LibraryScreenNavigationProp;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const session = useContext(SessionContext)

  const [showcontextMenu, setShowContextMenu] = useState(false);

  const [library, setLibrary] = useState<TrackData[] | []>([])

  const fetchLibraryTracks = async () => {
    setIsLoading(true)
    try {
      const queryParams = new URLSearchParams({
        userId: session?.user.id ?? "no user",
        source: "library"
      }).toString();

      const responseTrackIds = await fetch(
        `https://what-the-key.vercel.app/api/track/getTracks?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
      );
      const trackIds = await responseTrackIds.json();

      if (!responseTrackIds.ok) {
        throw new Error(trackIds.message || "Error fetching track ids from database");
      }

      const trackIdsJoined = trackIds.map((track: { id: any; }) => track.id).join(',');

      const spotifyResponse = await fetch(`https://what-the-key.vercel.app/api/spotify/tracks?ids=${trackIdsJoined}
      `, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const libraryData = await spotifyResponse.json()
      setLibrary(libraryData);

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occurred");
      }

      Toast.show(error instanceof Error ? error.message : "An Unknown error occured.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: 'red'
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    //fetchLibraryTracks()

  }, [])


  return (
    <LinearGradient
      colors={["#27272a", "#52525b"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`flex-grow w-full`)}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          style={tw.style(`flex-grow`)}
          contentContainerStyle={tw.style(`pb-20`)}
          data={library}
          renderItem={({ item }) => <Track track={item} location="library" />}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => (
            <Text style={tw.style(`text-white border-slate-500 border-b-2 font-figtreeBold text-3xl py-4 text-center`)}>Library</Text>
          )}
          refreshing={isLoading}
          onRefresh={() => fetchLibraryTracks()}
        />
      )}
    </LinearGradient>
  );

}

export default LibraryScreen;
