import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackEndService {
  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}hello`);
  }

  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add other headers if needed
    });

    return this.http.get(`${this.apiUrl}users/getAllUsers`, { headers });
  }
}
