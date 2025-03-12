import { inject, Injectable } from "@angular/core";
// import { GetReservationsService } from "../infrastructure/services/get-reservations.service";
import { StateIndex } from "../domain/state";
import { Observable, Subscription, tap, of } from "rxjs";
import { IReservationData } from "../domain/model/reservation.model";
import { reservationsData } from "../infrastructure/data/dataMock";


@Injectable({
  providedIn: 'root'
})
export class GetReservationUseCase {
  // private readonly _service = inject(GetReservationsService);
  private readonly _state = inject(StateIndex);
  private subscriptions: Subscription;

  //#region Observables
  allReservations$(): Observable<IReservationData[]> {
    return this._state.reservationStateIndex.reservations.$();
  }

  currentReservation$(): Observable<IReservationData> {
    return this._state.reservationStateIndex.currentReservation.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }
  //#endregion
  
  execute(): void {
    this.subscriptions.add(
      // this._service.execute()
      //   .pipe(
      //     tap(this._state.reservationStateIndex.reservations.set)
      //   ).subscribe()
      
        of(reservationsData) // Simula el observable con los datos mockeados
          .pipe(
            tap(this._state.reservationStateIndex.reservations.set) // Actualiza el estado con los datos simulados
          )
          .subscribe()
      
    );
  }

  selectedReservation(reservationCode: string): void {
    const currentReservation = this._state.reservationStateIndex.reservations.snapshot().find(reservation => reservation.reservationCode === reservationCode);
    this._state.reservationStateIndex.currentReservation.set(currentReservation);
  }


  
}