import { Component } from '@angular/core';
import { BackEndService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-api-playground',
  templateUrl: './api-playground.component.html',
  styleUrls: ['./api-playground.component.css'],
})
export class ApiPlaygroundComponent {
  result: any;

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
