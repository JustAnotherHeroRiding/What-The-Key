import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { supabase_url, supabase_anon_key } from 'env';
import { BehaviorSubject } from 'rxjs';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private _session = new BehaviorSubject<AuthSession | null>(null);
  private sessionTwo: AuthSession | null = null;

  constructor() {
    this.supabase = createClient(supabase_url, supabase_anon_key);
    this.refreshSession();
  }

  private refreshSession() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session.next(data.session);
    });
  }

  get session$() {
    return this._session.asObservable();
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this.sessionTwo = data.session;
    });
    return this.sessionTwo;
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }
}
