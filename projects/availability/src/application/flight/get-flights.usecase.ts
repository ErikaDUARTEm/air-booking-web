import { inject, Injectable } from "@angular/core";
import { GetFlightsService } from "../../infrastructure/services/get-flights.service";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IFlight, IRequiredFlight } from "../../domain/model/flight.model";


@Injectable({
  providedIn: 'root'
})
export class GetFlightsUsecase {
  private readonly _service = inject(GetFlightsService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  flights$(): Observable<IFlight[]> {
    return this._state.flights.listFlights.$() as Observable<IFlight[]>;
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(requiredFlight: IRequiredFlight): void {
    this.subscriptions.add(
      this._service.execute(requiredFlight)
        .pipe(
          tap(result => this._state.flights.listFlights.set(result)),
        )
        .subscribe()
    );
  }
  //#endregion
}