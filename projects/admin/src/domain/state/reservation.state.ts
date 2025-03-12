import { BehaviorSubject } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { StateFactory } from "shared";
import { IReservationData } from "../model/reservation.model";

@Injectable({
  providedIn: 'root'
})
export class ReservationState {
  private readonly _factory = inject(StateFactory);

  //#region Observables
  private readonly resreservations$ = new BehaviorSubject<IReservationData[]>([]);
  private readonly currentReservation$ = new BehaviorSubject<IReservationData>(null);
  //#endregion

  store() {
    return {
      reservations: this._factory.state(this.resreservations$),
      currentReservation: this._factory.state(this.currentReservation$)
    }
  }
}