import { Component } from '@angular/core';
import { BackEndService } from 'src/app/services/backend.service';
import { SupabaseService } from 'src/app/services/supabase.service';

interface User {
  id: string | null;
  aud: string | null;
  role: string | null;
  email: string | null;
  email_confirmed_at: string | null;
  phone: string | null;
  confirmed_at: string | null;
  last_sign_in_at: string | null;
  app_metadata: {
    provider: string | null;
    providers: [string[] | null];
  };
  user_metadata: {};
  identities: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface UsersList {
  users: User[];

  aud: string | null;
  nextPage: number | null;
  lastPage: number | null;
  total: number | null;
}

@Component({
  selector: 'app-api-playground',
  templateUrl: './api-playground.component.html',
  styleUrls: ['./api-playground.component.css'],
})
export class ApiPlaygroundComponent {
  result?: UsersList;
  session = this.supabase.session;
  user?: User | string;

  constructor(
    private backEnd: BackEndService,
    private supabase: SupabaseService
  ) {}

  ngOnInit(): void {
    this.session = this.supabase.session;

    this.supabase.authChanges((_, session) => {
      this.session = session;
    });
  }

  getAllUsers() {
    this.backEnd.getAllUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.result = data;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  validateSession() {
    if (this.session) {
      this.backEnd.validateSession(this.session).subscribe({
        next: (data) => {
          console.log(data);
          this.user = data;
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    }
    {
      this.user = 'No User is logged in';
    }
  }
}
