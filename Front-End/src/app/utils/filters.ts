import { TrackData } from '../pages/home/home.component';
import { AudioFeatures, SpotifyItem } from './spotify-types';

export const FILTERS = {
  dance: 'danceability',
  energy: 'energy',
  valence: 'valence',
  acoustic: 'acousticness',
  instrumental: 'instrumentalness',
  duration: 'duration_ms',
  popularity: 'popularity',
  loudness: 'loudness',
  tempo: 'tempo',
  explicit: 'explicit',
  key: 'key',
  mode: 'mode',
  decade: 'decade',
};

export const filterLocation = {
  danceability: 'audioFeatures',
  energy: 'audioFeatures',
  valence: 'audioFeatures',
  acousticness: 'audioFeatures',
  instrumentalness: 'audioFeatures',
  duration_ms: 'audioFeatures',
  popularity: 'track',
  loudness: 'audioFeatures',
  tempo: 'audioFeatures',
  explicit: 'track',
  key: 'audioFeatures',
  mode: 'audioFeatures',
  decade: 'track',
};

export type FilterValue = (typeof FILTERS)[keyof typeof FILTERS];
export type FilterLocationValue = keyof typeof filterLocation;

export enum SortOrder {
  Ascending = 'ASC',
  Descending = 'DESC',
  None = 'NONE',
}

export function sortTracksByFilter(
  tracks: TrackData[],
  filter: keyof typeof filterLocation,
  sortOrder: SortOrder
): TrackData[] {
  const tracksCopy = [...tracks];

  switch (filter) {
    case 'danceability':
    case 'energy':
    case 'valence':
    case 'acousticness':
    case 'instrumentalness':
    case 'duration_ms':
    case 'popularity':
    case 'loudness':
    case 'tempo':
      return sortAscDesc(tracksCopy, sortOrder);
    case 'explicit':
      return sortExplicit(tracksCopy, sortOrder);
    case 'mode':
      // Sorting major and minor tracks
      return sortAscDesc(tracksCopy, sortOrder);
    case 'decade':
      // Users can select a decade and only receive tracks from it
      return sortAscDesc(tracksCopy, sortOrder);
    default:
      return tracksCopy;
  }
}

function sortAscDesc(tracks: TrackData[], sortOrder: SortOrder): TrackData[] {
  return tracks.sort((a, b) => {
    const valueA = a.audioFeatures.danceability;
    const valueB = b.audioFeatures.danceability;
    return sortOrder === SortOrder.Descending
      ? valueB - valueA
      : valueA - valueB;
  });
}

function sortExplicit(tracks: TrackData[], sortOrder: SortOrder): TrackData[] {
  switch (sortOrder) {
    case SortOrder.Descending: // Interpreted as 'Show Explicit'
      return tracks.filter((track) => track.track.explicit);
    case SortOrder.Ascending: // Interpreted as 'Show Clean'
      return tracks.filter((track) => !track.track.explicit);
    case SortOrder.None: // Reset to original
      return [...tracks];
    default:
      return [...tracks];
  }
}

export function sortByKey(
  tracks: TrackData[],
  currentKey: number
): TrackData[] {
  const result = tracks.filter(
    (track) => track.audioFeatures.key === currentKey
  );
  console.log(result);
  return result;
}
