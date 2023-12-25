import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, map, switchMap } from 'rxjs/operators';
import { SupabaseService } from '../services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private supabase: SupabaseService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.supabase.session$.pipe(
      filter(session => session !== undefined), // Wait until session is not undefined
      take(1), // Take the first emitted value then complete
      map(session => {
        if (!session) {
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
