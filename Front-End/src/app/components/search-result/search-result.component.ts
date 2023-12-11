import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SpotifyTracksSearchResult } from '../../spotify-types';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  @Input() searchResults: SpotifyTracksSearchResult | null = null;
  @Output() trackSelected = new EventEmitter<string>();
  @Output() trackSaved = new EventEmitter<string>(); 

  selectTrack(trackId: string) {
    this.trackSelected.emit(trackId);
  }

  saveTrack(event: MouseEvent, trackId: string) {
    event.stopPropagation();
    this.trackSaved.emit(trackId);
  }

  constructor() {}

  ngOnInit(): void {}
}
