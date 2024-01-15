import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { getNoteName } from "../../utils/note-key";
import { TrackData } from "../../utils/spotify-types";
import tw from "../../utils/tailwindRN";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from '@expo/vector-icons'
import useTrackService from "../../services/TrackService";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'

interface RandomTrackProps {
  trackData: TrackData;
  setRandomTrack: () => void; // Updated type
  userId?: string
}

const screen = Dimensions.get("window");
const imageSize = screen.width * 0.85; // 90% of screen width

const RandomTrack = ({ trackData, setRandomTrack, userId }: RandomTrackProps) => {

  const scale = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };

  });

  const grow = () => {
    scale.value = withSpring(1); // Grow with a spring animation
  };

  const shrink = () => {
    scale.value = withTiming(0, { duration: 500 }); // Shrink with timing
  };


  useEffect(() => {
    grow();
    return () => {
      shrink();
    };
  })


  if (!trackData) {
    return (
      <View className="p-3 border border-cream bg-black text-white rounded-lg justify-center items-center mb-auto mt-16" >
        <Text>No data available</Text>
      </View>
    );
  }
  const { addTrackMut, isAddingTrack } = useTrackService()

  const addToLib = async () => {
    addTrackMut({ trackId: trackData.track.id, source: "library" })
  }

  return (
    <Animated.View style={animatedStyles}>

      <LinearGradient
        colors={["#27272a", "#52525b"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={tw`p-3 border text-center relative border-cream text-white rounded-lg justify-center items-center mb-auto my-4 shadow-lg`} >
        <TouchableOpacity style={tw.style(`border border-cream flex 
          justify-center rounded-full absolute top-2 z-50 right-2`)}
          onPress={() => {
            shrink()
            setTimeout(() => {

              setRandomTrack()
            }, 500)
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
            style={tw.style(`mb-4 w-[300px] max-w-[${imageSize}px] h-[300px] rounded-md border border-cream`, { objectFit: 'contain' })}
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
          onPress={() => addToLib()}
        >
          <Text style={tw.style(``, { fontFamily: "figtree-black" })}>{isAddingTrack ? "Adding..." : "Save"}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View >

  );
};


export default RandomTrack;
