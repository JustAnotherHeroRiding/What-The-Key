import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { getNoteName } from "../utils/note-key";
import { TrackData } from "../utils/spotify-types";
import colors from "../assets/colors";
import tw from "../utils/tailwindRN";

interface ResultCardProps {
  trackData: TrackData;
}
const screen = Dimensions.get("window");
const imageSize = screen.width * 0.85; // 90% of screen width

const ResultCard = ({ trackData }: ResultCardProps) => {
  if (!trackData) {
    return (
      <View className="p-3 border border-cream bg-black text-white rounded-lg justify-center items-center mb-auto mt-16" >
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <View style={tw`p-3 border text-center border-cream bg-black text-white rounded-lg justify-center items-center mb-auto my-4 shadow-lg`} >
      <Text style={tw`max-w-[85%] text-white mb-3 font-bold text-2xl text-center`}>{trackData.track.name}</Text>
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
      //       onPress={() => onSave(trackData.uri.split(":")[2])}
      >
        <Text style={tw.style(``, { fontFamily: "figtree-black" })}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};


export default ResultCard;
