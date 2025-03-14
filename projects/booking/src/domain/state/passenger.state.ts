import { inject, Injectable } from "@angular/core";
import { StateFactory } from "shared";
import { BehaviorSubject } from "rxjs";
import { IPassenger } from "../model/passenger.model";
import { IFormFlight } from "availability";


@Injectable({
  providedIn: 'root',
})
export class PassengerState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects

  private readonly flightData$ = new BehaviorSubject<IFormFlight>(null);

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
