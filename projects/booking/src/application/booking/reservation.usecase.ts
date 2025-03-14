import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { CreateReservationService } from "../../infrastructure/services/post/create-reservation.service";
import { GetFlightDetailsUseCase } from "./get-fly-details.usecase";
import { SavePassengersUseCase } from "./save-passengers.usecase";
import { PaymentUseCase } from "./payment.usecase";
import { Observable, Subscription, combineLatest } from "rxjs";
import { IReservationRequest } from "../../domain/model/reservation-request.model";

@Injectable({
  providedIn: 'root',
})
export class ReservationUseCase {
  private readonly _state = inject(State);
  private readonly _createReservationService = inject(CreateReservationService);
  private readonly _getFlyDetailsUseCase = inject(GetFlightDetailsUseCase);
  private readonly _savePassengerUseCase = inject(SavePassengersUseCase);
  private readonly _paymentUseCase = inject(PaymentUseCase);
  private subscriptions: Subscription;

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }
  getReservationData(): IReservationRequest | void {

      const selectedFlights = this._state.flight.outboundFlightState.snapshot()
      const passengers = this._state.passenger.flightData.snapshot()
      const paymentData = this._state.payment.paymentData.snapshot()

      if (!selectedFlights || !passengers || !paymentData) {
        console.error("No se pueden obtener todos los datos necesarios para la reserva.");
        return null;
      }
      return {
        departureDate: selectedFlights.departure.date,
        arrivalDate: selectedFlights.return?.date || "",
        origin: selectedFlights.departure.origin,
        destination: selectedFlights.departure.destination,
        reservationCode: this.generateReservationCode(),
        creationDate: new Date().toISOString(),

        originFlight: {
          relationalId: selectedFlights.departure.id,
          price: selectedFlights.departure.price,
          category: selectedFlights.departure.category,
          startTime: selectedFlights.departure.startTime,
          endTime: selectedFlights.departure.endTime
        },

        destinationFlight: selectedFlights.return
          ? {
              relationalId: selectedFlights.return.id,
              price: selectedFlights.return.price,
              category: selectedFlights.return.category,
              startTime: selectedFlights.return.startTime,
              endTime: selectedFlights.return.endTime
            }
          : null,

        passengers: passengers.map(p => ({
          type: p.type,
          firstName: p.firstName,
          lastName: p.lastName,
          documentType: p.documentType,
          documentNumber: p.documentNumber,
          gender: p.gender,
          birthdayDate: p.birthdayDate,
          email: p.email,
          phoneNumber: p.phoneNumber,
          originSeat: p.originSeat,
          destinationSeat: p.destinationSeat
        })),

        paymentData: paymentData
      };
  }

  execute(){



    this.subscriptions.add(
      this._createReservationService
      .execute().pipe().subscribe()
    )

  }
  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }
}


//#endregion

//#region Private Methods
//#endregion
