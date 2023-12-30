import { Component } from '@angular/core';
import { SpotifyService } from '../../../services/spotify.service';
import { ToastrService } from 'ngx-toastr';
import { TrackData } from '../../home/home.component';
import {
  FILTERS,
  FilterLocationValue,
  SortOrder,
  filterLocation,
  modeMap,
  sortByKey,
  sortByMode,
  sortTracksByFilter,
} from '../../../utils/filters';
import { getNoteName } from '../../../components/result-card/result-card.component';
import { BackEndService } from 'src/app/services/backend.service';
import { TrackCacheService } from 'src/app/services/Cache/track-cache.service';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.css'],
})
export class DeletedComponent {
  originalLibrary: TrackData[] = [];
  displayedLibrary: TrackData[] = [];
  filters = FILTERS;
  loading = false;
  sortOrderEnum = SortOrder;
  sortOrders: { [filter in FilterLocationValue | string]?: SortOrder } = {};
  modeMapLocal = modeMap;

  constructor(
    private spotifyService: SpotifyService,
    private toastr: ToastrService,
    private backendService: BackEndService,
    private trackCacheService: TrackCacheService
  ) {}

  ngOnInit(): void {
    this.fetchTracks();
  }

  fetchTracks() {
    if (this.trackCacheService.isCacheValid('recycleBin')) {
      const cachedTracks = this.trackCacheService.getCache('recycleBin');
      if (cachedTracks) {
        this.originalLibrary = [...cachedTracks];
        this.displayedLibrary = [...cachedTracks];
        return;
      }
    }

    this.loading = true;
    this.backendService.getTracks('recycleBin').subscribe({
      next: (trackIdsString: string) => {
        if (trackIdsString) {
          this.spotifyService.fetchMultipleTracks(trackIdsString).subscribe({
            next: (tracksData) => {
              this.trackCacheService.setCache(tracksData, 'recycleBin');

              this.originalLibrary = tracksData; // Store the original library for filtering purposes
              this.displayedLibrary = tracksData; // Update your displayed library
              this.loading = false;
            },
            error: (err) => {
              console.error('Error fetching tracks from Spotify:', err),
                (this.loading = false);
            },
          });
        } else {
          // Handle case where no track IDs are returned
          this.loading = false;
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
        this.trackCacheService.invalidateCache('recycleBin');
      },
      error: (err) => {
        this.toastr.error('Failed to delete track');
        console.error('Error deleting track:', err);
      },
    });
  }

  restoreTrack(track: TrackData) {
    this.backendService.addTrack(track.track.id, 'library').subscribe({
      next: () => {
        this.toastr.success('Track restored successfully');
        this.displayedLibrary = this.displayedLibrary.filter(
          (t) => t.track.id !== track.track.id
        );
        this.trackCacheService.invalidateCache('library');
        this.trackCacheService.invalidateCache('recycleBin');
      },
      error: (err) => {
        this.toastr.error('Failed to restore track');
        console.error('Error restoring track:', err);
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
      .filter(
        (track) =>
          track.track.name.toLowerCase().includes(lowerCaseQuery) ||
          track.track.artists[0].name.toLowerCase().includes(lowerCaseQuery) ||
          track.track.album.name.toLowerCase().includes(lowerCaseQuery)
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

  activateFilter(filterValue: string, key?: EventTarget, mode?: EventTarget) {
    if (filterValue in filterLocation) {
      const filter = filterValue as FilterLocationValue;

      if (filterValue === 'key' && key) {
        const keyNumber = parseInt((key as HTMLSelectElement).value);
        if (isNaN(keyNumber)) {
          this.displayedLibrary = [...this.originalLibrary];
          return;
        }
        this.displayedLibrary = sortByKey(this.originalLibrary, keyNumber);
        return;
      } else if (filterValue === 'mode' && mode) {
        const modeNumber = parseInt((mode as HTMLSelectElement).value);
        if (isNaN(modeNumber)) {
          this.displayedLibrary = [...this.originalLibrary];
          return;
        }
        this.displayedLibrary = sortByMode(this.originalLibrary, modeNumber);
        return;
      }

      // Reset all filters to None, except the currently activated one
      Object.keys(this.sortOrders).forEach((key) => {
        if (key !== filter) {
          this.sortOrders[key as keyof typeof filterLocation] = SortOrder.None;
        }
      });

      // Toggle the sort order for the current filter
      if (this.sortOrders[filter] === SortOrder.None) {
        this.sortOrders[filter] = SortOrder.Descending;
      } else if (this.sortOrders[filter] === SortOrder.Descending) {
        this.sortOrders[filter] = SortOrder.Ascending;
      } else {
        this.sortOrders[filter] = SortOrder.None;
      }

      // Apply sorting or reset to original list
      if (this.sortOrders[filter] === SortOrder.None) {
        this.displayedLibrary = [...this.originalLibrary];
      } else {
        this.displayedLibrary = sortTracksByFilter(
          this.originalLibrary,
          filter,
          this.sortOrders[filter]!
        );
      }
    }
  }
}
