import { Text, View, Image } from 'react-native'
import { SpotifyTracksSearchResult } from '../../utils/spotify-types'
import tw from '../../utils/tailwindRN'
import { LinearGradient } from 'expo-linear-gradient'
import SearchResultTrack from './Track/SearchResultTrack'

interface SearchResultsProps {
  results: SpotifyTracksSearchResult
}

const SearchResults = ({ results }: SearchResultsProps) => {
  return results.tracks.items.length > 0 ? (
    <LinearGradient
      colors={['#27272a', '#52525b']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`mx-auto flex my-4 w-full`)}
    >
      <Text
        style={tw.style('text-white text-center font-extrabold text-2xl border-b-2 py-4  border-slate-500', {
          fontFamily: 'figtree-bold',
        })}
      >
        Search Results
      </Text>
      {results.tracks.items.map((track, index) => (
        <SearchResultTrack key={index} track={track} />
      ))}
    </LinearGradient>
  ) : (
    <LinearGradient
      colors={['#27272a', '#52525b']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`mx-auto p-4 flex gap-2 my-4 w-full`)}
    >
      <Text>No tracks could be found for your query :(</Text>
    </LinearGradient>
  )
}

export default SearchResults
