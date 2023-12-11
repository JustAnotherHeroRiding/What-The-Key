import { Component } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import { SpotifyTracksSearchResult } from './spotify-types';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly title = 'What-the-key';
  trackData: any;
  private searchTerm$ = new Subject<string>();
  searchTerm: string = ''; // Add this line
  isLoading = false;

  searchResults: SpotifyTracksSearchResult | null = null;

  constructor(private spotifyService: SpotifyService) {
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
            console.log('Debounced Search Data: ', data);
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

  getTrack(trackId: string) {
    if (trackId.trim().length > 0) {
      this.isLoading = true;
      this.spotifyService.fetchTrack(trackId).subscribe({
        next: (data) => {
          console.log('track Data:', data);
          this.trackData = data;
          this.isLoading = false;
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
}
