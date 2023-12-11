import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TrackData } from '../../pages/home/home.component';
import { getNoteName } from '../result-card/result-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css'],
})
export class TrackComponent {
  @Input() trackData!: TrackData;
  @Output() deleteRequest = new EventEmitter<TrackData>();

  constructor(private router: Router) {}

  getNoteDisplayName(noteValue: number): string {
    return getNoteName(noteValue);
  }

  requestDelete(event: Event) {
    event.stopPropagation();

    this.deleteRequest.emit(this.trackData);
  }

  goToTrackPage(trackId: string) {
    this.router.navigate(['/track', trackId]);
  }
}
