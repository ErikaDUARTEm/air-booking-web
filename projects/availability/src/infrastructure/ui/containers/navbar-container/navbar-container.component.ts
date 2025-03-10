import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'lib-navbar-container',
  imports: [NavbarComponent],
  templateUrl: './navbar-container.component.html',
  styleUrl: './navbar-container.component.css',
})
export class NavbarContainerComponent {}
