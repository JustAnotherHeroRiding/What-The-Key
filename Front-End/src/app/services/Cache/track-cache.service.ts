import { Injectable } from '@angular/core';
import { TrackData } from '../../pages/home/home.component';

type CacheType = 'library' | 'recycleBin';

@Injectable({
  providedIn: 'root',
})
export class TrackCacheService {
  private libraryCache: TrackData[] | null = null;
  private libraryCacheValid = false;
  private deletedCache: TrackData[] | null = null;
  private deletedCacheValid = false;
  private libraryCacheTimestamp: number | null = null;
  private deletedCacheTimestamp: number | null = null;

  constructor() {}

  isCacheValid(src: CacheType): boolean {
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

    if (src === 'library') {
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

  getCache(src: CacheType) {
    if (src === 'library') {
      return this.libraryCache;
    } else src === 'recycleBin';
    return this.deletedCache;
  }

  setCache(cache: TrackData[], src: CacheType) {
    const now = Date.now();
    if (src === 'library') {
      this.libraryCache = cache;
      this.libraryCacheValid = true;
      this.libraryCacheTimestamp = now;
    } else if (src === 'recycleBin') {
      this.deletedCache = cache;
      this.deletedCacheValid = true;
      this.deletedCacheTimestamp = now;
    }
  }

  invalidateCache(src: CacheType) {
    if (src === 'library' && this.libraryCacheValid)
      this.libraryCacheValid = false;
    else if (src === 'recycleBin' && this.deletedCacheValid)
      this.deletedCacheValid = false;
  }
}
