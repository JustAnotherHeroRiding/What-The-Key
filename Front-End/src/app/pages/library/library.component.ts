import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../spotify.service';
import { ToastrService } from 'ngx-toastr';
import { TrackData } from '../home/home.component';
import { getNoteName } from '../../components/result-card/result-card.component';
import { FILTERS } from '../../filters';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent {
  originalLibrary: TrackData[] = [];
  displayedLibrary: TrackData[] = [];
  filters = FILTERS;

  constructor(
    private spotifyService: SpotifyService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchTracks();
  }

  fetchTracks() {
    const tracks = localStorage.getItem('library');
    if (tracks) {
      this.originalLibrary = JSON.parse(tracks);
      this.displayedLibrary = [...this.originalLibrary]; // Make a copy for display
      // console.log(this.originalLibrary);
    } else {
      this.originalLibrary = [];
      this.displayedLibrary = [];
    }
  }

  deleteTrack(track: TrackData) {
    try {
      // Fetch the recycling bin from local storage or initialize it
      const recyclingBinRaw = localStorage.getItem('recyclingBin');
      const recyclingBin = recyclingBinRaw ? JSON.parse(recyclingBinRaw) : [];

      // Find the track to delete in the original library
      const index = this.originalLibrary.findIndex(
        (t) => t.track.id === track.track.id
      );

      if (index === -1) {
        throw new Error('Track not found in library');
      }

      // Move the track to the recycling bin
      recyclingBin.push(this.originalLibrary[index]);

      // Remove the track from the original library
      this.originalLibrary.splice(index, 1);

      // Update the displayed library
      this.displayedLibrary = this.originalLibrary.filter(
        (t) => t.track.id !== track.track.id
      );

      // Update local storage
      localStorage.setItem('library', JSON.stringify(this.originalLibrary));
      localStorage.setItem('recyclingBin', JSON.stringify(recyclingBin));

      // Display success toast
      this.toastr.success('Track removed from library');
    } catch (error) {
      console.error('Error deleting track:', error);
      // Display error toast or handle the error appropriately
      this.toastr.error('Failed to remove track from library');
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
