import { inject, Injectable } from "@angular/core";
import { ReservationState } from "./reservation.state";

@Injectable({
  providedIn: 'root'
})
export class StateIndex {
  private readonly _reservation = inject(ReservationState);

  get reservationStateIndex() {
    return this._reservation.store();
  }
}