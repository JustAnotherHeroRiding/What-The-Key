import { Component } from '@angular/core';
import { SpotifyService } from './services/spotify.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import { SpotifyTracksSearchResult } from './utils/spotify-types';
import { SupabaseService } from './services/supabase.service';
import { Session } from '@supabase/supabase-js';
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
  session: Session | undefined | null = undefined;
  private sessionSubscription?: Subscription;
  isLoadingSession = true; // New property to track session loading state

  searchResults: SpotifyTracksSearchResult | null = null;

  constructor(
    private spotifyService: SpotifyService,
    private supabase: SupabaseService
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
            // console.log('Debounced Search Data: ', data);
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

  ngOnInit() {
    this.sessionSubscription = this.supabase.session$.subscribe((session) => {
      this.session = session;
      this.isLoadingSession = false; // Update loading state
      //console.log('Session:', session);
    });
  }

  ngOnDestroy() {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }
}
