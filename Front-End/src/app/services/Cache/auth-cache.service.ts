import { Injectable } from '@angular/core';
import { Profile } from '../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthCacheService {
  private profileCache: Profile | null = null;
  private profileCacheValid = false;
  private profileCacheTimestamp: number | null = null;

  constructor() {}

  isCacheValid(): boolean {
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

    if (this.profileCacheValid && this.profileCacheTimestamp) {
      return now - this.profileCacheTimestamp < fiveMinutes;
    } else return false;
  }

  getCache() {
    return this.profileCache;
  }

  setCache(cache: Profile) {
    const now = Date.now();
    this.profileCache = cache;
    this.profileCacheValid = true;
    this.profileCacheTimestamp = now;
  }

  invalidateCache() {
    if (this.profileCacheValid) this.profileCacheValid = false;
  }
}
