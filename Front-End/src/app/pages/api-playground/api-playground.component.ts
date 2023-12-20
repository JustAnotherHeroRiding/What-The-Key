import { Component } from '@angular/core';
import { BackEndService } from 'src/app/services/backend.service';

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

  constructor(private backEnd: BackEndService) {}

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
}
