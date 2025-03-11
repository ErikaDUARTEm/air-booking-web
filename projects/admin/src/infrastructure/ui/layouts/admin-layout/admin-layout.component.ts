import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
@Component({
  selector: 'lib-admin-layout',
  imports: [RouterOutlet, SidenavComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
   