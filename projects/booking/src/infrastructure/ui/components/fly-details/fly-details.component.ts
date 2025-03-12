import { Component, input } from '@angular/core';
import { IFlightData } from '../../../../domain/model/passenger.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'lib-fly-details',
  imports: [DatePipe],
  templateUrl: './fly-details.component.html',
  styleUrl: './fly-details.component.scss'
})
export class FlyDetailsComponent {
 public flyDetails = input<IFlightData>();

}
