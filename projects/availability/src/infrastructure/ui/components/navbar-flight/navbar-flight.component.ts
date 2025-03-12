import { Component, Input, input } from '@angular/core';
import { IFormFlight } from '../../../../domain/model/flight.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'lib-navbar-flight',
  imports: [DatePipe],
  templateUrl: './navbar-flight.component.html',
  styleUrl: './navbar-flight.component.scss'
})
export class NavbarFlightComponent {
  @Input() public form!: IFormFlight;
}
