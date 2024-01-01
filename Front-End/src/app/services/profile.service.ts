import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile, SupabaseService } from './supabase.service';
import { AuthCacheService } from './Cache/auth-cache.service';
import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileSource = new BehaviorSubject<Profile | null>(null);
  currentProfile = this.profileSource.asObservable();

  constructor(
    private authCacheService: AuthCacheService,
    private supabase: SupabaseService
  ) {}

  async fetchAndUpdateProfile(user: User) {
    if (this.authCacheService.isCacheValid() && user.id === this.authCacheService.getCache()?.id) {
      this.profileSource.next(this.authCacheService.getCache());
      return;
    }

    const { data: profile, error } = await this.supabase.profile(user);
    if (error) {
      throw error;
    }
    if (profile) {
      this.authCacheService.setCache(profile);
      this.profileSource.next(profile);
    }

    this.profileSource.next(profile);
  }

  async updateProfile(profile: Profile): Promise<void> {
    this.authCacheService.invalidateCache();
    this.profileSource.next(profile);
  }
}
