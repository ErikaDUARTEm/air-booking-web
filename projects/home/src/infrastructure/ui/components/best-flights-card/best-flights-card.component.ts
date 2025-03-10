import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { FlightOffer } from '../../../../domain/model/flightOffer.model';

@Component({
  selector: 'lib-best-flights-card',
  imports: [],
  templateUrl: './best-flights-card.component.html',
  styleUrl: './best-flights-card.component.scss',
})
export class FlightCardComponent {
  @Input() flight!: FlightOffer;
}
