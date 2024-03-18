import { useContext } from 'react'
import { SpotifyTracksSearchResult, TrackData } from '../utils/types/spotify-types'
import { SessionContext } from '../utils/Context/Session/SessionContext'
import { apiUrl } from '../utils/consts/production'

interface SearchProps {
  queryString: string
}

const useSpotifyService = () => {
  const session = useContext(SessionContext)

  const searchTracks = async ({ queryString }: SearchProps): Promise<SpotifyTracksSearchResult> => {
    const response = await fetch(`${apiUrl}/api/spotify/search?query=${queryString}`)

    const data: SpotifyTracksSearchResult = await response.json()

    return data
  }

  const fetchRandomTrack = async () => {
    const response = await fetch(`${apiUrl}/api/spotify/random-guitar-track`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error fetching track')
    }
    const responseExtended = await fetch(`${apiUrl}/api/spotify/trackDetailed/${data.tracks[0].id}`)
    const dataExtended = await responseExtended.json()

    if (!responseExtended.ok) {
      throw new Error(dataExtended.message || 'Error fetching track')
    }

    return dataExtended
  }

  const getTrackAnalysis = async (trackId: string): Promise<TrackData> => {
    const userId = session?.user.id
    const queryString = userId ? `?userId=${encodeURIComponent(userId)}` : ''
    // Replace with the production url
    const url = `${apiUrl}/api/spotify/trackDetailed/${trackId}${queryString}`
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error fetching track')
    }

    return data
  }

  return {
    searchTracks,
    fetchRandomTrack,
    getTrackAnalysis,
  }
}

export default useSpotifyService
