import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { Form, FormGroup } from "@angular/forms";
import { IFormFlight } from "../domain/model/flight.model";


@Injectable({
  providedIn: 'root'
})
export class FormUseCase {
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  form$(): Observable<IFormFlight> {
    return this._state.flights.form.$() as Observable<IFormFlight>;
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(form: IFormFlight): void {
    this.subscriptions.add(
      this._state.flights.form.set(form)
    );
  }

  viewForm(): void {
    this.subscriptions.add(
      this.form$().subscribe(form => {
        console.log("Formulario recibidooo:", form);
      })
    );
  }

  spanshot(): IFormFlight {
    return this._state.flights.form.snapshot();
  }
  //#endregion
}