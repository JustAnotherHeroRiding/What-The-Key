import { SpotifyService } from './spotify.service';
export declare class SpotifyController {
    private readonly spotifyService;
    constructor(spotifyService: SpotifyService);
    fetchMultipleTracks(trackIds: string): Promise<import("../utils/spotify-types").TrackData[]>;
    fetchTrack(trackId: string): Promise<import("../utils/spotify-types").TrackData>;
    fetchTrackDetailed(trackId: string): Promise<import("../utils/spotify-types").TrackData>;
    searchTracks(searchQuery: string): Promise<import("../utils/spotify-types").SpotifyTracksSearchResult>;
    getRandomGuitarTrack(): Promise<import("../utils/spotify-types").TrackData>;
    getGenres(): Promise<string[]>;
}
