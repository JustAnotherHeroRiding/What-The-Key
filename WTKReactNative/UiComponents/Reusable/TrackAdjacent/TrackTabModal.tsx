import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, Text, Image, Linking, Dimensions, ScrollView } from 'react-native'
import { TrackData } from '../../../utils/spotify-types'
import tw from '../../../utils/tailwindRN'
import { Entypo } from '@expo/vector-icons'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import useTrackService from '../../../services/TrackService'
import { Tab } from 'react-native-elements/dist/tab/Tab'
import { LinearGradient } from 'expo-linear-gradient'
import { style } from 'twrnc'

interface TrackTabModal {
  currentTrack: TrackData
  closeTabsModal: () => void
  isAddingTab: boolean
}

const screen = Dimensions.get('window')
const imageSize = screen.width * 0.2

function TrackTabModal({ currentTrack, closeTabsModal, isAddingTab }: TrackTabModal) {
  const [tabUrlInput, setTabUrlInput] = useState('')

  const { getTabs, addTabMut } = useTrackService()

  const addTabs = async (tabUrl: string) => {
    addTabMut(
      {
        trackId: currentTrack?.track.id || '',
        tabUrl: tabUrl,
      },
      {
        onSuccess: () => {
          setTabUrlInput('')
          refetchTabs()
        },
      },
    )
  }

  const {
    data: currentTab,
    isFetching: isFetchingTabs,
    error: tabsError,
    refetch: refetchTabs,
  } = useQuery({
    queryKey: ['currentTab', currentTrack?.track.id],
    queryFn: () => getTabs({ trackId: currentTrack?.track.id }),
  })

  return (
    <View style={tw.style(`bg-opacity-30 bg-white absolute inset-0 flex justify-center items-center z-10 pt-4 pb-16`)}>
      <ScrollView contentContainerStyle={tw.style(`bg-transparent`)}>
        <LinearGradient
          colors={['#020617', '#1f2937']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={tw.style(
            `w-full border-cream flex items-center gap-4 
          shadow-xl shadow-slate-200 border-2 bg-slate-800 p-4 rounded-lg`,
            { elevation: 3 },
          )}
        >
          <TouchableOpacity
            style={tw.style(`border border-cream flex justify-center rounded-full absolute top-2 z-50 right-2`)}
            onPress={() => closeTabsModal()}
          >
            <Entypo name='cross' size={24} color='white' />
          </TouchableOpacity>
          {currentTab && currentTab?.length > 0 ? (
            <TouchableOpacity
              disabled={!currentTab}
              onPress={() => {
                if (currentTab && currentTab?.length > 0) {
                  const url = currentTab![0].tabUrl
                  Linking.openURL(url).catch(err => console.error(err))
                }
              }}
              style={tw.style(`border border-cream px-4 py-2 mr-auto 
            flex justify-center rounded-lg ${!currentTab ? 'opacity-70' : ''}`)}
            >
              <Text style={tw.style(`text-white`)}> Tabs</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                const searchUrl = `https://www.google.com/search?q=${currentTrack?.track.name}+${currentTrack.track.artists[0].name}+guitar+tabs`
                Linking.openURL(searchUrl).catch(err => console.error(err))
              }}
              style={tw.style(`border border-cream px-4 py-2 mr-auto 
            flex justify-center rounded-lg`)}
            >
              <Text style={tw.style(`text-white`)}> Search for tabs</Text>
            </TouchableOpacity>
          )}
          <Text style={tw.style(`text-white text-2xl text-center`, { fontFamily: 'figtree-bold' })}>Add Tabs for</Text>
          <Text style={tw.style(`text-white text-3xl text-center`, { fontFamily: 'figtree-bold' })}>
            {currentTrack?.track.name}
          </Text>
          <Text style={tw.style(`text-artistGray text-2xl text-center`, { fontFamily: 'figtree-bold' })}>
            {currentTrack?.track.artists[0].name}
          </Text>
          <Image
            source={{ uri: currentTrack?.track.album.images[0].url }}
            style={tw.style(`w-[${imageSize}] h-[${imageSize}] rounded-lg border-cream border`)}
          />

          <TextInput
            style={tw.style(`bg-[#fff] max-w-full rounded-2xl px-4 py-2 mb-5 text-black`)}
            placeholder='Enter a Tab Url...'
            placeholderTextColor='gray'
            value={tabUrlInput}
            onChangeText={text => setTabUrlInput(text)}
          />
          <TouchableOpacity
            onPress={() => addTabs(tabUrlInput)}
            style={tw.style(`border bg-beigeCustom border-cream px-4 py-2 w-full flex justify-center rounded-lg`)}
          >
            <Text style={tw.style(`text-center`, { fontFamily: 'figtree-bold' })}>
              {' '}
              {isAddingTab ? 'Adding...' : 'Add'}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </View>
  )
}

export default TrackTabModal
