import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { IPassenger } from "../../domain/model/passenger.model";
import { Observable, Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SavePassengersUseCase {
  private readonly _state = inject(State);
private subscriptions: Subscription;


  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }
  savePassengers$(): Observable<IPassenger[]> {
    return this._state.passenger.allPassengers.$();
  }
}
