import { inject, Injectable } from "@angular/core";
import { StateFactory } from "shared";
import { BehaviorSubject } from "rxjs";
import { IFlightData, IPassenger } from "../model/passenger.model";

@Injectable({
  providedIn: 'root',
})
export class PassengerState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects

  private readonly flightData$ = new BehaviorSubject<IFlightData>({
    dates: {
      departure: "2025-03-11T05:00:00.000Z",
      return: "2025-03-14T05:00:00.000Z"
    },
    origin: {
      abbreviation: "AXM",
      airport: "El Edén International Airport",
      name: "Armenia"
    },
    destination: {
      abbreviation: "BOG",
      airport: "El Dorado International Airport",
      name: "Bogotá"
    },
    passengers: {
      adult: 1,
      children: 1,
      infants: 0,
    },
  });

  private readonly allPassengers$ = new BehaviorSubject<IPassenger[]>([]);
  private readonly passenger$ = new BehaviorSubject<IPassenger | null>(null);

  //#endregion

  store() {
    return {
      allPassengers: this._factory.state(this.allPassengers$),
      passenger: this._factory.state(this.passenger$),
      flightData: this._factory.state(this.flightData$),
      };
  }
}
