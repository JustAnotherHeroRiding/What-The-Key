import { TrackData } from './spotify-types'

export type dataSource = 'library' | 'recycleBin'
export interface addTrackProps {
  trackId: string
  source: dataSource
}

export interface TrackPageResponse {
  tracks: string[]
  nextCursor: string
}

export interface addTabProps {
  trackId: string
  tabUrl: string
}

export interface getTabProps {
  trackId: string
}

export interface getTracksProps {
  location: dataSource
}

export interface getTracksPageProps {
  location: dataSource
  cursor: string
  pageSize: string
}

export interface TracksPage {
  data: TrackData[]
  prevCursor?: string
  nextCursor?: string
}

export interface deleteTrackProps {
  trackId: string
}

export interface TrackConnection {
  id: string
  libraryUserId: number
  recycleBinUserId: number
}

export interface ApiErrorResponse {
  message: string
  statusCode: number
}

export interface Tab {
  id: number
  userId: number
  trackId: string
  tabUrl: string
}
export interface isTrackAdded {
  isInLibrary: boolean
  isInRecycleBin: boolean
}
export type Sources = 'library' | 'recycleBin' | 'home'
