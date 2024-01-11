import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { TrackData } from "../../utils/spotify-types";
import tw from "../../utils/tailwindRN";
import { useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


interface TrackProps {
    track: TrackData;
    location: 'library' | 'deleted';
}

const Track = ({ track, location }: TrackProps) => {
    const [showcontextMenu, setShowContextMenu] = useState(false);

    return (
        <View
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
    )
}
export default Track;