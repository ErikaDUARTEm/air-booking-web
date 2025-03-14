import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { CreateReservationService } from "../../infrastructure/services/post/create-reservation.service";
import { Subscription, } from "rxjs";
import { IReservationRequest } from "../../domain/model/reservation-request.model";
import { PaymentUseCase } from "./payment.usecase";
import { GetFlightsUsecase } from "availability";
import { SavePassengersUseCase } from "./save-passengers.usecase";
import { ICard, IPse } from "../../domain/model/payment.model";
import { SelectSeatUseCase } from "./select-seat.usecase";
import { State as availabilityState } from "availability";

@Injectable({
  providedIn: 'root',
})
export class ReservationUseCase {
  private readonly _state = inject(State);
  private readonly _service = inject(CreateReservationService);
  private subscriptions: Subscription;
  private readonly _paymentUseCase = inject(PaymentUseCase);
  private readonly _getFlightUseCase = inject(GetFlightsUsecase);
  private readonly _savePassangerUseCase = inject(SavePassengersUseCase);
  private readonly _selectSeatUseCase= inject(SelectSeatUseCase);
  private readonly _availabilityState = inject(availabilityState)

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }
  getReservationData(): IReservationRequest | void {
    const passengers = this._state.passenger.allPassengers.snapshot();
    const paymentData = this._state.payment.paymentData.snapshot();
    const selectedOriginFlights = this._availabilityState.flights.flightOriginSelected.snapshot();
    const selectedDestinationFlights = this._availabilityState.flights.flightDestinationSelected.snapshot();

    const uuid = crypto.randomUUID();

    return {
      departureDate: selectedOriginFlights.departureTime.toDateString(),
      arrivalDate: selectedDestinationFlights.arrivalTime.toDateString(),
      origin: selectedOriginFlights.origin.name,
      destination: selectedDestinationFlights.destination.name,
      reservationCode: uuid,
      creationDate: new Date().toISOString(),

      originFlight: {
        relationalId: selectedOriginFlights.flightId,
        price: selectedOriginFlights.prices,
        category: "",
        startTime: selectedOriginFlights.duration,
        endTime: selectedOriginFlights.duration
      },
      destinationFlight: {
        relationalId: selectedDestinationFlights.flightId,
        price: selectedDestinationFlights.prices,
        category: "",
        startTime: selectedDestinationFlights.duration,
        endTime:selectedDestinationFlights.duration
      },

      passengers: passengers.map(p => ({
        type: "ADULT",
        firstName: p.name,
        lastName: p.lastName,
        documentType: "",
        documentNumber: "",
        gender: p.gender,
        birthdayDate: p.birthDate.toString(),
        email: p.email,
        phoneNumber: p.phone,
        originSeat: "",
        destinationSeat: ""
      })),

      payment: {
        paymentMethod : paymentData.paymentMethod,
        subtotal: paymentData.subtotal,
        total: paymentData.total,
        discount: 0.0,
        ...(paymentData.paymentMethod === 'CARD' ? { card: paymentData.paymentDetails as ICard } : {
          number: "",
          holderName: "",
          expirationDate: "",
          cvv: 0,
          countryIssue: "",
        }),
        ...(paymentData.paymentMethod  === 'PSE' ? { pse: paymentData.paymentDetails as IPse } : {
          holderName: "",
          email: ""
        }),
        billingAddress: {
          addressOne: paymentData.billingAddress.addressOne,
          addressTwo: paymentData.billingAddress.addressTwo,
          country: paymentData.billingAddress.country,
          city:paymentData.billingAddress.city,
          state: paymentData.billingAddress.state,
          postalCode: paymentData.billingAddress.postalCode,
          phoneNumber: paymentData.billingAddress.phoneNumber,
          email: paymentData.billingAddress.email
        }

      }
    };
  }
  execute(): void {
    const reservationData = this.getReservationData();

  if (!reservationData) {
    console.error("No se pudo obtener la información de la reserva.");
    return;
  }
  this.subscriptions.add(
    this._service
      .execute(reservationData).subscribe()
  );
  }

//#endregion

//#region Private Methods
//#endregion
}
