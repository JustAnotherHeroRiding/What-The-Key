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
    fetchLibraryTracks()

  }, [])


  return (
    <ScrollView contentContainerStyle={tw.style(`flex-1 flex-col items-center`)}>
      <StatusBar style="auto" />

      <LinearGradient
        colors={["#27272a", "#52525b"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={tw.style(`mx-auto flex mt-4 w-full`)}>
        {/* This is weird here as without this scroll view here the tracks do not scroll
        Also I cant get it to have margins above the bottom nav tab */}
        <ScrollView>
          <View className="flex flex-row border-b-2 items-center justify-between px-8 border-slate-500">
            <Text style={tw.style(`text-white font-figtreeBold text-3xl 
         py-4 text-center`)}>Library</Text>
            <TouchableOpacity onPress={() => fetchLibraryTracks()} style={tw.style(``)}>
              <Text style={tw.style(`text-black px-2 py-1 rounded-md bg-beigeCustom font-figtreeBold text-sm 
        0py-4 text-center`)}>Refresh</Text>

            </TouchableOpacity>
          </View>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <FlatList
              style={tw.style(`mb-20`)}
              data={library}
              renderItem={({ item, index }) => <Track key={index} track={item} location="library" />}
              keyExtractor={(item, index) => index.toString()}
            />
          )
          }

        </ScrollView>
      </LinearGradient>
    </ScrollView>
  );
}

export default LibraryScreen;
