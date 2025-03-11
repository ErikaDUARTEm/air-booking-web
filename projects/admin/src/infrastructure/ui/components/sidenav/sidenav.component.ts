import { Component } from '@angular/core';

interface Menu {
  title: string;
  path: string;
}

@Component({
  selector: 'lib-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  public listMenu: Menu[] = [
    {
      title: 'Inicio',
      path: '/Admin'
    },
    {
      title: 'Resumen',
      path: '/Admin'
    },
    {
      title: 'Reservas',
      path: '/Admin'
    }
  ]
  
}
