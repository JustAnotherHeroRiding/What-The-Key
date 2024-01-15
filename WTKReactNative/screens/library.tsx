import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, Image, ScrollView, Alert, FlatList } from "react-native";
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


function LibraryScreen({
  navigation,
}: {
  navigation: LibraryScreenNavigationProp;
}) {

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
      ) : (
        isApiErrorResponse(library) ? (
          <View>
            <Text style={tw.style(`text-white border-slate-500 border-b-2 font-figtreeBold text-3xl py-4 text-center`)}>Library</Text>
            <Text style={tw.style(`text-white font-figtreeBold text-3xl py-4 text-center`)}>Your library is empty</Text>

          </View>
        ) : (
          <FlatList
            style={tw.style(`flex-grow`)}
            contentContainerStyle={tw.style(`pb-20`)}
            data={library as TrackData[]}
            renderItem={({ item }) => <Track track={item} location="library" />}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => (
              <Text style={tw.style(`text-white border-slate-500 border-b-2 font-figtreeBold text-3xl py-4 text-center`)}>Library</Text>
            )}
            refreshing={isFetching}
            onRefresh={() => refetch()}
          />
        )
      )}
    </LinearGradient>
  );

}

export default LibraryScreen;
