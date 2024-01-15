import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, Image } from "react-native";
import { LibraryScreenNavigationProp } from "../utils/types";
import tw from "../utils/tailwindRN";
import Toast from "react-native-root-toast";
import { TrackData } from "../utils/spotify-types";
import { LinearGradient } from "expo-linear-gradient";
import Track from "../UiComponents/Reusable/Track";
import LoadingSpinner from "../UiComponents/Reusable/LoadingSpinner";
import useTrackService from "../services/TrackService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { isApiErrorResponse } from "../utils/typeGuards";
import { Entypo } from '@expo/vector-icons';


function LibraryScreen({
  navigation,
}: {
  navigation: LibraryScreenNavigationProp;
}) {


  const [isTabsModalVisible, setIsTabsModalVisible] = useState(false);
  const [currentTrackForModal, setCurrentTrackForModal] = useState<TrackData | null>(null);

  const openTabsModal = (trackData: TrackData) => {
    setCurrentTrackForModal(trackData);
    setIsTabsModalVisible(true);
  };

  const closeTabsModal = () => {
    setIsTabsModalVisible(false);
  };



  const { getTracks } = useTrackService()

  const { data: library, isFetching, error, refetch, isLoading } = useQuery({
    queryKey: ["library"], queryFn: () => getTracks({ location: "library" }),
    staleTime: 500,
    placeholderData: keepPreviousData
  })



  if (error) {
    Toast.show(error instanceof Error ? error.message : "An Unknown error occured.", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: 'red'
    });
  }


  return (
    <LinearGradient
      colors={["#27272a", "#52525b"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`flex-grow w-full`)}>
      {isLoading ? (
        <View style={tw.style(`flex items-center justify-center my-auto`)}>
          <Text style={tw.style(`text-white text-center`, { fontFamily: "figtree-bold" })}>Building your library...</Text>
          <LoadingSpinner />
        </View>
      ) : isApiErrorResponse(library) ? (
        <View>
          <Text style={tw.style(`text-white border-slate-500 border-b-2 font-figtreeBold text-3xl py-4 text-center`)}>Library</Text>
          <Text style={tw.style(`text-white font-figtreeBold text-3xl py-4 text-center`)}>Your library is empty</Text>
        </View>
      ) : (
        <FlatList
          style={tw.style(`flex-grow`)}
          contentContainerStyle={tw.style(`pb-20`)}
          data={library as TrackData[]}
          renderItem={({ item }) => <Track track={item} location="library" openTabsModal={() => openTabsModal(item)} />}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => (
            <Text style={tw.style(`text-white border-slate-500 border-b-2 font-figtreeBold text-3xl py-4 text-center`)}>Library</Text>
          )}
          refreshing={isFetching}
          onRefresh={() => refetch()}
        />
      )}
      {isTabsModalVisible && (
        <View style={tw.style(`bg-opacity-30 bg-white absolute inset-0 flex justify-center items-center z-10`)}>
          <View style={tw.style(`w-[80%] border-cream flex items-center gap-4 
          shadow-xl shadow-slate-200 border-2 bg-slate-800 p-4 rounded-lg`, { elevation: 3 })}>
            <TouchableOpacity
              style={tw.style(`border border-cream flex justify-center rounded-full absolute top-2 z-50 right-2`)}

              onPress={() => closeTabsModal()}>
              <Entypo name="cross" size={24} color="white" />
            </TouchableOpacity>
            <Text style={tw.style(`text-white text-center`, { fontFamily: "figtree-bold" })}>Add Tabs for</Text>
            <Text style={tw.style(`text-white text-center`, { fontFamily: "figtree-bold" })}>{currentTrackForModal?.track.name}</Text>
            <Text style={tw.style(`text-white text-center`, { fontFamily: "figtree-bold" })}>{currentTrackForModal?.track.artists[0].name}</Text>
            <Image source={{ uri: currentTrackForModal?.track.album.images[0].url }}
              style={tw.style(`w-40 h-40 rounded-lg border-cream border`)} />

            <TextInput
              style={tw.style(`bg-[#fff] w-full rounded-2xl px-4 py-2 mb-5 text-black`)}
              placeholder="Search"
              placeholderTextColor="gray"
            />
            {/* Additional content if needed */}
          </View>
        </View>
      )}
    </LinearGradient>
  );

}

export default LibraryScreen;
