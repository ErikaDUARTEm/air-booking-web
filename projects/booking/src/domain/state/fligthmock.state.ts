import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateFactory } from "shared";
import { IFlightSelection } from "../model/passenger.model";


@Injectable({
  providedIn: "root"
})
export class FlightStateMock {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly flightSelection$ = new BehaviorSubject<IFlightSelection>({
    departureFlight: {
      aircraftModel: "Boeing 737",
      arrivalTime: "2025-04-15T12:30:00.000Z",
      departureTime: "2025-04-15T10:00:00.000Z",
      destination: "Medellín",
      duration: "2025-04-15T2:30:00.000Z",
      flightId: "FL001",
      flightNumber: "AV2024",
      operatingAirline: "Avianca",
      origin: "Providencia",
      prices: 400,
      tax: 60
    },
    returnFlight: {
      aircraftModel: "Airbus A320",
      arrivalTime: "2025-04-16T18:00:00.000Z",
      departureTime: "2025-04-16T14:15:00.000Z",
      destination: "Providencia",
      duration: "2025-04-16T3:15:00.000Z",
      flightId: "FL002",
      flightNumber: "LA789",
      operatingAirline: "LATAM",
      origin: "Medellín",
      prices: 320,
      tax: 55
    }
  });

  //#endregion

  store() {
    return {
      flightSelection: this._factory.state(this.flightSelection$),
    };
  }
}
