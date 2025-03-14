import { Component, input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { IFlightSelected, IFormFlight } from 'availability';

@Component({
  selector: 'lib-fly-details',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './fly-details.component.html',
  styleUrl: './fly-details.component.scss'
})
export class FlyDetailsComponent {
 public flyOrigin = input<IFlightSelected>();
 public flyDestination = input<IFlightSelected>();
 public flyPassengers = input<IFormFlight>();
}
