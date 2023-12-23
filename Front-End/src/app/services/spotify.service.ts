import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, switchMap, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  AudioFeatures,
  SpotifyItem,
  SpotifyTracksSearchResult,
} from '../utils/spotify-types';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from 'env';
import { TrackData } from '../pages/home/home.component';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private readonly clientId = SPOTIFY_CLIENT_ID; // Don't forget to delete when pushing
  private readonly clientSecret = SPOTIFY_CLIENT_SECRET;
  private accessToken: string | null = null;
  /* Note that the access token is valid for 1 hour (3600 seconds). 
  After that time, the token expires and you need to request a new one.
 */

  constructor(private http: HttpClient) {
    this.initToken();
  }
  private initToken(): void {
    this.getAuthToken().subscribe({
      next: (token) => {
        this.accessToken = token;
      },
      error: (error) => {
        console.error('Error fetching Spotify token:', error);
      },
    });
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    });
  }

  private getAuthToken(): Observable<string> {
    if (this.accessToken) {
      return of(this.accessToken); // Return the existing token if it's already fetched
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
    });
    const body = 'grant_type=client_credentials';

    return this.http
      .post<any>('https://accounts.spotify.com/api/token', body, { headers })
      .pipe(
        map((response) => {
          this.accessToken = response.access_token;
          return response.access_token;
        }),
        catchError((error) => throwError(() => error))
      );
  }

  fetchMultipleTracks(trackIds: string): Observable<TrackData[]> {
    return this.getAuthToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        });

        const tracksRequest = this.http.get<{ tracks: SpotifyItem[] }>(
          `https://api.spotify.com/v1/tracks?ids=${trackIds}`,
          { headers }
        );

        const audioFeaturesRequest = this.http.get<{
          audio_features: AudioFeatures[];
        }>(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
          headers,
        });

        return forkJoin({ tracksRequest, audioFeaturesRequest });
      }),
      map((results) => {
        const tracks = results.tracksRequest.tracks;
        const audioFeatures = results.audioFeaturesRequest.audio_features;

        return tracks.map(
          (track, index) =>
            ({
              track,
              audioFeatures: audioFeatures[index],
            } as TrackData)
        );
      }),
      catchError((error) => throwError(() => error))
    );
  }
  
  fetchTrack(trackId: string): Observable<TrackData> {
    return this.getAuthToken().pipe(
      switchMap(() => this.makeTrackRequest(trackId)),
      catchError((error) => throwError(() => error))
    );
  }

  private makeTrackRequest(trackId: string): Observable<any> {
    const headers = this.createHeaders();

    const trackRequest = this.http.get(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      { headers }
    );
    const audioFeaturesRequest = this.http.get(
      `https://api.spotify.com/v1/audio-features/${trackId}`,
      { headers }
    );

    return forkJoin({
      track: trackRequest,
      audioFeatures: audioFeaturesRequest,
    });
  }

  searchTracks(searchQuery: string): Observable<SpotifyTracksSearchResult> {
    return this.getAuthToken().pipe(
      switchMap(() => this.makeSearchRequest(searchQuery)),
      catchError((error) => throwError(() => error))
    );
  }

  private makeSearchRequest(
    searchQuery: string
  ): Observable<SpotifyTracksSearchResult> {
    const headers = this.createHeaders();
    const params = new HttpParams()
      .set('q', searchQuery)
      .set('type', 'track')
      .set('limit', 10);

    return this.http.get<SpotifyTracksSearchResult>(
      `https://api.spotify.com/v1/search`,
      { headers, params }
    );
  }
}
