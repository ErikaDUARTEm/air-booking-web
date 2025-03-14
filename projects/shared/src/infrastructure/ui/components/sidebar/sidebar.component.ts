import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

interface MenuSidebar {
  title: string;
  path: string;
}

@Component({
  selector: 'lib-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  listMenu = input<MenuSidebar[]>();
}
