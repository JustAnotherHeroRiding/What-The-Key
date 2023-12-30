import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackData } from '../../home/home.component';
import { SpotifyService } from 'src/app/services/spotify.service';
import { SpotifyItem } from 'src/app/utils/spotify-types';
import { TrackCacheService } from 'src/app/services/Cache/track-cache.service';

@Component({
  selector: 'app-single-track-page',
  templateUrl: './single-track-page.component.html',
  styleUrls: ['./single-track-page.component.css'],
})
export class SingleTrackPageComponent implements OnInit {
  trackData?: TrackData;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService,
    private trackCacheService: TrackCacheService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const trackId = params.get('id');
      if (trackId) {
        this.loadTrackData(trackId);
      }
    });
  }

  loadTrackData(trackId: string): void {
    const cachedTrack = this.trackCacheService.getCache('single', trackId);
    if (cachedTrack) {
      this.trackData = cachedTrack as TrackData;
    } else {
      this.isLoading = true;
      this.spotify.fetchTrack(trackId).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.trackData = data as TrackData;
          this.trackCacheService.setCache(data, 'single', trackId);
        },
        error: (error) => {
          console.error('There was an error, no track was found', error);
          this.isLoading = false;
        },
      });
    }
  }
}
