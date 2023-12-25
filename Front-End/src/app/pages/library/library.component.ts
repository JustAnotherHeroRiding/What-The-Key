import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ToastrService } from 'ngx-toastr';
import { TrackData } from '../home/home.component';
import { getNoteName } from '../../components/result-card/result-card.component';
import {
  FILTERS,
  FilterLocationValue,
  FilterValue,
  filterLocation,
  sortTracksByFilter,
} from '../../utils/filters';
import { BackEndService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent {
  originalLibrary: TrackData[] = [];
  displayedLibrary: TrackData[] = [];
  filters = FILTERS;
  loading = true;

  constructor(
    private spotifyService: SpotifyService,
    private toastr: ToastrService,
    private backendService: BackEndService
  ) {}

  ngOnInit(): void {
    this.fetchTracks();
  }

  fetchTracks() {
    this.loading = true;
    this.backendService.getTracks('library').subscribe({
      next: (trackIdsString: string) => {
        if (trackIdsString) {
          this.spotifyService.fetchMultipleTracks(trackIdsString).subscribe({
            next: (tracksData) => {
              // Process the fetched tracks and their audio features here
              this.originalLibrary = tracksData; // Store the original library for filtering purposes
              this.displayedLibrary = tracksData; // Update your displayed library
              this.loading = false;
            },
            error: (err) => {
              console.error('Error fetching tracks from Spotify:', err);
              this.loading = false;
            },
          });
        } else {
          // Handle case where no track IDs are returned
          this.displayedLibrary = [];
        }
      },
      error: (err) => console.error('Error fetching track IDs:', err),
    });
  }

  deleteTrack(track: TrackData) {
    this.backendService.deleteTrack(track.track.id, 'recycleBin').subscribe({
      next: () => {
        this.toastr.success('Track deleted successfully');
        this.displayedLibrary = this.displayedLibrary.filter(
          (t) => t.track.id !== track.track.id
        );
      },
      error: (err) => {
        this.toastr.error('Failed to delete track');
        console.error('Error deleting track:', err);
      },
    });
  }

  searchTracks(query: string | null) {
    if (!query) {
      this.displayedLibrary = [...this.originalLibrary]; // Reset to original list if query is empty
      return;
    }

    const lowerCaseQuery = query.toLowerCase();

    // Filter from originalLibrary and update displayedLibrary
    this.displayedLibrary = this.originalLibrary
      .filter((track) =>
        track.track.name.toLowerCase().includes(lowerCaseQuery)
      )
      .slice(0, 10);
  }

  searchSubmit(event: Event) {
    const inputEvent = event as InputEvent;
    const query = (inputEvent.target as HTMLInputElement).value;
    this.searchTracks(query);
  }

  getNoteDisplayName(noteValue: number): string {
    return getNoteName(noteValue);
  }

  activateFilter(filterValue: string) {
    if (filterValue in filterLocation) {
      const filter = filterValue as FilterLocationValue;
      this.displayedLibrary = sortTracksByFilter(this.displayedLibrary, filter);
    }
  }
}
