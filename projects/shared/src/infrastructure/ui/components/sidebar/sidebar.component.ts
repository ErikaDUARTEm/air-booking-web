import { Component, input } from '@angular/core';

interface MenuSidebar {
  title: string;
  path: string;
}

@Component({
  selector: 'lib-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  listMenu = input<MenuSidebar[]>();
}
