import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackData } from '../home/home.component';
import { SpotifyService } from 'src/app/services/spotify.service';
import { SpotifyItem } from 'src/app/utils/spotify-types';

@Component({
  selector: 'app-single-track-page',
  templateUrl: './single-track-page.component.html',
  styleUrls: ['./single-track-page.component.css'],
})
export class SingleTrackPageComponent implements OnInit {
  trackData?: TrackData;
  isLoading = false;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const trackId = params.get('id');
      if (trackId) {
        this.loadTrackData(trackId);
      }
    });
  }

  loadTrackData(trackId: string): void {
    this.isLoading = true;

    this.spotify.fetchTrack(trackId).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.trackData = data as TrackData;
      },
      error: (error) => {
        console.error('There was an error, no track was found', error);
        this.isLoading = false;
      },
    });
  }
}
