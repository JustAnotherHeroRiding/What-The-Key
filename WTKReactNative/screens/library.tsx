import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import colors from "../assets/colors";
import { StatusBar } from "expo-status-bar";
import { LibraryScreenNavigationProp } from "../utils/types";
import tw from "../utils/tailwindRN";
import { SessionContext } from "../utils/Context/Session/SessionContext";
import Toast from "react-native-root-toast";
import { TrackData } from "../utils/spotify-types";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


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
        style={tw.style(`mx-auto flex my-4 w-full`)}>
        <Text style={tw.style(`text-white font-figtreeBold text-3xl 
        border-b-2 border-slate-500 py-4 text-center`)}>Library</Text>
        {library.map((track, index) => (
          <View key={index}
            style={tw.style(`flex flex-row justify-between gap-2 items-center px-2 py-1 border-b border-slate-400`)}>
            <Image source={{ uri: track.track.album.images[0].url }}
              style={tw.style(`w-14 h-14 rounded-lg border-cream border`)} />
            <View style={tw.style(`flex-1 items-end ml-4 justify-center`)}>

              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={tw.style('text-white font-figtreeBold text-2xl text-center')}>{track.track.name}</Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={tw.style('font-figtreeBold text-2xl text-artistGray')}>{track.track.artists[0].name}</Text>
            </View>
            {showcontextMenu && (
              <View style={tw.style(`flex flex-col gap-2 items-center absolute right-12 
                -top-20 bg-beigeCustom p-2 rounded-lg z-5`)}>
                <TouchableOpacity
                  style={tw.style(`py-2 gap-1 w-full justify-between flex-row`)}>
                  <MaterialIcons name="library-add" size={24} color="black" />
                  <Text style={tw.style(`text-black`, { fontFamily: "figtree-bold" })}>Add to Library</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw.style(`py-2 w-full gap-1 justify-between flex-row`)}>
                  <MaterialIcons name="audiotrack" size={24} color="black" />
                  <Text style={tw.style(`text-black`, { fontFamily: "figtree-bold" })}>Open Details</Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity onPress={() => setShowContextMenu(!showcontextMenu)}>
              <Entypo name="dots-three-vertical" size={28} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </LinearGradient>
    </ScrollView>
  );
}

export default LibraryScreen;
