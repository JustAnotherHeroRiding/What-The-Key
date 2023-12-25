import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ToastrService } from 'ngx-toastr';
import { TrackData } from '../home/home.component';
import { FILTERS } from '../../utils/filters';
import { getNoteName } from '../../components/result-card/result-card.component';
import { BackEndService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.css'],
})
export class DeletedComponent {
  originalLibrary: TrackData[] = [];
  displayedLibrary: TrackData[] = [];
  filters = FILTERS;

  constructor(
    private spotifyService: SpotifyService,
    private toastr: ToastrService,
    private backendService: BackEndService
  ) {}

  ngOnInit(): void {
    this.fetchTracks();
  }

  fetchTracks() {
    this.backendService.getTracks('recycleBin').subscribe({
      next: (trackIdsString: string) => {
        if (trackIdsString) {
          this.spotifyService.fetchMultipleTracks(trackIdsString).subscribe({
            next: (tracksData) => {
              // Process the fetched tracks and their audio features here
              this.displayedLibrary = tracksData; // Update your displayed library
            },
            error: (err) =>
              console.error('Error fetching tracks from Spotify:', err),
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
    this.backendService.deleteTrackPermanently(track.track.id).subscribe({
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

  restoreTrack(track: TrackData) {
    try {
      // Fetch the main library from local storage
      const libraryRaw = localStorage.getItem('library'); // Assuming 'library' is the key for your main library
      const library = libraryRaw ? JSON.parse(libraryRaw) : [];

      // Add the track back to the main library
      library.push(track);

      // Update the main library in local storage
      localStorage.setItem('library', JSON.stringify(library));

      // Remove the track from the recycling bin
      this.deleteTrack(track);

      // Display success toast
      this.toastr.success('Track has been restored to the library');
    } catch (error) {
      console.error('Error restoring track:', error);
      this.toastr.error('Failed to restore track');
    }
  }

  filterTracks(query: string | null) {
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
    this.filterTracks(query);
  }

  getNoteDisplayName(noteValue: number): string {
    return getNoteName(noteValue);
  }
}
