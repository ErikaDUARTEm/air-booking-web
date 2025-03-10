import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightCardComponent } from '../best-flights-card/best-flights-card.component';
import { FlightOffer } from '../../../../domain/model/flightOffer.model';

@Component({
  selector: 'lib-best-flights',
  imports: [CommonModule, FormsModule, FlightCardComponent],
  templateUrl: './best-flights.component.html',
  styleUrl: './best-flights.component.scss',
})
export class BestFlightsComponent {
  selectedRoute: string = '';

  flights: FlightOffer[] = [
    {
      origin: { code: 'BOG', name: 'Bogotá' },
      destination: { code: 'PTY', name: 'Panamá' },
      departureDate: 'may 08, 2025',
      returnDate: 'may 15, 2025',
      price: { amount: 1079186, currency: 'COP' },
      lastChecked: { hours: 15, timeUnit: 'horas' },
      image: 'PTY.avif',
    },
    {
      origin: { code: 'CLO', name: 'Cali' },
      destination: { code: 'PTY', name: 'Panamá' },
      departureDate: 'mar 29, 2025',
      returnDate: 'abr 06, 2025',
      price: { amount: 1179898, currency: 'COP' },
      lastChecked: { hours: 13, timeUnit: 'horas' },
      image: 'PTY.avif',
    },
    {
      origin: { code: 'MDE', name: 'Medellín' },
      destination: { code: 'PTY', name: 'Panamá' },
      departureDate: 'abr 10, 2025',
      returnDate: 'abr 10, 2025',
      price: { amount: 1169338, currency: 'COP' },
      lastChecked: { hours: 18, timeUnit: 'horas' },
      image: 'PTY.avif',
    },
    {
      origin: { code: 'CLO', name: 'Cali' },
      destination: { code: 'SCL', name: 'Santiago de Chile' },
      departureDate: 'may 13, 2025',
      returnDate: 'may 30, 2025',
      price: { amount: 1537586, currency: 'COP' },
      lastChecked: { hours: 2, timeUnit: 'horas' },
      image: 'SCL.avif',
    },
    {
      origin: { code: 'BAQ', name: 'Barranquilla' },
      destination: { code: 'PTY', name: 'Panamá' },
      departureDate: 'may 02, 2025',
      returnDate: 'may 08, 2025',
      price: { amount: 1123458, currency: 'COP' },
      lastChecked: { hours: 14, timeUnit: 'horas' },
      image: 'PTY.avif',
    },
    {
      origin: { code: 'CUC', name: 'Cúcuta' },
      destination: { code: 'SCL', name: 'Santiago de Chile' },
      departureDate: 'abr 12, 2025',
      returnDate: 'abr 19, 2025',
      price: { amount: 1954248, currency: 'COP' },
      lastChecked: { hours: 1, timeUnit: 'día' },
      image: 'SCL.avif',
    },
  ];

  clearFilter(): void {
    this.selectedRoute = '';
  }
}
