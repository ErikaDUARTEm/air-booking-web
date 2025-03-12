import { Component, EventEmitter, Output } from '@angular/core';

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
      path: '/admin'
    },
    {
      title: 'Resumen',
      path: '/Admin'
    },
    {
      title: 'Reservas',
      path: '/booking'
    }
  ]
}
