import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-github-provider',
  templateUrl: './github-provider.component.html',
  styleUrls: ['./github-provider.component.css'],
})
export class GithubProviderComponent {
  constructor(private supabase: SupabaseService) {}

  signInWithGithub() {
    this.supabase.signInWithGithub().then(({ error }) => {
      if (error) {
        console.error('Error signing in with GitHub:', error.message);
      }
      // Handle successful sign in or navigate to another page
    });
  }
}
