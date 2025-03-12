import { inject, Injectable } from "@angular/core";
import { FlightState } from "./flight.state";

@Injectable({
  providedIn: 'root'
})
export class State {
  private readonly _flights = inject(FlightState);

  get flights() {
    return this._flights.store();
  }
}