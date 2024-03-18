import { SpotifyTracksSearchResult, TrackData } from '../utils/spotify-types';
export type SeedType = 'artists' | 'genres' | 'tracks';
export interface RecommendationSeed {
    id: string;
    type: SeedType;
}
export declare class SpotifyService {
    private readonly clientId;
    private readonly clientSecret;
    private accessToken;
    private tokenTimestamp;
    constructor();
    private initToken;
    private createHeaders;
    private isTokenValid;
    private getAuthToken;
    fetchMultipleTracks(trackIds: string): Promise<TrackData[]>;
    fetchTrack(trackId: string): Promise<TrackData>;
    fetchTrackDetailed(trackId: string, userId?: string): Promise<TrackData>;
    searchTracks(searchQuery: string): Promise<SpotifyTracksSearchResult>;
    getRandomGuitarTrack(): Promise<TrackData>;
    getRecs(seeds: RecommendationSeed[]): Promise<TrackData>;
    getGenres(): Promise<string[]>;
}
