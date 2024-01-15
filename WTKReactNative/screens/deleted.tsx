import React, { useContext, useState } from "react";
import { View, Text, Button, TouchableOpacity, Image, ScrollView, Alert, FlatList } from "react-native";
import { DeletedScreenNavigationProp } from "../utils/types";
import tw from "../utils/tailwindRN";
import Toast from "react-native-root-toast";
import { TrackData } from "../utils/spotify-types";
import { LinearGradient } from "expo-linear-gradient";
import Track from "../UiComponents/Reusable/Track";
import LoadingSpinner from "../UiComponents/Reusable/LoadingSpinner";
import useTrackService from "../services/TrackService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MaterialIcons } from '@expo/vector-icons';
import colors from "../assets/colors";
import { isApiErrorResponse } from "../utils/typeGuards";



function DeletedScreen({
  navigation,
}: {
  navigation: DeletedScreenNavigationProp;
}) {

  const { getTracks } = useTrackService()

  const { data: deleted, isFetching, error, refetch, isLoading } =
    useQuery({
      queryKey: ["recycleBin"], queryFn: () => getTracks({ location: "recycleBin" }),
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
          <Text style={tw.style(`text-white text-center`, { fontFamily: "figtree-bold" })}>Picking up the trash...</Text>
          <LoadingSpinner />
        </View>
      ) : (
        isApiErrorResponse(deleted) ? (
          <View>
            <Text style={tw.style(`text-white border-slate-500 border-b-2 font-figtreeBold text-3xl py-4 text-center`)}>Deleted</Text>
            <Text style={tw.style(`text-white font-figtreeBold text-3xl py-4 text-center`)}>There are no deleted tracks</Text>

            <TouchableOpacity
              disabled={isFetching || isLoading}
              style={tw.style(`py-3 px-3 rounded-md gap-1 border-cream border flex items-center flex-row mx-auto`)}>
              <MaterialIcons name="refresh" size={24} color={colors.beigeCustom} />
              <Text style={tw.style(`text-white text-xl`, { fontFamily: "figtree-bold" })}>Refresh</Text>
            </TouchableOpacity>


          </View>
        ) : (
          <FlatList
            style={tw.style(`flex-grow`)}
            contentContainerStyle={tw.style(`pb-20`)}
            data={deleted as TrackData[]}
            renderItem={({ item }) => <Track track={item} location="recycleBin" />}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => (
              <Text style={tw.style(`text-white border-slate-500 border-b-2 font-figtreeBold text-3xl py-4 text-center`)}>Deleted</Text>
            )}
            refreshing={isFetching}
            onRefresh={() => refetch()}
          />
        )
      )}
      {isFetching && !isLoading &&
        <>
          <Text style={tw.style(`text-white text-center`, { fontFamily: "figtree-bold" })}>Refreshing...</Text>
          <LoadingSpinner />
        </>
      }
    </LinearGradient>
  );

}

export default DeletedScreen;
