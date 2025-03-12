import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { IFlight, IPassenger } from './../model/seats.model';
import { IState, StateFactory } from 'shared';

@Injectable({
    providedIn: 'root'
  })
  export class FlightState {
    private outboundFlightSubject$ = new BehaviorSubject<IFlight>({
      id: 'FL123',
      flightNumber: 'CM456',
      aircraft: 'Boeing 737-700',
      seats: {},
      type: 'outbound'
    });
    
    private returnFlightSubject$ = new BehaviorSubject<IFlight>({
      id: 'FL124',
      flightNumber: 'CM457',
      aircraft: 'Boeing 737-700',
      seats: {},
      type: 'return'
    });
  
    private passengersSubject$ = new BehaviorSubject<IPassenger[]>([
      { id: 'P1', name: 'Juan', lastName: 'Pérez', documentId: '123456789' },
      { id: 'P2', name: 'María', lastName: 'García', documentId: '987654321' },
      { id: 'P3', name: 'Carlos', lastName: 'López', documentId: '456789123' }
    ]);
  
    public outboundFlightState: IState<IFlight>;
    public returnFlightState: IState<IFlight>;
    public passengersState: IState<IPassenger[]>;
  
    constructor(private stateFactory: StateFactory) {
      this.outboundFlightState = this.stateFactory.state(this.outboundFlightSubject$);
      this.returnFlightState = this.stateFactory.state(this.returnFlightSubject$);
      this.passengersState = this.stateFactory.state(this.passengersSubject$);
    }
  }