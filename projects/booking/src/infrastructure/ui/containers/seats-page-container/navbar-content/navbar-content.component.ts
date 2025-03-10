import { Component } from '@angular/core';
import { BookingNevbarComponent } from "../../components/booking-navbar/booking-navbar.component";

@Component({
  selector: 'lib-navbar-content',
  imports: [BookingNevbarComponent],
  templateUrl: './navbar-content.component.html',
  styleUrl: './navbar-content.component.scss'
})
export class NavbarContentComponent {

}
