import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSession, User } from '@supabase/supabase-js';
import { Subject } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile, SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isSmallScreen = false;
  menuActive = false;
  session = this.supabase.session;
  profile: Profile | null = null;
  loading = false;
  location = 'navbar';
  private destroy = new Subject<void>();

  constructor(
    private router: Router,
    private supabase: SupabaseService,
    private profileService: ProfileService
  ) {
    this.isSmallScreen = window.innerWidth < 630;
    window.onresize = () => {
      this.isSmallScreen = window.innerWidth < 630;
    };
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  ngOnInit(): void {
    // Fetch the initial session state
    this.session = this.supabase.session;

    // Subscribe to future session changes
    this.supabase.authChanges((_, session) => {
      this.session = session;

      if (this.session) {
        this.updateProfile(this.session.user);
      }
    });

    this.profileService.currentProfile.subscribe((prof) => {
      this.profile = prof;
    });
  }

  async updateProfile(user: User) {
    this.loading = true;
    await this.profileService.fetchAndUpdateProfile(user);
    this.loading = false;
  }

  async signOut() {
    await this.supabase.signOut().then((res) => {
      if (!res.error) {
        this.router.navigate(['/']);
      } else {
        console.error(res.error);
      }
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
