import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFlight, ISeat } from '../../../../../domain/model/seats.model';
import { IPassenger } from '../../../../../domain/model/passenger.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-section-booking-seats',
  templateUrl: './section-booking-seats.component.html',
  imports: [CommonModule],
  styleUrls: ['./section-booking-seats.component.scss']
})
export class SectionBookingSeatsComponent {
  @Input() flight!: { outbound: IFlight, return: IFlight };
  @Input() passengers: IPassenger[] = [];
  @Input() currentPassenger!: IPassenger;
  @Input() seatClasses: { [key: string]: string } = {};
  @Input() seatAvailability: { [key: string]: boolean } = {};
  @Input() seatPrices: { [key: string]: number } = {};
  @Input() selectedSeats: { [key: string]: boolean } = {};
  @Input() currentFlightType: 'outbound' | 'return' = 'outbound';

  @Output() seatClicked = new EventEmitter<{ seatId: string }>();
  @Output() nextPassengerRequested = new EventEmitter<void>();
  @Output() previousPassengerRequested = new EventEmitter<void>();

  // Métodos para obtener datos de los asientos
  getSeatClass(row: number, column: string): string {
    const seatId = `${row}-${column}`;
    const seat = this.flight[this.currentFlightType]?.seats[seatId];
    // console.log('Seat:', seat); // Depuración
    // console.log('Current Flight:', this.flight[this.currentFlightType]); // Depuración
    return seat ? `main__seat--${seat.type.toLowerCase().replace(' ', '-')}` : '';
  }
  

  isSeatAvailable(row: number, column: string): boolean {
    const seatId = `${row}-${column}`; // Cambia el formato para que coincida con el servidor
    const seat = this.flight[this.currentFlightType]?.seats[seatId];
    // console.log(seatId, seat); // Depuración: Verifica el seatId y el seat
  
    if (!seat) {
      console.debug(`Seat ${seatId} does not exist`);
      return false;
    }
  
    return seat.isAvailable;
  }
  

  getSeatPrice(row: number, column: string): number {
    const seatId = `${row}-${column}`;
    const seat = this.flight[this.currentFlightType]?.seats[seatId];
    return seat ? seat.price || 0 : 0;
  }

  isSeatSelected(row: number, column: string): boolean {
    const seatId = `${row}-${column}`;
    return this.selectedSeats[seatId] || false;
  }

  onSeatClick(row: number, column: string): void {
    const seatId = `${row}-${column}`;
    this.seatClicked.emit({ seatId });
  }

  onNextPassenger(): void {
    this.nextPassengerRequested.emit();
  }

  onPreviousPassenger(): void {
    this.previousPassengerRequested.emit();
  }
}