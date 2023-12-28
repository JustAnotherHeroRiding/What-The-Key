import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { TrackData } from '../../pages/home/home.component';
import { getNoteName } from '../result-card/result-card.component';
import { Router } from '@angular/router';
import { BackEndService } from 'src/app/services/backend.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

export enum TrackAction {
  Delete,
  Restore,
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
  trackActions = TrackAction;
  showAddTabModal = false;
  trackTabUrl?: string;
  loadingTabs = false;
  modalSpinnerStyles = {
    bottom: '0%',
    width: '20px',
    height: '20px',
    left: '1em',
  };

  constructor(
    private router: Router,
    private backendService: BackEndService,
    private toastr: ToastrService
  ) {}

  getNoteDisplayName(noteValue: number): string {
    return getNoteName(noteValue);
  }

  addTabModal(event: Event) {
    event.stopPropagation();
    if (!this.showAddTabModal && !this.trackTabUrl) {
      this.loadingTabs = true;
      this.getTabs();
    }
    this.showAddTabModal = !this.showAddTabModal;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.showAddTabModal = false;
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
      default:
        alert('Action is not supported.');
    }
  }

  addTabs(formValues: { tabUrl: string }, formDirective: NgForm) {
    this.backendService
      .addTabs(this.trackData.track.id, formValues.tabUrl)
      .subscribe({
        next: (response) => {
          this.getTabs();
          this.toastr.success('Tabs added successfully!');
          formDirective.reset()
        },
        error: (error) => {
          this.toastr.error(
            error.message || 'An error occurred while adding tabs.'
          );
        },
      });
  }

  getTabs() {
    this.backendService.getTabs(this.trackData.track.id).subscribe({
      next: (response) => {
        this.trackTabUrl = response[0]?.tabUrl;
        this.loadingTabs = false;
      },
      error: (error) => {
        console.error(error);
        this.toastr.error(
          error.message || 'An error occurred while fetching tabs.'
        );
        this.trackTabUrl = undefined; // Reset the trackTabUrl if an error occurs. This will ensure that the tabs are not displayed.
      },
    });
  }

  goToTrackPage(trackId: string) {
    this.router.navigate(['/track', trackId]);
  }
  isDeletedPage(): boolean {
    return this.router.url.startsWith('/deleted');
  }
}
