import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { IPassenger } from "../../domain/model/passenger.model";

@Injectable({
  providedIn: "root",
})
export class SavePassengersUseCase {
  private readonly _state = inject(State);

  savePassengers(passengers: IPassenger[]): void {
    this._state.passenger.allPassengers.set(passengers);
  }
}
