import { Injectable } from '@angular/core';
import { TrackData } from '../../pages/home/home.component';

type CacheType = 'library' | 'recycleBin';

@Injectable({
  providedIn: 'root',
})
export class TrackCacheService {
  private libraryCache: TrackData[] | null = null;
  private libraryCacheValid = false;
  private libraryCacheTimestamp: number | null = null;

  private deletedCache: TrackData[] | null = null;
  private deletedCacheValid = false;
  private deletedCacheTimestamp: number | null = null;

  private singleTrackCache: { [key: string]: TrackData } | null = null;
  private singleTrackCacheValid: { [key: string]: boolean } | null = null;
  private singleTrackTimestamp: { [key: string]: number | null } | null = null;

  constructor() {}

  isCacheValid(src: CacheType, trackId?: string): boolean {
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

    if (trackId && this.singleTrackCacheValid?.[trackId]) {
      return now - (this.singleTrackTimestamp?.[trackId] ?? 0) < fiveMinutes;
    } else if (src === 'library') {
      if (this.libraryCacheValid && this.libraryCacheTimestamp) {
        return now - this.libraryCacheTimestamp < fiveMinutes;
      }
    } else if (src === 'recycleBin') {
      if (this.deletedCacheValid && this.deletedCacheTimestamp) {
        return now - this.deletedCacheTimestamp < fiveMinutes;
      }
    }
    return false;
  }

  getCache(src: CacheType, trackId?: string) {
    if (trackId) {
      return this.singleTrackCache?.[trackId];
    } else if (src === 'library') {
      return this.libraryCache;
    } else src === 'recycleBin';
    return this.deletedCache;
  }

  setCache(cache: TrackData[] | TrackData, src: CacheType, trackId?: string) {
    const now = Date.now();

    if (trackId) {
      this.singleTrackCache = {
        ...this.singleTrackCache,
        [trackId]: cache as TrackData,
      };
      this.singleTrackCacheValid = {
        ...this.singleTrackCacheValid,
        [trackId]: true,
      };
      this.singleTrackTimestamp = {
        ...this.singleTrackTimestamp,
        [trackId]: now,
      };
    } else if (src === 'library') {
      this.libraryCache = cache as TrackData[];
      this.libraryCacheValid = true;
      this.libraryCacheTimestamp = now;
    } else if (src === 'recycleBin') {
      this.deletedCache = cache as TrackData[];
      this.deletedCacheValid = true;
      this.deletedCacheTimestamp = now;
    }
  }

  invalidateCache(src: CacheType, trackId?: string) {
    if (trackId && this.singleTrackCacheValid?.[trackId]) {
      this.singleTrackCacheValid[trackId] = false;
    } else if (src === 'library' && this.libraryCacheValid)
      this.libraryCacheValid = false;
    else if (src === 'recycleBin' && this.deletedCacheValid)
      this.deletedCacheValid = false;
  }
}
