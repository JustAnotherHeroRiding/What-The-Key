import { SpotifyService } from './spotify.service';
import { TrackService } from 'src/tracks/track.service';
export declare class SpotifyController {
    private readonly spotifyService;
    private trackService;
    constructor(spotifyService: SpotifyService, trackService: TrackService);
    fetchMultipleTracks(trackIds: string): Promise<import("../utils/spotify-types").TrackData[]>;
    fetchTrack(trackId: string): Promise<import("../utils/spotify-types").TrackData>;
    fetchTrackDetailed(trackId: string, userId?: string): Promise<import("../utils/spotify-types").TrackData>;
    searchTracks(searchQuery: string): Promise<import("../utils/spotify-types").SpotifyTracksSearchResult>;
    getRandomGuitarTrack(): Promise<import("../utils/spotify-types").TrackData>;
    getRecommendations(type: 'latest' | 'favorites', userId: string): Promise<import("../utils/spotify-types").TrackData>;
    getGenres(): Promise<string[]>;
}
