import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackData } from '../home/home.component';

@Component({
  selector: 'app-single-track-page',
  templateUrl: './single-track-page.component.html',
  styleUrls: ['./single-track-page.component.css'],
})
export class SingleTrackPageComponent implements OnInit {
  trackData?: TrackData;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const trackId = params.get('id');
      if (trackId) {
        this.loadTrackData(trackId);
      }
    });
  }

  loadTrackData(trackId: string): void {
    const tracks: TrackData[] = JSON.parse(
      localStorage.getItem('library') || '[]'
    );
    const targetTrack = tracks.find((track) => track.track.id === trackId);
    if (targetTrack) {
      this.trackData = targetTrack;
    } else {
      console.log('Track not found');
    }
  }
}
