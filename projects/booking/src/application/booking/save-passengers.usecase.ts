import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { IPassenger } from "../../domain/model/passenger.model";
import { Observable, Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SavePassengersUseCase {
  private readonly _state = inject(State);

  savePassengers$(): Observable<IPassenger[]> {
    return this._state.passenger.allPassengers.$();
  }

  setPassengers(passengers: IPassenger[]): void {
    this._state.passenger.allPassengers.set(passengers);
  }
}
