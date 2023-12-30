import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import {
  AudioFeatures,
  SpotifyItem,
  SpotifyTracksSearchResult,
} from '../../utils/spotify-types';
import { ToastrService } from 'ngx-toastr';
import { BackEndService } from '../../services/backend.service';
import { TrackCacheService } from 'src/app/services/Cache/track-cache.service';

export enum GetTrackSources {
  LIBRARY = 'library',
  SEARCH = 'search',
}

export interface TrackData {
  audioFeatures: AudioFeatures;
  track: SpotifyItem;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  trackData: any;
  savedTrack: any;
  private searchTerm$ = new Subject<string>();
  searchTerm: string = ''; // Add this line
  isLoading = false;
  GetTrackSources = GetTrackSources;

  searchResults: SpotifyTracksSearchResult | null = null;

  constructor(
    private spotifyService: SpotifyService,
    private toastr: ToastrService,
    private backEndService: BackEndService,
    private trackCacheService: TrackCacheService
  ) {
    this.searchTerm$
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap((term) => {
          this.isLoading = true;

          if (term.length === 0) {
            return of(null);
          }
          return this.spotifyService.searchTracks(term);
        })
      )
      .subscribe({
        next: (data) => {
          if (data) {
            this.searchResults = data;
            //console.log('Debounced Search Data: ', data);
          } else {
            this.searchResults = null; // Clear results if the search term is empty
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.isLoading = false;
        },
      });
  }

  getTrack(
    trackId: string,
    origin: GetTrackSources,
    callback?: (data: any) => void
  ) {
    if (trackId.trim().length > 0) {
      this.isLoading = true;
      this.spotifyService.fetchTrack(trackId).subscribe({
        next: (data) => {
          //console.log('track Data:', data);
          this.isLoading = false;

          if (origin === GetTrackSources.LIBRARY) {
            this.savedTrack = data;
          } else if (origin === GetTrackSources.SEARCH) {
            this.trackData = data;
          }

          if (callback) {
            callback(data);
          }
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.isLoading = false;
        },
      });
    }
  }

  search() {
    // Emit the trimmed search term into the stream
    this.searchTerm$.next(this.searchTerm.trim());
  }

  saveTrack(trackId: string) {
    this.backEndService.addTrack(trackId, GetTrackSources.LIBRARY).subscribe({
      next: (response) => {
        this.trackCacheService.invalidateCache('library');
        this.toastr.success('Track saved successfully!');
      },
      error: (err) => {
        if (err.status === 409) {
          // Assuming 409 status code for duplicate track
          this.toastr.info('Track already in library'); // Display info toast
        } else {
          this.toastr.error(
            'Error adding track to library, are you logged in?'
          ); // Display error toast
        }
      },
    });
  }

  getRandomTrack() {
    this.spotifyService.getRandomGuitarTrack().subscribe({
      next: (track) => {
        this.getTrack(track.tracks[0].id!, GetTrackSources.SEARCH);
      },
      error: (err) => {
        console.error('Error fetching random track:', err);
        this.toastr.error('Error fetching random track');
      },
    });
  }
}
