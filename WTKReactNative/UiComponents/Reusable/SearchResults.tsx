import { Text, View, Image, FlatList } from 'react-native'
import { SpotifyTracksSearchResult } from '../../utils/types/spotify-types'
import tw from '../../utils/config/tailwindRN'
import { LinearGradient } from 'expo-linear-gradient'
import SearchResultTrack from './Track/SearchResultTrack'
import React from 'react'

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
      <FlatList
        style={tw.style(`flex-grow`)}
        contentContainerStyle={tw.style(`pb-20`)}
        data={results.tracks.items}
        renderItem={({ item }) => <SearchResultTrack track={item} location='home' />}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => (
          <Text
            style={tw.style(`text-white border-slate-500 border-b-2 text-3xl py-4 text-center`, {
              fontFamily: 'figtree-bold',
            })}
          >
            Search Results
          </Text>
        )}
        scrollEnabled={false}
      />
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
