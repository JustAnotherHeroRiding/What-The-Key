import { View, Image, Text, ScrollView } from "react-native"
import { SpotifyItem } from "../../utils/spotify-types"
import tw from "../../utils/tailwindRN"



interface SearchResultTrackProps {
    track: SpotifyItem
}

const SearchResultTrack = ({ track }: SearchResultTrackProps) => {
    return (
        <View
            style={tw.style(`flex flex-row justify-between`)}>
            <Image source={{ uri: track.album.images[0].url }}
                style={tw.style(`w-16 h-16 rounded-lg border-cream border`)} />
            <View style={tw.style(`flex-1 items-end ml-4`)}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={tw.style(`text-white font-bold`)}>{track.name}</Text>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={tw.style(`text-artistGray font-bold`)}> {track.artists[0].name}</Text>
            </View>
        </View>
    )
}

export default SearchResultTrack