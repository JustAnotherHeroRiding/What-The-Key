import { Text, View, Image } from "react-native";
import { SpotifyTracksSearchResult } from "../../utils/spotify-types"
import tw from "../../utils/tailwindRN";


interface SearchResultsProps {
    results: SpotifyTracksSearchResult;

}

const SearchResults = ({ results }: SearchResultsProps) => {
    return (
        results.tracks.items.length > 0 ?
            (
                <View style={tw.style(`mx-auto`)}>
                    {results.tracks.items.map((track, index) => (
                        <View style={tw.style(`flex flex-row justify-between`)}>

                            <Image source={{ uri: track.album.images[0].url }} style={tw.style(`w-24 h-24`)} />
                            <Text key={index}>{track.name} - {track.artists[0].name}</Text>
                        </View>
                    ))}
                </View>

            ) : (
                <Text>No results</Text >

            )
    )
}

export default SearchResults;