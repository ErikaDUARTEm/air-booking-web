// import { inject, Injectable } from "@angular/core";
// import { State } from "../../domain/state";
// import { CreateReservationService } from "../../infrastructure/services/post/create-reservation.service";
// import { Subscription, } from "rxjs";
// import { IReservationRequest } from "../../domain/model/reservation-request.model";
// import { PaymentUseCase } from "./payment.usecase";
// import { GetFlightsUsecase } from "availability";
// import { SavePassengersUseCase } from "./save-passengers.usecase";
// import { ICard, IPse } from "../../domain/model/payment.model";

// @Injectable({
//   providedIn: 'root',
// })
// export class ReservationUseCase {
//   private readonly _state = inject(State);
//   private readonly _createReservationService = inject(CreateReservationService);
//   private subscriptions: Subscription;
//   private readonly _reservationUseCase = inject(ReservationUseCase);
//   private readonly _paymentUseCase = inject(PaymentUseCase);
//   private readonly _getFlightUseCase = inject(GetFlightsUsecase);
//   private readonly _savePassangerUseCase = inject(SavePassengersUseCase);
//   //#region Public Methods
//   initSubscriptions(): void {
//     this.subscriptions = new Subscription();
//   }
//   getReservationData(): IReservationRequest | void {
//     //const selectedFlights = this._state.flight.flightSelection.snapshot();
//     const passengers = this._state.passenger.allPassengers.snapshot();
//     const paymentData = this._state.payment.paymentData.snapshot();
//     const paymentDetails = paymentData.paymentDetails;

//     return {
//       // departureDate: selectedFlights.departureFlight.departureTime,
//       // arrivalDate: selectedFlights.return?.date || "",
//       // origin: selectedFlights.departure.origin,
//       // destination: selectedFlights.departure.destination,
//       // reservationCode: this.generateReservationCode(),
//       // creationDate: new Date().toISOString(),

//       // originFlight: {
//       //   relationalId: selectedFlights.departure.id,
//       //   price: selectedFlights.departure.price,
//       //   category: selectedFlights.departure.category,
//       //   startTime: selectedFlights.departure.startTime,
//       //   endTime: selectedFlights.departure.endTime
//       // },

//       // destinationFlight: selectedFlights.return
//       //   ? {
//       //       relationalId: selectedFlights.return.id,
//       //       price: selectedFlights.return.price,
//       //       category: selectedFlights.return.category,
//       //       startTime: selectedFlights.return.startTime,
//       //       endTime: selectedFlights.return.endTime
//       //     }
//       //   : null,

//       passengers: passengers.map(p => ({
//         type: "ADULT",
//         firstName: p.name,
//         lastName: p.lastName,
//         documentType: "",
//         documentNumber: "",
//         gender: p.gender,
//         birthdayDate: p.birthDate.toString(),
//         email: p.email,
//         phoneNumber: p.phone,
//         originSeat: "",
//         destinationSeat: ""
//       })),

//       payment: {
//         paymentMethod : paymentData.paymentMethod,
//         subtotal: paymentData.subtotal,
//         total: paymentData.total,
//         discount: 0.0,
//         ...(paymentData.paymentMethod === 'CARD' ? { card: paymentData.paymentDetails as ICard } : {
//           number: "",
//           holderName: "",
//           expirationDate: "",
//           cvv: 0,
//           countryIssue: "",
//         }),
//         ...(paymentData.paymentMethod  === 'PSE' ? { pse: paymentData.paymentDetails as IPse } : {
//           holderName: "",
//           email: ""
//         }),
//         billingAddress: {
//           addressOne: paymentData.billingAddress.addressOne,
//           addressTwo: paymentData.billingAddress.addressTwo,
//           country: paymentData.billingAddress.country,
//           city:paymentData.billingAddress.city,
//           state: paymentData.billingAddress.state,
//           postalCode: paymentData.billingAddress.postalCode,
//           phoneNumber: paymentData.billingAddress.phoneNumber,
//           email: paymentData.billingAddress.email
//         }

//       }
//     };
//   }

//   }
// //#endregion

// //#region Private Methods
// //#endregion
// }
