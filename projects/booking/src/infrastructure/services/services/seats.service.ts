import { inject, Injectable } from '@angular/core';
import { FlightState } from '../../../domain/state/seats.state';
import { IFlight } from '../../../domain/model/seats.model';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { IPassenger } from '../../../domain/model/passenger.model';
import { PassengerState } from '../../../domain/state/passenger.state';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FlightSeatsService {
  // private readonly _state = inject(FlightState);
  // private readonly _passengerState = inject(PassengerState);
  // private currentPassengerIndex = 0;

  private readonly _state = inject(FlightState);
  private readonly _passengerState = inject(PassengerState);
  private readonly _http = inject(HttpClient);
  private currentPassengerIndex = 0;

  constructor() {}



  getAvailableSeats(aggregateId: string): Observable<any> {
    const url = 'http://localhost:8080/api/seat';
    const body = { aggregateId };
  
    return this._http.get<any>(url,  { params: body });
  }
  
  
  initializeSeats(): void {
    // const outboundFlight = this._state.store().outboundFlight.snapshot();
    // const returnFlight = this._state.store().returnFlight.snapshot();
    // this.initializeFlightSeats(outboundFlight);
    // this.initializeFlightSeats(returnFlight);
    
  }

  // private initializeFlightSeats(flight: IFlight): void {
  //   const businessRows = [1, 2, 3, 4];
  //   const economyRows = [5, 6, 7, 8];
  //   const favorableRows = [9, 10, 11];
  //   const emergencyRows = [17, 18];
  //   const favorableRows2 = [19, 20];
  //   const regularRows = Array.from({ length: 34 - 21 + 1 }, (_, i) => i + 21);

  //   const allColumns = ['A', 'B', 'C', 'D', 'E', 'F'];
  //   const unavailableSeats = ['21C', '23F', '25A', '26A', '26B', '27C', '28A'];

  //   // Business class seats
  //   businessRows.forEach((row) => {
  //     allColumns.forEach((col) => {
  //       const seatId = `${row}${col}`;
  //       flight.seats[seatId] = {
  //         id: seatId,
  //         type: 'bussiness',
  //         price: 0,
  //         isAvailable: !unavailableSeats.includes(seatId),
  //       };
  //     });
  //   });

  //   // Economy class seats
  //   economyRows.forEach((row) => {
  //     allColumns.forEach((col) => {
  //       const seatId = `${row}${col}`;
  //       flight.seats[seatId] = {
  //         id: seatId,
  //         type: 'economy',
  //         price: 15,
  //         isAvailable: !unavailableSeats.includes(seatId),
  //       };
  //     });
  //   });

  //   // Favorable class seats (9 - 11)
  //   favorableRows.forEach((row) => {
  //     allColumns.forEach((col) => {
  //       const seatId = `${row}${col}`;
  //       flight.seats[seatId] = {
  //         id: seatId,
  //         type: 'favorable',
  //         price: 10,
  //         isAvailable: !unavailableSeats.includes(seatId),
  //       };
  //     });
  //   });

  //   // Emergency exit seats (17, 18)
  //   emergencyRows.forEach((row) => {
  //     allColumns.forEach((col) => {
  //       const seatId = `${row}${col}`;
  //       flight.seats[seatId] = {
  //         id: seatId,
  //         type: 'emergency',
  //         price: 20,
  //         isAvailable: true,
  //       };
  //     });
  //   });

  //   // Favorable class seats (19, 20)
  //   favorableRows2.forEach((row) => {
  //     allColumns.forEach((col) => {
  //       const seatId = `${row}${col}`;
  //       flight.seats[seatId] = {
  //         id: seatId,
  //         type: 'favorable',
  //         price: 10,
  //         isAvailable: true,
  //       };
  //     });
  //   });

  //   // Regular class seats (21 - 33)
  //   regularRows.forEach((row) => {
  //     allColumns.forEach((col) => {
  //       const seatId = `${row}${col}`;
  //       flight.seats[seatId] = {
  //         id: seatId,
  //         type: 'regular',
  //         price: 5,
  //         isAvailable: !unavailableSeats.includes(seatId),
  //       };
  //     });
  //   });

  //   if (flight.type === 'outbound') {
  //     this._state.store().outboundFlight.set(flight);
  //   } else {
  //     this._state.store().returnFlight.set(flight);
  //   }
  // }

  initializeSeatsWithRealData(aggregateId: string, flightType: 'outbound' | 'return'): void {
    this.getAvailableSeats(aggregateId).subscribe(response => {
      const seats = response.seats;
      const flight: IFlight = {
        id: aggregateId,
        type: flightType,
        flightNumber: response.flightNumber || '',
        aircraft: response.aircraft || '',
        seats: {}
      };

      seats.forEach((seat: any) => {
        flight.seats[seat.seatId] = {
          id: seat.seatId,
          row: seat.row,
          column: seat.column,
          seatNumber: seat.seatNumber,
          type: seat.seatClass.toLowerCase(),
          price: seat.price,
          isAvailable: seat.isAvailable,
        };
      });

      if (flightType === 'outbound') {
        this._state.store().outboundFlight.set(flight);
        console.log(this._state.store().outboundFlight.snapshot());
      } else {
        this._state.store().returnFlight.set(flight);
        console.log(this._state.store().returnFlight.snapshot());
      }
    });
  }


  getOutboundFlight(): Observable<IFlight> {
    return this._state.store().outboundFlight.$();
  }

  getReturnFlight(): Observable<IFlight> {
    return this._state.store().returnFlight.$();
  }

  getPassengers(): Observable<IPassenger[]> {
    return this._passengerState.store().allPassengers.$();
  }

  getCurrentPassenger(): Observable<IPassenger> {
    return this._passengerState.store().allPassengers.$().pipe(
      map((passengers: IPassenger[]) => {
        if (passengers.length === 0) {
          throw new Error('No hay pasajeros disponibles.');
        }
        return passengers[this.currentPassengerIndex];
      })
    );
  }

  selectSeat(flightType: 'outbound' | 'return', seatId: string): boolean {
    const flight = flightType === 'outbound'
      ? this._state.store().outboundFlight.snapshot()
      : this._state.store().returnFlight.snapshot();

    const seat = flight.seats[seatId];
    if (!seat || !seat.isAvailable) {
      return false;
    }

    const passengers = this._passengerState.store().allPassengers.snapshot();
    const currentPassenger = passengers[this.currentPassengerIndex];

    if (!currentPassenger) {
      console.error('No hay un pasajero actual definido.');
      return false;
    }
    
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

  
    const updatedPassengers = [...passengers];
    updatedPassengers[this.currentPassengerIndex] = currentPassenger;
    this._passengerState.store().allPassengers.set(updatedPassengers);

    if (flightType === 'outbound') {
      this._state.store().outboundFlight.set({ ...flight });
    } else {
      this._state.store().returnFlight.set({ ...flight });
    }

    return true;
  }




  private releaseSeat(flight: IFlight, seatId: string): void {
    const oldSeat = flight.seats[seatId];
    if (oldSeat) {
      oldSeat.passenger = undefined;
      oldSeat.isAvailable = true;
    }
  }

  private assignSeat(
    flight: IFlight, 
    seatId: string, 
    passenger: IPassenger, 
    flightType: 'outbound' | 'return'
  ): void {
    const seat = flight.seats[seatId];
    if (flightType === 'outbound') {
      passenger.departureSeat = seatId;
    } else {
      passenger.returnSeat = seatId;
    }
    seat.passenger = passenger.id;
    seat.isAvailable = false;

    // Actualizar el estado de pasajeros
    const passengers = this._passengerState.store().allPassengers.snapshot();
    const updatedPassengers = passengers.map(p => 
      p.id === passenger.id ? passenger : p
    );
    this._passengerState.store().allPassengers.set(updatedPassengers);
  }

  getCurrentIndex(): number {
    return this.currentPassengerIndex;
  }


  nextPassenger(): IPassenger | null {
    const passengers = this._passengerState.store().allPassengers.snapshot();
    if (this.currentPassengerIndex < passengers.length - 1) {
      this.currentPassengerIndex++;
      console.log(`Cambiando al pasajero ${this.currentPassengerIndex + 1} de ${passengers.length}`);
      return passengers[this.currentPassengerIndex];
    }
    return null;
  }

  previousPassenger(): IPassenger | null {
    const passengers = this._passengerState.store().allPassengers.snapshot();
    if (this.currentPassengerIndex > 0) {
      this.currentPassengerIndex--;
      console.log(`Cambiando al pasajero ${this.currentPassengerIndex + 1} de ${passengers.length}`);
      return passengers[this.currentPassengerIndex];
    }
    return null;
  }

}
