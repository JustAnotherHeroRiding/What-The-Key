import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, switchMap, take, throwError } from 'rxjs';
import { Session } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class BackEndService {
  private apiUrlDev = 'http://localhost:3000/api/';
  private apiUrlProd = 'https://what-the-key.vercel.app/api/';

  constructor(private http: HttpClient, private supabase: SupabaseService) {}

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrlProd}hello`);
  }

  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add other headers if needed
    });

    return this.http.get(`${this.apiUrlProd}user/getAllUsers`, { headers });
  }

  validateSession(session: Session): Observable<any> {
    const token = session.access_token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrlProd}user/checkSession`, { headers });
  }

  addTrack(trackId: string, source: string): Observable<any> {
    return this.supabase.session$.pipe(
      take(1),
      switchMap((session) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
        const body = { trackId, userId: session?.user.id, source };
        return this.http.post(`${this.apiUrlProd}track/addTrack`, body, {
          headers,
        });
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  getTracks(source: string): Observable<string> {
    return this.supabase.session$.pipe(
      take(1), // Take the first emitted value then complete
      switchMap((session) => {
        if (!session || !session.user) {
          throw new Error('User not found, please log in to get your tracks.');
        }
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const params = new HttpParams()
          .set('userId', session.user.id)
          .set('source', source);

        return this.http.get<any[]>(`${this.apiUrlProd}track/getTracks`, {
          headers,
          params,
        });
      }),
      map((trackObjects) => {
        const trackIds = trackObjects.map((track) => track.id);
        return trackIds.join(',');
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  deleteTrack(
    trackId: string,
    source: 'library' | 'recycleBin'
  ): Observable<any> {
    return this.supabase.session$.pipe(
      take(1),
      switchMap((session) => {
        if (!session || !session.user.id) {
          throw new Error('User not found, please log in.');
        }

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = {
          userId: session.user.id,
          trackId: trackId,
          source: source,
        };

        // Ensure you are using the correct URL and HTTP method for deletion
        return this.http.post(`${this.apiUrlProd}track/addTrack`, body, {
          headers,
        });
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  deleteTrackPermanently(trackId: string): Observable<any> {
    return this.supabase.session$.pipe(
      take(1),
      switchMap((session) => {
        if (!session || !session.user.id) {
          throw new Error('User not found, please log in.');
        }
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });

        const body = {
          userId: session.user.id,
          trackId: trackId,
        };
        return this.http.post(`${this.apiUrlProd}track/deleteTrack`, body, {
          headers,
        });
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  addTabs(trackId: string, tabUrl: string): Observable<any> {
    return this.supabase.session$.pipe(
      take(1),
      switchMap((session) => {
        if (!session || !session.user.id) {
          throw new Error('User not found, please log in.');
        }

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });

        const body = {
          userId: session.user.id,
          trackId: trackId,
          tabUrl: tabUrl,
        };
        return this.http.post(`${this.apiUrlProd}track/addTabs`, body, {
          headers,
        });
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }
  getTabs(trackId: string): Observable<any> {
    return this.supabase.session$.pipe(
      take(1),
      switchMap((session) => {
        if (!session || !session.user.id) {
          throw new Error('User not found, please log in.');
        }
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });

        const params = new HttpParams()
          .set('trackId', trackId)
          .set('userId', session.user.id);
        return this.http.get(`${this.apiUrlProd}track/getTabs`, {
          headers,
          params,
        });
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }
}
