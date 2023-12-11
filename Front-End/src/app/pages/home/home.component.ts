import { Component } from '@angular/core';
import { SpotifyService } from '../../spotify.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import {
  AudioFeatures,
  SpotifyItem,
  SpotifyTracksSearchResult,
} from '../../spotify-types';
import { ToastrService } from 'ngx-toastr';
import { BackEndService } from '../../backend.service';

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
    private backEndService: BackEndService
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
    this.getTrack(trackId, GetTrackSources.LIBRARY, (trackData: TrackData) => {
      const library: TrackData[] = this.getLibrary();
      if (!library.some((track) => track.track.id === trackData.track.id)) {
        library.push(trackData);
        localStorage.setItem('library', JSON.stringify(library));
        this.toastr.success('Track added to library'); // Display success toast
        //console.log('Track added to library:', trackData);
      } else {
        this.toastr.info('Track already in library'); // Display info toast
        console.log('Track already in library');
      }
    });
  }

  private getLibrary(): TrackData[] {
    const libraryData = localStorage.getItem('library');
    try {
      const library = JSON.parse(libraryData!);
      //console.log('Library data:', library); // Add this line to log the library data in the console
      return Array.isArray(library) ? library : [];
    } catch (error) {
      console.error('Error parsing library data:', error);
      return [];
    }
  }

  getBackEnd(): any {
    return this.backEndService.getData().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}
