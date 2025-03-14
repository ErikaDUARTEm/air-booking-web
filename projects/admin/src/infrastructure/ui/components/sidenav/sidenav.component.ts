import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Menu {
  title: string;
  path: string;
}

@Component({
  selector: 'lib-sidenav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  public listMenu: Menu[] = [
    {
      title: 'Inicio',
      path: '/admin/view',
    },
    {
      title: 'Reservas',
      path: '/admin/booking',
    },
    {
      title: 'Rutas',
      path: '/admin/routes',
    },
    {
      title: 'Vuelos',
      path: '/admin/flights'
      
    }
  ];
}
