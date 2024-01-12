import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { getNoteName } from "../../utils/note-key";
import { TrackData } from "../../utils/spotify-types";
import tw from "../../utils/tailwindRN";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from '@expo/vector-icons'
import Toast from "react-native-root-toast";


interface RandomTrackProps {
  trackData: TrackData;
  setRandomTrack: React.Dispatch<React.SetStateAction<TrackData | null>>
  userId?: string
}
const screen = Dimensions.get("window");
const imageSize = screen.width * 0.85; // 90% of screen width

const RandomTrack = ({ trackData, setRandomTrack, userId }: RandomTrackProps) => {

  const [isLoading, setIsLoading] = useState(false)

  if (!trackData) {
    return (
      <View className="p-3 border border-cream bg-black text-white rounded-lg justify-center items-center mb-auto mt-16" >
        <Text>No data available</Text>
      </View>
    );
  }

  const addToLibrary = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        "https://what-the-key.vercel.app/api/track/addTrack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userId,
          trackId: trackData.track.id,
          source: "library"
        })
      }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error fetching track");
      }

      Toast.show('Track successfully added to the library', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });

    } catch (error) {
      Toast.show(error instanceof Error ?
        "Track could not be added. Make sure you are logged in and it is not a duplicate"
        : "An Unknown error occured.", {
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

  return (
    <LinearGradient
      colors={["#27272a", "#52525b"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw`p-3 border text-center relative border-cream text-white rounded-lg justify-center items-center mb-auto my-4 shadow-lg`} >
      <TouchableOpacity style={tw.style(`border border-cream flex 
          justify-center rounded-full absolute top-2 z-50 right-2`)}
        onPress={() => {
          setRandomTrack(null)
        }} >
        <Entypo name="cross" size={24} color="white" />
      </TouchableOpacity>
      <Text style={tw`max-w-[85%] text-white mb-3 font-extrabold text-2xl text-center`}>{trackData.track.name}</Text>
      <Text style={tw`max-w-[80%] text-artistGray font-bold mb-3 text-xl text-center`}>
        {trackData.track.artists[0].name}
      </Text>
      {trackData.track.album.images[0] && (
        <Image
          source={{ uri: trackData.track.album.images[0].url }}
          style={tw.style(`mb-4 w-[${imageSize}px] max-w-[${imageSize}px] h-[300px] rounded-md border border-cream`, { objectFit: 'contain' })}
          alt={trackData.track.name}
        />
      )}
      <Text style={tw`max-w-[85%]  text-white mb-3 text-xl`}>
        Key: {getNoteName(trackData.audioFeatures.key)} {trackData.audioFeatures.mode === 1 ? "Major" : "Minor"}
      </Text>
      <Text style={tw`max-w-[85%] text-white mb-3 text-xl`}>BPM: {trackData.audioFeatures.tempo}</Text>
      <Text style={tw`max-w-[85%] text-white mb-3 text-xl`}>
        Year: {new Date(trackData.track.album.release_date).getFullYear()}
      </Text>
      <TouchableOpacity
        style={tw`px-4 py-3 border border-black rounded-xl text-2xl bg-cream font-800 shadow-lg mt-auto ml-auto`}
        onPress={() => addToLibrary()}
      >
        <Text style={tw.style(``, { fontFamily: "figtree-black" })}>{isLoading ? "Adding..." : "Save"}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};


export default RandomTrack;
