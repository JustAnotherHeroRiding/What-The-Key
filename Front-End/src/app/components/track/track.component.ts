import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TrackData } from '../../pages/home/home.component';
import { getNoteName } from '../result-card/result-card.component';
import { Router } from '@angular/router';

export enum TrackAction {
  Delete,
  Restore,
  AddTabs,
}

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css'],
})
export class TrackComponent {
  @Input() trackData!: TrackData;
  @Output() deleteRequest = new EventEmitter<TrackData>();
  @Output() restore = new EventEmitter<TrackData>();
  @Output() addTabs = new EventEmitter<TrackData>();
  trackActions = TrackAction;
  constructor(private router: Router) {}

  getNoteDisplayName(noteValue: number): string {
    return getNoteName(noteValue);
  }

  handleAction(event: Event, action: TrackAction) {
    event.stopPropagation();

    switch (action) {
      case TrackAction.Delete:
        this.deleteRequest.emit(this.trackData);
        break;
      case TrackAction.Restore:
        this.restore.emit(this.trackData);
        break;
      case TrackAction.AddTabs:
        this.addTabs.emit(this.trackData);
        break;
      default:
        alert('Action is not supported.');
    }
  }

  goToTrackPage(trackId: string) {
    this.router.navigate(['/track', trackId]);
  }
  isDeletedPage(): boolean {
    return this.router.url.startsWith('/deleted');
  }
}
