import { Component, EventEmitter, OnInit, Output, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { SectionBookingSeatsComponent } from './../../../components/seats-page-components/booking-seats/section-booking-seats.component';
import { FlightSeatsService } from '../../../../services/services/seats.service';
import { IFlight } from './../../../../../domain/model/seats.model';
import { IPassenger } from '../../../../../domain/model/passenger.model';

@Component({
  selector: 'lib-section-seats-content',
  standalone: true,
  imports: [SectionBookingSeatsComponent],
  templateUrl: './section-seats-content.component.html',
  styleUrl: './section-seats-content.component.scss'
})
export class SectionSeatsContentComponent implements OnInit, OnDestroy {
  @Output() seatSelected = new EventEmitter<{ flightType: 'outbound' | 'return', seatId: string }>();
  @Output() flightChange = new EventEmitter<'outbound' | 'return'>();
  @Output() nextPassengerRequested = new EventEmitter<void>();
  @Output() previousPassengerRequested = new EventEmitter<void>();
  @Input() currentFlightType: 'outbound' | 'return' = 'outbound';

  flight: { outbound: IFlight, return: IFlight } = {
    outbound: {} as IFlight,
    return: {} as IFlight,
  };

  passengers: IPassenger[] = [];
  currentPassenger!: IPassenger;
  seatClasses: { [key: string]: string } = {};
  seatAvailability: { [key: string]: boolean } = {};
  seatPrices: { [key: string]: number } = {};
  selectedSeats: { [key: string]: boolean } = {};

  private destroy$ = new Subject<void>();

  constructor(private flightSeatsService: FlightSeatsService) {}

  ngOnInit(): void {
    this.flightSeatsService.getOutboundFlight()
      .pipe(takeUntil(this.destroy$))
      .subscribe(flight => {
        this.flight.outbound = flight;
        this.updateSeatData();
      });

    this.flightSeatsService.getReturnFlight()
      .pipe(takeUntil(this.destroy$))
      .subscribe(flight => {
        this.flight.return = flight;
        this.updateSeatData();
      });

    this.flightSeatsService.getPassengers()
      .pipe(
        takeUntil(this.destroy$),
        tap(passengers => {
          console.log('Received passengers:', passengers);
        })
      )
      .subscribe(passengers => {
        if (passengers && passengers.length > 0) {
          this.passengers = passengers;
          this.updateSelectedSeats();
        } else {
          console.warn('No passengers data received');
        }
      });

    this.flightSeatsService.getCurrentPassenger()
      .pipe(takeUntil(this.destroy$))
      .subscribe(passenger => {
        if (!passenger) {
          console.error('No hay un pasajero actual definido.');
          return;
        }
        this.currentPassenger = passenger;
        this.updateSelectedSeats();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateSeatData(): void {
    this.seatClasses = {};
    this.seatAvailability = {};
    this.seatPrices = {};

    const currentFlight = this.currentFlightType === 'outbound' 
      ? this.flight.outbound 
      : this.flight.return;

    if (!currentFlight || !currentFlight.seats) {
      return;
    }

    Object.entries(currentFlight.seats).forEach(([seatId, seat]) => {
      this.seatClasses[seatId] = `main__seat--${seat.type}`;
      this.seatAvailability[seatId] = seat.isAvailable;
      this.seatPrices[seatId] = seat.price || 0;
    });
  }

  private updateSelectedSeats(): void {
    this.selectedSeats = {};
    if (this.currentPassenger) {
      if (this.currentPassenger.departureSeat) {
        this.selectedSeats[this.currentPassenger.departureSeat] = true;
      }
      if (this.currentPassenger.returnSeat) {
        this.selectedSeats[this.currentPassenger.returnSeat] = true;
      }
    }

    this.passengers.forEach(passenger => {
      if (passenger.id !== this.currentPassenger?.id) {
        if (passenger.departureSeat) {
          this.selectedSeats[passenger.departureSeat] = true;
        }
        if (passenger.returnSeat) {
          this.selectedSeats[passenger.returnSeat] = true;
        }
      }
    });
  }

  onSeatClicked(data: { flightType: 'outbound' | 'return', seatId: string }): void {
    const { flightType, seatId } = data;

    if (this.seatAvailability[seatId]) {
      console.log(`Selected seat: ${seatId} for passenger: ${this.currentPassenger?.name}`);
      this.seatSelected.emit({ flightType, seatId });
    }
  }

  onNextPassenger(): void {
    const passenger = this.flightSeatsService.nextPassenger();
    if (passenger) {
      this.currentPassenger = passenger;
      this.updateSelectedSeats();
      console.log('Cambiado a pasajero:', passenger.name);
    } else {
      console.log('No hay más pasajeros');
    }
  }

  onPreviousPassenger(): void {
    const passenger = this.flightSeatsService.previousPassenger();
    if (passenger) {
      this.currentPassenger = passenger;
      this.updateSelectedSeats();
      console.log('Cambiado a pasajero:', passenger.name);
    } else {
      console.log('Este es el primer pasajero');
    }
  }

  onNextFlight(): void {
    if (this.currentFlightType === 'outbound') {
      this.currentFlightType = 'return';
    } else {
      this.currentFlightType = 'outbound';
    }
    this.updateSeatData();
    this.flightChange.emit(this.currentFlightType);
  }
}