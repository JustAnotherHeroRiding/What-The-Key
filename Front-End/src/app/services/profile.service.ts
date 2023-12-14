import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileSource = new BehaviorSubject<Profile | null>(null);
  currentProfile = this.profileSource.asObservable();

  constructor() {}

  updateProfile(profile: Profile) {
    this.profileSource.next(profile);
  }
}
