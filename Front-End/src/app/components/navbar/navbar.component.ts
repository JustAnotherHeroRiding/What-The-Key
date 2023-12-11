import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isSmallScreen = false;
  menuActive = false;

  constructor(private router: Router) {
    this.isSmallScreen = window.innerWidth < 630;
    window.onresize = () => {
      this.isSmallScreen = window.innerWidth < 630;
    };
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
}
