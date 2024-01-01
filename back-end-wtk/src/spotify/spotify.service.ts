import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  SpotifyItem,
  AudioFeatures,
  SpotifyTracksSearchResult,
  TrackData,
} from '../utils/spotify-types';
@Injectable()
export class SpotifyService {
  private readonly clientId = process.env.SPOTIFY_CLIENT_ID;
  private readonly clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  private accessToken: string | null = null;
  private tokenTimestamp: number | null = null;

  constructor() {
    this.initToken();
  }

  private async initToken(): Promise<void> {
    try {
      const token = await this.getAuthToken();
      this.accessToken = token;
    } catch (error) {
      console.error('Error fetching Spotify token:', error);
    }
  }

  private createHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  private isTokenValid(): boolean {
    const now = Date.now();
    return (
      this.accessToken &&
      this.tokenTimestamp &&
      now - this.tokenTimestamp < 3600000
    );
  }

  private async getAuthToken(): Promise<string> {
    const now = Date.now();
    if (this.isTokenValid()) {
      // 3600000 milliseconds = 1 hour
      // This will check if the token is expired
      return this.accessToken;
    }

    try {
      const credentials = this.clientId + ':' + this.clientSecret;
      const encodedCredentials = Buffer.from(credentials).toString('base64');

      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${encodedCredentials}`,
          },
        },
      );

      this.accessToken = response.data.access_token;
      this.tokenTimestamp = now;
      return this.accessToken;
    } catch (error) {
      console.error('Error fetching Spotify token:', error);
      if (error.response) {
        console.error('Response:', error.response.data);
      }
      throw error;
    }
  }

  async fetchMultipleTracks(trackIds: string): Promise<TrackData[]> {
    await this.getAuthToken();
    const headers = this.createHeaders();
    const tracksResponse = await axios.get<{ tracks: SpotifyItem[] }>(
      `https://api.spotify.com/v1/tracks?ids=${trackIds}`,
      { headers },
    );
    const audioFeaturesResponse = await axios.get<{
      audio_features: AudioFeatures[];
    }>(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
      headers,
    });

    const tracks = tracksResponse.data.tracks;
    const audioFeatures = audioFeaturesResponse.data.audio_features;

    return tracks.map((track, index) => ({
      track,
      audioFeatures: audioFeatures[index],
    }));
  }

  async fetchTrack(trackId: string): Promise<TrackData> {
    await this.getAuthToken();

    const headers = this.createHeaders();
    const trackResponse = await axios.get(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      { headers },
    );
    const audioFeaturesResponse = await axios.get(
      `https://api.spotify.com/v1/audio-features/${trackId}`,
      { headers },
    );
    return {
      track: trackResponse.data,
      audioFeatures: audioFeaturesResponse.data,
    };
  }

  async searchTracks(searchQuery: string): Promise<SpotifyTracksSearchResult> {
    await this.getAuthToken();

    const headers = this.createHeaders();
    const params = new URLSearchParams({
      q: searchQuery,
      type: 'track',
      limit: '10',
    });

    const searchResponse = await axios.get<SpotifyTracksSearchResult>(
      `https://api.spotify.com/v1/search?${params}`,
      { headers },
    );
    return searchResponse.data;
  }

  async getRandomGuitarTrack(): Promise<TrackData> {
    await this.getAuthToken();
    const headers = this.createHeaders();
    const seedGenres = 'rock,blues,punk,post-punk,alt-rock';
    const url = `https://api.spotify.com/v1/recommendations?&seed_genres=${seedGenres}&limit=1`;

    const response = await axios.get(url, { headers });
    return response.data;
  }

  async getGenres(): Promise<string[]> {
    await this.getAuthToken();
    const headers = this.createHeaders();
    const url = `https://api.spotify.com/v1/recommendations/available-genre-seeds`;

    const response = await axios.get(url, { headers });
    return response.data;
  }
}
