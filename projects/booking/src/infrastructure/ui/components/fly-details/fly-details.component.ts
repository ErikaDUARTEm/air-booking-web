import { Component, input } from '@angular/core';
import { IFlightData, IFlightSelection } from '../../../../domain/model/passenger.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'lib-fly-details',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './fly-details.component.html',
  styleUrl: './fly-details.component.scss'
})
export class FlyDetailsComponent {
 public flyDetails = input<IFlightSelection>();

}
