// services/trackService.js
import { useContext } from 'react'
import { SessionContext } from '../utils/Context/Session/SessionContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-root-toast'
import { TrackData } from '../utils/types/spotify-types'
import {
  addTrackProps,
  TrackConnection,
  getTracksProps,
  ApiErrorResponse,
  deleteTrackProps,
  addTabProps,
  getTabProps,
  Tab,
  isTrackAdded,
} from '../utils/types/track-service-types'

const useTrackService = () => {
  const session = useContext(SessionContext)
  const queryClient = useQueryClient()

  const addTrack = async ({ trackId, source }: addTrackProps): Promise<TrackConnection> => {
    const response = await fetch('https://what-the-key.vercel.app/api/track/addTrack', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: session?.user.id,
        trackId,
        source,
      }),
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Error adding track to library')
    }

    return response.json()
  }

  const { mutate: addTrackMut, isPending: isAddingTrack } = useMutation({
    mutationFn: addTrack,
    onSuccess: (_, variables) => {
      /* This needs another look
            If a user is adding a track from the home page to the lib, then only the library should be invalidated
            If a user is adding a track to the bin or restoring it back to the library then both need to be updated
            I should add another optional param to the addTrack func 
             */
      queryClient.invalidateQueries({ queryKey: ['library'] })
      queryClient.invalidateQueries({ queryKey: ['recycleBin'] })
      Toast.show(
        `Track successfully added to the ${variables.source === 'recycleBin' ? 'Deleted Tracks' : 'Library'}`,
        {
          duration: Toast.durations.LONG,
          position: -40,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        },
      )
    },
    onError: (error: Error) => {
      // Handle error
      Toast.show(
        error instanceof Error
          ? 'Track could not be added, are you logged in or have you already added this track?'
          : 'An Unknown error occured.',
        {
          duration: Toast.durations.LONG,
          position: -40,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: 'red',
        },
      )
    },
  })

  const getTracks = async ({ location }: getTracksProps): Promise<TrackData[] | ApiErrorResponse> => {
    const queryParams = new URLSearchParams({
      userId: session?.user.id ?? 'no user',
      source: location,
    }).toString()

    const responseTrackIds = await fetch(`https://what-the-key.vercel.app/api/track/getTracks?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const trackIds = await responseTrackIds.json()

    if (!responseTrackIds.ok) {
      throw new Error(trackIds.message || 'Error fetching track ids from database')
    }

    const trackIdsJoined = trackIds.map((track: { id: any }) => track.id).join(',')
    const spotifyResponse = await fetch(
      `https://what-the-key.vercel.app/api/spotify/tracks?ids=${trackIdsJoined}
          `,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const libraryData: TrackData[] = await spotifyResponse.json()
    return libraryData
  }

  const getHistoryTracks = async (): Promise<TrackData[] | ApiErrorResponse> => {
    const queryParams = new URLSearchParams({
      userId: session?.user.id ?? 'no user',
    }).toString()

    const responseTrackIds = await fetch(`https://what-the-key.vercel.app/api/track/getHistory?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const trackIds = await responseTrackIds.json()

    if (!responseTrackIds.ok) {
      throw new Error(trackIds.message || 'Error fetching track ids from database')
    }

    const trackIdsJoined = trackIds.map((track: { id: any }) => track.id).join(',')
    const spotifyResponse = await fetch(
      `https://what-the-key.vercel.app/api/spotify/tracks?ids=${trackIdsJoined}
          `,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const trackHistory: TrackData[] = await spotifyResponse.json()
    return trackHistory
  }

  const deleteTrack = async ({ trackId }: deleteTrackProps) => {
    const requestBody = {
      userId: session?.user.id ?? 'no user',
      trackId: trackId,
    }

    const deleteRequest = await fetch(`https://what-the-key.vercel.app/api/track/deleteTrack`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    if (!deleteRequest.ok) {
      // Handle error response
      const errorResponse = await deleteRequest.json()
      throw new Error(errorResponse.message || 'Error in deleting the track')
    }

    // Parse the JSON response if the request was successful
    const deletedTrackInfo = await deleteRequest.json()
    return deletedTrackInfo
  }

  const { mutate: deleteTrackMut, isPending: isDeletingTrack } = useMutation({
    mutationFn: deleteTrack,
    onSuccess: (_, variables) => {
      Toast.show(`Track has been successfully deleted.`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      })
      queryClient.invalidateQueries({ queryKey: ['recycleBin'] })
    },
    onError: (error: Error) => {
      // Handle error
      Toast.show(
        error instanceof Error ? `Track could not be deleted, please try again` : 'An Unknown error occured.',
        {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: 'red',
        },
      )
    },
  })

  const addTab = async ({ trackId, tabUrl }: addTabProps): Promise<TrackConnection> => {
    const response = await fetch('https://what-the-key.vercel.app/api/track/addTabs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trackId,
        userId: session?.user.id,
        tabUrl,
      }),
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Error adding track to library')
    }

    return response.json()
  }

  const { mutate: addTabMut, isPending: isAddingTab } = useMutation({
    mutationFn: addTab,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['singleTrack', variables.trackId] })
      // Which cache should be invalidated here? I think just the single track cache with the track id, or maybe the url
      Toast.show(`Tab successfully added!`, {
        duration: Toast.durations.LONG,
        position: -40,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      })
    },
    onError: (error: Error) => {
      // Handle error
      Toast.show(error instanceof Error ? 'Tab could not be added, please try again?' : 'An Unknown error occured.', {
        duration: Toast.durations.LONG,
        position: -40,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: 'red',
      })
    },
  })

  const getTabs = async ({ trackId }: getTabProps): Promise<Tab[]> => {
    const queryParams = new URLSearchParams({
      userId: session?.user.id ?? 'no user',
      trackId: trackId,
    }).toString()

    const tabRes = await fetch(`https://what-the-key.vercel.app/api/track/getTabs?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const tab = await tabRes.json()

    if (!tabRes.ok) {
      throw new Error(tab.message || 'Error fetching track ids from database')
    }
    return tab
  }

  const isTrackAdded = async (trackId: string): Promise<isTrackAdded> => {
    const queryParams = new URLSearchParams({
      userId: session?.user.id ?? 'no user',
      trackId: trackId,
    }).toString()

    const addedStatusRes = await fetch(`https://what-the-key.vercel.app/api/track/isTrackAdded?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const addedStatus = await addedStatusRes.json()

    if (!addedStatusRes.ok) {
      throw new Error(addedStatus.message || 'Error fetching track added status from the database.')
    }
    return addedStatus as isTrackAdded
  }

  return {
    addTrackMut,
    getTracks,
    deleteTrackMut,
    addTabMut,
    getTabs,
    isTrackAdded,
    getHistoryTracks,
    isAddingTab,
    isDeletingTrack,
    isAddingTrack,
  }
}

export default useTrackService
