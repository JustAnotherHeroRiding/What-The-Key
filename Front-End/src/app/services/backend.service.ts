import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Session } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class BackEndService {
  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient, private supabase: SupabaseService) {}

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}hello`);
  }

  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add other headers if needed
    });

    return this.http.get(`${this.apiUrl}user/getAllUsers`, { headers });
  }

  validateSession(session: Session): Observable<any> {
    const token = session.access_token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}user/checkSession`, { headers });
  }

  addTrack(trackId: string, source: string): Observable<any> {
    const session = this.supabase.session;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { trackId, userId: session?.user.id, source };
    return this.http.post(`${this.apiUrl}track/addTrack`, body, { headers });
  }

  getTracks(source: string): Observable<string> {
    const session = this.supabase.session;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (!session) {
      throw new Error('User not found, please log in to get your tracks.');
    }
    const params = new HttpParams()
      .set('userId', session?.user.id)
      .set('source', source);

    return this.http
      .get<any[]>(`${this.apiUrl}track/getTracks`, { headers, params })
      .pipe(
        map((trackObjects) => {
          const trackIds = trackObjects.map((track) => track.id); // Extract IDs from each object
          return trackIds.join(','); // Join IDs into a comma-separated string
        })
      );
  }

  deleteTrack(trackId: string, source: 'library' | 'recycleBin'): Observable<any> {
    const session = this.supabase.session;
    if (!session || !session.user.id) {
      throw new Error('User not found, please log in.');
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const body = {
      userId: session.user.id,
      trackId: trackId,
      source: source,
    };
  
    return this.http.post(`${this.apiUrl}track/addTrack`, body, { headers });
  }
}
