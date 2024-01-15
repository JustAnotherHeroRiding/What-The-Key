import React, { useContext } from "react";
import { View, TouchableOpacity, Image, Text, TextInput } from "react-native";
import { TrackData } from "../../../utils/spotify-types";
import tw from "../../../utils/tailwindRN";
import { useState } from "react";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import useTrackService from "../../../services/TrackService";
import { SessionContext } from "../../../utils/Context/Session/SessionContext";


interface TrackProps {
    track: TrackData;
    location: 'library' | 'recycleBin';
    openTabsModal: (trackData: TrackData) => void
}

const AddTrackTarget: { [key: string]: 'library' | 'recycleBin' } = {
    library: 'recycleBin',
    recycleBin: 'library'
};

const Track = ({ track, location, openTabsModal }: TrackProps) => {
    const [showcontextMenu, setShowContextMenu] = useState(false);
    const session = useContext(SessionContext)

    const { addTrackMut, deleteTrackMut, isDeletingTrack, isAddingTrack } = useTrackService()

    const AddToBinOrRestore = async () => {
        addTrackMut({ trackId: track.track.id, source: AddTrackTarget[location] }, {
            onSuccess: () => {
                setShowContextMenu(false)
            }
        })
    }

    const deleteTrackPermamently = async () => {
        deleteTrackMut({ trackId: track.track.id }, {
            onSuccess: () => {
                setShowContextMenu(false)
            }
        })
    }



    return (
        <View
            style={tw.style(`flex flex-row justify-between gap-2 items-center px-2 py-1 border-b border-slate-400`)}>
            <Image source={{ uri: track.track.album.images[0].url }}
                style={tw.style(`w-14 h-14 rounded-lg border-cream border`)} />
            <View style={tw.style(`flex-1 items-start ml-1 justify-center`)}>

                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={tw.style('text-white font-figtreeBold')}>{track.track.name}</Text>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={tw.style('font-figtreeBold text-artistGray')}>{track.track.artists[0].name}</Text>
            </View>
            {showcontextMenu && (
                <View style={tw.style(`flex flex-col gap-2 items-center absolute right-12 
                -top-20 bg-beigeCustom p-2 rounded-lg z-5`)}>
                    <TouchableOpacity
                        onPress={() => AddToBinOrRestore()}
                        style={tw.style(`py-2 gap-1 w-full justify-between flex-row`)}>
                        <MaterialIcons name="library-add" size={24} color="black" />
                        <Text style={tw.style(`text-black`, { fontFamily: "figtree-bold" })}>
                            {location === "library" ? isAddingTrack ? "Deleting.." : "Delete Track" :
                                isAddingTrack ? "Restoring..." : "Restore Track"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw.style(`py-2 w-full gap-1 justify-between flex-row`)}>
                        <MaterialIcons name="audiotrack" size={24} color="black" />
                        <Text style={tw.style(`text-black`, { fontFamily: "figtree-bold" })}>Open Details</Text>
                    </TouchableOpacity>
                    {session && (

                        <TouchableOpacity onPress={() => {
                            setShowContextMenu(false)
                            openTabsModal(track)
                        }}
                            style={tw.style(`py-2 w-full gap-1 justify-between flex-row`)}>
                            <MaterialCommunityIcons name="guitar-pick-outline" size={24} color="black" />
                            <Text style={tw.style(`text-black`, { fontFamily: "figtree-bold" })}>Add Tabs</Text>
                        </TouchableOpacity>
                    )}
                    {location === "recycleBin" && (

                        <TouchableOpacity
                            onPress={() => deleteTrackPermamently()}
                            style={tw.style(`py-2 w-full gap-1 justify-between flex-row`)}>
                            <MaterialIcons name="delete" size={24} color="white" />
                            <Text style={tw.style(`text-black`, { fontFamily: "figtree-bold" })}>Permanenty Delete</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
            <TouchableOpacity onPress={() => setShowContextMenu(!showcontextMenu)}>
                <Entypo name="dots-three-vertical" size={28} color="white" />
            </TouchableOpacity>
        </View >
    )
}
export default Track;