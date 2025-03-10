import { Component } from '@angular/core';
import { LogoComponent } from 'shared';
import { Router, RouterLink } from '@angular/router';
import { INavRouter } from 'shared';

@Component({
  selector: 'lib-navbar',
  imports: [LogoComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private router: Router) {}

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }

  navRouter: INavRouter[] = [
    {
      name: 'Reservar',
      path: '/reservar',
    },
    {
      name: 'Mis Viajes',
      path: '/mis-viajes',
    },
    {
      name: 'Check-in',
      path: '/check-in',
    },
    {
      name: 'Connect-Miles',
      path: '/connect-miles',
    },
  ];
}
