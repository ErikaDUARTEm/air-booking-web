import { inject, Injectable } from '@angular/core';
import { FlightState } from '../../../domain/state/seats.state';
import { IFlight } from '../../../domain/model/seats.model';
import { BehaviorSubject, catchError, combineLatest, forkJoin, map, Observable, of, tap } from 'rxjs';
import { IPassenger } from '../../../domain/model/passenger.model';
import { PassengerState } from '../../../domain/state/passenger.state';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FlightSeatsService {

  private readonly _state = inject(FlightState);
  private readonly _passengerState = inject(PassengerState);
  private readonly _http = inject(HttpClient);
  private currentPassengerIndex = 0;

  constructor() {}



  getAvailableSeats(aggregateId: string): Observable<any> {
    const url = `http://localhost:8080/api/seat/${aggregateId}`;
    return this._http.get<any>(url);
  }

  markSeatAsOccupied(aggregateId: string, seatId: string): Observable<any> {
    const url = 'http://localhost:8080/api/flight-seat';
    const body = {
      aggregateId,
      seatId
    };
    
    return this._http.put<any>(url, body);
  }

  
  
  
  initializeSeats(): void {

    
  }



  markAllSelectedSeatsAsOccupied(): Observable<any[]> {
    const passengers = this._passengerState.store().allPassengers.snapshot();
    const outboundFlight = this._state.store().outboundFlight.snapshot();
    const returnFlight = this._state.store().returnFlight.snapshot();
    
    const seatRequests: Observable<any>[] = [];
    
    // Procesar asientos de ida
    passengers.forEach(passenger => {
      if (passenger.departureSeat) {
        seatRequests.push(
          this.markSeatAsOccupied(outboundFlight.id, passenger.departureSeat)
            .pipe(
              tap(response => {
                console.log(`Asiento de ida ${passenger.departureSeat} marcado como ocupado para ${passenger.name}`);
              }),
              catchError(error => {
                console.error(`Error al marcar asiento de ida ${passenger.departureSeat}:`, error);
                return of(null);
              })
            )
        );
      }
      
      // Procesar asientos de vuelta
      if (passenger.returnSeat) {
        seatRequests.push(
          this.markSeatAsOccupied(returnFlight.id, passenger.returnSeat)
            .pipe(
              tap(response => {
                console.log(`Asiento de vuelta ${passenger.returnSeat} marcado como ocupado para ${passenger.name}`);
              }),
              catchError(error => {
                console.error(`Error al marcar asiento de vuelta ${passenger.returnSeat}:`, error);
                return of(null);
              })
            )
        );
      }
    });
    
    // Si no hay asientos para marcar, devolver un observable vacío
    if (seatRequests.length === 0) {
      return of([]);
    }
    
    // Ejecutar todas las solicitudes en paralelo
    return forkJoin(seatRequests);
  }

  initializeSeatsWithRealData(aggregateId: string, flightType: 'outbound' | 'return'): void {
    this.getAvailableSeats(aggregateId).subscribe({
      next: (response) => {
        const seats = response.seats;
        const flight: IFlight = {
          id: aggregateId,
          type: flightType,
          flightNumber: response.flightNumber || '',
          aircraft: response.aircraft || '',
          seats: {}
        };
  
        seats.forEach((seat: any) => {
          const seatId = seat.seatNumber; // Usa seatNumber como seatId
          flight.seats[seatId] = {
            id: seatId,
            row: seat.row,
            column: seat.column,
            seatNumber: seat.seatNumber,
            type: seat.seatClass?.toLowerCase() || 'regular',
            price: seat.price || 0,
            isAvailable: seat.isAvailable !== false,
          };
        });
  
        if (flightType === 'outbound') {
          this._state.store().outboundFlight.set(flight);
        } else {
          this._state.store().returnFlight.set(flight);
        }
      },
      error: (err) => {
        console.error(`Error loading seat data for ${flightType}:`, err);
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
    
    // Asegúrate de que el asiento exista y esté disponible
    if (!seat || !seat.isAvailable) {
      console.error(`Seat ${seatId} is not available`);
      return false;
    }
  
    const passengers = this._passengerState.store().allPassengers.snapshot();
    const currentPassenger = passengers[this.currentPassengerIndex];
  
    if (!currentPassenger) {
      console.error('No hay un pasajero actual definido.');
      return false;
    }
    
    // Liberar el asiento antiguo si existe
    if (flightType === 'outbound' && currentPassenger.departureSeat) {
      const oldSeatId = currentPassenger.departureSeat;
      const oldSeat = flight.seats[oldSeatId];
      if (oldSeat) {
        oldSeat.passenger = undefined;
        oldSeat.isAvailable = true;
      }
    } else if (flightType === 'return' && currentPassenger.returnSeat) {
      const oldSeatId = currentPassenger.returnSeat;
      const oldSeat = flight.seats[oldSeatId];
      if (oldSeat) {
        oldSeat.passenger = undefined;
        oldSeat.isAvailable = true;
      }
    }
  
    // Asignar el nuevo asiento
    if (flightType === 'outbound') {
      currentPassenger.departureSeat = seatId;
    } else {
      currentPassenger.returnSeat = seatId;
    }
    
    // Marcar el asiento como ocupado
    seat.passenger = currentPassenger.id;
    seat.isAvailable = false;
  
    // Actualizar el estado de los pasajeros
    const updatedPassengers = [...passengers];
    updatedPassengers[this.currentPassengerIndex] = { ...currentPassenger };
    this._passengerState.store().allPassengers.set(updatedPassengers);
  
    // Actualizar el estado del vuelo
    if (flightType === 'outbound') {
      this._state.store().outboundFlight.set({ ...flight });
    } else {
      this._state.store().returnFlight.set({ ...flight });
    }
  
    console.log(`Seat ${seatId} assigned to passenger ${currentPassenger.id}`);
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
