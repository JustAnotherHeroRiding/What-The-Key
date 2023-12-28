import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  AudioFeatures,
  RandomTrack,
  SpotifyItem,
  SpotifyTracksSearchResult,
} from '../utils/spotify-types';
import { TrackData } from '../pages/home/home.component';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private backendUrl = 'http://localhost:3000/api/spotify'; // URL of the NestJS spotify controller

  constructor(private http: HttpClient) {}

  fetchMultipleTracks(trackIds: string): Observable<TrackData[]> {
    return this.http
      .get<TrackData[]>(`${this.backendUrl}/tracks?ids=${trackIds}`)
      .pipe(catchError((error) => throwError(() => error)));
  }

  fetchTrack(trackId: string): Observable<TrackData> {
    return this.http
      .get<TrackData>(`${this.backendUrl}/track/${trackId}`)
      .pipe(catchError((error) => throwError(() => error)));
  }

  searchTracks(searchQuery: string): Observable<SpotifyTracksSearchResult> {
    return this.http
      .get<SpotifyTracksSearchResult>(
        `${this.backendUrl}/search?query=${searchQuery}`
      )
      .pipe(catchError((error) => throwError(() => error)));
  }

  getRandomGuitarTrack(): Observable<RandomTrack> {
    return this.http
      .get<RandomTrack>(`${this.backendUrl}/random-guitar-track`)
      .pipe(catchError((error) => throwError(() => error)));
  }

  getGenres(): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.backendUrl}/genres`)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
