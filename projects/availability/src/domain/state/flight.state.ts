import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateFactory } from "shared";
import { IFlight, IFormFlight } from "../model/flight.model";
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FlightState {
  private readonly _factory = inject(StateFactory); 

  //#region Subjects
  private readonly flights$ = new BehaviorSubject<IFlight[]>([]);
  private readonly form$ = new BehaviorSubject<IFormFlight>(null)
  //#endregion

  store() {
    return {
      listFlights: this._factory.state(this.flights$),
      form: this._factory.state(this.form$)
    }
  }
}