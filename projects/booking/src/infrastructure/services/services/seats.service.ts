import { IFlight, IPassenger } from '../../../domain/model/seats.model';
import { FlightState } from '../../../domain/state/seats.state';

import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FlightSeatsService {

    private currentPassengerIndex = 0;

    constructor(private flightState: FlightState) {
      this.initializeSeats();
    }
  
    private initializeSeats(): void {
      const outboundFlight = this.flightState.outboundFlightState.snapshot();
      const returnFlight = this.flightState.returnFlightState.snapshot();
      this.initializeFlightSeats(outboundFlight);
      this.initializeFlightSeats(returnFlight);
    }
  
    private initializeFlightSeats(flight: IFlight): void {
      const regularRows = [21, 22, 23, 24, 25, 26, 27, 28, 29];
      const allColumns = ['A', 'B', 'C', 'D', 'E', 'F'];
      const unavailableSeats = ['21C', '23F', '25A', '26A', '26B', '27C', '28A'];
      const premiumRows = [5, 6, 7, 8, 9, 10, 11];
      const emergencyRows = [17];
      const favorableSeats = ['18A', '18B', '19A', '19F', '20A', '20B', '20E', '20F'];
  
      regularRows.forEach(row => {
        allColumns.forEach(col => {
          const seatId = `${row}${col}`;
          flight.seats[seatId] = {
            id: seatId,
            type: 'regular',
            price: 0,
            isAvailable: !unavailableSeats.includes(seatId)
          };
        });
      });
  
      premiumRows.forEach(row => {
        allColumns.forEach(col => {
          const seatId = `${row < 10 ? '0' + row : row}${col}`;
          flight.seats[seatId] = {
            id: seatId,
            type: 'premium',
            price: 25,
            isAvailable: true
          };
        });
      });
  
      emergencyRows.forEach(row => {
        allColumns.forEach(col => {
          const seatId = `${row}${col}`;
          flight.seats[seatId] = {
            id: seatId,
            type: 'emergency',
            price: 15,
            isAvailable: true
          };
        });
      });
  
      favorableSeats.forEach(seatId => {
        if (flight.seats[seatId]) {
          flight.seats[seatId].type = 'favorable';
          flight.seats[seatId].price = 10;
        } else {
          flight.seats[seatId] = {
            id: seatId,
            type: 'favorable',
            price: 10,
            isAvailable: true
          };
        }
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
      return this.flightState.passengersState.$();
    }
  
    getCurrentPassenger(): Observable<IPassenger> {
      return this.flightState.passengersState.$().pipe(
        map((passengers: any[]) => passengers[this.currentPassengerIndex])
      );
    }
  
    selectSeat(flightType: 'outbound' | 'return', seatId: string): boolean {
      const flight = flightType === 'outbound'
        ? this.flightState.outboundFlightState.snapshot()
        : this.flightState.returnFlightState.snapshot();
        
      const seat = flight.seats[seatId];
      if (!seat || !seat.isAvailable) {
        return false;
      }
  
      const passengers = this.flightState.passengersState.snapshot();
      const currentPassenger = passengers[this.currentPassengerIndex];
      
      if (currentPassenger.selectedSeat) {
        const oldSeat = flight.seats[currentPassenger.selectedSeat];
        if (oldSeat) {
          oldSeat.passenger = undefined;
          oldSeat.isAvailable = true;
        }
      }
  
      currentPassenger.selectedSeat = seatId;
      seat.passenger = currentPassenger.id;
      seat.isAvailable = false;
  
      this.flightState.passengersState.set(passengers);
      if (flightType === 'outbound') {
        this.flightState.outboundFlightState.set(flight);
      } else {
        this.flightState.returnFlightState.set(flight);
      }
      
      return true;
    }
    nextPassenger(): IPassenger | null {
      if (this.currentPassengerIndex < this.flightState.passengersState.snapshot().length - 1) {
        this.currentPassengerIndex++;
        const passengers = this.flightState.passengersState.snapshot();
        this.flightState.passengersState.set([...passengers]); 
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
    const passenger = passengers.find(p => p.selectedSeat === seatId);
    if (passenger) {
      passenger.selectedSeat = undefined;
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