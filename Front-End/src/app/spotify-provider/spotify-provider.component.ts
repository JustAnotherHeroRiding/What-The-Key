import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-spotify-provider',
  templateUrl: './spotify-provider.component.html',
  styleUrls: ['./spotify-provider.component.css'],
})
export class SpotifyProviderComponent {
  constructor(private supabase: SupabaseService) {}

  signInWithSpotify() {
    this.supabase.signInWithSpotify().then(({ error }) => {
      if (error) {
        console.error('Error signing in with Spotify:', error.message);
      }
    });
  }
}
