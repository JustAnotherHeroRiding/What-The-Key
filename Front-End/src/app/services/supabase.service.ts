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

  signIn(email: string, password?: string) {
    if (password) {
      // Sign in with email and password
      return this.supabase.auth.signInWithPassword({ email, password });
    } else {
      // Sign in with magic link
      return this.supabase.auth.signInWithOtp({ email });
    }
  }
  signInWithGithub() {
    return this.supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  }

  signInWithSpotify() {
    return this.supabase.auth.signInWithOAuth({
      provider: 'spotify',
    });
  }

  async signUp(email: string, password: string, name: string) {
    // Attempt to sign up the user
    const { data: user, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    // Handle any errors during signup
    if (error) throw error;

    // If signup is successful, create or update the user's profile
    if (user.user) {
      const profile: Profile = {
        id: user.user.id,
        username: name,
        website: '', // Default or empty value
        avatar_url: '', // Default or empty value
      };

      await this.updateProfile(profile);
    }

    return { user, error };
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
