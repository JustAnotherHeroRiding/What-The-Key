import { View, Image, Text, TouchableOpacity, Alert } from "react-native"
import { SpotifyItem } from "../../utils/spotify-types"
import tw from "../../utils/tailwindRN"
import { Entypo } from '@expo/vector-icons';
import { useContext, useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { SessionContext } from "../../utils/Context/Session/SessionContext";
import Toast from "react-native-root-toast"
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "../../utils/types";



interface SearchResultTrackProps {
    track: SpotifyItem
}

interface AddTrackBody {
    userId: string;
    trackId: string;
    source: 'library' | 'recycleBin'
}

enum ContextActions {
    LIBRARY = "addToLibrary",
    DETAILS = "openDetails"
}

const SearchResultTrack = ({ track }: SearchResultTrackProps) => {
    const [showcontextMenu, setShowContextMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const session = useContext(SessionContext)
    const navigation = useNavigation<AuthScreenNavigationProp>()


    const addToLibrary = async () => {
        try {
            const response = await fetch(
                "https://what-the-key.vercel.app/api/track/addTrack", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: session?.user.id,
                    trackId: track.id,
                    source: "library"
                })
            }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Error fetching track");
            }


            // Display success toast
            Toast.show('Track successfully added to the library', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
            setShowContextMenu(false)

        } catch (error) {
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

    return (
        <View
            style={tw.style(`flex flex-row justify-between gap-2 items-center px-2 py-1 border-b border-slate-400`)}>
            <Image source={{ uri: track.album.images[0].url }}
                style={tw.style(`w-14 h-14 rounded-lg border-cream border`)} />
            <View style={tw.style(`flex-1 items-end ml-4 justify-center`)}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={tw.style(`text-white font-figtreeBold`)}>{track.name}</Text>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={tw.style(`text-artistGray font-figtreeBold`)}> {track.artists[0].name}</Text>
            </View>
            {showcontextMenu && (

                session ? (

                    <View style={tw.style(`flex flex-col gap-2 items-center absolute right-12 
                    -top-20 bg-beigeCustom p-2 rounded-lg z-5`)}>
                        <TouchableOpacity onPress={() => addToLibrary()}
                            style={tw.style(`py-2 gap-1 w-full justify-between flex-row`)}>
                            <MaterialIcons name="library-add" size={24} color="black" />
                            <Text style={tw.style(`text-black`, { fontFamily: "figtree-bold" })}>Add to Library</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tw.style(`py-2 w-full gap-1 justify-between flex-row`)}>
                            <MaterialIcons name="audiotrack" size={24} color="black" />
                            <Text style={tw.style(`text-black`, { fontFamily: "figtree-bold" })}>Open Details</Text>
                        </TouchableOpacity>
                    </View>
                )
                    :
                    <View style={tw.style(`flex flex-col gap-2 items-center absolute right-12 
                -top-20 bg-beigeCustom p-2 rounded-lg z-5`)}>
                        <TouchableOpacity onPress={() => navigation.navigate('Auth')}
                            style={tw.style(`py-2 gap-1 w-full justify-between flex-row`)}>
                            <MaterialIcons name="login" size={24} color="black" />
                            <Text style={tw.style(`text-black`, { fontFamily: "figtree-bold" })}>Log in to interact</Text>
                        </TouchableOpacity>
                    </View>
            )}
            <TouchableOpacity onPress={() => setShowContextMenu(!showcontextMenu)}>
                <Entypo name="dots-three-vertical" size={28} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default SearchResultTrack