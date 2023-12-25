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
  artist: 'artist',
  album: 'album',
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
  artist: 'track',
  album: 'track',
  tempo: 'audioFeatures',
  explicit: 'track',
  key: 'audioFeatures',
  mode: 'audioFeatures',
  decade: 'track',
};

export type FilterValue = (typeof FILTERS)[keyof typeof FILTERS];
export type FilterLocationValue = keyof typeof filterLocation;

export function sortTracksByFilter(
  tracks: TrackData[],
  filter: keyof typeof filterLocation
): TrackData[] {
  const tracksCopy = [...tracks];

  return tracksCopy.sort((a, b) => {
    let valueA, valueB;
    if (filterLocation[filter] === 'audioFeatures') {
      valueA = a.audioFeatures[filter as keyof AudioFeatures];
      valueB = b.audioFeatures[filter as keyof AudioFeatures];
    } else if (filterLocation[filter] === 'track') {
      valueA = a.track[filter as keyof SpotifyItem];
      valueB = b.track[filter as keyof SpotifyItem];
    }
    // Assuming the values are numbers for sorting
    return (valueB ?? 0) - (valueA ?? 0); // For descending order
  });
}
