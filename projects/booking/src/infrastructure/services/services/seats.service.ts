// import { IFlight, IPassenger } from '../../../domain/model/seats.model';
import { IFlight } from '../../../domain/model/seats.model';
import { PassengerState } from '../../../domain/state/passenger.state';
import { FlightState } from '../../../domain/state/seats.state';
import { IPassenger } from '../../../domain/model/passenger.model';

import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightSeatsService {
  private currentPassengerIndex = 0;

  constructor(
    private flightState: FlightState,
    private passengerState: PassengerState
  ) {
    this.initializeSeats();
  }

  private initializeSeats(): void {
    const outboundFlight = this.flightState.outboundFlightState.snapshot();
    const returnFlight = this.flightState.returnFlightState.snapshot();
    this.initializeFlightSeats(outboundFlight);
    this.initializeFlightSeats(returnFlight);
  }

  private initializeFlightSeats(flight: IFlight): void {
    const businessRows = [1, 2, 3, 4];
    const economyRows = [5, 6, 7, 8];
    const favorableRows = [9, 10, 11];
    const emergencyRows = [17, 18];
    const favorableRows2 = [19, 20];
    const regularRows = Array.from({ length: 34 - 21 + 1 }, (_, i) => i + 21);

    const allColumns = ['A', 'B', 'C', 'D', 'E', 'F'];
    const unavailableSeats = ['21C', '23F', '25A', '26A', '26B', '27C', '28A'];

    // Business class seats
    businessRows.forEach((row) => {
      allColumns.forEach((col) => {
        const seatId = `${row}${col}`;
        flight.seats[seatId] = {
          id: seatId,
          type: 'bussiness',
          price: 0,
          isAvailable: !unavailableSeats.includes(seatId),
        };
      });
    });

    // Economy class seats
    economyRows.forEach((row) => {
      allColumns.forEach((col) => {
        const seatId = `${row}${col}`;
        flight.seats[seatId] = {
          id: seatId,
          type: 'economy',
          price: 15,
          isAvailable: !unavailableSeats.includes(seatId),
        };
      });
    });

    // Favorable class seats (9 - 11)
    favorableRows.forEach((row) => {
      allColumns.forEach((col) => {
        const seatId = `${row}${col}`;
        flight.seats[seatId] = {
          id: seatId,
          type: 'favorable',
          price: 10,
          isAvailable: !unavailableSeats.includes(seatId),
        };
      });
    });

    // Emergency exit seats (17, 18)
    emergencyRows.forEach((row) => {
      allColumns.forEach((col) => {
        const seatId = `${row}${col}`;
        flight.seats[seatId] = {
          id: seatId,
          type: 'emergency',
          price: 20,
          isAvailable: true,
        };
      });
    });

    // Favorable class seats (19, 20)
    favorableRows2.forEach((row) => {
      allColumns.forEach((col) => {
        const seatId = `${row}${col}`;
        flight.seats[seatId] = {
          id: seatId,
          type: 'favorable',
          price: 10,
          isAvailable: true,
        };
      });
    });

    // Regular class seats (21 - 33)
    regularRows.forEach((row) => {
      allColumns.forEach((col) => {
        const seatId = `${row}${col}`;
        flight.seats[seatId] = {
          id: seatId,
          type: 'regular',
          price: 5,
          isAvailable: !unavailableSeats.includes(seatId),
        };
      });
    });

    if (flight.type === 'outbound') {
      this.flightState.outboundFlightState.set(flight);
    } else {
      this.flightState.returnFlightState.set(flight);
    }
  }

  getOutboundFlight(): Observable<IFlight> {
    return this.flightState.outboundFlightState.$();
  }

  getReturnFlight(): Observable<IFlight> {
    return this.flightState.returnFlightState.$();
  }

  getPassengers(): Observable<IPassenger[]> {
    return this.passengerState.store().allPassengers.$(); // ESTADO DEL PASAJERO
  }

  getCurrentPassenger(): Observable<IPassenger> {
    return this.passengerState
      .store()
      .allPassengers.$()
      .pipe(
        map(
          (passengers: IPassenger[]) => passengers[this.currentPassengerIndex]
        )
      );
  }

  selectSeat(flightType: 'outbound' | 'return', seatId: string): boolean {
    const flight =
      flightType === 'outbound'
        ? this.flightState.outboundFlightState.snapshot()
        : this.flightState.returnFlightState.snapshot();

    const seat = flight.seats[seatId];
    if (!seat || !seat.isAvailable) {
      return false;
    }

    const passengers = this.passengerState.store().allPassengers.snapshot();
    const currentPassenger = passengers[this.currentPassengerIndex];

    if (flightType === 'outbound' && currentPassenger.departureSeat) {
      const oldSeat = flight.seats[currentPassenger.departureSeat];
      if (oldSeat) {
        oldSeat.passenger = undefined;
        oldSeat.isAvailable = true;
      }
    } else if (flightType === 'return' && currentPassenger.returnSeat) {
      const oldSeat = flight.seats[currentPassenger.returnSeat];
      if (oldSeat) {
        oldSeat.passenger = undefined;
        oldSeat.isAvailable = true;
      }
    }

    if (flightType === 'outbound') {
      currentPassenger.departureSeat = seatId;
    } else {
      currentPassenger.returnSeat = seatId;
    }

    seat.passenger = currentPassenger.id;
    seat.isAvailable = false;

    this.passengerState.store().allPassengers.set([...passengers]);

    if (flightType === 'outbound') {
      this.flightState.outboundFlightState.set({ ...flight });
    } else {
      this.flightState.returnFlightState.set({ ...flight });
    }

    return true;
  }

  nextPassenger(): IPassenger | null {
    if (
      this.currentPassengerIndex <
      this.passengerState.store().allPassengers.snapshot().length - 1
    ) {
      this.currentPassengerIndex++;
      const passengers = this.passengerState.store().allPassengers.snapshot();
      this.passengerState.store().allPassengers.set([...passengers]);
      return passengers[this.currentPassengerIndex];
    }
    return null;
  }

  previousPassenger(): IPassenger | null {
    if (this.currentPassengerIndex > 0) {
      this.currentPassengerIndex--;
      const passengers = this.flightState.passengersState.snapshot();
      this.flightState.passengersState.set([...passengers]);
      return passengers[this.currentPassengerIndex];
    }
    return null;
  }

  releaseSeat(seatId: string): boolean {
    const flight = this.flightState.returnFlightState.snapshot();
    const seat = flight.seats[seatId];
    if (!seat) {
      return false;
    }

    const passengers = this.flightState.passengersState.snapshot();
    const passenger = passengers.find(
      (p) => p.departureSeat === seatId || p.returnSeat === seatId
    );

    if (passenger) {
      if (passenger.departureSeat === seatId) {
        passenger.departureSeat = undefined;
      } else if (passenger.returnSeat === seatId) {
        passenger.returnSeat = undefined;
      }
    }

    seat.passenger = undefined;
    seat.isAvailable = true;

    this.flightState.passengersState.set(passengers);
    this.flightState.returnFlightState.set(flight);

    return true;
  }

  loadFlightData(flightId: string): void {
    console.log(`Cargando datos para el vuelo ${flightId}`);
  }
}
